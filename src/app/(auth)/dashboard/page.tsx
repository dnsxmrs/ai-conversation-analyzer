import { Suspense } from "react";
import { NewAnalysisLink } from "./dashboard-client";
import ConversationDisplay from "./conversation-display";
import ConversationSkeleton from "./conversation-skeleton";

export default async function DashboardPage() {
    return (
        <div className="container mx-auto px-4 py-10 max-w-7xl">
            {/* Header — rendered immediately, no async dependency */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10 gap-4">
                <div>
                    <h1 className="text-2xl sm:text-[28px] font-semibold tracking-tight text-neutral-900 dark:text-white mb-1.5">
                        Your Conversations
                    </h1>
                    <p className="text-neutral-500 text-[15px] font-light">
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
