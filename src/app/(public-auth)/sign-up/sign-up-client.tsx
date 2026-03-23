// sign-up/sign-up-client.tsx
"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";

/*
  Typography system — mirrors sign-in exactly
  ─────────────────────────────────────────────
  Anchor display   → Instrument Serif (italic faded word — visual hierarchy trick)
  Eyebrow / labels → DM Mono 300 (monospaced contrast, ultra-light weight)
  Body / UI        → Geist 300–500 (clean, readable, pairs with both)

  Visual rhyming
  ──────────────
  · Amber eyebrow rule → same amber as CTA button and focus ring
  · Faded italic "account." → opacity trick rhymes with sign-in headline "back."
  · DM Mono field labels → same font as landing page eyebrows
  · Password strength bars → use same primary/success colors via CSS vars
*/

export default function SignUpClient() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
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
    const strengthColorVar = [
        "",
        "color-mix(in oklch, var(--destructive) 80%, transparent)",
        "color-mix(in oklch, var(--primary) 50%, var(--destructive) 30%)",
        "color-mix(in oklch, var(--primary) 70%, transparent)",
        "color-mix(in oklch, var(--primary) 100%, transparent)",
    ][strength];

    return (
        <div>
            <style>{`
                /* ── Fade-in stagger ── */
                @keyframes suc-up {
                    from { opacity: 0; transform: translateY(13px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                .suc-1 { animation: suc-up 0.48s ease both; }
                .suc-2 { animation: suc-up 0.48s 0.09s ease both; opacity: 0; }
                .suc-3 { animation: suc-up 0.48s 0.18s ease both; opacity: 0; }
                .suc-4 { animation: suc-up 0.48s 0.27s ease both; opacity: 0; }
                .suc-5 { animation: suc-up 0.48s 0.36s ease both; opacity: 0; }
                .suc-6 { animation: suc-up 0.48s 0.45s ease both; opacity: 0; }

                /* ── Headline — Instrument Serif anchor ── */
                .suc-headline {
                    font-family: 'Instrument Serif', Georgia, serif;
                    font-size: 2.625rem;
                    line-height: 1.06;
                    letter-spacing: -0.025em;
                    color: var(--foreground);
                    margin-bottom: 8px;
                    font-style: normal;
                }
                /* The faded italic word — opacity hierarchy trick */
                .suc-headline em {
                    font-style: italic;
                    color: var(--muted-foreground);
                    opacity: 0.32;
                }

                /* ── Subline — Geist light ── */
                .suc-subline {
                    font-family: 'Geist', system-ui, sans-serif;
                    font-size: 13.5px;
                    font-weight: 300;
                    line-height: 1.62;
                    color: var(--muted-foreground);
                    opacity: 0.72;
                    margin-bottom: 34px;
                }

                /* ── Field label — DM Mono, the detail that rhymes ── */
                .suc-label {
                    display: block;
                    font-family: 'DM Mono', monospace;
                    font-size: 10px;
                    font-weight: 300;
                    letter-spacing: 0.2em;
                    text-transform: uppercase;
                    color: var(--muted-foreground);
                    opacity: 0.55;
                    margin-bottom: 8px;
                }

                /* ── Input ── */
                .suc-input {
                    width: 100%;
                    height: 46px;
                    border-radius: 11px;
                    padding: 0 14px;
                    font-family: 'Geist', system-ui, sans-serif;
                    font-size: 14px;
                    font-weight: 400;
                    background: color-mix(in oklch, var(--muted) 45%, transparent);
                    border: 1px solid var(--border);
                    color: var(--foreground);
                    outline: none;
                    box-sizing: border-box;
                    transition: border-color 0.15s, box-shadow 0.15s;
                    -webkit-appearance: none;
                }
                .suc-input::placeholder {
                    color: var(--muted-foreground);
                    opacity: 0.38;
                    font-weight: 300;
                }
                .suc-input:focus {
                    border-color: color-mix(in oklch, var(--primary) 55%, transparent);
                    box-shadow: 0 0 0 3px color-mix(in oklch, var(--primary) 11%, transparent);
                }

                /* ── Password wrapper ── */
                .suc-pwd-wrap { position: relative; }
                .suc-pwd-wrap .suc-input { padding-right: 44px; }
                .suc-pwd-toggle {
                    position: absolute;
                    right: 14px;
                    top: 50%;
                    transform: translateY(-50%);
                    background: none;
                    border: none;
                    cursor: pointer;
                    color: var(--muted-foreground);
                    opacity: 0.4;
                    padding: 0;
                    display: flex;
                    align-items: center;
                    transition: opacity 0.15s;
                }
                .suc-pwd-toggle:hover { opacity: 0.85; }

                /* ── CTA button with shimmer ── */
                .suc-btn {
                    width: 100%;
                    height: 46px;
                    border-radius: 11px;
                    border: none;
                    cursor: pointer;
                    font-family: 'Geist', system-ui, sans-serif;
                    font-size: 14px;
                    font-weight: 500;
                    letter-spacing: 0.01em;
                    background: var(--primary);
                    color: var(--primary-foreground);
                    position: relative;
                    overflow: hidden;
                    transition: opacity 0.15s, transform 0.15s;
                }
                .suc-btn::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(105deg, transparent 32%, rgba(255,255,255,0.14) 50%, transparent 68%);
                    background-size: 200% 100%;
                    animation: suc-shimmer 3.5s ease-in-out infinite;
                }
                @keyframes suc-shimmer {
                    0%   { background-position: -200% center; }
                    100% { background-position:  200% center; }
                }
                .suc-btn:hover:not(:disabled) { opacity: 0.87; transform: translateY(-1px); }
                .suc-btn:active:not(:disabled) { transform: translateY(0); }
                .suc-btn:disabled { opacity: 0.5; cursor: not-allowed; }

                /* ── Divider with descending-dot motif ── */
                .suc-divider {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin: 28px 0 0;
                }
                .suc-divider-line {
                    flex: 1;
                    height: 1px;
                    background: var(--border);
                    opacity: 0.6;
                }
                .suc-divider-dots {
                    display: flex;
                    gap: 3px;
                    align-items: center;
                }
                .suc-divider-dots span {
                    display: inline-block;
                    border-radius: 50%;
                    background: color-mix(in oklch, var(--primary) 28%, transparent);
                }
                .suc-divider-dots span:nth-child(1) { width: 4px; height: 4px; }
                .suc-divider-dots span:nth-child(2) { width: 3px; height: 3px; opacity: 0.65; }
                .suc-divider-dots span:nth-child(3) { width: 2px; height: 2px; opacity: 0.35; }

                /* ── Sign in row ── */
                .suc-signin {
                    margin-top: 20px;
                    text-align: center;
                    font-family: 'Geist', system-ui, sans-serif;
                    font-size: 12px;
                    font-weight: 300;
                    color: var(--muted-foreground);
                    opacity: 0.58;
                }
                .suc-signin a {
                    color: var(--primary);
                    font-weight: 500;
                    opacity: 1;
                    text-decoration: none;
                }
                .suc-signin a:hover { text-decoration: underline; text-underline-offset: 2px; }

                /* ── Error ── */
                .suc-error {
                    margin-bottom: 18px;
                    padding: 10px 14px;
                    border-radius: 10px;
                    font-family: 'Geist', system-ui, sans-serif;
                    font-size: 13px;
                    font-weight: 400;
                    background: color-mix(in oklch, var(--destructive) 7%, transparent);
                    border: 1px solid color-mix(in oklch, var(--destructive) 22%, transparent);
                    color: var(--destructive);
                }

                /* ── Field spacing ── */
                .suc-field { margin-bottom: 18px; }

                /* ── Password strength ── */
                .suc-strength-bars {
                    display: flex;
                    gap: 4px;
                    margin-top: 8px;
                }
                .suc-strength-bar {
                    flex: 1;
                    height: 2px;
                    border-radius: 99px;
                    background: var(--border);
                    transition: background 0.3s ease;
                }
                .suc-strength-label {
                    font-family: 'DM Mono', monospace;
                    font-size: 10px;
                    font-weight: 300;
                    letter-spacing: 0.15em;
                    text-transform: uppercase;
                    color: var(--muted-foreground);
                    opacity: 0.5;
                    margin-top: 5px;
                }

                /* ── Terms ── */
                .suc-terms {
                    margin-top: 14px;
                    text-align: center;
                    font-family: 'Geist', system-ui, sans-serif;
                    font-size: 11px;
                    font-weight: 300;
                    line-height: 1.6;
                    color: var(--muted-foreground);
                    opacity: 0.45;
                }
                .suc-terms a {
                    color: var(--muted-foreground);
                    text-decoration: underline;
                    text-underline-offset: 2px;
                    opacity: 0.75;
                    transition: color 0.15s, opacity 0.15s;
                }
                .suc-terms a:hover {
                    color: var(--primary);
                    opacity: 1;
                }
            `}</style>

            {/* ── Headline — Instrument Serif ── */}
            <h1 className="suc-1 suc-headline justify-center items-center flex">
                Create your account.
            </h1>

            {/* ── Subline — Geist light ── */}
            <p className="suc-2 suc-subline justify-center items-center flex">
                Join us and start analyzing your conversations.
            </p>

            {/* ── Error ── */}
            {error && <div className="suc-error">{error}</div>}

            {/* ══════ SIGN-UP FORM ══════ */}
            <form onSubmit={handleSignUp}>

                {/* Full Name */}
                <div className="suc-3 suc-field">
                    <label className="suc-label" htmlFor="su-name">Full Name</label>
                    <input
                        id="su-name"
                        type="text"
                        className="suc-input"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        autoComplete="name"
                        required
                    />
                </div>

                {/* Email */}
                <div className="suc-3 suc-field">
                    <label className="suc-label" htmlFor="su-email">Email</label>
                    <input
                        id="su-email"
                        type="email"
                        className="suc-input"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                        required
                    />
                </div>

                {/* Password + strength meter */}
                <div className="suc-4 suc-field">
                    <label className="suc-label" htmlFor="su-password">Password</label>
                    <div className="suc-pwd-wrap">
                        <input
                            id="su-password"
                            type={showPassword ? "text" : "password"}
                            className="suc-input"
                            placeholder="Min. 8 characters"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="new-password"
                            required
                            minLength={8}
                        />
                        <button
                            type="button"
                            className="suc-pwd-toggle"
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={showPassword ? "Hide password" : "Show password"}
                        >
                            {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                        </button>
                    </div>

                    {/* Strength meter — only shows when typing */}
                    {password.length > 0 && (
                        <>
                            <div className="suc-strength-bars">
                                {[1, 2, 3, 4].map((i) => (
                                    <div
                                        key={i}
                                        className="suc-strength-bar"
                                        style={{
                                            background: i <= strength
                                                ? strengthColorVar
                                                : undefined,
                                        }}
                                    />
                                ))}
                            </div>
                            <p className="suc-strength-label">{strengthLabel}</p>
                        </>
                    )}
                </div>

                {/* Submit */}
                <div className="suc-5">
                    <button type="submit" className="suc-btn" disabled={loading}>
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none">
                                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="30 70" strokeLinecap="round" />
                                </svg>
                                Creating account…
                            </span>
                        ) : "Create Account"}
                    </button>
                </div>

                {/* Terms */}
                <p className="suc-5 suc-terms">
                    By signing up you agree to our{" "}
                    <Link href="/terms">Terms</Link>{" "}
                    and{" "}
                    <Link href="/privacy">Privacy Policy</Link>.
                </p>

                {/* Divider with dot motif */}
                <div className="suc-6 suc-divider">
                    <div className="suc-divider-line" />
                    <div className="suc-divider-dots">
                        <span /><span /><span />
                    </div>
                    <div className="suc-divider-line" />
                </div>

                <p className="suc-6 suc-signin">
                    Already have an account? <Link href="/sign-in">Sign in</Link>
                </p>

            </form>
        </div>
    );
}