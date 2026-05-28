"use client";
import React, { useEffect, useRef, useState } from "react";

// ── Dark mode hook ─────────────────────────────────────────────────────────────
function useDarkMode() {
  const [dark, setDark] = React.useState(false);
  React.useEffect(() => {
    setDark(document.documentElement.classList.contains("dark"));
    const obs = new MutationObserver(() =>
      setDark(document.documentElement.classList.contains("dark"))
    );
    obs.observe(document.documentElement, { attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);
  return dark;
}

// ── Typewriter ────────────────────────────────────────────────────────────────
function useTypewriter(texts: string[], speed = 55, pause = 1800) {
  const [charIdx, setCharIdx] = useState(0);
  const [textIdx, setTextIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIdx];
    if (!deleting && charIdx < current.length) {
      const t = setTimeout(() => setCharIdx(c => c + 1), speed);
      return () => clearTimeout(t);
    }
    if (!deleting && charIdx === current.length) {
      const t = setTimeout(() => setDeleting(true), pause);
      return () => clearTimeout(t);
    }
    if (deleting && charIdx > 0) {
      const t = setTimeout(() => setCharIdx(c => c - 1), speed / 2);
      return () => clearTimeout(t);
    }
    if (deleting && charIdx === 0) {
      setDeleting(false);
      setTextIdx(i => (i + 1) % texts.length);
    }
  }, [charIdx, deleting, textIdx, texts, speed, pause]);

  return texts[textIdx].slice(0, charIdx);
}

// ── Terminal lines (full-stack: backend + frontend + devops) ────────────────
const LINES = [
  { delay: 200,  text: "$ quarkus build --native --no-tests",             color: "#e2e8f0" },
  { delay: 1000, text: "\u2713  BUILD SUCCESS  [2.3s]",                        color: "#4ade80" },
  { delay: 1600, text: "$ ng build --configuration=production",            color: "#e2e8f0" },
  { delay: 2400, text: "\u2713  Browser bundles \u2014 287 KB gzipped",                color: "#4ade80" },
  { delay: 3000, text: "$ kubectl apply -f k8s/deploy.yaml",               color: "#e2e8f0" },
  { delay: 3800, text: "\u2713  3/3 pods Running \u2014 namespace: neobank",           color: "#4ade80" },
  { delay: 4400, text: "$ curl /api/bian/v1/payments/credit-transfer",     color: "#e2e8f0" },
  { delay: 5200, text: '{"status":"ACSC","txnId":"TXN-98213","ms":87}',    color: "#67e8f9" },
  { delay: 5900, text: "$ copilot sdd --spec=neobanco.spec.md --gen",      color: "#e2e8f0" },
  { delay: 6700, text: "\u2713  SDD plan generated \u2014 12 microservices scoped",     color: "#4ade80" },
];

// Two-color system: backend = violet, cloud/infra = cyan
// Light-mode uses accessible dark variants (WCAG AA)
const BADGES = [
  { label: "Java 17",     cat: "backend" },
  { label: "Quarkus",     cat: "backend" },
  { label: "Spring Boot", cat: "backend" },
  { label: "Angular",     cat: "backend" },
  { label: "Azure",       cat: "cloud" },
  { label: "Docker",      cat: "cloud" },
  { label: "BIAN",        cat: "backend" },
  { label: "AI SDD",      cat: "backend" },
  { label: "ELK",         cat: "cloud" },
];

const ROLES = [
  "Senior Backend Engineer",
  "FinTech & Neobanking Architect",
  "AI-Driven Full-Stack Developer",
  "Systems Engineer",
];

// ── Component ─────────────────────────────────────────────────────────────────
export default function HeroTerminal() {
  const dark = useDarkMode();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const role = useTypewriter(ROLES, 55, 1600);
  const [blink, setBlink] = useState(true);
  const [visibleLines, setVisibleLines] = useState<Set<number>>(new Set());
  const [badgesVisible, setBadgesVisible] = useState(false);

  const stars = useRef(
    Array.from({ length: 45 }, () => ({
      cx: Math.random() * 100,
      cy: Math.random() * 100,
      r: Math.random() * 1.3 + 0.3,
      opacity: Math.random() * 0.22 + 0.05,
      dur: 2 + Math.random() * 3.5,
      delay: Math.random() * 4,
    }))
  ).current;

  const accentColor = "#7c3aed";
  const borderColor = dark ? "rgba(124,58,237,0.22)" : "rgba(124,58,237,0.18)";
  // Badge colors — dark uses bright variants, light uses WCAG-AA accessible versions
  const badgeViolet = dark ? "#a78bfa" : "#7c3aed";  // ratios: dark ~6.1:1, light ~8.9:1
  const badgeCyan   = dark ? "#67e8f9" : "#0284c7";  // ratios: dark ~12:1,  light ~5.7:1

  // Particle canvas — skipped for users who prefer reduced motion
  useEffect(() => {
    if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;
    let W = 0, H = 0;

    const PARTICLES = Array.from({ length: 55 }, () => ({
      x: Math.random(), y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00025,
      vy: (Math.random() - 0.5) * 0.00025,
      r: Math.random() * 1.4 + 0.4,
      opacity: Math.random() * 0.38 + 0.08,
    }));

    const resize = () => {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W;
      canvas.height = H;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < PARTICLES.length; i++) {
        const p = PARTICLES[i];
        p.x = (p.x + p.vx + 1) % 1;
        p.y = (p.y + p.vy + 1) % 1;
        const px = p.x * W, py = p.y * H;
        ctx.beginPath();
        ctx.arc(px, py, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(124,58,237,${p.opacity})`;
        ctx.fill();

        for (let j = i + 1; j < PARTICLES.length; j++) {
          const q = PARTICLES[j];
          const dx = (p.x - q.x) * W;
          const dy = (p.y - q.y) * H;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 110) {
            ctx.beginPath();
            ctx.moveTo(px, py);
            ctx.lineTo(q.x * W, q.y * H);
            ctx.strokeStyle = `rgba(124,58,237,${0.1 * (1 - d / 110)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      rafRef.current = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Cursor blink
  useEffect(() => {
    const iv = setInterval(() => setBlink(v => !v), 530);
    return () => clearInterval(iv);
  }, []);

  // Terminal lines stagger
  useEffect(() => {
    LINES.forEach((l, i) => {
      setTimeout(() => setVisibleLines(prev => new Set([...prev, i])), l.delay);
    });
    setTimeout(() => setBadgesVisible(true), 300);
  }, []);

  return (
    <div style={{
      position: "relative",
      width: "100%",
      minHeight: "clamp(300px, 60vh, 520px)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: 28,
      borderRadius: 20,
      overflow: "hidden",
      border: `1px solid ${borderColor}`,
      background: dark
        ? "linear-gradient(155deg, #06051a 0%, #0b0a22 55%, #070720 100%)"
        : "linear-gradient(155deg, #fdf4ff 0%, #f5f3ff 55%, #f3e8ff 100%)",
      padding: "clamp(32px,5vw,52px) clamp(16px,4vw,32px) clamp(28px,4vw,44px)",
      boxShadow: dark
        ? "0 0 80px rgba(124,58,237,0.1), 0 2px 6px rgba(0,0,0,0.3)"
        : "0 4px 48px rgba(124,58,237,0.1)",
    }}>
      {/* Stars — dark mode only */}
      {dark && (
        <svg
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
          aria-hidden="true"
        >
          {stars.map((s, i) => (
            <circle key={i} cx={`${s.cx}%`} cy={`${s.cy}%`} r={s.r} fill="white" opacity={s.opacity}>
              <animate
                attributeName="opacity"
                values={`${s.opacity};${Math.min(s.opacity * 3.5, 0.75)};${s.opacity}`}
                dur={`${s.dur}s`}
                begin={`${s.delay}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
        </svg>
      )}

      {/* Accent gradient line — top edge */}
      <div style={{
        position: "absolute", top: 0, left: "8%", right: "8%", height: 1,
        background: dark
          ? "linear-gradient(90deg, transparent, #7c3aed, #0ea5e9, transparent)"
          : "linear-gradient(90deg, transparent, #a78bfa, #7c3aed, transparent)",
        opacity: dark ? 0.55 : 0.65,
      }} />

      {/* Corner brackets */}
      {([
        { top: 10, left: 10, bt: true, bl: true },
        { top: 10, right: 10, bt: true, br: true },
        { bottom: 10, left: 10, bb: true, bl: true },
        { bottom: 10, right: 10, bb: true, br: true },
      ] as const).map((c, i) => (
        <span key={i} aria-hidden="true" style={{
          position: "absolute", width: 16, height: 16, pointerEvents: "none",
          top: "top" in c ? c.top : undefined,
          bottom: "bottom" in c ? c.bottom : undefined,
          left: "left" in c ? c.left : undefined,
          right: "right" in c ? c.right : undefined,
          borderTop: "bt" in c && c.bt ? `1px solid ${borderColor}` : undefined,
          borderBottom: "bb" in c && c.bb ? `1px solid ${borderColor}` : undefined,
          borderLeft: "bl" in c && c.bl ? `1px solid ${borderColor}` : undefined,
          borderRight: "br" in c && c.br ? `1px solid ${borderColor}` : undefined,
        }} />
      ))}

      {/* Particles */}
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}
        aria-hidden="true"
      />

      <div style={{ position: "relative", zIndex: 1, width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 20, paddingTop: 12 }}>
        {/* Typewriter role */}
        <p aria-hidden="true" style={{
          fontFamily: "ui-monospace, monospace",
          fontSize: "clamp(0.7rem, 2vw, 0.88rem)",
          letterSpacing: "0.35em",
          color: dark ? "#a78bfa" : accentColor,
          margin: 0,
          textTransform: "uppercase",
        }}>
          {role}
          <span style={{ opacity: blink ? 1 : 0, transition: "opacity 0.1s" }}>_</span>
        </p>

        {/* Stack badges */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 7, justifyContent: "center", maxWidth: 620 }}>
          {BADGES.map((b, i) => {
            const bc = b.cat === "backend" ? badgeViolet : badgeCyan;
            return (
              <span
                key={b.label}
                style={{
                  fontFamily: "ui-monospace, monospace",
                  fontSize: 11,
                  padding: "4px 12px",
                  borderRadius: 20,
                  border: `1px solid ${bc}55`,
                  color: bc,
                  background: `${bc}14`,
                  opacity: badgesVisible ? 1 : 0,
                  transform: badgesVisible ? "translateY(0)" : "translateY(12px)",
                  transition: `opacity 0.45s ${i * 55}ms, transform 0.45s ${i * 55}ms`,
                  letterSpacing: "0.06em",
                }}
              >
                {b.label}
              </span>
            );
          })}
        </div>

        {/* Terminal window */}
        <div style={{
          width: "100%",
          maxWidth: 680,
          borderRadius: 14,
          overflow: "hidden",
          background: "rgba(6,5,26,0.9)",
          border: "1px solid rgba(124,58,237,0.28)",
          boxShadow: "0 12px 60px rgba(124,58,237,0.2), 0 2px 10px rgba(0,0,0,0.35)",
          backdropFilter: "blur(10px)",
        }}>
          {/* Title bar */}
          <div style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "9px 14px",
            background: "rgba(124,58,237,0.09)",
            borderBottom: "1px solid rgba(124,58,237,0.18)",
          }}>
            <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#ff5f57", flexShrink: 0 }} />
            <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#ffbd2e", flexShrink: 0 }} />
            <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#28ca41", flexShrink: 0 }} />
            <span style={{ fontFamily: "ui-monospace, monospace", fontSize: 10, color: "rgba(255,255,255,0.28)", letterSpacing: "0.14em", marginLeft: 8 }}>
              hristb@dev  ~/projects/fullstack
            </span>
          </div>

          {/* Lines */}
          <div style={{ padding: "14px 20px 18px", display: "flex", flexDirection: "column", gap: 5, minHeight: 210, overflowX: "auto" }}>
            {LINES.map((line, i) => (
              <p
                key={i}
                style={{
                  fontFamily: "ui-monospace, monospace",
                  fontSize: "clamp(10.5px, 1.55vw, 13px)",
                  color: line.color,
                  margin: 0,
                  lineHeight: 1.55,
                  opacity: visibleLines.has(i) ? 1 : 0,
                  transform: visibleLines.has(i) ? "translateX(0)" : "translateX(-6px)",
                  transition: "opacity 0.3s, transform 0.3s",
                  whiteSpace: "pre-wrap",
                }}
              >
                {line.text}
              </p>
            ))}
            <p style={{
              fontFamily: "ui-monospace, monospace",
              fontSize: "clamp(10.5px, 1.55vw, 13px)",
              color: "#e2e8f0",
              margin: 0,
              opacity: visibleLines.size === LINES.length ? 1 : 0,
              transition: "opacity 0.3s 0.2s",
            }}>
              $ <span style={{ opacity: blink ? 1 : 0, transition: "opacity 0.1s" }}>▋</span>
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
          opacity: 0.38,
          animation: "heroScrollBounce 1.9s ease-in-out infinite",
        }}>
          <span style={{ fontFamily: "ui-monospace, monospace", fontSize: 9, letterSpacing: "0.28em", color: accentColor }}>SCROLL</span>
          <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
            <line x1="7" y1="0" x2="7" y2="13" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" />
            <path d="M2 8l5 6 5-6" stroke={accentColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <style>{`
        @keyframes heroScrollBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(7px); }
        }
      `}</style>
    </div>
  );
}
