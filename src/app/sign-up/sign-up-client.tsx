// sign-up/sign-up-client.tsx
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

export default function SignUpClient() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [rememberMe, setRememberMe] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const { error: signUpError } = await authClient.signUp.email({
            email,
            password,
            name,
        });

        if (!signUpError) {
            router.push("/dashboard");
            router.refresh();
        } else {
            setError(signUpError.message || "Failed to create account");
        }
        setLoading(false);
    };

    // Password strength indicator
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

    return (
        <div className="mx-auto w-full max-w-sm">

            {/* ── Header — typography hierarchy via opacity ── */}
            <div className="mb-10">
                <p className="font-mono text-[10px] tracking-[0.3em] text-indigo-400/60 uppercase mb-3">
                    Get Started
                </p>
                <h2 className="text-4xl font-bold tracking-tight text-white leading-[1.1] mb-3">
                    Create your<br />
                    <span className="text-white/30">account.</span>
                </h2>
                <p className="text-sm text-white/40 leading-relaxed">
                    Join thousands of teams analyzing their conversations.
                </p>
            </div>

            {/* Error state */}
            {error && (
                <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium">
                    {error}
                </div>
            )}

            <form onSubmit={handleSignUp} className="space-y-5">

                {/* Full Name */}
                <div className="space-y-2">
                    <Label htmlFor="name" className="text-[11px] font-mono text-white/30 uppercase tracking-widest">
                        Full Name
                    </Label>
                    <Input
                        id="name"
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="h-12 bg-white/[0.04] border-white/[0.08] hover:border-white/[0.15] focus:border-indigo-500/60 focus:ring-0 focus:ring-offset-0 rounded-xl px-4 text-white/80 placeholder:text-white/20 transition-colors text-sm"
                    />
                </div>

                {/* Email */}
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

                {/* Password + strength meter */}
                <div className="space-y-2">
                    <Label htmlFor="password" className="text-[11px] font-mono text-white/30 uppercase tracking-widest">
                        Password
                    </Label>
                    <div className="relative">
                        <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            placeholder="Min. 8 characters"
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            minLength={8}
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

                    {/* Strength meter — only shows when typing */}
                    {password.length > 0 && (
                        <div className="space-y-1.5 pt-1">
                            <div className="flex gap-1">
                                {[1, 2, 3, 4].map((i) => (
                                    <div
                                        key={i}
                                        className={`h-0.5 flex-1 rounded-full transition-all duration-300 ${i <= strength ? strengthColor : "bg-white/[0.06]"
                                            }`}
                                    />
                                ))}
                            </div>
                            <p className="text-[10px] font-mono text-white/20 tracking-wider">{strengthLabel}</p>
                        </div>
                    )}
                </div>

                {/* Remember me */}
                <div className="flex items-center gap-2">
                    <Checkbox
                        id="remember-reg"
                        checked={rememberMe}
                        onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                        className="border-white/20 data-[state=checked]:bg-indigo-500 data-[state=checked]:border-indigo-500 rounded-md w-4 h-4"
                    />
                    <Label htmlFor="remember-reg" className="text-xs text-white/30 cursor-pointer select-none hover:text-white/50 transition-colors">
                        Keep me signed in
                    </Label>
                </div>

                {/* Submit */}
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
                                Creating account...
                            </span>
                        ) : "Create Account"}
                    </Button>
                </div>

                {/* Terms — lowest hierarchy */}
                <p className="text-[11px] text-white/15 text-center leading-relaxed">
                    By signing up you agree to our{" "}
                    <Link href="/terms" className="text-white/25 hover:text-indigo-400/70 transition-colors underline underline-offset-2">
                        Terms
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="text-white/25 hover:text-indigo-400/70 transition-colors underline underline-offset-2">
                        Privacy Policy
                    </Link>.
                </p>
            </form>

            {/* Sign in link */}
            <div className="mt-8 pt-6 border-t border-white/[0.05] text-center">
                <p className="text-xs text-white/20">
                    Already have an account?{" "}
                    <Link href="/sign-in" className="text-indigo-400/70 hover:text-indigo-400 font-medium transition-colors">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    );
}