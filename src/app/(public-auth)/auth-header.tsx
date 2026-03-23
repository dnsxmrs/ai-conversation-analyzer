"use client";

import Link from "next/link";
import Image from "next/image";
import { Sun, Moon } from "lucide-react";

export default function AuthHeader() {
    return (
        <>
            <style>{`
                /* ── Auth header ── */
                .ah-wrap {
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: 50;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 20px 32px;
                    /* subtle glass backing */
                    background: color-mix(in oklch, var(--background) 72%, transparent);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    border-bottom: 1px solid color-mix(in oklch, var(--border) 40%, transparent);
                }

                /* ── Wordmark ── */
                .ah-wordmark {
                    display: flex;
                    align-items: center;
                    gap: 9px;
                    text-decoration: none;
                }
                .ah-wordmark-dot {
                    width: 7px;
                    height: 7px;
                    border-radius: 50%;
                    background: var(--primary);
                    opacity: 0.85;
                    /* gentle pulse */
                    animation: ah-pulse 3.2s ease-in-out infinite;
                }
                @keyframes ah-pulse {
                    0%, 100% { transform: scale(1);   opacity: 0.85; }
                    50%       { transform: scale(1.25); opacity: 0.55; }
                }
                .ah-wordmark-text {
                    font-family: 'Instrument Serif', Georgia, serif;
                    font-size: 17px;
                    font-style: italic;
                    letter-spacing: -0.01em;
                    color: var(--foreground);
                    opacity: 0.85;
                    transition: opacity 0.15s;
                }
                .ah-wordmark:hover .ah-wordmark-text { opacity: 1; }

                /* ── Theme toggle ── */
                .ah-theme {
                    width: 34px;
                    height: 34px;
                    border-radius: 50%;
                    border: 1px solid var(--border);
                    background: color-mix(in oklch, var(--muted) 55%, transparent);
                    color: var(--muted-foreground);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: background 0.15s, border-color 0.15s, color 0.15s, transform 0.15s;
                }
                .ah-theme:hover {
                    background: color-mix(in oklch, var(--muted) 90%, transparent);
                    border-color: color-mix(in oklch, var(--border) 100%, transparent);
                    color: var(--foreground);
                    transform: rotate(15deg);
                }
            `}</style>

            <header className="ah-wrap">
                {/* Wordmark — links back to landing */}
                <Link href="/" className="ah-wordmark">
                    <Image src="/aica-logo-rbg.png" alt="Logo" width={40} height={40} />
                    <span className="ah-wordmark-text">aica</span>
                </Link>

                {/* Theme toggle */}
                <button
                    className="ah-theme"
                    aria-label="Toggle theme"
                    onClick={() => {
                        const root = document.documentElement;
                        const isDark = root.classList.toggle("dark");
                        localStorage.setItem("aica-theme", isDark ? "dark" : "light");
                    }}
                >
                    {/* Moon in light mode, Sun in dark mode — controlled by CSS */}
                    <span className="dark:hidden"><Moon className="w-3.5 h-3.5" /></span>
                    <span className="hidden dark:flex"><Sun className="w-3.5 h-3.5" /></span>
                </button>
            </header>

            {/* Spacer so content isn't hidden behind the fixed header */}
            <div style={{ height: 73 }} />
        </>
    );
}
