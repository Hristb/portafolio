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

const NODES = [
  { id: "wallet",   label: "Billetera",  sub: "Yape / Mibanco",    color: "#7c3aed",
    icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" },
  { id: "bian",     label: "API BIAN",   sub: "Estándar bancario",  color: "#0ea5e9",
    icon: "M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm-5 11.5h-2V13h-2v2.5H9V9h2v2.5h2V9h2v6.5z" },
  { id: "core",     label: "Core Bank",  sub: "Neobanco Java 17",   color: "#06b6d4",
    icon: "M4 10v7h3v-7H4zm6.5 0v7h3v-7h-3zM2 22h19v-3H2v3zm15-12v7h3v-7h-3zM11.5 1L2 6v2h19V6l-9.5-5z" },
  { id: "whatsapp", label: "WhatsApp",   sub: "Canal digital",      color: "#10b981",
    icon: "M20 10.999h2C22 5.869 18.127 2 12.99 2v2C17.052 4 20 6.943 20 10.999z M13 8c2.103 0 3 .897 3 3h2c0-3.225-1.775-5-5-5v2zm3.422 5.443a1.001 1.001 0 0 0-1.391.043l-2.393 2.461c-.576-.11-1.734-.471-2.926-1.66-1.192-1.193-1.553-2.354-1.66-2.926l2.459-2.394a1 1 0 0 0 .043-1.39L7.859 4.513a1 1 0 0 0-1.391-.087l-2.17 1.861a1 1 0 0 0-.29.649c-.015.25-.301 6.172 4.291 10.766C12.451 21.697 17.591 22 18.7 22c.149 0 .243-.006.271-.008a.99.99 0 0 0 .647-.289l1.86-2.171a1 1 0 0 0-.085-1.39l-3.971-3.699z" },
];

const STATS = [
  { label: "Tiempo resp.", value: "<120ms",  unit: "promedio API" },
  { label: "Uptime",       value: "99.9%",   unit: "SLA garantizado" },
  { label: "Estándar",     value: "BIAN",    unit: "arquitectura bancaria" },
];

export default function BankingFlowDiagram() {
  const dark = useDarkMode();
  const [active, setActive] = useState(0);
  const [counter, setCounter] = useState(0);
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Intersection observer
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold: 0.25 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  // Counter animation
  useEffect(() => {
    if (!inView) return;
    let current = 0;
    const target = 2847391;
    const step = Math.ceil(target / 55);
    const iv = setInterval(() => {
      current = Math.min(current + step, target);
      setCounter(current);
      if (current >= target) clearInterval(iv);
    }, 28);
    return () => clearInterval(iv);
  }, [inView]);

  // Cycle active node
  useEffect(() => {
    const iv = setInterval(() => setActive(a => (a + 1) % NODES.length), 1300);
    return () => clearInterval(iv);
  }, []);

  const cardBg = dark ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.8)";
  const cardBorder = dark ? "rgba(124,58,237,0.14)" : "rgba(124,58,237,0.18)";
  const textColor = dark ? "rgba(255,255,255,0.85)" : "#1a0a3c";
  const mutedColor = dark ? "rgba(255,255,255,0.28)" : "rgba(100,72,150,0.5)";

  return (
    <div ref={ref} style={{ display: "flex", flexDirection: "column", gap: 18, width: "100%" }}>

      {/* Flow nodes */}
      <div style={{ position: "relative", padding: "20px 0" }}>
        {/* Connecting lines SVG */}
        <svg
          viewBox="0 0 100 8"
          style={{ position: "absolute", top: "50%", left: "0", width: "100%", transform: "translateY(-50%)", zIndex: 0, overflow: "visible" }}
          preserveAspectRatio="none"
        >
          {NODES.slice(0, -1).map((n, i) => {
            const x1 = 12.5 + i * 25 + 5.5;
            const x2 = 12.5 + (i + 1) * 25 - 5.5;
            const isLit = active === i || active === i + 1;
            return (
              <line key={n.id}
                x1={`${x1}%`} y1="50%" x2={`${x2}%`} y2="50%"
                stroke={isLit ? NODES[i + 1].color : "rgba(124,58,237,0.15)"}
                strokeWidth="0.6"
                strokeDasharray="2 1.8"
                style={{ transition: "stroke 0.5s" }}
              />
            );
          })}
          {/* Moving dot on active edge */}
          {active < NODES.length - 1 && (
            <circle r="1.5" fill={NODES[active + 1].color} opacity="0.9">
              <animateMotion
                dur="0.8s"
                repeatCount="indefinite"
                path={`M ${12.5 + active * 25 + 5.5}% 4 L ${12.5 + (active + 1) * 25 - 5.5}% 4`}
              />
            </circle>
          )}
        </svg>

        {/* Nodes */}
        <div style={{ display: "flex", justifyContent: "space-around", alignItems: "flex-start", position: "relative", zIndex: 1 }}>
          {NODES.map((node, i) => {
            const isActive = active === i;
            return (
              <div key={node.id} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 7, flex: 1 }}>
                <div style={{
                  width: 54, height: 54, borderRadius: "50%",
                  background: isActive ? node.color : `${node.color}1e`,
                  border: `2px solid ${isActive ? node.color : `${node.color}44`}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  transition: "all 0.4s cubic-bezier(.34,1.56,.64,1)",
                  boxShadow: isActive ? `0 0 24px ${node.color}66, 0 0 8px ${node.color}44` : "none",
                  transform: isActive ? "scale(1.15)" : "scale(1)",
                }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                    <path d={node.icon} fill={isActive ? "#fff" : node.color} />
                  </svg>
                </div>
                <div style={{ textAlign: "center", maxWidth: 70 }}>
                  <p style={{
                    fontFamily: "ui-monospace, monospace", fontSize: 11, fontWeight: 700,
                    color: isActive ? node.color : textColor, margin: 0,
                    transition: "color 0.4s",
                  }}>{node.label}</p>
                  <p style={{
                    fontFamily: "ui-monospace, monospace", fontSize: 8.5,
                    color: mutedColor, margin: 0, letterSpacing: "0.04em",
                    lineHeight: 1.3,
                  }}>{node.sub}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Active node detail */}
      <div style={{
        borderRadius: 10, padding: "12px 16px",
        background: `${NODES[active].color}0e`,
        border: `1px solid ${NODES[active].color}35`,
        transition: "all 0.3s",
        minHeight: 52,
      }}>
        <p style={{ fontFamily: "ui-monospace, monospace", fontSize: 9, letterSpacing: "0.22em", color: NODES[active].color, margin: "0 0 4px", textTransform: "uppercase" }}>
          {NODES[active].label} · {NODES[active].sub}
        </p>
        <p style={{ fontSize: 12.5, color: textColor, margin: 0, lineHeight: 1.5 }}>
          {active === 0 && "Afiliación y desafiliación de billeteras. Transferencias por número de celular hacia cualquier billetera del mercado."}
          {active === 1 && "APIs robustas bajo el estándar BIAN, asegurando interoperabilidad y escalabilidad del ecosistema financiero."}
          {active === 2 && "Microservicios con Quarkus y Java 17. Pagos entre tarjetas y transferencias interbancarias de alta disponibilidad."}
          {active === 3 && "Canal digital de atención bancaria. Flujos de reenganche y automatización con Azure Data Factory (ADF)."}
        </p>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
        {[
          { label: "Transacciones", value: counter > 0 ? counter.toLocaleString("es-PE") : "—", unit: "en producción" },
          ...STATS.slice(0),
        ].slice(0, 3).map(s => (
          <div key={s.label} style={{
            borderRadius: 10, padding: "12px 8px", textAlign: "center",
            background: cardBg, border: `1px solid ${cardBorder}`,
          }}>
            <p style={{ fontFamily: "ui-monospace, monospace", fontWeight: 700, fontSize: "clamp(0.82rem, 1.8vw, 1rem)", margin: "0 0 2px", color: "#7c3aed" }}>{s.value}</p>
            <p style={{ fontFamily: "ui-monospace, monospace", fontSize: 8, letterSpacing: "0.12em", color: mutedColor, margin: 0, textTransform: "uppercase" }}>{s.unit}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
