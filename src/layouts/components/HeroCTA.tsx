"use client";
import React, { useEffect, useRef, useState } from "react";

function useDarkMode() {
  const [dark, setDark] = React.useState(
    () => typeof document !== "undefined" && document.documentElement.classList.contains("dark")
  );
  React.useEffect(() => {
    const obs = new MutationObserver(() =>
      setDark(document.documentElement.classList.contains("dark"))
    );
    obs.observe(document.documentElement, { attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);
  return dark;
}

export default function HeroCTA() {
  const dark = useDarkMode();
  const [blink, setBlink] = useState(true);

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

  useEffect(() => {
    const iv = setInterval(() => setBlink((v) => !v), 530);
    return () => clearInterval(iv);
  }, []);

  const textColor = dark ? "rgba(255,255,255,0.95)" : "#1a0a3c";
  const mutedColor = dark ? "rgba(255,255,255,0.48)" : "rgba(55,30,90,0.58)";
  const accentColor = "#7c3aed";

  const outerBg = dark
    ? "linear-gradient(155deg, #06051a 0%, #0b0a22 55%, #070720 100%)"
    : "linear-gradient(155deg, #fdf4ff 0%, #f0f9ff 50%, #f0fdf4 100%)";

  const borderColor = dark ? "rgba(124,58,237,0.22)" : "rgba(168,85,247,0.2)";

  return (
    <section style={{ paddingBottom: 64 }}>
      <div className="container">
        <div style={{
          position: "relative", borderRadius: 20, overflow: "hidden",
          background: outerBg,
          border: `1px solid ${borderColor}`,
          boxShadow: dark
            ? "0 0 80px rgba(124,58,237,0.1), 0 2px 6px rgba(0,0,0,0.3)"
            : "0 4px 48px rgba(168,85,247,0.1)",
          padding: "clamp(36px,5.5vw,72px) clamp(24px,6vw,64px)",
        }}>

          {/* Stars background (dark only) */}
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
              : "linear-gradient(90deg, transparent, #f472b6, #a78bfa, #60a5fa, transparent)",
            opacity: dark ? 0.55 : 0.65,
          }} />

          {/* Corner brackets */}
          {([
            { top: 10, left: 10, bt: true, bl: true },
            { top: 10, right: 10, bt: true, br: true },
            { bottom: 10, left: 10, bb: true, bl: true },
            { bottom: 10, right: 10, bb: true, br: true },
          ] as const).map((c, i) => (
            <span key={i} style={{
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

          {/* Main content */}
          <div style={{
            position: "relative", zIndex: 1,
            display: "flex", flexDirection: "column",
            alignItems: "center", gap: 30, textAlign: "center",
          }}>

            {/* Eyebrow */}
            <p style={{
              fontFamily: "ui-monospace, monospace", fontSize: 10,
              letterSpacing: "0.42em", color: accentColor,
              margin: 0, textTransform: "uppercase",
            }}>
              DISPONIBLE · LIMA, PERÚ
            </p>

            {/* Heading */}
            <div style={{ maxWidth: 640 }}>
              <h2 style={{
                fontFamily: "ui-monospace, monospace", fontWeight: 700,
                fontSize: "clamp(1.55rem, 4.2vw, 2.5rem)",
                color: textColor, margin: "0 0 14px",
                letterSpacing: "0.02em", lineHeight: 1.2,
              }}>
                ¿Tienes un proyecto FinTech?<br />
                <span style={{ color: accentColor }}>Construyámoslo juntos</span>
                <span style={{ opacity: blink ? 1 : 0, transition: "opacity 0.1s" }}>_</span>
              </h2>
              <p style={{ fontSize: 16, color: mutedColor, margin: 0, lineHeight: 1.7 }}>
                Senior Backend Engineer especializado en Java, Quarkus y arquitecturas BIAN.
                Listo para sumar a tu equipo desde Lima, Perú.
              </p>
            </div>

            {/* Terminal email line */}
            <div style={{
              fontFamily: "ui-monospace, monospace",
              fontSize: "clamp(12px, 2vw, 14px)",
              padding: "12px 26px", borderRadius: 8,
              background: dark ? "rgba(124,58,237,0.08)" : "rgba(124,58,237,0.06)",
              border: dark ? "1px solid rgba(124,58,237,0.22)" : "1px solid rgba(168,85,247,0.22)",
              color: dark ? "#c4b5fd" : "#7c3aed",
              letterSpacing: "0.04em",
            }}>
              $ contact <a
                href="mailto:hristbartra@gmail.com"
                style={{ color: "inherit", textDecoration: "underline", textDecorationColor: "rgba(124,58,237,0.35)" }}
              >hristbartra@gmail.com</a>
            </div>

            {/* CTA buttons */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
              <a
                href="https://www.linkedin.com/in/hrist-joy-bartra-saavedra-09b71913a/"
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 9,
                  padding: "13px 30px", borderRadius: 10,
                  fontWeight: 700, fontSize: 14.5, textDecoration: "none",
                  color: "#fff", letterSpacing: "0.04em",
                  background: dark
                    ? "linear-gradient(135deg, #7c3aed, #0ea5e9)"
                    : "linear-gradient(135deg, #ec4899, #a855f7, #60a5fa)",
                  boxShadow: dark
                    ? "0 0 28px rgba(124,58,237,0.38)"
                    : "0 4px 24px rgba(168,85,247,0.38)",
                  transition: "opacity 0.2s",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                  <circle cx="4" cy="4" r="2" fill="white" />
                </svg>
                LinkedIn
              </a>
              <a
                href="mailto:hristbartra@gmail.com"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 9,
                  padding: "13px 30px", borderRadius: 10,
                  fontWeight: 700, fontSize: 14.5, textDecoration: "none",
                  letterSpacing: "0.04em",
                  color: dark ? "rgba(255,255,255,0.82)" : accentColor,
                  background: dark ? "rgba(255,255,255,0.07)" : "rgba(124,58,237,0.08)",
                  border: dark ? "1px solid rgba(255,255,255,0.13)" : "1px solid rgba(124,58,237,0.22)",
                  transition: "all 0.2s",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="2" />
                  <polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="2" />
                </svg>
                Escribirme
              </a>
            </div>

            {/* Stats row */}
            <div style={{ display: "flex", gap: 36, flexWrap: "wrap", justifyContent: "center" }}>
              {[
                { v: "6+", l: "Años de experiencia" },
                { v: "4",  l: "Empresas" },
                { v: "163", l: "Commits este año" },
              ].map(s => (
                <div key={s.l} style={{ textAlign: "center" }}>
                  <p style={{
                    fontFamily: "ui-monospace, monospace", fontWeight: 700,
                    fontSize: "clamp(1.3rem, 2.8vw, 1.7rem)",
                    color: dark ? "#67e8f9" : accentColor, margin: 0,
                  }}>{s.v}</p>
                  <p style={{
                    fontFamily: "ui-monospace, monospace", fontSize: 9,
                    letterSpacing: "0.22em", color: mutedColor,
                    margin: 0, textTransform: "uppercase",
                  }}>{s.l}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
