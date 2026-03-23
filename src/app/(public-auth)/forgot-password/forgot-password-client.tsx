// forgot-password/forgot-password-client.tsx
"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { OTPInput, OTPInputContext } from "input-otp";
import React from "react";

/*
  Typography system — mirrors sign-in / sign-up exactly
  ─────────────────────────────────────────────────────
  Anchor display   → Instrument Serif (italic faded word — visual hierarchy trick)
  Eyebrow / labels → DM Mono 300 (monospaced contrast, ultra-light weight)
  Body / UI        → Geist 300–500 (clean, readable, pairs with both)

  Visual rhyming
  ──────────────
  · Amber eyebrow rule  → same amber as CTA button and focus ring
  · Faded italic word   → opacity trick rhymes with sign-in "back." / sign-up "account."
  · DM Mono field labels→ same font as landing page eyebrows
  · Step progress bar   → uses same --primary color
*/

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
    const strengthColorVar = [
        "",
        "color-mix(in oklch, var(--destructive) 80%, transparent)",
        "color-mix(in oklch, var(--primary) 50%, var(--destructive) 30%)",
        "color-mix(in oklch, var(--primary) 70%, transparent)",
        "color-mix(in oklch, var(--primary) 100%, transparent)",
    ][strength];

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

    /* ── Step headline / sub copy ── */
    const stepMeta: Record<Step, { headline: React.ReactNode; sub: string }> = {
        email: {
            headline: <>Reset your <em>password.</em></>,
            sub: "Enter your email and we'll send you a 6-digit code.",
        },
        otp: {
            headline: <>Check your <em>inbox.</em></>,
            sub: `We sent a 6-digit code to ${email}.`,
        },
        reset: {
            headline: <>Choose a new <em>password.</em></>,
            sub: "Make it strong — at least 8 characters.",
        },
        done: {
            headline: <>Password <em>updated.</em></>,
            sub: "Redirecting you to sign in…",
        },
    };

    const meta = stepMeta[step];

    return (
        <div>
            <style>{`
                /* ── Fade-in stagger ── */
                @keyframes fp-up {
                    from { opacity: 0; transform: translateY(13px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                .fp-1 { animation: fp-up 0.48s ease both; }
                .fp-2 { animation: fp-up 0.48s 0.09s ease both; opacity: 0; }
                .fp-3 { animation: fp-up 0.48s 0.18s ease both; opacity: 0; }
                .fp-4 { animation: fp-up 0.48s 0.27s ease both; opacity: 0; }
                .fp-5 { animation: fp-up 0.48s 0.36s ease both; opacity: 0; }
                .fp-6 { animation: fp-up 0.48s 0.45s ease both; opacity: 0; }

                /* ── Eyebrow row ── */
                .fp-eyebrow {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 13px;
                }
                .fp-eyebrow-rule {
                    display: inline-block;
                    width: 16px;
                    height: 1px;
                    background: color-mix(in oklch, var(--primary) 55%, transparent);
                    flex-shrink: 0;
                }
                .fp-eyebrow-text {
                    font-family: 'DM Mono', monospace;
                    font-size: 10px;
                    font-weight: 300;
                    letter-spacing: 0.24em;
                    text-transform: uppercase;
                    color: var(--primary);
                    opacity: 0.7;
                }

                /* ── Headline — Instrument Serif anchor ── */
                .fp-headline {
                    font-family: 'Instrument Serif', Georgia, serif;
                    font-size: 2.625rem;
                    line-height: 1.06;
                    letter-spacing: -0.025em;
                    color: var(--foreground);
                    margin-bottom: 8px;
                    font-style: normal;
                }
                /* The faded italic word — opacity hierarchy trick */
                .fp-headline em {
                    font-style: italic;
                    color: var(--muted-foreground);
                    opacity: 0.32;
                }

                /* ── Subline — Geist light ── */
                .fp-subline {
                    font-family: 'Geist', system-ui, sans-serif;
                    font-size: 13.5px;
                    font-weight: 300;
                    line-height: 1.62;
                    color: var(--muted-foreground);
                    opacity: 0.72;
                    margin-bottom: 34px;
                }

                /* ── Step progress bar ── */
                .fp-progress {
                    display: flex;
                    gap: 5px;
                    margin-bottom: 32px;
                }
                .fp-progress-bar {
                    height: 2px;
                    border-radius: 99px;
                    background: var(--border);
                    transition: background 0.4s ease, flex 0.4s ease;
                }
                .fp-progress-bar.active {
                    background: color-mix(in oklch, var(--primary) 65%, transparent);
                }

                /* ── Field label — DM Mono, the detail that rhymes ── */
                .fp-label {
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
                .fp-input {
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
                .fp-input::placeholder {
                    color: var(--muted-foreground);
                    opacity: 0.38;
                    font-weight: 300;
                }
                .fp-input:focus {
                    border-color: color-mix(in oklch, var(--primary) 55%, transparent);
                    box-shadow: 0 0 0 3px color-mix(in oklch, var(--primary) 11%, transparent);
                }

                /* ── Password wrapper ── */
                .fp-pwd-wrap { position: relative; }
                .fp-pwd-wrap .fp-input { padding-right: 44px; }
                .fp-pwd-toggle {
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
                .fp-pwd-toggle:hover { opacity: 0.85; }

                /* ── OTP slots ── */
                .fp-otp-slot {
                    flex: 1;
                    height: 56px;
                    border-radius: 11px;
                    border: 1px solid var(--border);
                    background: color-mix(in oklch, var(--muted) 45%, transparent);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-family: 'DM Mono', monospace;
                    font-size: 1.35rem;
                    font-weight: 400;
                    color: var(--foreground);
                    transition: border-color 0.15s, box-shadow 0.15s;
                    position: relative;
                }
                .fp-otp-slot.active {
                    border-color: color-mix(in oklch, var(--primary) 55%, transparent);
                    box-shadow: 0 0 0 3px color-mix(in oklch, var(--primary) 11%, transparent);
                    background: color-mix(in oklch, var(--primary) 5%, var(--muted));
                }
                .fp-otp-slot.filled {
                    border-color: color-mix(in oklch, var(--border) 80%, var(--primary) 20%);
                }
                .fp-otp-placeholder {
                    color: var(--muted-foreground);
                    opacity: 0.25;
                    font-size: 1.1rem;
                }
                .fp-otp-caret {
                    position: absolute;
                    inset: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    pointer-events: none;
                }
                .fp-otp-caret-bar {
                    width: 1.5px;
                    height: 20px;
                    background: var(--primary);
                    opacity: 0.8;
                    animation: fp-caret 1s ease-in-out infinite;
                }
                @keyframes fp-caret {
                    0%, 100% { opacity: 0.8; }
                    50%       { opacity: 0; }
                }

                /* ── CTA button with shimmer ── */
                .fp-btn {
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
                .fp-btn::after {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(105deg, transparent 32%, rgba(255,255,255,0.14) 50%, transparent 68%);
                    background-size: 200% 100%;
                    animation: fp-shimmer 3.5s ease-in-out infinite;
                }
                @keyframes fp-shimmer {
                    0%   { background-position: -200% center; }
                    100% { background-position:  200% center; }
                }
                .fp-btn:hover:not(:disabled) { opacity: 0.87; transform: translateY(-1px); }
                .fp-btn:active:not(:disabled) { transform: translateY(0); }
                .fp-btn:disabled { opacity: 0.5; cursor: not-allowed; }

                /* ── Divider with descending-dot motif ── */
                .fp-divider {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin: 28px 0 0;
                }
                .fp-divider-line {
                    flex: 1;
                    height: 1px;
                    background: var(--border);
                    opacity: 0.6;
                }
                .fp-divider-dots {
                    display: flex;
                    gap: 3px;
                    align-items: center;
                }
                .fp-divider-dots span {
                    display: inline-block;
                    border-radius: 50%;
                    background: color-mix(in oklch, var(--primary) 28%, transparent);
                }
                .fp-divider-dots span:nth-child(1) { width: 4px; height: 4px; }
                .fp-divider-dots span:nth-child(2) { width: 3px; height: 3px; opacity: 0.65; }
                .fp-divider-dots span:nth-child(3) { width: 2px; height: 2px; opacity: 0.35; }

                /* ── Back to sign-in row ── */
                .fp-signin {
                    margin-top: 20px;
                    text-align: center;
                    font-family: 'Geist', system-ui, sans-serif;
                    font-size: 12px;
                    font-weight: 300;
                    color: var(--muted-foreground);
                    opacity: 0.58;
                }
                .fp-signin a {
                    color: var(--primary);
                    font-weight: 500;
                    opacity: 1;
                    text-decoration: none;
                }
                .fp-signin a:hover { text-decoration: underline; text-underline-offset: 2px; }

                /* ── Error ── */
                .fp-error {
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
                .fp-field { margin-bottom: 18px; }

                /* ── Password strength ── */
                .fp-strength-bars {
                    display: flex;
                    gap: 4px;
                    margin-top: 8px;
                }
                .fp-strength-bar {
                    flex: 1;
                    height: 2px;
                    border-radius: 99px;
                    background: var(--border);
                    transition: background 0.3s ease;
                }
                .fp-strength-label {
                    font-family: 'DM Mono', monospace;
                    font-size: 10px;
                    font-weight: 300;
                    letter-spacing: 0.15em;
                    text-transform: uppercase;
                    color: var(--muted-foreground);
                    opacity: 0.5;
                    margin-top: 5px;
                }

                /* ── Match indicator ── */
                .fp-match {
                    font-family: 'DM Mono', monospace;
                    font-size: 10px;
                    font-weight: 300;
                    letter-spacing: 0.15em;
                    text-transform: uppercase;
                    margin-top: 5px;
                }
                .fp-match.ok  { color: color-mix(in oklch, var(--primary) 80%, transparent); }
                .fp-match.bad { color: var(--destructive); opacity: 0.7; }

                /* ── Done card ── */
                .fp-done {
                    padding: 18px;
                    border-radius: 12px;
                    background: color-mix(in oklch, var(--primary) 6%, transparent);
                    border: 1px solid color-mix(in oklch, var(--primary) 20%, transparent);
                    display: flex;
                    gap: 13px;
                    align-items: flex-start;
                }
                .fp-done-icon {
                    width: 32px;
                    height: 32px;
                    border-radius: 9px;
                    background: color-mix(in oklch, var(--primary) 15%, transparent);
                    border: 1px solid color-mix(in oklch, var(--primary) 25%, transparent);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                    margin-top: 2px;
                    color: var(--primary);
                }
                .fp-done-title {
                    font-family: 'Geist', system-ui, sans-serif;
                    font-size: 13.5px;
                    font-weight: 500;
                    color: var(--foreground);
                    margin-bottom: 3px;
                }
                .fp-done-sub {
                    font-family: 'Geist', system-ui, sans-serif;
                    font-size: 12px;
                    font-weight: 300;
                    color: var(--muted-foreground);
                    opacity: 0.6;
                    line-height: 1.55;
                }

                /* ── Resend link ── */
                .fp-resend {
                    margin-top: 14px;
                    text-align: center;
                    font-family: 'Geist', system-ui, sans-serif;
                    font-size: 12px;
                    font-weight: 300;
                    color: var(--muted-foreground);
                    opacity: 0.55;
                }
                .fp-resend button {
                    background: none;
                    border: none;
                    cursor: pointer;
                    color: var(--primary);
                    font-family: 'Geist', system-ui, sans-serif;
                    font-size: 12px;
                    font-weight: 500;
                    padding: 0;
                    transition: opacity 0.15s;
                }
                .fp-resend button:hover { opacity: 0.75; }
            `}</style>

            {/* ── Step progress bar ── */}
            <div className="fp-1 fp-progress">
                {(["email", "otp", "reset"] as const).map((s, i) => {
                    const stepIndex = ["email", "otp", "reset", "done"].indexOf(step);
                    const isActive = i <= stepIndex;
                    return (
                        <div
                            key={s}
                            className={`fp-progress-bar ${isActive ? "active" : ""}`}
                            style={{ flex: i === 0 ? 2 : 1 }}
                        />
                    );
                })}
            </div>

            {/* ── Eyebrow ── */}
            <div className="fp-1 fp-eyebrow">
                <span className="fp-eyebrow-rule" />
                <span className="fp-eyebrow-text">
                    {step === "email" && "Account Recovery"}
                    {step === "otp" && "Verification"}
                    {step === "reset" && "New Password"}
                    {step === "done" && "All Done"}
                </span>
            </div>

            {/* ── Headline — Instrument Serif ── */}
            <h1 className="fp-2 fp-headline">
                {meta.headline}
            </h1>

            {/* ── Subline — Geist light ── */}
            <p className="fp-3 fp-subline">
                {meta.sub}
            </p>

            {/* ── Error ── */}
            {error && <div className="fp-error">{error}</div>}

            {/* ════════════════ STEP 1: Email ════════════════ */}
            {step === "email" && (
                <form onSubmit={handleSendOtp}>
                    <div className="fp-4 fp-field">
                        <label className="fp-label" htmlFor="fp-email">Email Address</label>
                        <input
                            id="fp-email"
                            type="email"
                            className="fp-input"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
                            autoFocus
                            required
                        />
                    </div>

                    <div className="fp-5">
                        <button type="submit" className="fp-btn" disabled={loading}>
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none">
                                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="30 70" strokeLinecap="round" />
                                    </svg>
                                    Sending code…
                                </span>
                            ) : "Send Code"}
                        </button>
                    </div>
                </form>
            )}

            {/* ════════════════ STEP 2: OTP ════════════════ */}
            {step === "otp" && (
                <form onSubmit={handleVerifyOtp}>
                    <div className="fp-4 fp-field">
                        <label className="fp-label">6-Digit Code</label>
                        <OTPInput
                            maxLength={6}
                            value={otp}
                            onChange={setOtp}
                            containerClassName="flex gap-2"
                            render={({ slots }) => (
                                <OTPInputContext.Consumer>
                                    {() => (
                                        <>
                                            {slots.map((slot, i) => (
                                                <div
                                                    key={i}
                                                    className={`fp-otp-slot${slot.isActive ? " active" : slot.char ? " filled" : ""}`}
                                                >
                                                    {slot.char ?? (
                                                        <span className="fp-otp-placeholder">·</span>
                                                    )}
                                                    {slot.hasFakeCaret && (
                                                        <div className="fp-otp-caret">
                                                            <div className="fp-otp-caret-bar" />
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

                    <div className="fp-5">
                        <button
                            type="submit"
                            className="fp-btn"
                            disabled={loading || otp.length < 6}
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none">
                                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="30 70" strokeLinecap="round" />
                                    </svg>
                                    Verifying…
                                </span>
                            ) : "Verify Code"}
                        </button>
                    </div>

                    <p className="fp-resend">
                        Didn&#39;t get it?{" "}
                        <button
                            type="button"
                            onClick={() => { setOtp(""); setError(""); setStep("email"); }}
                        >
                            Resend code
                        </button>
                    </p>
                </form>
            )}

            {/* ════════════════ STEP 3: New password ════════════════ */}
            {step === "reset" && (
                <form onSubmit={handleReset}>
                    {/* New password */}
                    <div className="fp-4 fp-field">
                        <label className="fp-label" htmlFor="fp-password">New Password</label>
                        <div className="fp-pwd-wrap">
                            <input
                                id="fp-password"
                                type={showPassword ? "text" : "password"}
                                className="fp-input"
                                placeholder="Min. 8 characters"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="new-password"
                                autoFocus
                                required
                                minLength={8}
                            />
                            <button
                                type="button"
                                className="fp-pwd-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                                aria-label={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                            </button>
                        </div>

                        {/* Strength meter */}
                        {password.length > 0 && (
                            <>
                                <div className="fp-strength-bars">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div
                                            key={i}
                                            className="fp-strength-bar"
                                            style={{
                                                background: i <= strength ? strengthColorVar : undefined,
                                            }}
                                        />
                                    ))}
                                </div>
                                <p className="fp-strength-label">{strengthLabel}</p>
                            </>
                        )}
                    </div>

                    {/* Confirm password */}
                    <div className="fp-4 fp-field">
                        <label className="fp-label" htmlFor="fp-confirm">Confirm Password</label>
                        <div className="fp-pwd-wrap">
                            <input
                                id="fp-confirm"
                                type={showConfirm ? "text" : "password"}
                                className="fp-input"
                                placeholder="Repeat your password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                autoComplete="new-password"
                                required
                            />
                            <button
                                type="button"
                                className="fp-pwd-toggle"
                                onClick={() => setShowConfirm(!showConfirm)}
                                aria-label={showConfirm ? "Hide password" : "Show password"}
                            >
                                {showConfirm ? <EyeOff size={15} /> : <Eye size={15} />}
                            </button>
                        </div>

                        {/* Match indicator */}
                        {confirmPassword.length > 0 && (
                            <p className={`fp-match ${password === confirmPassword ? "ok" : "bad"}`}>
                                {password === confirmPassword ? "Passwords match" : "Does not match"}
                            </p>
                        )}
                    </div>

                    <div className="fp-5">
                        <button type="submit" className="fp-btn" disabled={loading}>
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin" width="14" height="14" viewBox="0 0 24 24" fill="none">
                                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="30 70" strokeLinecap="round" />
                                    </svg>
                                    Updating…
                                </span>
                            ) : "Set New Password"}
                        </button>
                    </div>
                </form>
            )}

            {/* ════════════════ STEP 4: Done ════════════════ */}
            {step === "done" && (
                <div className="fp-done fp-4">
                    <div className="fp-done-icon">
                        <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                    </div>
                    <div>
                        <p className="fp-done-title">Password updated!</p>
                        <p className="fp-done-sub">Taking you to sign in…</p>
                    </div>
                </div>
            )}

            {/* ── Divider with dot motif ── */}
            {step !== "done" && (
                <>
                    <div className="fp-6 fp-divider">
                        <div className="fp-divider-line" />
                        <div className="fp-divider-dots">
                            <span /><span /><span />
                        </div>
                        <div className="fp-divider-line" />
                    </div>

                    <p className="fp-6 fp-signin">
                        Remember your password? <Link href="/sign-in">Sign in</Link>
                    </p>
                </>
            )}
        </div>
    );
}
