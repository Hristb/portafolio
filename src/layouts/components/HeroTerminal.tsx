"use client";
import React, { useEffect, useRef, useState } from "react";

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

// ── Terminal lines ─────────────────────────────────────────────────────────────
const LINES = [
  { delay: 200,  text: "$ quarkus build --native --no-tests",     color: "#e2e8f0" },
  { delay: 1000, text: "✓  BUILD SUCCESS  [2.3s]",                 color: "#4ade80" },
  { delay: 1600, text: "$ docker push hristb/pagos-microservice",  color: "#e2e8f0" },
  { delay: 2400, text: "✓  Pushed to registry",                    color: "#4ade80" },
  { delay: 3000, text: "$ kubectl apply -f k8s/deploy.yaml",       color: "#e2e8f0" },
  { delay: 3800, text: "✓  3/3 pods Running — namespace: neobank", color: "#4ade80" },
  { delay: 4400, text: "$ curl /api/bian/v1/payments/credit-transfer", color: "#e2e8f0" },
  { delay: 5200, text: '{"status":"ACSC","txnId":"TXN-98213","ms":87}', color: "#67e8f9" },
];

const BADGES = [
  { label: "Java 17",     color: "#f59e0b" },
  { label: "Quarkus",     color: "#4f6ef7" },
  { label: "Spring Boot", color: "#6cbd45" },
  { label: "Azure",       color: "#0ea5e9" },
  { label: "Docker",      color: "#38bdf8" },
  { label: "BIAN",        color: "#a78bfa" },
  { label: "Angular",     color: "#dd0031" },
];

const ROLES = [
  "Senior Backend Engineer",
  "FinTech Architect",
  "Java & Quarkus Dev",
  "Cloud & DevOps Engineer",
];

// ── Component ─────────────────────────────────────────────────────────────────
export default function HeroTerminal() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const role = useTypewriter(ROLES, 55, 1600);
  const [blink, setBlink] = useState(true);
  const [visibleLines, setVisibleLines] = useState<Set<number>>(new Set());
  const [badgesVisible, setBadgesVisible] = useState(false);

  // Particle canvas
  useEffect(() => {
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
    <div style={{ position: "relative", width: "100%", minHeight: 520, display: "flex", flexDirection: "column", alignItems: "center", gap: 28 }}>
      {/* Particles */}
      <canvas
        ref={canvasRef}
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }}
        aria-hidden="true"
      />

      <div style={{ position: "relative", zIndex: 1, width: "100%", display: "flex", flexDirection: "column", alignItems: "center", gap: 20, paddingTop: 12 }}>
        {/* Typewriter role */}
        <p style={{
          fontFamily: "ui-monospace, monospace",
          fontSize: "clamp(0.7rem, 2vw, 0.88rem)",
          letterSpacing: "0.35em",
          color: "#7c3aed",
          margin: 0,
          textTransform: "uppercase",
        }}>
          {role}
          <span style={{ opacity: blink ? 1 : 0, transition: "opacity 0.1s" }}>_</span>
        </p>

        {/* Stack badges */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 7, justifyContent: "center", maxWidth: 620 }}>
          {BADGES.map((b, i) => (
            <span
              key={b.label}
              style={{
                fontFamily: "ui-monospace, monospace",
                fontSize: 11,
                padding: "4px 12px",
                borderRadius: 20,
                border: `1px solid ${b.color}55`,
                color: b.color,
                background: `${b.color}14`,
                opacity: badgesVisible ? 1 : 0,
                transform: badgesVisible ? "translateY(0)" : "translateY(12px)",
                transition: `opacity 0.45s ${i * 55}ms, transform 0.45s ${i * 55}ms`,
                letterSpacing: "0.06em",
              }}
            >
              {b.label}
            </span>
          ))}
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
              hristb@indra  ~/projects/neobank-backend
            </span>
          </div>

          {/* Lines */}
          <div style={{ padding: "14px 20px 18px", display: "flex", flexDirection: "column", gap: 5, minHeight: 210 }}>
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
                  whiteSpace: "pre",
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
          <span style={{ fontFamily: "ui-monospace, monospace", fontSize: 9, letterSpacing: "0.28em", color: "#7c3aed" }}>SCROLL</span>
          <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
            <line x1="7" y1="0" x2="7" y2="13" stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M2 8l5 6 5-6" stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
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
