"use client";

import { useEffect, useRef } from "react";

// --- Types ---
interface Node {
    x: number;
    y: number;
    vx: number;
    vy: number;
    r: number;
    color: string;
}

interface Bubble {
    x: number;
    y: number;
    w: number;
    h: number;
    speed: number;
    opacity: number;
    side: "left" | "right";
    lineCount: number;
}

interface Tag {
    label: string;
    color: string;
    x: string;
    delay: string;
    dur: string;
}

// --- Animated Background Canvas ---
function ConvoCanvas() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animId: number;
        let W: number, H: number;

        const resize = () => {
            W = canvas.width = canvas.offsetWidth;
            H = canvas.height = canvas.offsetHeight;
        };

        resize();
        window.addEventListener("resize", resize);

        // --- Nodes ---
        const NODE_COUNT = 22;
        const nodes: Node[] = Array.from({ length: NODE_COUNT }, () => ({
            x: Math.random() * W,
            y: Math.random() * H,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            r: Math.random() * 3 + 2,
            color: [
                "rgba(52,211,153,",
                "rgba(251,113,133,",
                "rgba(129,140,248,",
                "rgba(161,161,170,",
            ][Math.floor(Math.random() * 4)],
        }));

        // --- Floating chat bubbles ---
        const BUBBLE_COUNT = 9;
        const bubbles: Bubble[] = Array.from({ length: BUBBLE_COUNT }, () => ({
            x: Math.random() * W,
            y: H + Math.random() * H,
            w: Math.random() * 80 + 60,
            h: Math.random() * 20 + 18,
            speed: Math.random() * 0.25 + 0.1,
            opacity: Math.random() * 0.07 + 0.03,
            side: Math.random() > 0.5 ? "left" : "right",
            lineCount: Math.floor(Math.random() * 2) + 1,
        }));

        const drawBubble = (
            x: number,
            y: number,
            w: number,
            h: number,
            r: number,
            side: "left" | "right",
            ctx: CanvasRenderingContext2D
        ) => {
            r = Math.min(r, h / 2);
            const tailSize = 7;

            ctx.beginPath();
            ctx.moveTo(x + r, y);
            ctx.lineTo(x + w - r, y);
            ctx.quadraticCurveTo(x + w, y, x + w, y + r);
            ctx.lineTo(x + w, y + h - r);
            ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);

            if (side === "right") {
                ctx.lineTo(x + w * 0.65 + tailSize, y + h);
                ctx.lineTo(x + w * 0.65, y + h + tailSize);
                ctx.lineTo(x + w * 0.65 - tailSize, y + h);
            }

            ctx.lineTo(x + r, y + h);
            ctx.quadraticCurveTo(x, y + h, x, y + h - r);

            if (side === "left") {
                ctx.lineTo(x, y + h * 0.7 + tailSize);
                ctx.lineTo(x - tailSize, y + h * 0.7);
                ctx.lineTo(x, y + h * 0.7 - tailSize);
            }

            ctx.lineTo(x, y + r);
            ctx.quadraticCurveTo(x, y, x + r, y);
            ctx.closePath();
        };

        let t = 0;

        const draw = () => {
            t++;
            ctx.clearRect(0, 0, W, H);

            // --- Draw connections ---
            for (let i = 0; i < nodes.length; i++) {
                for (let j = i + 1; j < nodes.length; j++) {
                    const dx = nodes[i].x - nodes[j].x;
                    const dy = nodes[i].y - nodes[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    const maxDist = 160;
                    if (dist < maxDist) {
                        const alpha = (1 - dist / maxDist) * 0.12;

                        ctx.beginPath();
                        ctx.moveTo(nodes[i].x, nodes[i].y);
                        ctx.lineTo(nodes[j].x, nodes[j].y);
                        ctx.strokeStyle = `rgba(161,161,170,${alpha})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            }

            // --- Draw nodes ---
            for (const n of nodes) {
                n.x += n.vx;
                n.y += n.vy;

                if (n.x < 0 || n.x > W) n.vx *= -1;
                if (n.y < 0 || n.y > H) n.vy *= -1;

                const pulse = Math.sin(t * 0.02 + n.x) * 0.5 + 0.5;

                ctx.beginPath();
                ctx.arc(n.x, n.y, n.r + pulse * 2, 0, Math.PI * 2);
                ctx.fillStyle = n.color + "0.15)";
                ctx.fill();

                ctx.beginPath();
                ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
                ctx.fillStyle = n.color + "0.5)";
                ctx.fill();
            }

            // --- Bubbles ---
            for (const b of bubbles) {
                b.y -= b.speed;

                if (b.y + b.h < -20) {
                    b.y = H + 20;
                    b.x = Math.random() * W;
                }

                ctx.save();

                drawBubble(b.x, b.y, b.w, b.h, 8, b.side, ctx);

                ctx.fillStyle = `rgba(255,255,255,${b.opacity})`;
                ctx.fill();

                ctx.strokeStyle = `rgba(255,255,255,${b.opacity * 1.5})`;
                ctx.lineWidth = 0.8;
                ctx.stroke();

                ctx.fillStyle = `rgba(255,255,255,${b.opacity * 2})`;

                const lineY1 = b.y + b.h * 0.38;
                const lineY2 = b.y + b.h * 0.68;

                const pad = 10;
                const lineW1 = b.w * 0.55;
                const lineW2 = b.w * 0.35;

                ctx.fillRect(b.x + pad, lineY1 - 2, lineW1, 3);

                if (b.lineCount > 1)
                    ctx.fillRect(b.x + pad, lineY2 - 2, lineW2, 3);

                ctx.restore();
            }

            animId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            cancelAnimationFrame(animId);
            window.removeEventListener("resize", resize);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full"
            style={{ opacity: 0.9 }}
        />
    );
}

// --- Sentiment Tag Floaters ---
const TAGS: Tag[] = [
    { label: "passive-aggressive", color: "#fb7185", x: "8%", delay: "0s", dur: "14s" },
    { label: "positive tone", color: "#34d399", x: "72%", delay: "3s", dur: "16s" },
    { label: "evasive", color: "#f59e0b", x: "55%", delay: "6s", dur: "13s" },
    { label: "manipulative", color: "#f43f5e", x: "20%", delay: "1.5s", dur: "17s" },
    { label: "empathetic", color: "#818cf8", x: "85%", delay: "8s", dur: "15s" },
    { label: "cooperative", color: "#34d399", x: "40%", delay: "4s", dur: "18s" },
];

function SentimentTags() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <style>{`
        @keyframes floatTag {
          0% { transform: translateY(110vh) translateX(0px); opacity: 0; }
          5% { opacity: 1; }
          90% { opacity: 0.5; }
          100% { transform: translateY(-10vh) translateX(20px); opacity: 0; }
        }
      `}</style>

            {TAGS.map((tag) => (
                <div
                    key={tag.label}
                    style={{
                        position: "absolute",
                        left: tag.x,
                        bottom: 0,
                        animationName: "floatTag",
                        animationDuration: tag.dur,
                        animationDelay: tag.delay,
                        animationTimingFunction: "linear",
                        animationIterationCount: "infinite",
                    }}
                >
                    <div
                        style={{
                            border: `1px solid ${tag.color}55`,
                            color: tag.color,
                            backgroundColor: `${tag.color}11`,
                            backdropFilter: "blur(6px)",
                            borderRadius: "999px",
                            padding: "3px 12px",
                            fontSize: "11px",
                            fontWeight: 500,
                            letterSpacing: "0.03em",
                            whiteSpace: "nowrap",
                            opacity: 0.7,
                        }}
                    >
                        {tag.label}
                    </div>
                </div>
            ))}
        </div>
    );
}

// --- Main Export ---
export default function ConvoBackground() {
    return (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-emerald-500/10 blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-500/10 blur-[120px]" />
            <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[60%] h-[30%] rounded-full bg-rose-500/5 blur-[150px]" />

            <ConvoCanvas />

            <SentimentTags />

            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-60 dark:opacity-40" />
        </div>
    );
}