'use client';

import Link from "next/link";
import Footer from "../components/Footer";
import { ArrowUpRight, Shield, Activity, Zap, Sun, Moon } from "lucide-react";

export default function Home() {
    return (
        <div
            className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden transition-colors duration-300"
            style={{ fontFamily: "'DM Sans', system-ui, sans-serif" }}
        >
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Playfair+Display:ital,wght@0,400;0,500;1,400;1,500&family=DM+Mono:wght@300;400&display=swap');

        /* ── Design tokens — light defaults, dark overrides ── */
        :root {
          --ink:        oklch(0.1908 0.0020 106.5859);   /* card-foreground light */
          --paper:      oklch(0.9818 0.0054 95.0986);    /* background light */
          --warm:       oklch(0.3438 0.0269 95.7226);    /* foreground light */
          --dim:        oklch(0.6059 0.0075 97.4233);    /* muted-foreground light */
          --accent:     oklch(0.6171 0.1375 39.0427);    /* primary light — warm amber */
          --accent-fg:  oklch(1.0000 0 0);               /* primary-foreground */
          --danger:     oklch(0.5800 0.1800 25.00);
          --ok:         oklch(0.5000 0.1100 155.00);
          --border:     oklch(0.8847 0.0069 97.3627 / 0.60);
          --border-h:   oklch(0.8847 0.0069 97.3627 / 0.90);
          --surface:    oklch(0.9341 0.0153 90.2390 / 0.60);  /* muted/card tint */
          --surface-h:  oklch(0.9245 0.0138 92.9892 / 0.80);
          --bg-atmo-1:  oklch(0.6171 0.1375 39.0427 / 0.08);
          --bg-atmo-2:  oklch(0.5000 0.1100 155.00  / 0.06);
          --grid-line:  oklch(0.3438 0.0269 95.7226 / 0.04);
          --scan-line:  oklch(0.6171 0.1375 39.0427 / 0.35);
          --msg-alex:   oklch(0.9245 0.0138 92.9892);
          --shadow-card: 0 24px 80px oklch(0 0 0 / 0.10), 0 0 0 1px oklch(0.6171 0.1375 39.0427 / 0.08);
          --shadow-float: 0 8px 32px oklch(0 0 0 / 0.10);
        }

        .dark {
          --ink:        oklch(0.9818 0.0054 95.0986);
          --paper:      oklch(0.2679 0.0036 106.6427);
          --warm:       oklch(0.8074 0.0142 93.0137);
          --dim:        oklch(0.7713 0.0169 99.0657 / 0.70);
          --accent:     oklch(0.6724 0.1308 38.7559);
          --accent-fg:  oklch(1.0000 0 0);
          --danger:     oklch(0.6368 0.2078 25.3313);
          --ok:         oklch(0.5800 0.1300 155.00);
          --border:     oklch(0.8074 0.0142 93.0137 / 0.10);
          --border-h:   oklch(0.8074 0.0142 93.0137 / 0.18);
          --surface:    oklch(1 0 0 / 0.03);
          --surface-h:  oklch(1 0 0 / 0.06);
          --bg-atmo-1:  oklch(0.6724 0.1308 38.7559 / 0.07);
          --bg-atmo-2:  oklch(0.5800 0.1300 155.00  / 0.05);
          --grid-line:  oklch(0.8074 0.0142 93.0137 / 0.03);
          --scan-line:  oklch(0.6724 0.1308 38.7559 / 0.40);
          --msg-alex:   oklch(1 0 0 / 0.04);
          --shadow-card: 0 24px 80px oklch(0 0 0 / 0.50), 0 0 0 1px oklch(0.6724 0.1308 38.7559 / 0.06);
          --shadow-float: 0 8px 32px oklch(0 0 0 / 0.40);
        }

        /* ── Typography system ── */
        .font-display { font-family: 'Playfair Display', Georgia, serif; }
        .font-mono    { font-family: 'DM Mono', monospace; }

        /* ── Fade-in cascade ── */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes driftY {
          0%,100% { transform: translateY(0); }
          50%      { transform: translateY(-6px); }
        }
        @keyframes scanDown {
          0%   { top: 0%; opacity: 0; }
          5%   { opacity: 0.7; }
          95%  { opacity: 0.7; }
          100% { top: 100%; opacity: 0; }
        }
        @keyframes shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
        }
        @keyframes pulseRing {
          0%  { box-shadow: 0 0 0 0 color-mix(in oklch, var(--danger) 40%, transparent); }
          70% { box-shadow: 0 0 0 6px color-mix(in oklch, var(--danger) 0%, transparent); }
          100%{ box-shadow: 0 0 0 0 color-mix(in oklch, var(--danger) 0%, transparent); }
        }

        .anim-1 { animation: fadeUp 0.6s ease both; }
        .anim-2 { animation: fadeUp 0.6s ease 0.10s both; }
        .anim-3 { animation: fadeUp 0.6s ease 0.20s both; }
        .anim-4 { animation: fadeUp 0.6s ease 0.30s both; }
        .anim-5 { animation: fadeUp 0.6s ease 0.40s both; }
        .drift  { animation: driftY 7s ease-in-out infinite; }

        /* ── Thin rule motif ── */
        .rule {
          display: inline-block;
          height: 1px;
          background: var(--accent);
          opacity: 0.5;
        }

        /* ── Glass card ── */
        .glass {
          background: var(--surface);
          border: 1px solid var(--border);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          transition: border-color 0.2s, background 0.3s;
        }
        .glass:hover {
          border-color: var(--border-h);
          background: var(--surface-h);
        }

        /* ── Noise grain overlay ── */
        .grain::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.035'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 1;
        }

        /* ── CTA button ── */
        .btn-primary {
          position: relative;
          overflow: hidden;
          background: var(--accent);
          color: var(--accent-fg);
          font-weight: 500;
          letter-spacing: 0.01em;
          transition: opacity 0.2s, transform 0.2s;
        }
        .btn-primary::after {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(105deg, transparent 35%, oklch(1 0 0 / 0.22) 50%, transparent 65%);
          background-size: 200% 100%;
          animation: shimmer 3s ease-in-out infinite;
        }
        .btn-primary:hover { opacity: 0.9; transform: translateY(-1px); }
        .btn-primary:active { transform: translateY(0); }

        .btn-ghost {
          background: transparent;
          border: 1px solid var(--border-h);
          color: var(--warm);
          opacity: 0.7;
          transition: opacity 0.2s, border-color 0.2s, transform 0.2s;
        }
        .btn-ghost:hover { opacity: 1; border-color: var(--border-h); transform: translateY(-1px); }

        /* Theme toggle */
        .btn-theme {
          background: var(--surface);
          border: 1px solid var(--border);
          color: var(--dim);
          border-radius: 9999px;
          width: 32px; height: 32px;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          transition: background 0.2s, border-color 0.2s, color 0.2s;
        }
        .btn-theme:hover {
          background: var(--surface-h);
          border-color: var(--border-h);
          color: var(--warm);
        }

        /* ── Card window chrome ── */
        .window-dot { width: 8px; height: 8px; border-radius: 50%; }

        /* ── Scan line ── */
        .scan-line {
          position: absolute;
          left: 0; right: 0; height: 1px;
          background: linear-gradient(to right, transparent, var(--scan-line), transparent);
          animation: scanDown 4.5s linear infinite;
          pointer-events: none;
          z-index: 10;
        }

        /* ── Badge pulse ── */
        .pulse-danger { animation: pulseRing 2s ease-out infinite; }

        /* ── Meter bar ── */
        .meter-fill {
          height: 100%;
          border-radius: 9999px;
          transition: width 1s cubic-bezier(0.4,0,0.2,1);
        }

        /* ── Feature strip ── */
        .feature-strip {
        //   border-top: 1px solid var(--border);
          transition: border-color 0.3s;
        }
        .feature-strip:hover { border-top-color: var(--border-h); }

        /* ── Eyebrow ── */
        .eyebrow {
          font-family: 'DM Mono', monospace;
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--dim);
        }

        /* ── Ambient glow ── */
        .star-glow {
          position: absolute;
          inset: -60px;
          border-radius: 40px;
          background: radial-gradient(ellipse 70% 55% at 55% 50%,
            color-mix(in oklch, var(--accent) 10%, transparent) 0%,
            transparent 70%
          );
          filter: blur(40px);
          pointer-events: none;
          z-index: -1;
        }

        /* ── Background radial ── */
        .bg-atmo {
          position: absolute;
          border-radius: 9999px;
          pointer-events: none;
          filter: blur(100px);
        }

        /* ── Section divider ── */
        .section-divider {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .section-divider .line {
          flex: 1;
          height: 1px;
          background: var(--border);
        }

        /* ── Message bubble ── */
        .msg { transition: transform 0.2s ease; }
        .msg:hover { transform: scale(1.01); }

        /* ── Feature number ── */
        .feat-num {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-size: 11px;
          color: var(--dim);
          opacity: 0.5;
          user-select: none;
        }

        /* ── Opacity hierarchy ── */
        .op-90 { opacity: 0.90; }
        .op-60 { opacity: 0.60; }
        .op-40 { opacity: 0.40; }
        .op-25 { opacity: 0.25; }

        /* ── Chips ── */
        .chip-danger {
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.10em;
          text-transform: uppercase;
          padding: 2px 8px;
          border-radius: 9999px;
          border: 1px solid color-mix(in oklch, var(--danger) 30%, transparent);
          background: color-mix(in oklch, var(--danger) 12%, transparent);
          color: var(--danger);
        }
        .chip-ok {
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.10em;
          text-transform: uppercase;
          padding: 2px 8px;
          border-radius: 9999px;
          border: 1px solid color-mix(in oklch, var(--ok) 30%, transparent);
          background: color-mix(in oklch, var(--ok) 12%, transparent);
          color: var(--ok);
        }
        .chip-warn {
          font-family: 'DM Mono', monospace;
          font-size: 9px;
          letter-spacing: 0.10em;
          text-transform: uppercase;
          padding: 2px 8px;
          border-radius: 9999px;
          border: 1px solid color-mix(in oklch, var(--accent) 30%, transparent);
          background: color-mix(in oklch, var(--accent) 10%, transparent);
          color: var(--accent);
        }

        /* ── Message bubble bg ── */
        .msg-alex-bg {
          background: var(--msg-alex);
        }

        /* ── Waveform bar ── */
        .wave-high   { background: var(--danger); }
        .wave-mid    { background: var(--accent); }
        .wave-low    { background: color-mix(in oklch, var(--accent) 25%, transparent); }

        /* ── Footer link ── */
        .footer-link {
          color: var(--dim);
          font-size: 12px;
          text-decoration: none;
          transition: color 0.2s;
        }
        .footer-link:hover { color: var(--warm); }

        /* ── Nav border ── */
        .nav-border-b {
          border-bottom: 1px solid var(--border);
        }

        /* ── Meter track ── */
        .meter-track {
          background: color-mix(in oklch, var(--warm) 6%, transparent);
        }

        /* ── Feature card bg ── */
        .feature-card {
          background: var(--surface);
          border: 1px solid var(--border);
          backdrop-filter: blur(16px);
          box-shadow: var(--shadow-float);
          transition: background 0.3s, border-color 0.2s;
        }
        .feature-card:hover {
          border-color: var(--border-h);
        }

        /* ── Gauge gradient — adaptive ── */
        .gauge-stop-1 { stop-color: var(--danger); }
        .gauge-stop-2 { stop-color: var(--accent); }
        .gauge-stop-3 { stop-color: var(--ok); }

        /* ── Health gradient bar ── */
        .health-bar {
          background: linear-gradient(to right, var(--danger), var(--accent), var(--ok));
        }
      `}</style>

            {/* ── Theme toggle script (runs before paint) ── */}
            <script dangerouslySetInnerHTML={{
                __html: `
        (function() {
          var stored = localStorage.getItem('aica-theme');
          var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
          if (stored === 'dark' || (!stored && prefersDark)) {
            document.documentElement.classList.add('dark');
          }
        })();
      ` }} />

            {/* ── Background atmosphere ── */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="bg-atmo w-[50%] h-[45%] top-[-10%] left-[-15%]"
                    style={{ background: "radial-gradient(ellipse, var(--bg-atmo-1), transparent 70%)" }} />
                <div className="bg-atmo w-[40%] h-[35%] bottom-[5%] right-[-10%]"
                    style={{ background: "radial-gradient(ellipse, var(--bg-atmo-2), transparent 70%)" }} />
                <div className="absolute inset-0"
                    style={{
                        backgroundImage: "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
                        backgroundSize: "48px 48px",
                        maskImage: "radial-gradient(ellipse 80% 60% at 50% 10%, black 40%, transparent 100%)",
                    }}
                />
            </div>

            {/* ══════════════════════════════════════
          NAV
      ══════════════════════════════════════ */}
            <nav className="relative z-20 flex items-center justify-between px-8 py-6 max-w-6xl mx-auto">
                <div className="flex items-center gap-2.5">
                </div>
                <div className="flex items-center gap-4">

                    {/* Theme toggle */}
                    <button
                        className="btn-theme"
                        aria-label="Toggle theme"
                        onClick={() => {
                            const root = document.documentElement;
                            const isDark = root.classList.toggle('dark');
                            localStorage.setItem('aica-theme', isDark ? 'dark' : 'light');
                        }}
                    >
                        {/* Show sun in dark, moon in light — via CSS */}
                        <span className="dark:hidden"><Moon className="w-3.5 h-3.5" /></span>
                        <span className="hidden dark:block"><Sun className="w-3.5 h-3.5" /></span>
                    </button>

                    <Link href="/sign-in">
                        <button className="btn-ghost text-[13px] rounded-full px-5 py-2 cursor-pointer">Log in</button>
                    </Link>
                    <Link href="/sign-up">
                        <button className="btn-primary text-[13px] rounded-full px-5 py-2 flex items-center gap-1.5 cursor-pointer">
                            Get started <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                    </Link>
                </div>
            </nav>

            <main className="relative z-10 max-w-6xl mx-auto px-8">

                {/* ══════════════════════════════════════
            HERO
        ══════════════════════════════════════ */}
                <section className="pt-16 pb-32 flex flex-col lg:flex-row items-start gap-20 lg:gap-24">

                    {/* ── Left: Copy ── */}
                    <div className="flex-1 flex flex-col items-start pt-4">
                        <div className="anim-1 flex items-center gap-2 mb-5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 animate-pulse" />
                            <span className="eyebrow">Conversation Intelligence</span>
                        </div>

                        <h1 className="anim-2 font-display mb-6" style={{ fontSize: "clamp(3rem, 6vw, 5rem)", lineHeight: 1.05, letterSpacing: "-0.02em", color: "var(--warm)" }}>
                            <span className="op-90">Read between</span>
                            <br />
                            <span className="italic" style={{ color: "var(--accent)" }}>every line.</span>
                        </h1>

                        <p className="anim-3 op-60 mb-10" style={{ fontSize: "1rem", lineHeight: 1.78, fontWeight: 300, maxWidth: "22rem", color: "var(--warm)" }}>
                            Upload any conversation and our AI decodes tone, flags manipulation, measures sentiment, and scores your communication health — instantly.
                        </p>

                        <div className="anim-4 flex items-center gap-3">
                            <Link href="/sign-up">
                                <button className="btn-primary rounded-full px-7 py-3 text-[13px] flex items-center gap-2 cursor-pointer">
                                    Analyze a conversation
                                    <ArrowUpRight className="w-3.5 h-3.5" />
                                </button>
                            </Link>
                            <Link href="/sign-in">
                                <button className="btn-ghost rounded-full px-6 py-3 text-[13px] cursor-pointer">Log in</button>
                            </Link>
                        </div>

                        <div className="anim-5 flex items-center gap-3 mt-10 op-25">
                            <div className="flex -space-x-1.5">
                                {["oklch(0.52 0.06 60)", "oklch(0.50 0.07 170)", "oklch(0.48 0.08 290)"].map((c, i) => (
                                    <div key={i} className="w-6 h-6 rounded-full border" style={{ background: c, borderColor: "var(--paper)" }} />
                                ))}
                            </div>
                            <span className="font-mono text-[11px] tracking-wide" style={{ color: "var(--warm)" }}>4,200+ conversations analyzed</span>
                        </div>
                    </div>

                    {/* ── Right: Analysis window ── */}
                    <div className="w-full max-w-[440px] lg:max-w-none lg:w-[48%] relative flex-shrink-0">
                        <div className="star-glow" />

                        {/* Main card */}
                        <div className="anim-3 grain rounded-2xl overflow-hidden relative feature-card"
                            style={{ boxShadow: "var(--shadow-card)" }}>

                            {/* Window chrome */}
                            <div className="flex items-center gap-3 px-5 py-4" style={{ borderBottom: "1px solid var(--border)" }}>
                                <div className="flex gap-1.5">
                                    <div className="window-dot" style={{ background: "oklch(0.65 0.18 28)" }} />
                                    <div className="window-dot" style={{ background: "oklch(0.75 0.15 85)" }} />
                                    <div className="window-dot" style={{ background: "oklch(0.60 0.15 145)" }} />
                                </div>
                                <div className="flex-1 mx-2 h-5 rounded flex items-center px-2.5" style={{ background: "color-mix(in oklch, var(--warm) 5%, transparent)" }}>
                                    <span className="font-mono op-40" style={{ fontSize: 10, color: "var(--warm)" }}>chat_export_aug_14.txt</span>
                                </div>
                                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full"
                                    style={{ background: "color-mix(in oklch, var(--ok) 12%, transparent)", border: "1px solid color-mix(in oklch, var(--ok) 20%, transparent)" }}>
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="font-mono op-90" style={{ fontSize: 9, color: "var(--ok)", letterSpacing: "0.14em", textTransform: "uppercase" }}>Analyzing</span>
                                </div>
                            </div>

                            {/* Scan line */}
                            <div className="scan-line" />

                            {/* Messages */}
                            <div className="p-5 flex flex-col gap-4 relative z-[2]">

                                {/* Message A */}
                                <div className="msg flex flex-col items-start gap-1.5">
                                    <span className="eyebrow op-40 ml-9">Alex</span>
                                    <div className="flex items-start gap-2.5">
                                        <div className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-semibold text-white"
                                            style={{ background: "linear-gradient(135deg, oklch(0.52 0.06 60), oklch(0.40 0.05 60))" }}>A</div>
                                        <div className="relative">
                                            <div className="msg-alex-bg rounded-xl rounded-tl-sm px-4 py-2.5" style={{ border: "1px solid var(--border)" }}>
                                                <p className="op-80" style={{ fontSize: 13, lineHeight: 1.55, color: "var(--warm)" }}>
                                                    I already told you, it&apos;s{" "}
                                                    <span className="font-semibold" style={{ color: "var(--danger)" }}>not my fault</span>
                                                    {" "}the project failed.
                                                </p>
                                            </div>
                                            <div className="absolute -right-2 -top-3 pulse-danger">
                                                <span className="chip-danger flex items-center gap-1">
                                                    <Shield className="w-2.5 h-2.5" />
                                                    Deflection
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Message B */}
                                <div className="msg flex flex-col items-end gap-1.5">
                                    <span className="eyebrow op-40 mr-9">Jordan</span>
                                    <div className="flex items-start gap-2.5 justify-end">
                                        <div className="relative">
                                            <div className="px-4 py-2.5 rounded-xl rounded-tr-sm" style={{ background: "var(--accent)", color: "var(--accent-fg)" }}>
                                                <p style={{ fontSize: 13, lineHeight: 1.55, fontWeight: 400 }}>
                                                    Fine. What do <em>you</em> think we should do to move forward?
                                                </p>
                                            </div>
                                            <div className="absolute -left-2 -top-3">
                                                <span className="chip-ok">+Constructive</span>
                                            </div>
                                        </div>
                                        <div className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-semibold text-white"
                                            style={{ background: "linear-gradient(135deg, oklch(0.50 0.07 170), oklch(0.38 0.06 170))" }}>J</div>
                                    </div>
                                </div>

                                {/* Message C */}
                                <div className="msg flex flex-col items-start gap-1.5">
                                    <span className="eyebrow op-40 ml-9">Alex</span>
                                    <div className="flex items-start gap-2.5">
                                        <div className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center text-[10px] font-semibold text-white"
                                            style={{ background: "linear-gradient(135deg, oklch(0.52 0.06 60), oklch(0.40 0.05 60))" }}>A</div>
                                        <div className="relative">
                                            <div className="msg-alex-bg rounded-xl rounded-tl-sm px-4 py-2.5" style={{ border: "1px solid var(--border)" }}>
                                                <p className="op-80" style={{ fontSize: 13, lineHeight: 1.55, color: "var(--warm)" }}>
                                                    I{" "}
                                                    <span className="font-semibold" style={{ color: "var(--accent)" }}>guess</span>
                                                    {" "}we could revisit the timeline…{" "}
                                                    <span className="font-semibold" style={{ color: "var(--accent)" }}>if you want.</span>
                                                </p>
                                            </div>
                                            <div className="absolute -right-2 -top-3">
                                                <span className="chip-warn">Passive</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Divider */}
                                <div className="flex items-center gap-3 my-1">
                                    <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
                                    <span className="eyebrow op-40">AI Analysis</span>
                                    <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
                                </div>

                                {/* Meters */}
                                <div className="flex flex-col gap-2.5">
                                    {[
                                        { label: "Sentiment", val: 38, color: "var(--danger)", tag: "Tense" },
                                        { label: "Health", val: 54, color: "var(--accent)", tag: "54/100" },
                                        { label: "Balance", val: 62, color: "var(--ok)", tag: "Moderate" },
                                    ].map(m => (
                                        <div key={m.label} className="flex items-center gap-3">
                                            <span className="font-mono op-40 flex-shrink-0" style={{ fontSize: 10, width: 60, color: "var(--dim)" }}>{m.label}</span>
                                            <div className="flex-1 h-1 rounded-full meter-track">
                                                <div className="meter-fill rounded-full" style={{ width: `${m.val}%`, background: m.color, opacity: 0.75 }} />
                                            </div>
                                            <span className="font-mono op-60 flex-shrink-0" style={{ fontSize: 10, width: 52, textAlign: "right", color: m.color }}>{m.tag}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Red flag chips */}
                                <div className="flex gap-1.5 flex-wrap mt-1">
                                    {["Blame-shifting", "Passiveness", "Evasion"].map(t => (
                                        <span key={t} className="chip-danger">{t}</span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Floating — score pill */}
                        <div className="drift absolute -bottom-5 -left-5 grain rounded-xl px-4 py-3 hidden sm:flex flex-col gap-0.5 feature-card"
                            style={{ boxShadow: "var(--shadow-float)" }}>
                            <span className="eyebrow op-40">Overall Score</span>
                            <div className="flex items-baseline gap-1 mt-1">
                                <span className="font-display" style={{ fontSize: "2rem", lineHeight: 1, color: "var(--warm)" }}>54</span>
                                <span className="op-25 font-mono" style={{ fontSize: 10, color: "var(--warm)" }}>/100</span>
                            </div>
                            <span className="font-mono" style={{ fontSize: 10, color: "var(--accent)", letterSpacing: "0.10em", textTransform: "uppercase" }}>Needs attention</span>
                        </div>

                        {/* Floating — messages pill */}
                        <div className="absolute -top-4 -right-4 grain rounded-xl px-4 py-3 hidden sm:flex items-center gap-3 feature-card"
                            style={{ boxShadow: "var(--shadow-float)" }}>
                            <div className="w-7 h-7 rounded-full flex items-center justify-center"
                                style={{ background: "color-mix(in oklch, var(--accent) 10%, transparent)" }}>
                                <Activity className="w-3.5 h-3.5" style={{ color: "var(--accent)" }} />
                            </div>
                            <div>
                                <span className="eyebrow op-40 block mb-0.5">Scanned</span>
                                <span className="font-display" style={{ fontSize: "1.1rem", color: "var(--warm)" }}>47 msgs</span>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="features" className="pb-32">

                    <div className="section-divider mb-20">
                        <div className="line" />
                        <div className="flex items-center gap-3">
                            <span className="eyebrow">What you get</span>
                        </div>
                        <div className="line" />
                    </div>

                    {/* Strip 1 — Tone & Sentiment */}
                    <div className="feature-strip py-16 flex flex-col md:flex-row items-center gap-12 md:gap-20">
                        <div className="w-full md:w-[42%] flex-shrink-0">
                            <div className="grain rounded-2xl p-6 relative overflow-hidden feature-card">
                                <div className="flex items-end gap-1 h-24 mb-5">
                                    {[35, 55, 40, 70, 45, 80, 35, 60, 50, 75, 40, 65, 55, 45, 80, 60, 35, 70, 50, 55, 40, 65, 45, 75, 60].map((h, i) => (
                                        <div key={i} className={`flex-1 rounded-sm transition-all duration-700 ${h > 65 ? 'wave-high' : h > 50 ? 'wave-mid' : 'wave-low'}`}
                                            style={{ height: `${h}%`, opacity: 0.7 + (i % 3) * 0.1 }} />
                                    ))}
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="font-mono op-40" style={{ fontSize: 10, color: "var(--dim)" }}>msg #1</span>
                                    <div className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full" style={{ background: "var(--danger)" }} />
                                        <span className="font-mono" style={{ fontSize: 10, color: "var(--danger)" }}>Tense</span>
                                    </div>
                                    <span className="font-mono op-40" style={{ fontSize: 10, color: "var(--dim)" }}>msg #47</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-5">
                            <div className="flex items-center gap-3">
                                <span className="feat-num">01</span>
                                <span className="rule" style={{ width: 20, opacity: 0.4 }} />
                                <span className="eyebrow" style={{ color: "var(--accent)" }}>Tone &amp; Sentiment</span>
                            </div>
                            <h2 className="font-display op-90" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", lineHeight: 1.15, letterSpacing: "-0.01em", color: "var(--warm)" }}>
                                Feel the room,<br /><em>message by message.</em>
                            </h2>
                            <p className="op-50" style={{ fontSize: "0.9375rem", lineHeight: 1.72, fontWeight: 300, maxWidth: "24rem", color: "var(--warm)" }}>
                                Every exchange carries an emotional charge. We map the full arc — from the first message to the last — so you see exactly when the temperature shifted.
                            </p>
                            <div className="flex flex-wrap gap-x-5 gap-y-1.5">
                                {["Per-message mapping", "Emotional arc timeline", "Positive · Negative · Neutral"].map(t => (
                                    <span key={t} className="font-mono op-40" style={{ fontSize: 11, color: "var(--dim)" }}>{t}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Strip 2 — Red Flag Detection */}
                    <div className="feature-strip py-16 flex flex-col md:flex-row-reverse items-center gap-12 md:gap-20">
                        <div className="w-full md:w-[42%] flex-shrink-0">
                            <div className="grain rounded-2xl p-5 flex flex-col gap-4 relative overflow-hidden feature-card">
                                {[
                                    { text: "It's not like I had a choice, you know.", tag: "Victimhood", type: "danger" },
                                    { text: "You always do this to me.", tag: "Blame-shifting", type: "danger" },
                                    { text: "Fine. Whatever you think is best.", tag: "Passive aggression", type: "warn" },
                                ].map((m, i) => (
                                    <div key={i} className="flex items-start gap-3">
                                        <div className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0"
                                            style={{ background: m.type === "danger" ? "var(--danger)" : "var(--accent)" }} />
                                        <div className="flex-1">
                                            <p className="op-70 mb-1.5" style={{ fontSize: 13, lineHeight: 1.5, color: "var(--warm)" }}>{m.text}</p>
                                            <span className={m.type === "danger" ? "chip-danger" : "chip-warn"}>{m.tag}</span>
                                        </div>
                                    </div>
                                ))}
                                <div className="pt-3 flex items-center justify-between" style={{ borderTop: "1px solid var(--border)" }}>
                                    <span className="font-mono op-40" style={{ fontSize: 10, color: "var(--dim)" }}>3 flags detected</span>
                                    <div className="flex gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--danger)" }} />
                                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--danger)" }} />
                                        <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--accent)" }} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-5">
                            <div className="flex items-center gap-3">
                                <span className="feat-num">02</span>
                                <span className="rule" style={{ width: 20, background: "var(--danger)", opacity: 0.5 }} />
                                <span className="eyebrow" style={{ color: "var(--danger)" }}>Red Flag Detection</span>
                            </div>
                            <h2 className="font-display op-90" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", lineHeight: 1.15, letterSpacing: "-0.01em", color: "var(--warm)" }}>
                                Patterns hiding<br /><em>in plain sight.</em>
                            </h2>
                            <p className="op-50" style={{ fontSize: "0.9375rem", lineHeight: 1.72, fontWeight: 300, maxWidth: "24rem", color: "var(--warm)" }}>
                                Gaslighting, deflection, passive aggression — they hide in ordinary-sounding sentences. Our model names them precisely, down to the exact phrase.
                            </p>
                            <div className="flex flex-wrap gap-2 mt-1">
                                {["Gaslighting", "Deflection", "Victimhood", "Manipulation", "Evasion"].map(t => (
                                    <span key={t} className="chip-danger">{t}</span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Strip 3 — Health Scoring */}
                    <div className="feature-strip py-16 flex flex-col md:flex-row items-center gap-12 md:gap-20" style={{ borderBottom: "1px solid var(--border)" }}>
                        <div className="w-full md:w-[42%] flex-shrink-0">
                            <div className="grain rounded-2xl p-6 relative overflow-hidden feature-card">
                                <div className="flex items-center justify-center mb-5">
                                    <div className="relative">
                                        <svg viewBox="0 0 120 80" className="w-48 h-32">
                                            <path d="M 15 70 A 52 52 0 0 1 105 70" stroke="currentColor" strokeOpacity="0.08" strokeWidth="10" fill="none" strokeLinecap="round" />
                                            <path d="M 15 70 A 52 52 0 0 1 105 70" stroke="url(#gauge-grad)" strokeWidth="10" fill="none" strokeLinecap="round"
                                                strokeDasharray="163.4" strokeDashoffset="75" />
                                            <defs>
                                                <linearGradient id="gauge-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                                                    <stop offset="0%" stopColor="oklch(0.58 0.18 25)" />
                                                    <stop offset="50%" stopColor="oklch(0.63 0.13 39)" />
                                                    <stop offset="100%" stopColor="oklch(0.55 0.12 155)" />
                                                </linearGradient>
                                            </defs>
                                        </svg>
                                        <div className="absolute inset-0 flex flex-col items-center justify-center mt-3">
                                            <span className="font-display" style={{ fontSize: "2.5rem", lineHeight: 1, color: "var(--warm)" }}>54</span>
                                            <span className="font-mono op-25" style={{ fontSize: 10, color: "var(--warm)" }}>/ 100</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-3 gap-2">
                                    {[
                                        { label: "Cooperation", val: "48%" },
                                        { label: "Clarity", val: "61%" },
                                        { label: "Balance", val: "53%" },
                                    ].map(m => (
                                        <div key={m.label} className="text-center">
                                            <div className="font-display op-80" style={{ fontSize: "1.1rem", color: "var(--warm)" }}>{m.val}</div>
                                            <div className="font-mono op-30" style={{ fontSize: 9, letterSpacing: "0.10em", textTransform: "uppercase", color: "var(--dim)" }}>{m.label}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-5">
                            <div className="flex items-center gap-3">
                                <span className="feat-num">03</span>
                                <span className="rule" style={{ width: 20, background: "var(--ok)", opacity: 0.5 }} />
                                <span className="eyebrow" style={{ color: "var(--ok)" }}>Health Scoring</span>
                            </div>
                            <h2 className="font-display op-90" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)", lineHeight: 1.15, letterSpacing: "-0.01em", color: "var(--warm)" }}>
                                One number.<br /><em>Complete clarity.</em>
                            </h2>
                            <p className="op-50" style={{ fontSize: "0.9375rem", lineHeight: 1.72, fontWeight: 300, maxWidth: "24rem", color: "var(--warm)" }}>
                                We collapse the complexity of an entire conversation — cooperation, constructiveness, mutual respect — into a single score from 0 to 100.
                            </p>
                            <div className="flex items-center gap-3">
                                <div className="flex-1 h-1 rounded-full overflow-hidden meter-track">
                                    <div className="h-full rounded-full health-bar" style={{ width: "54%" }} />
                                </div>
                                <span className="font-mono op-40" style={{ fontSize: 11, color: "var(--dim)" }}>54 / 100</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ══════════════════════════════════════
            CTA STRIP
        ══════════════════════════════════════ */}
                <section className="pb-32 flex flex-col items-center text-center gap-8">
                    <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 op-40" style={{ color: "var(--accent)" }} />
                        <span className="eyebrow">Get started in seconds</span>
                    </div>
                    <h2 className="font-display op-90" style={{ fontSize: "clamp(2.2rem, 5vw, 3.8rem)", lineHeight: 1.1, letterSpacing: "-0.02em", maxWidth: "16ch", color: "var(--warm)" }}>
                        Your conversations deserve<br /><em style={{ color: "var(--accent)" }}>honest analysis.</em>
                    </h2>
                    <p className="op-40" style={{ fontSize: "0.9375rem", lineHeight: 1.72, fontWeight: 300, maxWidth: "26rem", color: "var(--warm)" }}>
                        Paste a chat or upload a file. Results in under a minute — no setup required.
                    </p>
                    <Link href="/sign-up">
                        <button className="btn-primary rounded-full px-9 py-4 text-[14px] font-semibold flex items-center gap-2 cursor-pointer">
                            Analyze your first conversation
                            <ArrowUpRight className="w-4 h-4" />
                        </button>
                    </Link>
                </section>
            </main>

            {/* ══════════════════════════════════════
          FOOTER
      ══════════════════════════════════════ */}
            <Footer />
        </div>
    );
}