"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, Sparkles, AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { parseConversation } from "@/lib/parser";
import { processConversation } from "@/app/_actions/conversation";

export default function UploadPage() {
    const { data: session, isPending } = authClient.useSession();
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [rawText, setRawText] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const isSubmittingRef = useRef(false);

    // Redirect if not logged in
    if (!isPending && !session?.user) {
        router.push("/login");
        return null;
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (isSubmittingRef.current) return;

        if (!rawText.trim()) {
            setError("Please paste a conversation to analyze.");
            return;
        }

        isSubmittingRef.current = true;
        setIsSubmitting(true);
        setError(null);

        try {
            // 1. Parse texts immediately for basic validation
            const parsedElements = parseConversation(rawText);
            if (parsedElements.length === 0) {
                setError("Could not parse conversation. Make sure it follows the 'Speaker: Message' format.");
                setIsSubmitting(false);
                return;
            }

            // 2. Submit to Server Action
            const result = await processConversation(title, rawText);

            if (!result) {
                throw new Error("No response from server.");
            }

            if (result.success) {
                // Redirect to detailed analysis view
                router.push(`/conversations/${result.conversationId}`);
            } else {
                setError(result.error || "Analysis failed.");
            }
        } catch (err: unknown) {
            if (err instanceof Error) {
                setError(err.message || "An unexpected error occurred. Please try again.");
            } else {
                setError("An unexpected error occurred. Please try again.");
            }
            console.error(err);
        } finally {
            isSubmittingRef.current = false;
            setIsSubmitting(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 max-w-4xl">
            <div className="mb-2">
                <h1 className="text-3xl font-bold tracking-tight">New Analysis</h1>
                <p className="text-muted-foreground mt-1">
                    Paste your conversation below to get an AI-powered communication analysis.
                </p>
            </div>

            <Card>
                <form onSubmit={handleSubmit}>
                    <CardContent className="space-y-6 mt-6">

                        {error && (
                            <Alert variant="destructive">
                                <AlertCircle className="h-4 w-4" />
                                <AlertTitle>Error</AlertTitle>
                                <AlertDescription>{error}</AlertDescription>
                            </Alert>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="title">Title (optional)</Label>
                            <Input
                                id="title"
                                placeholder="e.g., Performance Review, Argument with Friend"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="rawText">Chat Transcript</Label>
                                <span className="text-xs text-muted-foreground">
                                    {rawText.length} characters
                                </span>
                            </div>
                            <Textarea
                                id="rawText"
                                placeholder="John: Hey, could you finish that report?&#10;Alice: I'm working on it right now, don't rush me."
                                className="min-h-[300px] font-mono text-sm resize-y"
                                value={rawText}
                                onChange={(e) => setRawText(e.target.value)}
                                required
                            />
                        </div>

                        <div className="bg-muted/40 rounded-lg p-4 border text-sm text-muted-foreground">
                            <h4 className="font-semibold text-foreground mb-1 flex items-center gap-1.5">
                                <Sparkles className="w-4 h-4 text-primary" />
                                What we&apos;ll analyze
                            </h4>
                            <ul className="list-disc pl-5 space-y-1 mt-2">
                                <li>Identify the speaker&apos;s overall <strong>tone and sentiment</strong></li>
                                <li>Flag potential <strong>passive aggression or emotional manipulation</strong></li>
                                <li>Calculate an overall <strong>communication health score</strong></li>
                                <li>Provide concrete tips on how to improve the communication</li>
                            </ul>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between pt-6">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => router.push("/dashboard")}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" disabled={isSubmitting || !rawText.trim()}>
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Analyzing... (This can take 10-15s)
                                </>
                            ) : (
                                <>
                                    <Sparkles className="mr-2 h-4 w-4" />
                                    Start Analysis
                                </>
                            )}
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
