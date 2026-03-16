import Link from "next/link";
import { ArrowRight, MessageSquare, ShieldAlert } from "lucide-react";
import CanvasBackground from "@/components/CanvasBackground";

export default function Home() {
  return (
    <div
      className="relative flex flex-col items-center overflow-hidden bg-[#F7F5F0] dark:bg-[#0A0A0A] font-sans selection:bg-zinc-200 dark:selection:bg-zinc-800"
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      {/* Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&display=swap');

        .font-display { font-family: 'DM Serif Display', Georgia, serif; }

        /* Noise texture overlay */
        .noise::after {
          content: '';
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 1;
          opacity: 0.35;
        }

        @keyframes float-up {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        @keyframes float-down {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(8px); }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-ring {
          0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.3); }
          70% { box-shadow: 0 0 0 8px rgba(239, 68, 68, 0); }
          100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
        }
        @keyframes scan-line {
          0% { top: 10%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { top: 90%; opacity: 0; }
        }

        .float-a { animation: float-up 6s ease-in-out infinite; }
        .float-b { animation: float-down 7s ease-in-out infinite 1s; }
        .float-c { animation: float-up 8s ease-in-out infinite 0.5s; }

        .fade-in-1 { animation: fade-in-up 0.7s ease forwards; }
        .fade-in-2 { animation: fade-in-up 0.7s ease 0.15s forwards; opacity: 0; }
        .fade-in-3 { animation: fade-in-up 0.7s ease 0.3s forwards; opacity: 0; }
        .fade-in-4 { animation: fade-in-up 0.7s ease 0.45s forwards; opacity: 0; }
        .fade-in-5 { animation: fade-in-up 0.7s ease 0.6s forwards; opacity: 0; }

        .pulse-red { animation: pulse-ring 2s ease-out infinite; }

        .scan-line { animation: scan-line 4s linear infinite; }

        .glass-card {
          background: rgba(255,255,255,0.55);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.8);
        }
        .dark .glass-card {
          background: rgba(20,20,20,0.55);
          border: 1px solid rgba(255,255,255,0.08);
        }

        /* Message bubble hover */
        .msg-bubble { transition: transform 0.2s ease; }
        .msg-bubble:hover { transform: scale(1.02); }
      `}</style>

      <CanvasBackground />

      {/* Background blobs — visual rhyme: same shapes as feature icons */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-5%] left-[-15%] w-[45%] h-[45%] rounded-full bg-amber-400/10 dark:bg-amber-500/8 blur-[140px]" />
        <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 dark:bg-indigo-500/8 blur-[130px]" />
        <div className="absolute top-[55%] left-[20%] w-[30%] h-[25%] rounded-full bg-rose-400/8 blur-[120px]" />
        {/* Subtle grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:32px_32px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_20%,#000_60%,transparent_100%)]" />
      </div>

      <main className="relative z-10 flex flex-col items-center justify-center w-full max-w-6xl px-6 pt-28 pb-24 mx-auto">

        {/* ── HERO SECTION ───────────────────────────────────── */}
        <div className="w-full flex flex-col lg:flex-row items-center gap-16 lg:gap-12 text-left">

          {/* Left: Copy */}
          <div className="flex-1 flex flex-col items-start">

            {/* Eyebrow label — rhymes with pill-shaped CTAs */}
            <div className="fade-in-1 inline-flex items-center gap-2 px-4 py-1.5 mb-7 rounded-full border border-zinc-300/60 dark:border-zinc-700/60 bg-white/60 dark:bg-zinc-900/60 backdrop-blur-md shadow-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[12px] font-semibold tracking-widest uppercase text-zinc-500 dark:text-zinc-400">
                Conversation Intelligence
              </span>
            </div>

            {/* Anchor headline — DM Serif Display, large, tight */}
            <h1
              className="font-display fade-in-2 text-5xl sm:text-6xl lg:text-[68px] leading-[1.05] tracking-tight text-zinc-900 dark:text-white mb-2"
            >
              Read between
            </h1>
            <h1
              className="font-display fade-in-2 text-5xl sm:text-6xl lg:text-[68px] leading-[1.05] tracking-tight mb-6"
              style={{
                background: "linear-gradient(135deg, #C2873A 0%, #E8A44A 40%, #C25A2E 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              every line.
            </h1>

            {/* Supporting copy — DM Sans light, muted */}
            <p className="fade-in-3 text-lg text-zinc-500 dark:text-zinc-400 mb-10 leading-relaxed font-light max-w-lg">
              Upload any chat and our AI decodes hidden tone, flags manipulation, measures sentiment, and scores your communication health — instantly.
            </p>

            {/* CTAs — pill-shaped, rhyming the eyebrow badge */}
            <div className="fade-in-4 flex flex-col sm:flex-row items-start gap-3 w-full sm:w-auto">
              <Link href="/register">
                <button className="flex items-center justify-center rounded-full px-7 h-13 py-3.5 text-[14px] font-semibold gap-2 bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0">
                  Analyze a conversation
                  <ArrowRight className="w-4 h-4" />
                </button>
              </Link>
              <Link href="/sign-in">
                <button className="flex items-center justify-center rounded-full px-7 py-3.5 text-[14px] font-medium border border-zinc-300/80 dark:border-zinc-700/80 bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md hover:bg-white dark:hover:bg-zinc-900 transition-all text-zinc-700 dark:text-zinc-300">
                  Log in
                </button>
              </Link>
            </div>
          </div>

          {/* ── RIGHT: STAR OF THE SHOW — Conversation Analysis Graphic ── */}
          <div className="flex-1 w-full max-w-[480px] lg:max-w-none relative select-none">

            {/* Main chat window card */}
            <div className="relative glass-card rounded-[28px] shadow-[0_24px_80px_rgba(0,0,0,0.12)] dark:shadow-[0_24px_80px_rgba(0,0,0,0.4)] p-5 overflow-hidden noise">

              {/* Fake window chrome */}
              <div className="flex items-center gap-2 mb-4 pb-4 border-b border-zinc-200/60 dark:border-zinc-800/60">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-400/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-400/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-400/80" />
                </div>
                <div className="flex-1 mx-3 h-6 rounded-md bg-zinc-100/80 dark:bg-zinc-800/80 flex items-center px-3">
                  <span className="text-[11px] text-zinc-400 font-mono">chat_export_aug_14.txt</span>
                </div>
                {/* Scan indicator */}
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/60 dark:border-indigo-800/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                  <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold tracking-wide">ANALYZING</span>
                </div>
              </div>

              {/* Scan line effect */}
              <div
                className="scan-line absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-400/50 to-transparent pointer-events-none z-20"
                style={{ top: "10%" }}
              />

              {/* Chat messages */}
              <div className="flex flex-col gap-3 relative z-10">

                {/* Message A — from "Alex" */}
                <div className="msg-bubble flex flex-col items-start gap-1">
                  <span className="text-[11px] text-zinc-400 dark:text-zinc-600 ml-1 font-medium">Alex</span>
                  <div className="flex items-start gap-2 max-w-[85%]">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex-shrink-0 flex items-center justify-center text-white text-[11px] font-bold">A</div>
                    <div className="relative">
                      <div className="px-4 py-2.5 rounded-[16px] rounded-tl-[4px] bg-white dark:bg-zinc-800 border border-zinc-200/60 dark:border-zinc-700/60 shadow-sm">
                        <p className="text-[13px] text-zinc-700 dark:text-zinc-200 leading-relaxed">
                          I already told you, it&apos;s <span className="bg-rose-100 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 px-1 rounded font-medium">not my fault</span> the project failed.
                        </p>
                      </div>
                      {/* Annotation badge — floats off the card */}
                      <div className="absolute -right-3 -top-3 float-a">
                        <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-rose-500 shadow-lg shadow-rose-500/30 pulse-red">
                          <ShieldAlert className="w-3 h-3 text-white" />
                          <span className="text-[10px] font-bold text-white tracking-wide">Deflection</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Message B — from "Jordan" */}
                <div className="msg-bubble flex flex-col items-end gap-1">
                  <span className="text-[11px] text-zinc-400 dark:text-zinc-600 mr-1 font-medium">Jordan</span>
                  <div className="flex items-start justify-end gap-2 max-w-[85%] self-end">
                    <div className="relative">
                      <div className="px-4 py-2.5 rounded-[16px] rounded-tr-[4px] bg-indigo-600 shadow-sm">
                        <p className="text-[13px] text-white leading-relaxed">
                          Fine. What do <em>you</em> think we should do to move forward?
                        </p>
                      </div>
                      {/* Annotation */}
                      <div className="absolute -left-3 -top-3 float-b">
                        <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/30">
                          <span className="text-[10px] font-bold text-white tracking-wide">+Constructive</span>
                        </div>
                      </div>
                    </div>
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-400 to-violet-600 flex-shrink-0 flex items-center justify-center text-white text-[11px] font-bold">J</div>
                  </div>
                </div>

                {/* Message C — from "Alex" again */}
                <div className="msg-bubble flex flex-col items-start gap-1">
                  <span className="text-[11px] text-zinc-400 dark:text-zinc-600 ml-1 font-medium">Alex</span>
                  <div className="flex items-start gap-2 max-w-[90%]">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 flex-shrink-0 flex items-center justify-center text-white text-[11px] font-bold">A</div>
                    <div className="relative">
                      <div className="px-4 py-2.5 rounded-[16px] rounded-tl-[4px] bg-white dark:bg-zinc-800 border border-zinc-200/60 dark:border-zinc-700/60 shadow-sm">
                        <p className="text-[13px] text-zinc-700 dark:text-zinc-200 leading-relaxed">
                          I <span className="bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 px-1 rounded font-medium">guess</span> we could revisit the timeline…{" "}
                          <span className="bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 px-1 rounded font-medium">if you want.</span>
                        </p>
                      </div>
                      <div className="absolute -right-3 -top-3 float-c">
                        <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500 shadow-lg shadow-amber-500/30">
                          <span className="text-[10px] font-bold text-white tracking-wide">Passive tone</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Divider: analysis begins */}
                <div className="flex items-center gap-3 my-1">
                  <div className="flex-1 h-px bg-zinc-200/60 dark:bg-zinc-800/60" />
                  <span className="text-[10px] font-semibold tracking-widest text-zinc-400 dark:text-zinc-600 uppercase">AI Analysis</span>
                  <div className="flex-1 h-px bg-zinc-200/60 dark:bg-zinc-800/60" />
                </div>

                {/* Analysis result row */}
                <div className="flex flex-col gap-2 px-1">

                  {/* Sentiment bar */}
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] text-zinc-400 dark:text-zinc-500 w-20 flex-shrink-0 font-medium">Sentiment</span>
                    <div className="flex-1 h-2 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: "38%",
                          background: "linear-gradient(to right, #f87171, #fb923c)",
                        }}
                      />
                    </div>
                    <span className="text-[11px] font-bold text-rose-500 w-12 text-right">Tense</span>
                  </div>

                  {/* Health score */}
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] text-zinc-400 dark:text-zinc-500 w-20 flex-shrink-0 font-medium">Health</span>
                    <div className="flex-1 h-2 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: "54%",
                          background: "linear-gradient(to right, #facc15, #84cc16)",
                        }}
                      />
                    </div>
                    <span className="text-[11px] font-bold text-amber-500 w-12 text-right">54 / 100</span>
                  </div>

                  {/* Red flags */}
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] text-zinc-400 dark:text-zinc-500 w-20 flex-shrink-0 font-medium">Red flags</span>
                    <div className="flex gap-1.5 flex-wrap">
                      {["Blame-shifting", "Passiveness", "Evasion"].map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border border-rose-200/60 dark:border-rose-800/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating accent card — health score callout */}
            <div className="absolute -bottom-6 -left-6 glass-card rounded-2xl px-4 py-3 shadow-xl float-b hidden sm:flex flex-col gap-0.5">
              <span className="text-[10px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">Overall Score</span>
              <div className="flex items-baseline gap-1">
                <span className="font-display text-3xl text-zinc-900 dark:text-white">54</span>
                <span className="text-[12px] text-zinc-400">/100</span>
              </div>
              <span className="text-[11px] font-medium text-amber-600 dark:text-amber-400">Needs attention</span>
            </div>

            {/* Floating accent card — messages scanned */}
            <div className="absolute -top-4 -right-4 glass-card rounded-2xl px-4 py-3 shadow-xl float-a hidden sm:flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/60 flex items-center justify-center">
                <MessageSquare className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              </div>
              <div>
                <span className="text-[10px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest block">Scanned</span>
                <span className="font-display text-xl text-zinc-900 dark:text-white">47 msgs</span>
              </div>
            </div>

          </div>
        </div>

        {/* ── FEATURES — Editorial Alternating Strips ───────── */}
        <div className="mt-32 w-full flex flex-col">

          {/* Divider label */}
          <div className="flex items-center gap-4 mb-16">
            <div className="flex-1 h-px bg-zinc-200/70 dark:bg-zinc-800/70" />
            <span className="text-[11px] font-semibold tracking-[0.2em] uppercase text-zinc-400 dark:text-zinc-600">What you get</span>
            <div className="flex-1 h-px bg-zinc-200/70 dark:bg-zinc-800/70" />
          </div>

          {/* ── STRIP 1: Tone & Sentiment ── */}
          <div className="group flex flex-col md:flex-row items-center gap-10 md:gap-16 py-14 border-t border-zinc-200/60 dark:border-zinc-800/60 hover:border-zinc-300/80 dark:hover:border-zinc-700/80 transition-colors">
            {/* Visual: Sentiment wave + emoji spectrum */}
            <div className="w-full md:w-[45%] flex-shrink-0 flex items-center justify-center">
              <div className="relative w-full max-w-sm h-44 rounded-2xl overflow-hidden bg-gradient-to-br from-indigo-50 to-white dark:from-zinc-900 dark:to-zinc-950 border border-zinc-200/50 dark:border-zinc-800/50 shadow-inner">
                {/* Sentiment gradient bar */}
                <div className="absolute bottom-8 left-6 right-6 h-3 rounded-full overflow-hidden" style={{ background: "linear-gradient(to right, #ef4444, #f97316, #facc15, #84cc16, #22c55e)" }}>
                  {/* Cursor dot */}
                  <div className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white shadow-lg border-2 border-zinc-300 dark:border-zinc-600 transition-all" style={{ left: "38%", marginLeft: "-10px" }} />
                </div>
                {/* Labels */}
                <div className="absolute bottom-2.5 left-6 text-[10px] text-zinc-400 font-medium">Negative</div>
                <div className="absolute bottom-2.5 right-6 text-[10px] text-zinc-400 font-medium">Positive</div>
                {/* Wave SVG */}
                <svg className="absolute top-0 left-0 w-full h-28 opacity-20 dark:opacity-10" viewBox="0 0 360 80" preserveAspectRatio="none">
                  <path d="M0 50 C30 20, 60 70, 90 40 S150 10, 180 45 S240 70, 270 35 S330 55, 360 30" stroke="#6366f1" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
                  <path d="M0 55 C30 30, 60 65, 90 48 S150 25, 180 52 S240 65, 270 42 S330 58, 360 38" stroke="#a5b4fc" strokeWidth="1.5" fill="none" strokeLinecap="round" opacity="0.5"/>
                </svg>
                {/* Tone tags floating above bar */}
                <div className="absolute top-5 left-0 right-0 flex justify-around px-4">
                  {[
                    { label: "Hostile", color: "bg-rose-100 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400" },
                    { label: "Tense", color: "bg-amber-100 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400" },
                    { label: "Neutral", color: "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400" },
                    { label: "Warm", color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400" },
                  ].map((t) => (
                    <span key={t.label} className={`px-2.5 py-1 rounded-full text-[10px] font-semibold border border-white/60 dark:border-zinc-700/40 shadow-sm ${t.color}`}>{t.label}</span>
                  ))}
                </div>
                {/* Current reading */}
                <div className="absolute top-[52px] left-1/2 -translate-x-1/2 text-center">
                  <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-widest">Current reading</div>
                  <div className="font-display text-2xl text-amber-600 dark:text-amber-400 mt-0.5">Tense</div>
                </div>
              </div>
            </div>
            {/* Copy */}
            <div className="flex flex-col gap-3 md:gap-4">
              <div className="flex items-center gap-3">
                <span className="font-display text-[13px] text-zinc-300 dark:text-zinc-700 select-none">01</span>
                <div className="h-px w-8 bg-indigo-400/50" />
                <span className="text-[11px] font-semibold tracking-widest uppercase text-indigo-500 dark:text-indigo-400">Tone & Sentiment</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl leading-tight text-zinc-900 dark:text-white">
                Feel the room,<br /><em>message by message.</em>
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 text-[15px] leading-relaxed font-light max-w-md">
                Every exchange carries an emotional charge. We map the full arc — from the first message to the last — so you see exactly when the temperature shifted and why.
              </p>
              <div className="flex flex-wrap gap-2 mt-1">
                {["Positive · Negative · Neutral", "Per-message mapping", "Emotional arc timeline"].map(t => (
                  <span key={t} className="text-[12px] text-zinc-500 dark:text-zinc-500 font-medium">{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* ── STRIP 2: Red Flag Detection ── (reversed) */}
          <div className="group flex flex-col md:flex-row-reverse items-center gap-10 md:gap-16 py-14 border-t border-zinc-200/60 dark:border-zinc-800/60 hover:border-zinc-300/80 dark:hover:border-zinc-700/80 transition-colors">
            {/* Visual: message with flag overlays */}
            <div className="w-full md:w-[45%] flex-shrink-0 flex items-center justify-center">
              <div className="relative w-full max-w-sm rounded-2xl overflow-hidden bg-gradient-to-br from-rose-50 to-white dark:from-zinc-900 dark:to-zinc-950 border border-zinc-200/50 dark:border-zinc-800/50 shadow-inner p-5 flex flex-col gap-3">
                {[
                  { text: "It's not like I had a choice, you know.", tag: "Victimhood", color: "rose" },
                  { text: "You always do this to me.", tag: "Blame-shifting", color: "rose" },
                  { text: "Fine. Whatever you think is best.", tag: "Passive aggression", color: "amber" },
                ].map((m, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${m.color === "rose" ? "bg-rose-400" : "bg-amber-400"}`} />
                    <div className="flex-1">
                      <p className="text-[13px] text-zinc-700 dark:text-zinc-300 leading-snug mb-1">{m.text}</p>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                        m.color === "rose"
                          ? "bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border-rose-200/60 dark:border-rose-800/60"
                          : "bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border-amber-200/60 dark:border-amber-800/60"
                      }`}>
                        <ShieldAlert className="w-2.5 h-2.5" />
                        {m.tag}
                      </span>
                    </div>
                  </div>
                ))}
                {/* Summary strip */}
                <div className="mt-2 pt-3 border-t border-zinc-200/60 dark:border-zinc-800/60 flex items-center justify-between">
                  <span className="text-[11px] text-zinc-400 font-medium">3 flags detected</span>
                  <div className="flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-rose-400" />
                    <span className="w-2 h-2 rounded-full bg-rose-400" />
                    <span className="w-2 h-2 rounded-full bg-amber-400" />
                  </div>
                </div>
              </div>
            </div>
            {/* Copy */}
            <div className="flex flex-col gap-3 md:gap-4">
              <div className="flex items-center gap-3">
                <span className="font-display text-[13px] text-zinc-300 dark:text-zinc-700 select-none">02</span>
                <div className="h-px w-8 bg-rose-400/50" />
                <span className="text-[11px] font-semibold tracking-widest uppercase text-rose-500 dark:text-rose-400">Red Flag Detection</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl leading-tight text-zinc-900 dark:text-white">
                The patterns<br /><em>hiding in plain sight.</em>
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 text-[15px] leading-relaxed font-light max-w-md">
                Gaslighting, deflection, passive aggression — they hide in ordinary-sounding sentences. Our model names them precisely, down to the exact phrase that set it off.
              </p>
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                {["Gaslighting", "Deflection", "Victimhood", "Manipulation", "Evasion"].map(t => (
                  <span key={t} className="text-[12px] text-rose-400/70 dark:text-rose-600/70 font-medium">{t}</span>
                ))}
              </div>
            </div>
          </div>

          {/* ── STRIP 3: Health Scoring ── */}
          <div className="group flex flex-col md:flex-row items-center gap-10 md:gap-16 py-14 border-t border-b border-zinc-200/60 dark:border-zinc-800/60 hover:border-zinc-300/80 dark:hover:border-zinc-700/80 transition-colors">
            {/* Visual: big score dial */}
            <div className="w-full md:w-[45%] flex-shrink-0 flex items-center justify-center">
              <div className="relative w-full max-w-sm h-48 flex items-center justify-center rounded-2xl bg-gradient-to-br from-zinc-50 to-white dark:from-zinc-900 dark:to-zinc-950 border border-zinc-200/50 dark:border-zinc-800/50 shadow-inner overflow-hidden">
                {/* Arc gauge SVG */}
                <svg viewBox="0 0 200 120" className="absolute bottom-0 w-[280px]">
                  {/* Track */}
                  <path d="M 20 110 A 80 80 0 0 1 180 110" stroke="#e5e7eb" strokeWidth="14" fill="none" strokeLinecap="round" className="dark:stroke-zinc-800" />
                  {/* Fill — 54% */}
                  <path d="M 20 110 A 80 80 0 0 1 180 110" stroke="url(#scoreGrad)" strokeWidth="14" fill="none" strokeLinecap="round"
                    strokeDasharray="251.2" strokeDashoffset="115.6" />
                  <defs>
                    <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#f87171" />
                      <stop offset="50%" stopColor="#facc15" />
                      <stop offset="100%" stopColor="#22c55e" />
                    </linearGradient>
                  </defs>
                  {/* Needle dot */}
                  <circle cx="103" cy="32" r="6" fill="#facc15" className="drop-shadow" />
                </svg>
                {/* Score number */}
                <div className="relative z-10 text-center mt-6">
                  <div className="font-display text-6xl text-zinc-900 dark:text-white leading-none">54</div>
                  <div className="text-[12px] text-zinc-400 font-medium mt-1">out of 100</div>
                  <div className="mt-2 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 text-[11px] font-bold inline-block">Needs attention</div>
                </div>
                {/* Side labels */}
                <span className="absolute bottom-5 left-8 text-[10px] text-zinc-400 font-medium">Poor</span>
                <span className="absolute bottom-5 right-8 text-[10px] text-zinc-400 font-medium">Healthy</span>
                {/* Sub-metrics row */}
                <div className="absolute top-4 left-0 right-0 flex justify-center gap-4">
                  {[
                    { label: "Cooperation", val: "48%" },
                    { label: "Clarity", val: "61%" },
                    { label: "Balance", val: "53%" },
                  ].map(m => (
                    <div key={m.label} className="flex flex-col items-center gap-0.5">
                      <span className="font-display text-base text-zinc-700 dark:text-zinc-300">{m.val}</span>
                      <span className="text-[9px] text-zinc-400 uppercase tracking-wide">{m.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Copy */}
            <div className="flex flex-col gap-3 md:gap-4">
              <div className="flex items-center gap-3">
                <span className="font-display text-[13px] text-zinc-300 dark:text-zinc-700 select-none">03</span>
                <div className="h-px w-8 bg-emerald-400/50" />
                <span className="text-[11px] font-semibold tracking-widest uppercase text-emerald-500 dark:text-emerald-400">Health Scoring</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl leading-tight text-zinc-900 dark:text-white">
                One number.<br /><em>Complete clarity.</em>
              </h2>
              <p className="text-zinc-500 dark:text-zinc-400 text-[15px] leading-relaxed font-light max-w-md">
                We collapse the complexity of an entire conversation — cooperation, constructiveness, and mutual respect — into a single score from 0 to 100. No interpretation required.
              </p>
              <div className="flex items-center gap-3 mt-1">
                <div className="flex-1 h-1.5 rounded-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                  <div className="h-full rounded-full" style={{ width: "54%", background: "linear-gradient(to right, #f87171, #facc15, #22c55e)" }} />
                </div>
                <span className="text-[12px] text-zinc-400 font-medium">54 / 100</span>
              </div>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}