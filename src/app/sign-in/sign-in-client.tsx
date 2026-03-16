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
import { signInAction } from "@/app/_actions/auth";

export default function SignInClient() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [totpCode, setTotpCode] = useState("");
    const [step, setStep] = useState<"sign-in" | "2fa">("sign-in");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const res = await signInAction({
            email,
            password,
            rememberMe,
        });

        if (res.success) {
            const data = res.data as { twoFactorRedirect?: boolean };
            if (data?.twoFactorRedirect) {
                setStep("2fa");
            } else {
                router.push("/dashboard");
                router.refresh();
            }
        } else {
            setError(res.error || "Failed to sign-in");
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
                router.push("/dashboard");
            }
        } catch {
            setError("An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="mx-auto w-full max-w-sm mt-12 lg:mt-0">
            <div className="mb-10 text-left">
                <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                    {step === "sign-in" ? "Welcome back" : "Two-Factor Verification"}
                </h2>
                <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                    {step === "sign-in"
                        ? "Enter your email and password to access your account."
                        : "Enter the 6-digit code from your authenticator app."}
                </p>
            </div>

            {error && (
                <div className="mb-6 p-4 rounded-xl bg-red-50/80 border border-red-100 dark:border-red-900/50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm font-medium">
                    {error}
                </div>
            )}

            {step === "sign-in" ? (
                <form onSubmit={handleSignIn} className="space-y-5 relative">
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-zinc-700 dark:text-zinc-300">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="h-12 bg-white/50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 focus:ring-indigo-500 rounded-xl px-4 transition-all"
                        />
                    </div>
                    <div className="space-y-2">
                        <div className="flex items-center justify-between">
                            <Label htmlFor="password" className="text-zinc-700 dark:text-zinc-300">Password</Label>
                        </div>
                        <div className="relative">
                            <Input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                value={password}
                                placeholder="••••••••"
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="h-12 bg-white/50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 focus:ring-indigo-500 rounded-xl px-4 pr-12 transition-all w-full"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 focus:outline-none transition-colors"
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? (
                                    <EyeOff className="w-5 h-5" />
                                ) : (
                                    <Eye className="w-5 h-5" />
                                )}
                            </button>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="remember"
                            checked={rememberMe}
                            onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                            className="border-zinc-300 dark:border-zinc-700 data-[state=checked]:bg-zinc-900 dark:data-[state=checked]:bg-zinc-100 data-[state=checked]:border-zinc-900 dark:data-[state=checked]:border-zinc-100"
                        />
                        <Label
                            htmlFor="remember"
                            className="text-sm font-medium text-zinc-600 dark:text-zinc-400 cursor-pointer select-none"
                        >
                            Remember me
                        </Label>
                    </div>
                    <Button type="submit" className="w-full h-12 rounded-xl text-[15px] font-semibold bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white transition-all shadow-md mt-6" disabled={loading}>
                        {loading ? "Signing in..." : "Sign In"}
                    </Button>
                </form>
            ) : (
                <form onSubmit={handle2FA} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="totp" className="text-zinc-700 dark:text-zinc-300">Authentication Code</Label>
                        <Input
                            id="totp"
                            type="text"
                            placeholder="000 000"
                            value={totpCode}
                            onChange={(e) => setTotpCode(e.target.value)}
                            required
                            maxLength={6}
                            className="h-14 text-center text-2xl tracking-[0.5em] font-mono bg-white/50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 focus:ring-indigo-500 rounded-xl"
                        />
                    </div>
                    <Button type="submit" className="w-full h-12 rounded-xl text-[15px] font-semibold bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white transition-all shadow-md" disabled={loading}>
                        {loading ? "Verifying..." : "Verify Code"}
                    </Button>
                </form> 
            )}

            {step === "sign-in" && (
                <div className="mt-8 pt-8 text-sm text-center lg:text-left text-zinc-600 dark:text-zinc-400 border-t border-zinc-200 dark:border-zinc-800/50">
                    Don&apos;t have an account?{" "}
                    <Link href="/register" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 font-semibold transition-colors">
                        Sign up
                    </Link>
                </div>
            )}
        </div>
    )
}