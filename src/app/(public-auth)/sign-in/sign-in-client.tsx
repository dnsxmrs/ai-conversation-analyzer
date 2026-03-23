// sign-in/sign-in-client.tsx
"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

type SignInClientProps = {
    callbackUrl?: string;
};

/*
  Typography system
  ─────────────────
  Anchor display   → Instrument Serif (italic for the faded word — visual hierarchy trick)
  Eyebrow / labels → DM Mono 300 (monospaced contrast, ultra-light weight)
  Body / UI        → Geist 300–500 (clean, readable, pairs with both)

  Visual rhyming
  ──────────────
  · Three vertical rules in logo → same motif as descending-size dots on divider
  · Amber eyebrow rule → same amber as CTA button and focus ring
  · Faded italic "back." / "verify." → opacity trick rhymes with landing headline "every line."
  · DM Mono field labels → same font as landing page eyebrows and meters
*/

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
        const { data, error: signInError } = await authClient.signIn.email({ email, password, rememberMe });
        if (signInError) {
            setError(signInError.message || "Failed to sign in");
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
            const { error } = await authClient.twoFactor.verifyTotp({ code: totpCode });
            if (error) setError("Invalid code. Please try again.");
            else { router.push(redirectTo); router.refresh(); }
        } catch {
            setError("An unexpected error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <style>{`
                /* ── Fade-in stagger ── */
                @keyframes sic-up {
                    from { opacity: 0; transform: translateY(13px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                .sic-1 { animation: sic-up 0.48s ease both; }
                .sic-2 { animation: sic-up 0.48s 0.09s ease both; opacity: 0; }
                .sic-3 { animation: sic-up 0.48s 0.18s ease both; opacity: 0; }
                .sic-4 { animation: sic-up 0.48s 0.27s ease both; opacity: 0; }
                .sic-5 { animation: sic-up 0.48s 0.36s ease both; opacity: 0; }

                /* ── Eyebrow row ── */
                .sic-eyebrow {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 13px;
                }
                .sic-eyebrow-rule {
                    display: inline-block;
                    width: 16px;
                    height: 1px;
                    background: color-mix(in oklch, var(--primary) 55%, transparent);
                    flex-shrink: 0;
                }
                .sic-eyebrow-text {
                    font-family: 'DM Mono', monospace;
                    font-size: 10px;
                    font-weight: 300;
                    letter-spacing: 0.24em;
                    text-transform: uppercase;
                    color: var(--primary);
                    opacity: 0.7;
                }

                /* ── Headline — Instrument Serif anchor ── */
                .sic-headline {
                    font-family: 'Instrument Serif', Georgia, serif;
                    font-size: 2.625rem;
                    line-height: 1.06;
                    letter-spacing: -0.025em;
                    color: var(--foreground);
                    margin-bottom: 8px;
                    font-style: normal;
                }
                /* The faded italic word — opacity hierarchy trick */
                .sic-headline em {
                    font-style: italic;
                    color: var(--muted-foreground);
                    opacity: 0.32;
                }

                /* ── Subline — Geist light ── */
                .sic-subline {
                    font-family: 'Geist', system-ui, sans-serif;
                    font-size: 13.5px;
                    font-weight: 300;
                    line-height: 1.62;
                    color: var(--muted-foreground);
                    opacity: 0.72;
                    margin-bottom: 34px;
                }

                /* ── Field label — DM Mono, the detail that rhymes ── */
                .sic-label {
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
                .sic-input {
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
                .sic-input::placeholder {
                    color: var(--muted-foreground);
                    opacity: 0.38;
                    font-weight: 300;
                }
                .sic-input:focus {
                    border-color: color-mix(in oklch, var(--primary) 55%, transparent);
                    box-shadow: 0 0 0 3px color-mix(in oklch, var(--primary) 11%, transparent);
                }

                /* ── Password wrapper ── */
                .sic-pwd-wrap { position: relative; }
                .sic-pwd-wrap .sic-input { padding-right: 44px; }
                .sic-pwd-toggle {
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
                .sic-pwd-toggle:hover { opacity: 0.85; }

                /* ── Aux row ── */
                .sic-aux {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-top: -4px;
                    margin-bottom: 26px;
                }
                .sic-remember {
                    display: flex;
                    align-items: center;
                    gap: 7px;
                    cursor: pointer;
                    font-family: 'Geist', system-ui, sans-serif;
                    font-size: 12px;
                    font-weight: 300;
                    color: var(--muted-foreground);
                    opacity: 0.65;
                    user-select: none;
                }
                .sic-forgot {
                    font-family: 'Geist', system-ui, sans-serif;
                    font-size: 12px;
                    font-weight: 400;
                    color: var(--muted-foreground);
                    opacity: 0.5;
                    text-decoration: none;
                    transition: color 0.15s, opacity 0.15s;
                }
                .sic-forgot:hover {
                    color: var(--primary);
                    opacity: 1;
                }

                /* ── CTA button with shimmer ── */
                .sic-btn {
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
                .sic-btn::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(105deg, transparent 32%, rgba(255,255,255,0.14) 50%, transparent 68%);
                    background-size: 200% 100%;
                    animation: sic-shimmer 3.5s ease-in-out infinite;
                }
                @keyframes sic-shimmer {
                    0%   { background-position: -200% center; }
                    100% { background-position:  200% center; }
                }
                .sic-btn:hover:not(:disabled) { opacity: 0.87; transform: translateY(-1px); }
                .sic-btn:active:not(:disabled) { transform: translateY(0); }
                .sic-btn:disabled { opacity: 0.5; cursor: not-allowed; }

                /* ── Divider with descending-dot motif — rhymes with logo rules ── */
                .sic-divider {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin: 28px 0 0;
                }
                .sic-divider-line {
                    flex: 1;
                    height: 1px;
                    background: var(--border);
                    opacity: 0.6;
                }
                .sic-divider-dots {
                    display: flex;
                    gap: 3px;
                    align-items: center;
                }
                .sic-divider-dots span {
                    display: inline-block;
                    border-radius: 50%;
                    background: color-mix(in oklch, var(--primary) 28%, transparent);
                }
                .sic-divider-dots span:nth-child(1) { width: 4px; height: 4px; }
                .sic-divider-dots span:nth-child(2) { width: 3px; height: 3px; opacity: 0.65; }
                .sic-divider-dots span:nth-child(3) { width: 2px; height: 2px; opacity: 0.35; }

                /* ── Sign up row ── */
                .sic-signup {
                    margin-top: 20px;
                    text-align: center;
                    font-family: 'Geist', system-ui, sans-serif;
                    font-size: 12px;
                    font-weight: 300;
                    color: var(--muted-foreground);
                    opacity: 0.58;
                }
                .sic-signup a {
                    color: var(--primary);
                    font-weight: 500;
                    opacity: 1;
                    text-decoration: none;
                }
                .sic-signup a:hover { text-decoration: underline; text-underline-offset: 2px; }

                /* ── Error ── */
                .sic-error {
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

                /* ── Back button ── */
                .sic-back {
                    display: block;
                    width: 100%;
                    text-align: center;
                    background: none;
                    border: none;
                    cursor: pointer;
                    font-family: 'Geist', system-ui, sans-serif;
                    font-size: 12px;
                    font-weight: 300;
                    color: var(--muted-foreground);
                    opacity: 0.48;
                    padding: 12px 0 0;
                    transition: opacity 0.15s;
                }
                .sic-back:hover { opacity: 0.85; }

                /* ── TOTP input ── */
                .sic-totp {
                    font-family: 'DM Mono', monospace;
                    font-size: 1.6rem;
                    font-weight: 300;
                    letter-spacing: 0.45em;
                    text-align: center;
                    height: 58px;
                }

                /* ── Field spacing ── */
                .sic-field { margin-bottom: 18px; }
            `}</style>

            {/* ── Headline — Instrument Serif ── */}
            <h1 className="sic-1 sic-headline justify-center items-center flex">
                {step === "sign-in" ? (
                    <>Welcome back.</>
                ) : (
                    <>Two-factor verify.</>
                )}
            </h1>

            {/* ── Subline — Geist light ── */}
            <p className="sic-2 sic-subline justify-center items-center flex">
                {step === "sign-in"
                    ? "Enter your credentials to pick up where you left off."
                    : "Enter the 6-digit code from your authenticator app."}
            </p>

            {/* ── Error ── */}
            {error && <div className="sic-error">{error}</div>}

            {/* ══════ SIGN-IN ══════ */}
            {step === "sign-in" ? (
                <form onSubmit={handleSignIn}>

                    <div className="sic-3 sic-field">
                        <label className="sic-label" htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            className="sic-input"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
                            required
                        />
                    </div>

                    <div className="sic-3 sic-field">
                        <label className="sic-label" htmlFor="password">Password</label>
                        <div className="sic-pwd-wrap">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                className="sic-input"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="current-password"
                                required
                            />
                            <button
                                type="button"
                                className="sic-pwd-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                            </button>
                        </div>
                    </div>

                    <div className="sic-4 sic-aux">
                        <label className="sic-remember" htmlFor="remember">
                            <Checkbox
                                id="remember"
                                checked={rememberMe}
                                onCheckedChange={(v) => setRememberMe(v as boolean)}
                                className="w-[15px] h-[15px] rounded border-border data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                            />
                            Remember me
                        </label>
                        <Link href="/forgot-password" className="sic-forgot">
                            Forgot password?
                        </Link>
                    </div>

                    <div className="sic-5">
                        <button type="submit" className="sic-btn" disabled={loading}>
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none">
                                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="30 70" strokeLinecap="round" />
                                    </svg>
                                    Signing in…
                                </span>
                            ) : "Sign in"}
                        </button>
                    </div>

                    {/* Divider with dot motif — rhymes with logo rules */}
                    <div className="sic-5 sic-divider">
                        <div className="sic-divider-line" />
                        <div className="sic-divider-dots">
                            <span /><span /><span />
                        </div>
                        <div className="sic-divider-line" />
                    </div>

                    <p className="sic-5 sic-signup">
                        No account? <Link href="/sign-up">Sign up</Link>
                    </p>

                </form>
            ) : (
                /* ══════ 2FA ══════ */
                <form onSubmit={handle2FA}>
                    <div className="sic-3 sic-field">
                        <label className="sic-label" htmlFor="totp">Auth code</label>
                        <input
                            id="totp"
                            type="text"
                            className="sic-input sic-totp"
                            placeholder="000 000"
                            value={totpCode}
                            onChange={(e) => setTotpCode(e.target.value)}
                            maxLength={6}
                            autoComplete="one-time-code"
                            autoFocus
                            required
                        />
                    </div>
                    <div className="sic-4">
                        <button type="submit" className="sic-btn" disabled={loading} style={{ marginBottom: 4 }}>
                            {loading ? "Verifying…" : "Verify"}
                        </button>
                    </div>
                    <button type="button" className="sic-5 sic-back" onClick={() => setStep("sign-in")}>
                        ← Back
                    </button>
                </form>
            )}
        </div>
    );
}