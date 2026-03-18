// sign-up/page.tsx
import Link from "next/link";
import SignUpClient from "./sign-up-client";

export default function SignUpPage() {
    return (
        <div className="flex min-h-screen overflow-hidden bg-[#0A0A0F] font-sans selection:bg-indigo-900/40">

            {/* ── Ambient background layers — visual rhyme with sign-in ── */}
            <div
                className="fixed inset-0 pointer-events-none z-0 opacity-[0.035] mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
                }}
            />
            <div className="fixed top-0 left-0 w-[600px] h-[600px] bg-violet-600 opacity-[0.04] blur-[140px] rounded-full -ml-64 -mt-32 pointer-events-none z-0" />
            <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-indigo-700 opacity-[0.03] blur-[120px] rounded-full -mr-32 -mb-32 pointer-events-none z-0" />
            <div
                className="fixed inset-0 pointer-events-none z-0 opacity-[0.025]"
                style={{
                    backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                }}
            />

            {/* ════════════════════════════════════════
                LEFT — Visual / Story panel
                (Flipped vs sign-in for variety)
            ════════════════════════════════════════ */}
            <div className="relative hidden flex-1 lg:flex flex-col items-center justify-center p-16 overflow-hidden z-10">

                <div className="relative w-full max-w-lg">

                    {/* Feature list card — star of the show */}
                    <div className="relative bg-white/[0.03] border border-white/[0.08] rounded-2xl p-8 backdrop-blur-xl shadow-[0_0_80px_rgba(99,102,241,0.08)]">

                        <div className="absolute top-4 right-4 font-mono text-[9px] text-white/10 tracking-[0.4em] uppercase">Features</div>

                        {/* Header */}
                        <div className="mb-8">
                            <p className="font-mono text-[10px] tracking-[0.3em] text-indigo-400/60 uppercase mb-3">What you get</p>
                            <h3 className="text-2xl font-bold text-white leading-tight">
                                Unlock deeper<br />
                                <span className="text-white/30">conversation insights.</span>
                            </h3>
                        </div>

                        {/* Feature list — visual rhyme: rounded-lg icon boxes */}
                        <div className="space-y-5">
                            {[
                                {
                                    icon: (
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                    ),
                                    title: "Pattern Recognition",
                                    desc: "Detect recurring themes and blockers across hundreds of conversations.",
                                },
                                {
                                    icon: (
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    ),
                                    title: "Real-time Analysis",
                                    desc: "Get insights as conversations happen, not hours later.",
                                },
                                {
                                    icon: (
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    ),
                                    title: "Team Intelligence",
                                    desc: "Understand how your team communicates and where friction hides.",
                                },
                            ].map((feature, i) => (
                                <div key={i} className="flex gap-4 items-start">
                                    {/* Icon box — rhymes with logo mark shape */}
                                    <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/20 flex items-center justify-center text-indigo-400 flex-shrink-0 mt-0.5">
                                        {feature.icon}
                                    </div>
                                    <div>
                                        {/* Hierarchy: title 60%, desc 30% */}
                                        <p className="text-white/60 text-sm font-semibold mb-0.5">{feature.title}</p>
                                        <p className="text-white/25 text-xs leading-relaxed">{feature.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Divider + testimonial */}
                        <div className="border-t border-white/[0.06] mt-8 pt-6">
                            <blockquote>
                                <p className="text-white/40 text-sm leading-relaxed italic mb-4">
                                    &quot;We caught a toxic communication pattern before it ruined the client relationship.&quot;
                                </p>
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center font-mono text-xs text-white/30 font-bold">
                                        JD
                                    </div>
                                    <div>
                                        <p className="text-white/50 text-xs font-semibold">James Doe</p>
                                        <p className="text-white/20 text-xs">Head of Sales</p>
                                    </div>
                                </div>
                            </blockquote>
                        </div>
                    </div>

                    {/* Floating stat cards — asymmetric, same pattern as sign-in */}
                    <div className="absolute -bottom-5 -right-6 bg-[#0A0A0F] border border-white/[0.08] rounded-xl px-5 py-3 backdrop-blur-xl shadow-xl">
                        <p className="font-mono text-[9px] text-indigo-400/70 uppercase tracking-widest mb-1">Free to start</p>
                        <p className="text-white/50 text-xl font-bold tracking-tight">$0 / mo</p>
                    </div>

                    <div className="absolute -top-5 -left-4 bg-[#0A0A0F] border border-white/[0.08] rounded-xl px-5 py-3 backdrop-blur-xl shadow-xl">
                        <p className="font-mono text-[9px] text-indigo-400/70 uppercase tracking-widest mb-1">Teams onboarded</p>
                        <p className="text-white/50 text-xl font-bold tracking-tight">1,200+</p>
                    </div>
                </div>

                {/* Ambient glow */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-[400px] h-[300px] bg-indigo-600/10 blur-[100px] rounded-full" />
                </div>
            </div>

            {/* ════════════════════════════════════════
                RIGHT — Form panel
            ════════════════════════════════════════ */}
            <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 lg:flex-none lg:w-[480px] xl:w-[520px] z-10 relative">

                <div className="absolute inset-y-0 inset-x-0 bg-white/[0.02] border-l border-white/[0.06] backdrop-blur-2xl" />

                {/* Logo */}
                <div className="absolute top-8 right-8 z-10">
                    <Link href="/" className="flex items-center gap-2.5 group">
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
                    <SignUpClient />
                </div>

                <div className="absolute bottom-8 right-8 z-10">
                    <p className="font-mono text-[10px] text-white/10 tracking-[0.3em] uppercase">v.1.0 · Encrypted</p>
                </div>
            </div>
        </div>
    );
}