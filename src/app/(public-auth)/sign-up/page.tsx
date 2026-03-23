// sign-up/page.tsx
import SignUpClient from "./sign-up-client";

export default function SignUpPage() {
    return (
        <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Mono:wght@300;400&family=Geist:wght@300;400;500&display=swap');

                /* ── Noise texture ── */
                .su-page::before {
                    content: '';
                    position: fixed;
                    inset: 0;
                    pointer-events: none;
                    z-index: 0;
                    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.028'/%3E%3C/svg%3E");
                }

                /* ── Warm glow — rhymes with sign-in page atmosphere ── */
                .su-page::after {
                    content: '';
                    position: fixed;
                    top: -140px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 600px;
                    height: 340px;
                    border-radius: 50%;
                    background: radial-gradient(ellipse, color-mix(in oklch, var(--primary) 7%, transparent), transparent 68%);
                    pointer-events: none;
                    filter: blur(20px);
                    z-index: 0;
                }

                @keyframes su-fade-up {
                    from { opacity: 0; transform: translateY(14px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                .su-fi1 { animation: su-fade-up 0.5s ease both; }
                .su-fi2 { animation: su-fade-up 0.5s 0.07s ease both; opacity: 0; }
            `}</style>

            <div className="su-page" />

            {/* Form */}
            <main className="su-fi2 relative z-10 flex-1 flex items-center justify-center px-8 py-8">
                <div className="w-full max-w-sm">
                    <SignUpClient />
                </div>
            </main>
        </div>
    );
}