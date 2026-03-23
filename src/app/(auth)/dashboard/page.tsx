import { Suspense } from "react";
import { NewAnalysisLink } from "./dashboard-client";
import ConversationDisplay from "./conversation-display";
import ConversationSkeleton from "./conversation-skeleton";

export default async function DashboardPage() {
    return (
        <div className="container mx-auto px-4 py-10 max-w-7xl">
            {/* Header — rendered immediately, no async dependency */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
                <div className="flex flex-col gap-1.5">
                    <h1 style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontSize: "2.5rem", lineHeight: 1.06, letterSpacing: "-0.025em", color: "var(--foreground)" }}>
                        Your analysis <em style={{ fontStyle: "italic", color: "var(--muted-foreground)", opacity: 0.5 }}>history.</em>
                    </h1>
                    <p style={{ fontFamily: "'Geist', system-ui, sans-serif", fontSize: "14px", fontWeight: 300, color: "var(--muted-foreground)", opacity: 0.7 }}>
                        Review AI insights from your past communication patterns.
                    </p>
                </div>
                <NewAnalysisLink />
            </div>

            {/* Conversation grid — streams in once DB query resolves */}
            <Suspense fallback={<ConversationSkeleton />}>
                <ConversationDisplay />
            </Suspense>
        </div>
    );
}
