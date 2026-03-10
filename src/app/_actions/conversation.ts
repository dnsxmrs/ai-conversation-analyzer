"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import prisma from "@/lib/prisma";
import { parseConversation } from "@/lib/parser";
import { GoogleGenAI } from "@google/genai";
import { revalidatePath } from "next/cache";

const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function processConversation(title: string, rawText: string) {
    try {
        // 1. Verify Authentication
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session?.user) {
            throw new Error("Unauthorized");
        }

        // 2. Parse text
        const parsedMessages = parseConversation(rawText);
        if (parsedMessages.length === 0) {
            throw new Error("Could not parse any messages from the provided text.");
        }

        // 3. Save initial pending conversation to Database
        const conversation = await prisma.conversation.create({
            data: {
                userId: session.user.id,
                title: title || "Untitled Analysis",
                originalText: rawText,
                status: "processing",
                wordCount: rawText.split(/\s+/).length,
                messages: {
                    create: parsedMessages.map((msg) => ({
                        speaker: msg.speaker,
                        content: msg.content,
                        messageIndex: msg.messageIndex,
                    })),
                },
            },
        });

        // 4. Construct Prompt for Gemini
        const transcript = parsedMessages
            .map((m) => `[Msg ${m.messageIndex}] ${m.speaker}: ${m.content}`)
            .join("\n");

        const prompt = `
You are an expert communication coach and behavioral analyst. Analyze the following conversation transcript. 
Identify the overall tone, sentiment, and communication patterns. Flag any messages that show passive aggression, emotional manipulation, gaslighting, hostility, or poor communication.

Transcript:
${transcript}

Provide the analysis strictly in JSON format matching the following structure:
{
  "sentimentScore": <float between 0 and 1, where 0 is extremely negative and 1 is extremely positive>,
  "healthScore": <integer between 0 and 100, representing the overall health of the communication>,
  "toneSummary": "<string, a 1-2 sentence summary of the overall tone>",
  "emotionalSignals": "<string, describing the underlying emotions detected>",
  "redFlags": "<string, summarizing any toxic/unhealthy patterns>",
  "communicationPatterns": "<string, describing the dynamics between speakers>",
  "aiSummary": "<string, a general summary of the conversation and actionable advice>",
  "flags": [
    {
      "messageIndex": <integer, matching the [Msg X] index exactly if you want to flag a specific message>,
      "flagType": "<short string categorization, e.g. 'Passive Aggressive', 'Defensive'>",
      "explanation": "<string, detailing why this message was flagged>",
      "confidenceScore": <float between 0 and 1, how confident you are in this flag>
    }
  ]
}
`;

        // 5. Call Gemini API
        const result = await genAI.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: [{ role: "user", parts: [{ text: prompt }] }],
            config: {
                responseMimeType: "application/json",
            },
        });

        const responseText = result.text;
        if (!responseText) {
            throw new Error("Received empty response from Gemini");
        }

        // Strip out markdown code block if present
        const jsonText = responseText.replace(/^```json\s*/i, "").replace(/```\s*$/i, "").trim();

        const analysisData = JSON.parse(jsonText);

        // 6. Save Analysis to Database
        await prisma.$transaction(async (tx) => {
            // Find the created messages to link flags back by ID
            const dbMessages = await tx.message.findMany({
                where: { conversationId: conversation.id },
            });
            const messageMap = new Map(dbMessages.map((m) => [m.messageIndex, m.id]));

            // Create Report
            await tx.analysisReport.create({
                data: {
                    conversationId: conversation.id,
                    sentimentScore: analysisData.sentimentScore,
                    healthScore: analysisData.healthScore,
                    toneSummary: analysisData.toneSummary,
                    emotionalSignals: analysisData.emotionalSignals,
                    redFlags: analysisData.redFlags,
                    communicationPatterns: analysisData.communicationPatterns,
                    aiSummary: analysisData.aiSummary,
                },
            });

            // Create Flags
            if (analysisData.flags && Array.isArray(analysisData.flags)) {
                const flagInserts = [];
                for (const flag of analysisData.flags) {
                    const messageId = messageMap.get(flag.messageIndex);
                    if (messageId) {
                        flagInserts.push({
                            messageId,
                            flagType: flag.flagType,
                            explanation: flag.explanation,
                            confidenceScore: flag.confidenceScore,
                        });
                    }
                }

                if (flagInserts.length > 0) {
                    await tx.analysisFlag.createMany({
                        data: flagInserts,
                    });
                }
            }

            // Update Conversation Status
            await tx.conversation.update({
                where: { id: conversation.id },
                data: { status: "completed" },
            });
        }, {
            maxWait: 10000, // default is 2000ms
            timeout: 20000, // default is 5000ms
        });

        revalidatePath("/dashboard");
        return { success: true, conversationId: conversation.id };
    } catch (error: unknown) {
        console.error("Analysis Error:", error);

        // If we created a conversation but failed midway, mark it as failed instead of leaving it stuck
        try {
            // Find the most recently created processing conversation by this user
            const session = await auth.api.getSession({ headers: await headers() });
            if (session?.user) {
                const latestProcessing = await prisma.conversation.findFirst({
                    where: { userId: session.user.id, status: "processing" },
                    orderBy: { createdAt: "desc" },
                });
                if (latestProcessing) {
                    await prisma.conversation.update({
                        where: { id: latestProcessing.id },
                        data: { status: "failed" },
                    });
                }
            }
        } catch (cleanupError) {
            console.error("Failed to cleanup conversation status:", cleanupError);
        }

        if (error instanceof Error) {
            return { success: false, error: error.message || "Failed to analyze conversation" };
        }
        return { success: false, error: "Failed to analyze conversation" };
    }
}

export async function getConversationDetails(id: string) {
    try {
        const session = await auth.api.getSession({
            headers: await headers(),
        });

        if (!session?.user) {
            throw new Error("Unauthorized");
        }

        const conversation = await prisma.conversation.findUnique({
            where: {
                id,
                userId: session.user.id, // Ensure user owns this conversation
            },
            include: {
                messages: {
                    orderBy: {
                        messageIndex: "asc",
                    },
                    include: {
                        flags: true,
                    },
                },
                report: true,
            },
        });

        if (!conversation) {
            return { success: false, error: "Conversation not found" };
        }

        return { success: true, conversation };
    } catch (error: unknown) {
        console.error("Error fetching conversation details:", error);
        return { success: false, error: "Failed to fetch conversation details" };
    }
}
