// sign-in-client.tsx
"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

type SignInClientProps = {
    callbackUrl?: string;
};

export default function SignInClient({ callbackUrl }: SignInClientProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [totpCode, setTotpCode] = useState("");
    const [step, setStep] = useState<"sign-in" | "2fa">("sign-in");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const redirectTo =
        callbackUrl && callbackUrl.startsWith("/") && !callbackUrl.startsWith("//")
            ? callbackUrl
            : "/dashboard";

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const { data, error: signInError } = await authClient.signIn.email({
            email,
            password,
            rememberMe,
        });

        if (signInError) {
            setError(signInError.message || "Failed to sign-in");
        } else if ((data as { twoFactorRedirect?: boolean } | null)?.twoFactorRedirect) {
            setStep("2fa");
        } else {
            router.push(redirectTo);
            router.refresh();
        }
        setLoading(false);
    };

    const handle2FA = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const { error } = await authClient.twoFactor.verifyTotp({
                code: totpCode,
            });

            if (error) {
                setError("Invalid 2FA code");
            } else {
                router.push(redirectTo);
                router.refresh();
            }
        } catch {
            setError("An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-auto w-full max-w-sm">

            {/* ── Header — Typography hierarchy via opacity ── */}
            <div className="mb-10">
                {/* Eyebrow label — lowest opacity, sets context */}
                <p className="font-mono text-[10px] tracking-[0.3em] text-indigo-400/60 uppercase mb-3">
                    {step === "sign-in" ? "Secure Access" : "Identity Verification"}
                </p>
                {/* Headline — highest contrast, anchor font */}
                <h2 className="text-4xl font-bold tracking-tight text-white leading-[1.1] mb-3">
                    {step === "sign-in" ? (
                        <>Welcome<br /><span className="text-white/30">back.</span></>
                    ) : (
                        <>Two-Factor<br /><span className="text-white/30">Check.</span></>
                    )}
                </h2>
                {/* Body — mid-opacity, supporting role */}
                <p className="text-sm text-white/40 leading-relaxed">
                    {step === "sign-in"
                        ? "Enter your credentials to access your workspace."
                        : "Enter the 6-digit code from your authenticator app."}
                </p>
            </div>

            {/* ── Error state ── */}
            {error && (
                <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium">
                    {error}
                </div>
            )}

            {step === "sign-in" ? (
                <form onSubmit={handleSignIn} className="space-y-5">

                    {/* Email field */}
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-[11px] font-mono text-white/30 uppercase tracking-widest">
                            Email
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="h-12 bg-white/[0.04] border-white/[0.08] hover:border-white/[0.15] focus:border-indigo-500/60 focus:ring-0 focus:ring-offset-0 rounded-xl px-4 text-white/80 placeholder:text-white/20 transition-colors text-sm"
                        />
                    </div>

                    {/* Password field */}
                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-[11px] font-mono text-white/30 uppercase tracking-widest">
                            Password
                        </Label>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                placeholder="••••••••"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="h-12 bg-white/[0.04] border-white/[0.08] hover:border-white/[0.15] focus:border-indigo-500/60 focus:ring-0 focus:ring-offset-0 rounded-xl px-4 pr-12 text-white/80 placeholder:text-white/20 transition-colors text-sm w-full"
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
                    </div>

                    {/* Remember me + forgot password row */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="remember"
                                checked={rememberMe}
                                onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                                className="border-white/20 data-[state=checked]:bg-indigo-500 data-[state=checked]:border-indigo-500 rounded-md w-4 h-4"
                            />
                            <Label htmlFor="remember" className="text-xs text-white/30 cursor-pointer select-none hover:text-white/50 transition-colors">
                                Remember me
                            </Label>
                        </div>
                        <Link href="/forgot-password" className="text-xs text-white/25 hover:text-indigo-400 transition-colors">
                            Forgot password?
                        </Link>
                    </div>

                    {/* Submit — star treatment, rhymes with logo accent color */}
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
                                    Signing in...
                                </span>
                            ) : "Sign In"}
                        </Button>
                    </div>
                </form>
            ) : (
                <form onSubmit={handle2FA} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="totp" className="text-[11px] font-mono text-white/30 uppercase tracking-widest">
                            Auth Code
                        </Label>
                        <Input
                            id="totp"
                            type="text"
                            placeholder="000 000"
                            value={totpCode}
                            onChange={(e) => setTotpCode(e.target.value)}
                            required
                            maxLength={6}
                            className="h-16 text-center text-3xl tracking-[0.5em] font-mono bg-white/[0.04] border-white/[0.08] hover:border-white/[0.15] focus:border-indigo-500/60 focus:ring-0 rounded-xl text-white/80 placeholder:text-white/20 transition-colors"
                        />
                    </div>
                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full h-12 rounded-xl text-sm font-semibold bg-indigo-500 hover:bg-indigo-400 text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all duration-300 border-0"
                    >
                        {loading ? "Verifying..." : "Verify Code"}
                    </Button>
                </form>
            )}

            {/* Sign up link — lowest hierarchy, dimmest text */}
            {step === "sign-in" && (
                <div className="mt-8 pt-6 border-t border-white/[0.05] text-center">
                    <p className="text-xs text-white/20">
                        No account?{" "}
                        <Link href="/sign-up" className="text-indigo-400/70 hover:text-indigo-400 font-medium transition-colors">
                            Create one
                        </Link>
                    </p>
                </div>
            )}
        </div>
    );
}