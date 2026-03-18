// forgot-password/page.tsx
import Link from "next/link";
import ForgotPasswordClient from "./forgot-password-client";

export default function ForgotPasswordPage() {
    return (
        <div className="flex min-h-screen overflow-hidden bg-[#0A0A0F] font-sans selection:bg-indigo-900/40 lg:flex-row-reverse">

            {/* ── Ambient background layers — visual rhyme with sign-in ── */}
            {/* Noise grain */}
            <div
                className="fixed inset-0 pointer-events-none z-0 opacity-[0.035] mix-blend-overlay"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")`,
                }}
            />
            {/* Ambient glows */}
            <div className="fixed top-0 right-0 w-[600px] h-[600px] bg-indigo-600 opacity-[0.04] blur-[140px] rounded-full -mr-64 -mt-32 pointer-events-none z-0" />
            <div className="fixed bottom-0 left-0 w-[500px] h-[500px] bg-violet-700 opacity-[0.03] blur-[120px] rounded-full -ml-32 -mb-32 pointer-events-none z-0" />

            {/* Fine grid */}
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
                <div className="absolute inset-y-0 inset-x-0 bg-white/2 border-l border-white/6 backdrop-blur-2xl" />

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
                    <ForgotPasswordClient />
                </div>

                {/* Bottom decoration */}
                <div className="absolute bottom-8 right-8 z-10">
                    <p className="font-mono text-[10px] text-white/10 tracking-[0.3em] uppercase">v.1.0 · Secure Recovery</p>
                </div>
            </div>

            {/* ════════════════════════════════════════
                LEFT — Visual / Story panel
            ════════════════════════════════════════ */}
            <div className="relative hidden flex-1 lg:flex flex-col items-center justify-center p-16 overflow-hidden z-10">

                {/* ── Star: Password recovery steps visualization ── */}
                <div className="relative w-full max-w-lg">

                    {/* Main card */}
                    <div className="relative bg-white/3 border border-white/8 rounded-2xl p-8 backdrop-blur-xl shadow-[0_0_80px_rgba(99,102,241,0.08)]">

                        {/* Corner badge */}
                        <div className="absolute top-4 right-4 font-mono text-[9px] text-white/10 tracking-[0.4em] uppercase">Recovery</div>

                        {/* Header */}
                        <div className="mb-8">
                            <p className="font-mono text-[10px] tracking-[0.3em] text-indigo-400/60 uppercase mb-3">How it works</p>
                            <h3 className="text-2xl font-bold text-white leading-tight">
                                Back in your<br />
                                <span className="text-white/30">workspace, fast.</span>
                            </h3>
                        </div>

                        {/* Steps */}
                        <div className="space-y-6">
                            {[
                                {
                                    step: "01",
                                    title: "Enter your email",
                                    desc: "Provide the address associated with your account.",
                                    done: true,
                                },
                                {
                                    step: "02",
                                    title: "Check your inbox",
                                    desc: "We'll send a secure, time-limited reset link within seconds.",
                                    done: false,
                                },
                                {
                                    step: "03",
                                    title: "Set a new password",
                                    desc: "Click the link and choose a strong new password to regain access.",
                                    done: false,
                                },
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4 items-start">
                                    {/* Step number — rhymes with logo mark shape */}
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 font-mono text-[11px] font-bold tracking-wider border transition-colors
                                        ${item.done
                                            ? "bg-indigo-500/20 border-indigo-500/30 text-indigo-400"
                                            : "bg-white/4 border-white/8 text-white/20"
                                        }`}>
                                        {item.step}
                                    </div>
                                    <div>
                                        <p className={`text-sm font-semibold mb-0.5 ${item.done ? "text-white/60" : "text-white/25"}`}>
                                            {item.title}
                                        </p>
                                        <p className="text-white/20 text-xs leading-relaxed">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Divider + security note */}
                        <div className="border-t border-white/6 mt-8 pt-6">
                            <div className="flex gap-3 items-start">
                                <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
                                    <svg className="w-4 h-4 text-emerald-400/70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <div>
                                    <p className="text-white/40 text-xs font-semibold mb-0.5">End-to-end secure</p>
                                    <p className="text-white/20 text-xs leading-relaxed">
                                        Reset links are single-use and expire after 1 hour for your protection.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Floating stat cards */}
                    <div className="absolute -bottom-5 -left-6 bg-[#0A0A0F] border border-white/8 rounded-xl px-5 py-3 backdrop-blur-xl shadow-xl">
                        <p className="font-mono text-[9px] text-indigo-400/70 uppercase tracking-widest mb-1">Link expires in</p>
                        <p className="text-white/50 text-xl font-bold tracking-tight">1 hour</p>
                    </div>

                    <div className="absolute -top-5 -right-4 bg-[#0A0A0F] border border-white/8 rounded-xl px-5 py-3 backdrop-blur-xl shadow-xl">
                        <p className="font-mono text-[9px] text-indigo-400/70 uppercase tracking-widest mb-1">Single-use</p>
                        <p className="text-white/50 text-xl font-bold tracking-tight">Secure</p>
                    </div>
                </div>

                {/* Ambient glow */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-[400px] h-[300px] bg-indigo-600/10 blur-[100px] rounded-full" />
                </div>
            </div>
        </div>
    );
}