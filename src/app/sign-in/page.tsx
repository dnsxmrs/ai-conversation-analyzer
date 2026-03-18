import Link from "next/link";
import CanvasBackground from "@/components/CanvasBackground";
import SignInClient from "./sign-in-client";

type SignInPageProps = {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function SignInPage({ searchParams }: SignInPageProps) {
    const params = await searchParams;
    const callbackParam = params.callbackUrl;
    const callbackUrl = Array.isArray(callbackParam) ? callbackParam[0] : callbackParam;

    return (
        <div className="flex min-h-screen overflow-hidden bg-zinc-50 dark:bg-black font-sans selection:bg-zinc-200 dark:selection:bg-zinc-800">
            {/* Left side: Form */}
            <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:flex-none lg:w-1/2 xl:w-5/12 z-10 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-3xl border-r border-zinc-200/50 dark:border-zinc-800/50 shadow-2xl relative">
                <div className="absolute top-8 left-8">
                    <Link href="/" className="text-xl font-bold tracking-tighter text-zinc-900 dark:text-white flex items-center gap-2">
                        <span className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-sm">Ai</span>
                        Conversation
                    </Link>
                </div>
                <SignInClient callbackUrl={callbackUrl} />
            </div>

            {/* Right side: Visuals */}
            <div className="relative hidden w-0 flex-1 lg:flex flex-col items-center justify-center p-12 overflow-hidden bg-zinc-100 dark:bg-black">
                <CanvasBackground />
                <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-[10%] left-[20%] w-[40%] h-[40%] rounded-full bg-emerald-500/10 blur-[120px]" />
                    <div className="absolute bottom-[10%] right-[20%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 blur-[120px]" />
                    <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[60%] h-[30%] rounded-full bg-rose-500/5 blur-[150px]" />
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60 dark:opacity-40" />
                </div>

                {/* Visual content over the background */}
                <div className="relative z-10 max-w-lg text-center backdrop-blur-xl bg-white/40 dark:bg-zinc-900/40 p-10 rounded-[2rem] border border-white/60 dark:border-zinc-800/60 shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-100/80 dark:bg-indigo-900/40 text-indigo-600 dark:text-indigo-400 mb-8 border border-white/50 dark:border-white/5">
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white mb-6 leading-[1.4]">
                        &quot;The AI analysis revealed hidden patterns in my team&apos;s communication that I completely missed.&quot;
                    </h3>
                    <div className="flex items-center justify-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center font-bold text-sm text-zinc-600 dark:text-zinc-300">
                            PM
                        </div>
                        <div className="text-left">
                            <p className="text-zinc-900 dark:text-white font-semibold text-sm">Sarah Jenkins</p>
                            <p className="text-zinc-500 dark:text-zinc-400 text-xs font-medium">Product Manager</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
