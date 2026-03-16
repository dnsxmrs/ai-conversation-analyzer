import prisma from "@/lib/prisma";
import { MessageSquare, Clock, Activity } from "lucide-react";
import { UploadConversationLink } from "./dashboard-client";
import Link from "next/link";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function ConversationDisplay() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return null;
    }

    const conversations = await prisma.conversation.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: "desc" },
        include: {
            report: true,
            _count: {
                select: { messages: true },
            },
        },
    });

    return (
        <div>
            {conversations.length === 0 ? (
                <div className="text-center py-24 border-2 border-dashed rounded-2xl bg-neutral-50/50 dark:bg-neutral-900/50 dark:border-neutral-800">
                    <MessageSquare className="w-12 h-12 text-neutral-400 mx-auto mb-4 opacity-50" />
                    <h2 className="text-xl font-medium mb-2">No analysis yet</h2>
                    <p className="text-neutral-500 mb-6 max-w-sm mx-auto font-light">
                        You haven&apos;t uploaded any conversations for analysis. Start your first analysis to see insights.
                    </p>
                    <UploadConversationLink />
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {conversations.map((conv) => (
                        <Link key={conv.id} href={`/conversations/${conv.id}`} className="group block h-full">
                            <div className="flex flex-col h-full rounded-[16px] border border-neutral-200 bg-white p-6 transition-all duration-200 hover:border-neutral-300 hover:shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] dark:border-neutral-800 dark:bg-neutral-900/40 dark:hover:border-neutral-700">
                                <div className="flex items-center justify-between mb-5">
                                    <div className="flex items-center gap-2 text-[11px] font-bold text-neutral-400 uppercase tracking-widest">
                                        <MessageSquare className="w-3.5 h-3.5" />
                                        PASTE
                                    </div>
                                    {conv.status === "completed" && conv.report?.healthScore !== undefined ? (
                                        <div className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${conv.report.healthScore >= 80 ? "bg-emerald-100/80 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" :
                                            conv.report.healthScore >= 50 ? "bg-amber-100/80 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400" :
                                                "bg-rose-100/80 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400"
                                            }`}>
                                            Score: {conv.report.healthScore}
                                        </div>
                                    ) : conv.status === "failed" ? (
                                        <div className="inline-flex items-center gap-1.5 text-[11px] font-bold px-2.5 py-1 rounded-full bg-red-50 text-red-600 ring-1 ring-inset ring-red-600/10 dark:bg-red-900/20 dark:text-red-400 dark:ring-red-400/20">
                                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                            Analysis Failed
                                        </div>
                                    ) : (
                                        <div className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-400">
                                            {conv.status === 'processing' ? 'Processing...' : 'Pending'}
                                        </div>
                                    )}
                                </div>

                                <h3 className="text-[17px] font-semibold tracking-tight text-neutral-900 dark:text-neutral-100 mb-2.5 line-clamp-1">
                                    {conv.title || "Untitled Conversation"}
                                </h3>

                                <p className="text-[14px] text-neutral-500 leading-relaxed line-clamp-3 mb-6 grow font-light">
                                    {conv.report?.toneSummary || conv.originalText}
                                </p>

                                <div className="flex items-center gap-5 text-[12px] font-medium text-neutral-400 pt-5 border-t border-neutral-100 dark:border-neutral-800 mt-auto">
                                    <div className="flex items-center gap-1.5">
                                        <Clock className="w-[14px] h-[14px]" />
                                        {new Date(conv.createdAt).toLocaleDateString()}
                                    </div>
                                    {conv.report?.sentimentScore !== undefined && conv.report?.sentimentScore !== null && (
                                        <div className="flex items-center gap-1.5">
                                            <Activity className="w-[14px] h-[14px]" />
                                            Sentiment: {(conv.report.sentimentScore * 100).toFixed(2)}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}   