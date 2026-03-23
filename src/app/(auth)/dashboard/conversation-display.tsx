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
                <div className="text-center py-24 rounded-2xl relative overflow-hidden" style={{ background: "color-mix(in oklch, var(--muted) 35%, transparent)", border: "1px solid color-mix(in oklch, var(--border) 60%, transparent)" }}>
                    <div className="absolute inset-0 pointer-events-none opacity-[0.035]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />
                    <div className="w-12 h-12 flex items-center justify-center mx-auto mb-5 rounded-full" style={{ background: "color-mix(in oklch, var(--primary) 12%, transparent)" }}>
                        <MessageSquare className="w-5 h-5" style={{ color: "var(--primary)" }} />
                    </div>
                    <h2 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: "1.75rem", color: "var(--foreground)" }} className="mb-2">
                        No analysis yet.
                    </h2>
                    <p style={{ fontFamily: "'Geist', system-ui, sans-serif", fontSize: "14px", fontWeight: 300, color: "var(--muted-foreground)", opacity: 0.7 }} className="mb-7 max-w-sm mx-auto">
                        You haven&apos;t uploaded any conversations for analysis. Start your first analysis to decode the tone.
                    </p>
                    <div className="relative z-10">
                        <UploadConversationLink />
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {conversations.map((conv) => (
                        <Link key={conv.id} href={`/conversations/${conv.id}`} className="group block h-full">
                            <div className="flex flex-col h-full rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 relative overflow-hidden group-hover:border-[var(--border)]" style={{ background: "color-mix(in oklch, var(--card) 40%, transparent)", border: "1px solid color-mix(in oklch, var(--border) 60%, transparent)", backdropFilter: "blur(16px)" }}>
                                <div className="absolute inset-0 pointer-events-none opacity-[0.035]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />
                                
                                <div className="relative z-10 flex items-center justify-between mb-5">
                                    <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--muted-foreground)", opacity: 0.6 }} className="flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--primary)" }} />
                                        paste
                                    </div>
                                    {conv.status === "completed" && conv.report?.healthScore !== undefined ? (
                                        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px", letterSpacing: "0.10em", textTransform: "uppercase", padding: "2px 8px", borderRadius: "9999px", background: conv.report.healthScore >= 75 ? "color-mix(in oklch, oklch(0.58 0.13 155.00) 12%, transparent)" : conv.report.healthScore >= 50 ? "color-mix(in oklch, var(--primary) 10%, transparent)" : "color-mix(in oklch, var(--destructive) 12%, transparent)", color: conv.report.healthScore >= 75 ? "oklch(0.58 0.13 155.00)" : conv.report.healthScore >= 50 ? "var(--primary)" : "var(--destructive)", border: "1px solid color-mix(in oklch, currentColor 20%, transparent)" }}>
                                            Score: {conv.report.healthScore}
                                        </div>
                                    ) : conv.status === "failed" ? (
                                        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px", letterSpacing: "0.10em", textTransform: "uppercase", padding: "2px 8px", borderRadius: "9999px", background: "color-mix(in oklch, var(--destructive) 12%, transparent)", color: "var(--destructive)", border: "1px solid color-mix(in oklch, currentColor 20%, transparent)" }} className="flex items-center gap-1.5">
                                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                            Failed
                                        </div>
                                    ) : (
                                        <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "9px", letterSpacing: "0.10em", textTransform: "uppercase", padding: "2px 8px", borderRadius: "9999px", background: "color-mix(in oklch, var(--muted) 40%, transparent)", color: "var(--muted-foreground)", opacity: 0.7, border: "1px solid color-mix(in oklch, currentColor 20%, transparent)" }}>
                                            {conv.status === 'processing' ? 'Processing...' : 'Pending'}
                                        </div>
                                    )}
                                </div>

                                <h3 style={{ fontFamily: "'Geist', system-ui, sans-serif", fontSize: "16px", fontWeight: 500, color: "var(--foreground)", opacity: 0.95 }} className="mb-2.5 line-clamp-1 relative z-10">
                                    {conv.title || "Untitled Conversation"}
                                </h3>

                                <p style={{ fontFamily: "'Geist', system-ui, sans-serif", fontSize: "13.5px", fontWeight: 300, color: "var(--foreground)", opacity: 0.95, lineHeight: 1.6 }} className="line-clamp-3 mb-6 grow relative z-10">
                                    {conv.report?.toneSummary || conv.originalText}
                                </p>

                                <div className="flex items-center gap-5 pt-4 mt-auto relative z-10" style={{ borderTop: "1px solid color-mix(in oklch, var(--border) 60%, transparent)", color: "var(--foreground)", opacity: 0.95 }}>
                                    <div className="flex items-center gap-1.5" style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", letterSpacing: "0.05em" }}>
                                        <Clock className="w-3.5 h-3.5" />
                                        {new Date(conv.createdAt).toLocaleDateString()}
                                    </div>
                                    {conv.report?.sentimentScore !== undefined && conv.report?.sentimentScore !== null && (
                                        <div className="flex items-center gap-1.5" style={{ fontFamily: "'DM Mono', monospace", fontSize: "10px", letterSpacing: "0.05em" }}>
                                            <Activity className="w-3.5 h-3.5" />
                                            Sentiment: {(conv.report.sentimentScore * 100).toFixed(0)}
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