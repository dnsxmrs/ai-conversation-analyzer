import { MessageSquare, ArrowLeft, AlertTriangle, ShieldAlert, HeartPulse, Activity } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { getConversationDetails } from "@/app/_actions/conversation";
import { notFound } from "next/navigation";

// The Page component automatically receives `params` in Next.js App Router
export default async function Show({ params }: { params: Promise<{ id: string }> }) {
    // Await params to get the id
    const { id: conversationId } = await params;

    // Fetch conversation details from the server using the new action
    const result = await getConversationDetails(conversationId);

    if (!result.success || !result.conversation) {
        notFound();
    }

    const { conversation } = result;
    const { messages, report } = conversation;

    // Determine color based on health score
    const getHealthColor = (score: number | undefined | null) => {
        if (!score) return 'text-neutral-500 bg-neutral-100';
        if (score > 75) return 'text-emerald-700 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-900/30';
        if (score > 45) return 'text-amber-700 bg-amber-100 dark:text-amber-400 dark:bg-amber-900/30';
        return 'text-rose-700 bg-rose-100 dark:text-rose-400 dark:bg-rose-900/30';
    };

    // Keep track of unique speakers to assign colors mentally
    const speakers = Array.from(new Set(messages.map((m) => m.speaker)));
    const getSpeakerColor = (speaker: string) => {
        const index = speakers.indexOf(speaker);
        const colors = [
            'bg-blue-100 text-blue-900 dark:bg-blue-900/20 dark:text-blue-100',
            'bg-violet-100 text-violet-900 dark:bg-violet-900/20 dark:text-violet-100',
            'bg-teal-100 text-teal-900 dark:bg-teal-900/20 dark:text-teal-100',
            'bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-slate-100',
        ];
        return colors[index % colors.length];
    };

    return (
        <div className="flex h-full flex-1 flex-col xl:flex-row gap-6 p-6">
            {/* Left Column: Chat History */}
            <div className="flex flex-col xl:w-7/12 rounded-xl border border-neutral-200 bg-white shadow-sm overflow-hidden dark:border-neutral-800 dark:bg-neutral-900">
                <div className="border-b border-neutral-100 p-4 shrink-0 dark:border-neutral-800 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <Link href="/dashboard" className="p-2 -ml-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors">
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <h2 className="text-xl font-semibold tracking-tight">Conversation Transcript</h2>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {messages.map((msg, idx) => {
                        const hasFlags = msg.flags && msg.flags.length > 0;
                        // Check previous message speaker to group messages
                        const isSameAsPrev = idx > 0 && messages[idx - 1].speaker === msg.speaker;

                        return (
                            <div key={msg.id} className={`flex flex-col ${isSameAsPrev ? 'mt-2' : 'mt-6'}`}>
                                {!isSameAsPrev && (
                                    <div className="flex items-center space-x-2 mb-1">
                                        <span className="text-sm font-semibold">{msg.speaker}</span>
                                    </div>
                                )}
                                <div className="flex">
                                    <div className={`
                                            relative max-w-[85%] rounded-2xl px-4 py-3 text-[15px] leading-relaxed
                                            ${getSpeakerColor(msg.speaker)}
                                            ${hasFlags ? 'ring-2 ring-rose-400 dark:ring-rose-500/50 ring-offset-2 dark:ring-offset-neutral-900' : ''}
                                        `}>
                                        <p className="whitespace-pre-wrap">{msg.content}</p>

                                        {/* Flag Tooltip / Badge */}
                                        {hasFlags && (
                                            <div className="mt-3 flex flex-col gap-2 border-t border-black/10 dark:border-white/10 pt-2">
                                                {msg.flags?.map((flag) => (
                                                    <div key={flag.id} className="flex items-start gap-2 text-rose-700 dark:text-rose-300">
                                                        <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                                                        <div>
                                                            <span className="font-semibold text-xs tracking-wide uppercase">{flag.flagType}</span>
                                                            <p className="text-sm mt-0.5 opacity-90">{flag.explanation}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Right Column: AI Analysis Report */}
            <div className="flex flex-col xl:w-5/12 gap-6 overflow-y-auto">
                {/* Top Level Scores */}
                <div className="grid grid-cols-2 gap-4">
                    <div className={`flex flex-col items-center justify-center p-6 rounded-xl border border-neutral-200 dark:border-neutral-800 ${getHealthColor(report?.healthScore)}`}>
                        <HeartPulse className="w-8 h-8 mb-2 opacity-80" />
                        <span className="text-4xl font-black tracking-tight">{report?.healthScore || 'N/A'}</span>
                        <span className="text-sm font-semibold uppercase tracking-wider mt-1 opacity-80">Health Score</span>
                    </div>
                    <div className="flex flex-col items-center justify-center p-6 rounded-xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900">
                        <Activity className="w-8 h-8 mb-2 text-indigo-500 opacity-80" />
                        <span className="text-4xl font-black tracking-tight">{report?.sentimentScore !== null && report?.sentimentScore !== undefined ? report.sentimentScore : 'N/A'}</span>
                        <span className="text-sm font-semibold text-neutral-500 uppercase tracking-wider mt-1">Sentiment</span>
                    </div>
                </div>

                {/* AI Summary */}
                <div className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900">
                    <h3 className="text-lg font-semibold border-b border-neutral-100 pb-3 mb-4 dark:border-neutral-800">
                        Executive Summary
                    </h3>
                    {report ? (
                        <div className="space-y-4">
                            <div>
                                <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1">Tone</h4>
                                <p className="text-neutral-900 dark:text-neutral-100 font-medium">{report.toneSummary}</p>
                            </div>
                            <div>
                                <h4 className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-1">Analysis</h4>
                                <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                                    {report.aiSummary}
                                </p>
                            </div>
                        </div>
                    ) : (
                        <p className="text-sm text-neutral-500">Analysis pending or unavailable.</p>
                    )}
                </div>

                {/* Signals & Patterns */}
                {report && (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-6">
                        {/* Emotional Signals */}
                        {report.emotionalSignals && report.emotionalSignals.length > 0 && (
                            <div className="rounded-xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">
                                <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 mb-3">Emotional Signals</h3>
                                <div className="flex flex-wrap gap-2">
                                    {/* The schema stores this as a single string, so we need to split it if it's meant to be an array in UI, or just show the string */}
                                    {report.emotionalSignals.split(',').map((signal, i) => (
                                        <span key={i} className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-800">
                                            {signal.trim()}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Communication Patterns */}
                        {report.communicationPatterns && report.communicationPatterns.length > 0 && (
                            <div className="rounded-xl border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900">
                                <h3 className="text-sm font-semibold uppercase tracking-wider text-neutral-500 mb-3">Communication Patterns</h3>
                                <ul className="space-y-2">
                                    {/* The schema stores this as a single string, splitting on newlines or commas for display */}
                                    {report.communicationPatterns.split(/,|\n/).map((pattern, i) => {
                                        if (!pattern.trim()) return null;
                                        return (
                                            <li key={i} className="flex items-start gap-2 text-sm text-neutral-700 dark:text-neutral-300">
                                                <div className="w-1.5 h-1.5 rounded-full bg-neutral-400 mt-1.5 shrink-0" />
                                                <span>{pattern.trim()}</span>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        )}

                        {/* Red Flags */}
                        {report.redFlags && report.redFlags.length > 0 && (
                            <div className="rounded-xl border border-rose-200 bg-rose-50/50 p-5 dark:border-rose-900/20 dark:bg-rose-950/20">
                                <div className="flex items-center gap-2 mb-3 text-rose-700 dark:text-rose-400">
                                    <ShieldAlert className="w-4 h-4" />
                                    <h3 className="text-sm font-semibold uppercase tracking-wider">Potential Red Flags</h3>
                                </div>
                                <ul className="space-y-2">
                                    {/* The schema stores this as a single string */}

                                            <li className="flex items-start gap-2 text-sm text-rose-800 dark:text-rose-300">
                                                <div className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                                                <span className="font-medium">{report.redFlags}</span>
                                            </li>

                                </ul>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
