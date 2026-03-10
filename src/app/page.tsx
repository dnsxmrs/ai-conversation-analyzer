import Link from "next/link";
import { ArrowRight, MessageSquare, ShieldAlert, Activity } from "lucide-react";
import CanvasBackground from "@/components/CanvasBackground";

export default function Home() {
  return (
    <div className="relative flex flex-col items-center overflow-hidden bg-zinc-50 dark:bg-black font-sans selection:bg-zinc-200 dark:selection:bg-zinc-800">
      <CanvasBackground />
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-500/10 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 blur-[120px]" />
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[60%] h-[30%] rounded-full bg-rose-500/5 blur-[150px]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60 dark:opacity-40" />
      </div>

      <main className="relative z-10 flex flex-col items-center justify-center w-full max-w-6xl px-6 pt-32 pb-24 mx-auto text-center flex-grow">

        {/* Animated Badge */}
        {/* <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full border border-zinc-200/60 bg-white/40 backdrop-blur-md shadow-sm dark:border-zinc-800/60 dark:bg-zinc-900/40 hover:bg-white/60 dark:hover:bg-zinc-900/60 transition-colors cursor-default">
          <Sparkles className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
          <span className="text-[13px] font-semibold tracking-wide uppercase text-zinc-700 dark:text-zinc-300">
            AI-Powered Conversation Analysis
          </span>
        </div> */}

        {/* Hero Headline */}
        <h1 className="max-w-4xl text-5xl font-extrabold tracking-tight text-transparent sm:text-6xl md:text-7xl bg-clip-text bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-500 dark:from-white dark:via-zinc-200 dark:to-zinc-500 mb-8 pb-1">
          Uncover the hidden dynamics of your chats.
        </h1>

        {/* Hero Deck / Subtitle */}
        <p className="max-w-2xl text-lg sm:text-xl text-zinc-600 dark:text-zinc-400 mb-12 leading-relaxed font-light">
          Upload any conversation and let AI decode the underlying tone, spot red flags, measure sentiment, and score the true health of your communication instantly.
        </p>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link href="/register" className="w-full sm:w-auto">
            <button className="flex items-center justify-center w-full sm:w-auto rounded-full px-8 h-14 text-[15px] font-semibold gap-2 bg-zinc-900 hover:bg-zinc-800 text-white dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-white transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0">
              Start Analyzing for Free
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </Link>
          <Link href="/login" className="w-full sm:w-auto">
            <button className="flex items-center justify-center w-full sm:w-auto rounded-full px-8 h-14 text-[15px] font-medium border border-zinc-200/80 bg-white/50 backdrop-blur-md hover:bg-white dark:border-zinc-800/80 dark:bg-zinc-900/50 dark:hover:bg-zinc-900 transition-all text-zinc-900 dark:text-zinc-100">
              Log in to Dashboard
            </button>
          </Link>
        </div>

        {/* Features Grid below fold */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-32 text-left w-full">
          {/* Feature 1 */}
          <div className="p-8 rounded-[24px] bg-white/40 backdrop-blur-xl border border-white/60 dark:bg-zinc-900/30 dark:border-zinc-800/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all group">
            <div className="w-12 h-12 rounded-full bg-indigo-100/80 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-semibold mb-3 tracking-tight text-zinc-900 dark:text-white">Tone & Sentiment</h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-[15px] leading-relaxed font-light">
              Instantly understand the overall mood of an interaction. See at a glance if the conversation was positive, negative, or perfectly neutral.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="p-8 rounded-[24px] bg-white/40 backdrop-blur-xl border border-white/60 dark:bg-zinc-900/30 dark:border-zinc-800/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all group">
            <div className="w-12 h-12 rounded-full bg-rose-100/80 text-rose-600 dark:bg-rose-900/40 dark:text-rose-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-semibold mb-3 tracking-tight text-zinc-900 dark:text-white">Red Flag Detection</h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-[15px] leading-relaxed font-light">
              Identify hidden toxic patterns like passive aggression, emotional manipulation, or evasiveness message-by-message accurately.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="p-8 rounded-[24px] bg-white/40 backdrop-blur-xl border border-white/60 dark:bg-zinc-900/30 dark:border-zinc-800/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.1)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-all group">
            <div className="w-12 h-12 rounded-full bg-emerald-100/80 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Activity className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-semibold mb-3 tracking-tight text-zinc-900 dark:text-white">Health Scoring</h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-[15px] leading-relaxed font-light">
              Get an overall communication health score out of 100 evaluating cooperativeness and constructive dialogue for complete clarity.
            </p>
          </div>
        </div>

      </main>
    </div>
  );
}
