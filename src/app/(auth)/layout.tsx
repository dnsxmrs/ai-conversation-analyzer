// (auth)/layout.tsx — Server Component
// Reads session on the server → redirects instantly if not authenticated.
// No client-side session waterfall.

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { SidebarNav } from "./sidebar-nav";

export default async function AuthLayout({ children }: { children: React.ReactNode }) {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    // Hard redirect — happens before any HTML is sent to the browser
    if (!session?.user) {
        redirect("/sign-in");
    }

    return (
        <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Mono:wght@300;400&family=Geist:wght@300;400;500&display=swap');

                /* ── Noise texture ── */
                .aica-dashboard-bg::before {
                    content: '';
                    position: fixed;
                    inset: 0;
                    pointer-events: none;
                    z-index: 0;
                    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.028'/%3E%3C/svg%3E");
                }

                /* ── Warm amber glow — matches the authentication vibe ── */
                .aica-dashboard-bg::after {
                    content: '';
                    position: fixed;
                    top: -140px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 600px;
                    height: 340px;
                    border-radius: 50%;
                    background: radial-gradient(ellipse, color-mix(in oklch, var(--primary) 5%, transparent), transparent 68%);
                    pointer-events: none;
                    filter: blur(20px);
                    z-index: 0;
                }
            `}</style>
            
            <div className="aica-dashboard-bg" />

            <div className="relative z-10 flex flex-1 w-full">
                <SidebarNav>{children}</SidebarNav>
            </div>
        </div>
    );
}
