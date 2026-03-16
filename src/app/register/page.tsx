"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import CanvasBackground from "@/components/CanvasBackground";
export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const { error: registerError } = await authClient.signUp.email({
                email,
                password,
                name,
            });

            if (registerError) {
                setError(registerError.message || "Failed to create account");
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
        <div className="flex min-h-screen overflow-hidden bg-zinc-50 dark:bg-black font-sans selection:bg-zinc-200 dark:selection:bg-zinc-800">
            {/* Left side: Form */}
            <div className="flex-1 flex flex-col justify-center px-4 sm:px-6 lg:flex-none lg:w-1/2 xl:w-5/12 z-10 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-3xl border-r border-zinc-200/50 dark:border-zinc-800/50 shadow-2xl relative">
                <div className="absolute top-8 left-8">
                    <Link href="/" className="text-xl font-bold tracking-tighter text-zinc-900 dark:text-white flex items-center gap-2">
                        <span className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-sm">Ai</span>
                        Conversation
                    </Link>
                </div>

                <div className="mx-auto w-full max-w-sm mt-12 lg:mt-0">
                    <div className="mb-10 text-left">
                        <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
                            Create an account
                        </h2>
                        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                            Enter your details below to get started analyzing conversations.
                        </p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 rounded-xl bg-red-50/80 border border-red-100 dark:border-red-900/50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-sm font-medium">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleRegister} className="space-y-5 relative">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-zinc-700 dark:text-zinc-300">Full Name</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="John Doe"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                className="h-12 bg-white/50 dark:bg-zinc-900/50 border-zinc-200 dark:border-zinc-800 focus:ring-indigo-500 rounded-xl px-4 transition-all"
                            />
                        </div>
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
                            <Label htmlFor="password" className="text-zinc-700 dark:text-zinc-300">Password</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    placeholder="••••••••"
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    minLength={8}
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
                        <Button type="submit" className="w-full h-12 rounded-xl text-[15px] font-semibold bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white transition-all shadow-md mt-6" disabled={loading}>
                            {loading ? "Creating account..." : "Sign Up"}
                        </Button>
                    </form>

                    <div className="mt-8 pt-8 text-sm text-center lg:text-left text-zinc-600 dark:text-zinc-400 border-t border-zinc-200 dark:border-zinc-800/50">
                        Already have an account?{" "}
                        <Link href="/login" className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 font-semibold transition-colors">
                            Sign in
                        </Link>
                    </div>
                </div>
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
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                    </div>
                    <h3 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white mb-6 leading-[1.4]">
                        &quot;We caught a toxic communication pattern before it ruined the client relationship.&quot;
                    </h3>
                    <div className="flex items-center justify-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center font-bold text-sm text-zinc-600 dark:text-zinc-300">
                            JD
                        </div>
                        <div className="text-left">
                            <p className="text-zinc-900 dark:text-white font-semibold text-sm">James Doe</p>
                            <p className="text-zinc-500 dark:text-zinc-400 text-xs font-medium">Head of Sales</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

