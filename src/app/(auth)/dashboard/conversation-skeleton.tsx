import { Skeleton } from "@/components/ui/skeleton";

export default function ConversationSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
                <div key={i} className="flex flex-col h-full rounded-[16px] border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-900/40">
                    <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-2">
                            <Skeleton className="w-4 h-4 rounded-full" />
                            <Skeleton className="w-12 h-3" />
                        </div>
                        <Skeleton className="w-20 h-5 rounded-full" />
                    </div>

                    <Skeleton className="w-3/4 h-6 mb-3 rounded-md" />

                    <div className="space-y-2 mb-6 grow">
                        <Skeleton className="w-full h-4 rounded-md" />
                        <Skeleton className="w-full h-4 rounded-md" />
                        <Skeleton className="w-2/3 h-4 rounded-md" />
                    </div>

                    <div className="flex items-center gap-5 pt-5 border-t border-neutral-50 dark:border-neutral-800 mt-auto">
                        <div className="flex items-center gap-2">
                            <Skeleton className="w-4 h-4 rounded-full" />
                            <Skeleton className="w-20 h-3" />
                        </div>
                        <div className="flex items-center gap-2">
                            <Skeleton className="w-4 h-4 rounded-full" />
                            <Skeleton className="w-20 h-3" />
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
