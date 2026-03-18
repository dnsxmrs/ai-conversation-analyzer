// sign-in/page.tsx
import Link from "next/link";
import SignInClient from "./sign-in-client";

type SignInPageProps = {
    searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function SignInPage({ searchParams }: SignInPageProps) {
    const params = await searchParams;
    const callbackParam = params.callbackUrl;
    const callbackUrl = Array.isArray(callbackParam) ? callbackParam[0] : callbackParam;

    return (
        <div className="flex min-h-screen overflow-hidden bg-[#0A0A0F] font-sans selection:bg-indigo-900/40 lg:flex-row-reverse">

            {/* ── Ambient background layers ── */}
            {/* Noise grain for depth — visual rhyme with the About component */}
            <div
                className="fixed inset-0 pointer-events-none z-0 opacity-[0.035] mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
                }}
            />
            {/* Ambient glows — visual rhyme */}
            <div className="fixed top-0 right-0 w-150 h-[600px] bg-indigo-600 opacity-[0.04] blur-[140px] rounded-full -mr-64 -mt-32 pointer-events-none z-0" />
            <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-violet-700 opacity-[0.03] blur-[120px] rounded-full -ml-32 -mb-32 pointer-events-none z-0" />

            {/* Fine grid — matches the About section atmosphere */}
            <div
                className="fixed inset-0 pointer-events-none z-0 opacity-[0.025]"
                style={{
                    backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                }}
            />

            {/* ════════════════════════════════════════
                RIGHT — Form panel
            ════════════════════════════════════════ */}
            <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 lg:flex-none lg:w-[480px] xl:w-[520px] z-10 relative">

                {/* Glassmorphic panel */}
                <div className="absolute inset-y-0 inset-x-0 bg-white/[0.02] border-l border-white/[0.06] backdrop-blur-2xl" />

                {/* Logo */}
                <div className="absolute top-8 right-8 z-10">
                    <Link href="/" className="flex items-center gap-2.5 group">
                        {/* Star of the show: the logo mark — rounded square shape that rhymes across the page */}
                        <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:shadow-indigo-500/50 transition-shadow duration-300">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3 5.5C3 4.4 3.9 3.5 5 3.5H11C12.1 3.5 13 4.4 13 5.5V8.5C13 9.6 12.1 10.5 11 10.5H9L7 12.5V10.5H5C3.9 10.5 3 9.6 3 8.5V5.5Z" fill="white" fillOpacity="0.9" />
                            </svg>
                        </div>
                        <span className="text-sm font-semibold tracking-tight text-white/80 group-hover:text-white transition-colors">
                            Conversation
                        </span>
                    </Link>
                </div>

                {/* Form */}
                <div className="relative z-10 mx-auto w-full max-w-sm">
                    <SignInClient callbackUrl={callbackUrl} />
                </div>

                {/* Bottom decoration — visual rhyme (same tiny tracking label as About) */}
                <div className="absolute bottom-8 right-8 z-10">
                    <p className="font-mono text-[10px] text-white/10 tracking-[0.3em] uppercase">v.1.0 · Secure Connection</p>
                </div>
            </div>

            {/* ════════════════════════════════════════
                LEFT — Visual / Story panel
            ════════════════════════════════════════ */}
            <div className="relative hidden flex-1 lg:flex flex-col items-center justify-center p-16 overflow-hidden z-10">

                {/* ── Star of the show: Conversation threads visualization ── */}
                {/* This connects to the product story — not just decoration */}
                <div className="relative w-full max-w-lg">

                    {/* Main card — glassmorphic, rhymes with logo shape (rounded-2xl) */}
                    <div className="relative bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8 backdrop-blur-xl shadow-[0_0_80px_rgba(99,102,241,0.08)]">

                        {/* Decorative corner label — visual rhyme with About's "v.1.0.23" */}
                        <div className="absolute top-4 right-4 font-mono text-[9px] text-white/10 tracking-[0.4em] uppercase">Thread #2847</div>

                        {/* Conversation thread — the "star" telling the product story */}
                        <div className="space-y-4 mb-8">
                            {/* User message */}
                            <div className="flex justify-end">
                                <div className="max-w-[80%] bg-indigo-500/20 border border-indigo-500/20 rounded-2xl rounded-tr-sm px-4 py-3">
                                    <p className="text-white/70 text-sm leading-relaxed">
                                        Can you analyze the communication patterns from last quarter&apos;s standups?
                                    </p>
                                </div>
                            </div>

                            {/* AI response — typing indicator fades to text */}
                            <div className="flex justify-start gap-2.5">
                                {/* Avatar rhymes with logo shape */}
                                <div className="w-7 h-7 rounded-lg bg-indigo-500/30 border border-indigo-400/20 flex-shrink-0 flex items-center justify-center mt-1">
                                    <div className="w-2 h-2 rounded-full bg-indigo-400" />
                                </div>
                                <div className="max-w-[80%] bg-white/[0.04] border border-white/[0.08] rounded-2xl rounded-tl-sm px-4 py-3">
                                    <p className="text-white/60 text-sm leading-relaxed">
                                        I found <span className="text-indigo-400 font-medium">3 recurring blockers</span> and a 40% drop in async updates by week 3 — here&apos;s what the data reveals...
                                    </p>
                                </div>
                            </div>

                            {/* Second user message */}
                            <div className="flex justify-end">
                                <div className="max-w-[80%] bg-indigo-500/20 border border-indigo-500/20 rounded-2xl rounded-tr-sm px-4 py-3">
                                    <p className="text-white/70 text-sm leading-relaxed">
                                        That&apos;s exactly what I was missing. Show me the timeline.
                                    </p>
                                </div>
                            </div>

                            {/* Typing indicator */}
                            <div className="flex justify-start gap-2.5">
                                <div className="w-7 h-7 rounded-lg bg-indigo-500/30 border border-indigo-400/20 flex-shrink-0 flex items-center justify-center mt-1">
                                    <div className="w-2 h-2 rounded-full bg-indigo-400" />
                                </div>
                                <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl rounded-tl-sm px-4 py-3 flex gap-1 items-center">
                                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400/60 animate-bounce [animation-delay:0ms]" />
                                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400/60 animate-bounce [animation-delay:150ms]" />
                                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400/60 animate-bounce [animation-delay:300ms]" />
                                </div>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="border-t border-white/[0.06] pt-6">
                            {/* Testimonial — hierarchy via opacity */}
                            <blockquote>
                                <p className="text-white/50 text-sm leading-relaxed italic mb-4">
                                    &quot;The AI analysis revealed hidden patterns in my team&apos;s communication that I completely missed.&quot;
                                </p>
                                <div className="flex items-center gap-3">
                                    {/* Avatar — rhymes with rounded-lg motif */}
                                    <div className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center font-mono text-xs text-white/40 font-bold">
                                        SJ
                                    </div>
                                    <div>
                                        {/* Hierarchy: name 60%, role 30% */}
                                        <p className="text-white/60 text-xs font-semibold">Sarah Jenkins</p>
                                        <p className="text-white/25 text-xs">Product Manager</p>
                                    </div>
                                </div>
                            </blockquote>
                        </div>
                    </div>

                    {/* Floating stat cards — asymmetric positioning, visual rhyme with About's caption card */}
                    <div className="absolute -bottom-5 -left-6 bg-[#0A0A0F] border border-white/[0.08] rounded-xl px-5 py-3 backdrop-blur-xl shadow-xl">
                        <p className="font-mono text-[9px] text-indigo-400/70 uppercase tracking-widest mb-1">Insights Generated</p>
                        <p className="text-white/50 text-xl font-bold tracking-tight">2,847</p>
                    </div>

                    <div className="absolute -top-5 -right-4 bg-[#0A0A0F] border border-white/[0.08] rounded-xl px-5 py-3 backdrop-blur-xl shadow-xl">
                        <p className="font-mono text-[9px] text-indigo-400/70 uppercase tracking-widest mb-1">Accuracy</p>
                        <p className="text-white/50 text-xl font-bold tracking-tight">94.2%</p>
                    </div>
                </div>

                {/* Ambient glow under star element */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-[400px] h-[300px] bg-indigo-600/10 blur-[100px] rounded-full" />
                </div>
            </div>
        </div>
    );
}