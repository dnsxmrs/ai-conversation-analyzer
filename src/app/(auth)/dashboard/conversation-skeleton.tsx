import { Skeleton } from "@/components/ui/skeleton";

export default function ConversationSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
                <div key={i} className="flex flex-col h-full rounded-2xl p-6 transition-all relative overflow-hidden"       style={{ background: "color-mix(in oklch, var(--card) 40%, transparent)", border: "1px solid color-mix(in oklch, var(--border) 60%, transparent)", backdropFilter: "blur(16px)" }}>
                    <div className="absolute inset-0 pointer-events-none opacity-[0.035]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />
                    
                    <div className="relative z-10 flex items-center justify-between mb-5">
                        <div className="flex items-center gap-2">
                            <Skeleton className="w-4 h-4 rounded-full" />
                            <Skeleton className="w-12 h-3" />
                        </div>
                        <Skeleton className="w-20 h-5 rounded-full" />
                    </div>

                    <Skeleton className="w-3/4 h-6 mb-3 rounded-md" />

                    <div className="space-y-2 mb-6 grow relative z-10">
                        <Skeleton className="w-full h-4 rounded-md" />
                        <Skeleton className="w-full h-4 rounded-md" />
                        <Skeleton className="w-2/3 h-4 rounded-md" />
                    </div>

                    <div className="flex items-center gap-5 pt-5 mt-auto relative z-10" style={{ borderTop: "1px solid color-mix(in oklch, var(--border) 60%, transparent)" }}>
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
