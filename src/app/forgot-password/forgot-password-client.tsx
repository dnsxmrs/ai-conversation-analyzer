// forgot-password-client.tsx
"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { OTPInput, OTPInputContext } from "input-otp";
import React from "react";

type Step = "email" | "otp" | "reset" | "done";

export default function ForgotPasswordClient() {
    const [step, setStep] = useState<Step>("email");

    // email step
    const [email, setEmail] = useState("");

    // otp step
    const [otp, setOtp] = useState("");

    // reset step
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    /* ── Password strength ── */
    const getStrength = (pw: string) => {
        if (!pw) return 0;
        let score = 0;
        if (pw.length >= 8) score++;
        if (/[A-Z]/.test(pw)) score++;
        if (/[0-9]/.test(pw)) score++;
        if (/[^A-Za-z0-9]/.test(pw)) score++;
        return score;
    };
    const strength = getStrength(password);
    const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][strength];
    const strengthColor = ["", "bg-red-500/60", "bg-yellow-500/60", "bg-indigo-400/60", "bg-emerald-400/60"][strength];

    /* ── Step 1: Send OTP ── */
    const handleSendOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        const { error: err } = await authClient.emailOtp.requestPasswordReset({ email });
        setLoading(false);
        if (err) {
            setError(err.message || "Failed to send code. Please try again.");
        } else {
            setStep("otp");
        }
    };

    /* ── Step 2: Verify OTP ── */
    const handleVerifyOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        if (otp.length < 6) { setError("Please enter the full 6-digit code."); return; }
        setLoading(true);
        setError("");
        const { error: err } = await authClient.emailOtp.checkVerificationOtp({
            email,
            otp,
            type: "forget-password",
        });
        setLoading(false);
        if (err) {
            setError(err.message || "Invalid or expired code.");
        } else {
            setStep("reset");
        }
    };

    /* ── Step 3: Reset password ── */
    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) { setError("Passwords do not match."); return; }
        if (strength < 2) { setError("Please choose a stronger password."); return; }
        setLoading(true);
        setError("");
        const { error: err } = await authClient.emailOtp.resetPassword({
            email,
            otp,
            password,
        });
        setLoading(false);
        if (err) {
            setError(err.message || "Failed to reset password.");
        } else {
            setStep("done");
            setTimeout(() => { router.push("/sign-in"); router.refresh(); }, 2500);
        }
    };

    /* ── Step labels ── */
    const stepMeta: Record<Step, { eyebrow: string; headline: React.ReactNode; sub: string }> = {
        email: {
            eyebrow: "Account Recovery",
            headline: <>Reset your<br /><span className="text-white/30">password.</span></>,
            sub: "Enter your email and we'll send you a 6-digit code.",
        },
        otp: {
            eyebrow: "Verification",
            headline: <>Check your<br /><span className="text-white/30">inbox.</span></>,
            sub: `We sent a 6-digit code to ${email}.`,
        },
        reset: {
            eyebrow: "New Password",
            headline: <>Choose a new<br /><span className="text-white/30">password.</span></>,
            sub: "Make it strong — at least 8 characters.",
        },
        done: {
            eyebrow: "All Done",
            headline: <>Password<br /><span className="text-white/30">updated.</span></>,
            sub: "Redirecting you to sign in…",
        },
    };

    const meta = stepMeta[step];

    return (
        <div className="mx-auto w-full max-w-sm">

            {/* ── Step progress dots ── */}
            <div className="flex gap-1.5 mb-8">
                {(["email", "otp", "reset"] as const).map((s, i) => (
                    <div
                        key={s}
                        className={`h-0.5 rounded-full transition-all duration-500 ${
                            i === 0 ? "flex-2" : "flex-1"
                        } ${
                            step === "done" || (step === "reset" && i <= 2) || (step === "otp" && i <= 1) || (step === "email" && i === 0)
                                ? "bg-indigo-500/70"
                                : "bg-white/10"
                        }`}
                    />
                ))}
            </div>

            {/* ── Header ── */}
            <div className="mb-10">
                <p className="font-mono text-[10px] tracking-[0.3em] text-indigo-400/60 uppercase mb-3">
                    {meta.eyebrow}
                </p>
                <h2 className="text-4xl font-bold tracking-tight text-white leading-[1.1] mb-3">
                    {meta.headline}
                </h2>
                <p className="text-sm text-white/40 leading-relaxed">{meta.sub}</p>
            </div>

            {/* ── Error ── */}
            {error && (
                <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium">
                    {error}
                </div>
            )}

            {/* ════════════════ STEP 1: Email ════════════════ */}
            {step === "email" && (
                <form onSubmit={handleSendOtp} className="space-y-5">
                    <div className="space-y-2">
                        <Label htmlFor="fp-email" className="text-[11px] font-mono text-white/30 uppercase tracking-widest">
                            Email Address
                        </Label>
                        <Input
                            id="fp-email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoFocus
                            className="h-12 bg-white/4 border-white/8 hover:border-white/15 focus:border-indigo-500/60 focus:ring-0 focus:ring-offset-0 rounded-xl px-4 text-white/80 placeholder:text-white/20 transition-colors text-sm"
                        />
                    </div>
                    <div className="pt-2">
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full h-12 rounded-xl text-sm font-semibold bg-indigo-500 hover:bg-indigo-400 text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all duration-300 border-0"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="30 70" strokeLinecap="round" />
                                    </svg>
                                    Sending code…
                                </span>
                            ) : "Send Code"}
                        </Button>
                    </div>
                </form>
            )}

            {/* ════════════════ STEP 2: OTP ════════════════ */}
            {step === "otp" && (
                <form onSubmit={handleVerifyOtp} className="space-y-6">
                    <div className="space-y-3">
                        <Label className="text-[11px] font-mono text-white/30 uppercase tracking-widest">
                            6-Digit Code
                        </Label>

                        {/* OTP Input — styled to match sign-in 2FA */}
                        <OTPInput
                            maxLength={6}
                            value={otp}
                            onChange={setOtp}
                            containerClassName="flex gap-2 justify-between"
                            render={({ slots }) => (
                                <OTPInputContext.Consumer>
                                    {() => (
                                        <>
                                            {slots.map((slot, i) => (
                                                <div
                                                    key={i}
                                                    className={`relative w-12 h-14 rounded-xl border text-center flex items-center justify-center text-xl font-mono font-bold text-white/80 transition-all duration-200
                                                        ${slot.isActive
                                                            ? "border-indigo-500/60 bg-indigo-500/[0.07] shadow-lg shadow-indigo-500/10"
                                                            : slot.char
                                                                ? "border-white/15 bg-white/4"
                                                                : "border-white/8 bg-white/4"
                                                        }`}
                                                >
                                                    {slot.char ?? (
                                                        <span className="text-white/15 text-lg">·</span>
                                                    )}
                                                    {slot.hasFakeCaret && (
                                                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                                            <div className="w-px h-5 bg-indigo-400 animate-pulse" />
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                        </>
                                    )}
                                </OTPInputContext.Consumer>
                            )}
                        />
                    </div>

                    <div className="pt-1">
                        <Button
                            type="submit"
                            disabled={loading || otp.length < 6}
                            className="w-full h-12 rounded-xl text-sm font-semibold bg-indigo-500 hover:bg-indigo-400 disabled:opacity-40 text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all duration-300 border-0"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="30 70" strokeLinecap="round" />
                                    </svg>
                                    Verifying…
                                </span>
                            ) : "Verify Code"}
                        </Button>
                    </div>

                    {/* Resend */}
                    <p className="text-xs text-white/20 text-center">
                        Didn&#39;t get it?{" "}
                        <button
                            type="button"
                            onClick={() => { setOtp(""); setError(""); setStep("email"); }}
                            className="text-indigo-400/70 hover:text-indigo-400 font-medium transition-colors"
                        >
                            Resend code
                        </button>
                    </p>
                </form>
            )}

            {/* ════════════════ STEP 3: New password ════════════════ */}
            {step === "reset" && (
                <form onSubmit={handleReset} className="space-y-5">

                    {/* New password */}
                    <div className="space-y-2">
                        <Label htmlFor="fp-password" className="text-[11px] font-mono text-white/30 uppercase tracking-widest">
                            New Password
                        </Label>
                        <div className="relative">
                            <Input
                                id="fp-password"
                                type={showPassword ? "text" : "password"}
                                placeholder="Min. 8 characters"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={8}
                                autoFocus
                                className="h-12 bg-white/4 border-white/8 hover:border-white/15 focus:border-indigo-500/60 focus:ring-0 focus:ring-offset-0 rounded-xl px-4 pr-12 text-white/80 placeholder:text-white/20 transition-colors text-sm w-full"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/50 focus:outline-none transition-colors"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                        {/* Strength meter */}
                        {password.length > 0 && (
                            <div className="space-y-1.5 pt-1">
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div
                                            key={i}
                                            className={`h-0.5 flex-1 rounded-full transition-all duration-300 ${i <= strength ? strengthColor : "bg-white/6"}`}
                                        />
                                    ))}
                                </div>
                                <p className="text-[10px] font-mono text-white/20 tracking-wider">{strengthLabel}</p>
                            </div>
                        )}
                    </div>

                    {/* Confirm password */}
                    <div className="space-y-2">
                        <Label htmlFor="fp-confirm" className="text-[11px] font-mono text-white/30 uppercase tracking-widest">
                            Confirm Password
                        </Label>
                        <div className="relative">
                            <Input
                                id="fp-confirm"
                                type={showConfirm ? "text" : "password"}
                                placeholder="Repeat your password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="h-12 bg-white/4 border-white/8 hover:border-white/15 focus:border-indigo-500/60 focus:ring-0 focus:ring-offset-0 rounded-xl px-4 pr-12 text-white/80 placeholder:text-white/20 transition-colors text-sm w-full"
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirm(!showConfirm)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white/50 focus:outline-none transition-colors"
                                aria-label={showConfirm ? "Hide password" : "Show password"}
                            >
                                {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                        </div>
                        {/* Match indicator */}
                        {confirmPassword.length > 0 && (
                            <p className={`text-[10px] font-mono tracking-wider ${password === confirmPassword ? "text-emerald-400/60" : "text-red-400/60"}`}>
                                {password === confirmPassword ? "Passwords match" : "Does not match"}
                            </p>
                        )}
                    </div>

                    <div className="pt-2">
                        <Button
                            type="submit"
                            disabled={loading}
                            className="w-full h-12 rounded-xl text-sm font-semibold bg-indigo-500 hover:bg-indigo-400 text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all duration-300 border-0"
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="30 70" strokeLinecap="round" />
                                    </svg>
                                    Updating…
                                </span>
                            ) : "Set New Password"}
                        </Button>
                    </div>
                </form>
            )}

            {/* ════════════════ STEP 4: Done ════════════════ */}
            {step === "done" && (
                <div className="p-5 rounded-xl bg-emerald-500/[0.07] border border-emerald-500/20">
                    <div className="flex gap-3 items-start">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/20 flex items-center justify-center shrink-0 mt-0.5">
                            <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <div>
                            <p className="text-white/60 text-sm font-semibold mb-0.5">Password updated!</p>
                            <p className="text-white/25 text-xs leading-relaxed">
                                Taking you to sign in…
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* ── Back to sign in ── */}
            {step !== "done" && (
                <div className="mt-8 pt-6 border-t border-white/5 text-center">
                    <p className="text-xs text-white/20">
                        Remember your password?{" "}
                        <Link href="/sign-in" className="text-indigo-400/70 hover:text-indigo-400 font-medium transition-colors">
                            Sign in
                        </Link>
                    </p>
                </div>
            )}
        </div>
    );
}
