"use client";
import React, { useState, useRef, useEffect, useCallback } from "react";
import { type NType, type JNode, NODES, NCOLOR } from "./careerData";

// ═══════════════════════════════════════════════════════════════
// CONFIG
// ═══════════════════════════════════════════════════════════════
// Track path — endpoint of each cubic bezier coincides with node x,y
const TRACK = [
  "M 80,450",
  "C 143,450 163,450 220,450",
  "C 282,450 302,450 370,450",
  "C 428,450 462,450 510,450",
  "C 568,448 662,430 710,395",
  "C 732,374 752,328 762,278",
  "C 770,232 750,178 722,140",
  "C 703,112 645,72 570,60",
  "C 513,52 463,52 400,62",
  "C 346,70 296,70 238,62",
  "C 178,54 112,100 80,170",
  "C 60,215 60,264 80,314",
  "C 98,360 155,383 232,372",
  "C 300,360 376,322 432,293",
].join(" ");

// Direction arrows along the track at approximate midpoints
const ARROWS = [
  { x: 296, y: 450, a: 0 },
  { x: 618, y: 420, a: -25 },
  { x: 762, y: 204, a: -88 },
  { x: 490, y: 56,  a: 178 },
  { x: 158, y: 58,  a: 179 },
  { x: 79,  y: 244, a: 92 },
  { x: 164, y: 350, a: 56 },
  { x: 340, y: 326, a: -32 },
];

// ═══════════════════════════════════════════════════════════════
// UTILS
// ═══════════════════════════════════════════════════════════════
function useDark() {
  const [d, setD] = useState(
    () => typeof document !== "undefined" && document.documentElement.classList.contains("dark")
  );
  useEffect(() => {
    const obs = new MutationObserver(() =>
      setD(document.documentElement.classList.contains("dark"))
    );
    obs.observe(document.documentElement, { attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);
  return d;
}

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

function dist(a: JNode, b: JNode) {
  return Math.hypot(b.x - a.x, b.y - a.y);
}

// ═══════════════════════════════════════════════════════════════
// POPUP POSITION — always keeps popup inside viewBox
// ═══════════════════════════════════════════════════════════════
const VBW = 880, VBH = 540, PW = 228, PH = 210;

function popupPos(n: JNode): { x: number; y: number } {
  // Prefer right, fall back to left
  let x = n.x > 560 ? n.x - PW - 26 : n.x + 26;
  // For leftmost nodes, always right
  if (n.x < 160) x = n.x + 26;
  // Vertical: center on node, clamp
  let y = n.y - PH / 2;
  // For bottom nodes (y>400) float above, for top nodes float below
  if (n.y > 400) y = n.y - PH - 18;
  if (n.y < 100) y = n.y + 28;
  // Clamp to viewBox
  x = Math.max(8, Math.min(x, VBW - PW - 8));
  y = Math.max(8, Math.min(y, VBH - PH - 8));
  return { x, y };
}

// ═══════════════════════════════════════════════════════════════
// COMPONENT
// ═══════════════════════════════════════════════════════════════
export default function CareerJourneyMap({
  activeId,
  onNodeSelect,
  showPopup = false,
}: {
  activeId: string | null;
  onNodeSelect: (id: string | null) => void;
  showPopup?: boolean;
}) {
  const dark = useDark();
  const [vehicle, setVehicle] = useState<{
    x: number; y: number; icon: string;
  } | null>(null);
  const animRef     = useRef<number>(0);
  const trailRef    = useRef<{ x: number; y: number }[]>([]);
  const smokePuffsRef = useRef<{ id: number; x: number; y: number; born: number }[]>([]);
  const smokeIdRef  = useRef(0);
  const smokeRafRef = useRef<number>(0);
  const [, forceSmoke] = useState(0);

  // ── colours ──────────────────────────────────────────────────
  const mapBg   = dark ? "linear-gradient(155deg,#06051a,#0b0822 70%,#07071e)" : "linear-gradient(155deg,#fdf4ff,#f0f9ff 60%,#f0fdf4)";
  const trackFg = dark ? "rgba(124,58,237,.18)"  : "rgba(168,85,247,.15)";
  const trackBd = dark ? "rgba(124,58,237,.46)"  : "rgba(168,85,247,.42)";
  const nodeBg  = dark ? "rgba(6,4,22,.92)"      : "rgba(255,255,255,.96)";
  const textC   = dark ? "rgba(255,255,255,.9)"  : "#1a0a3c";
  const mutedC  = dark ? "rgba(255,255,255,.32)" : "rgba(100,72,150,.48)";
  const popBg   = dark ? "rgba(4,3,16,.97)"      : "rgba(255,255,255,.98)";
  const gridCol = dark ? "#7c3aed"               : "#a78bfa";
  const arrowFg = dark ? "#a78bfa"               : "#8b5cf6";

  const activeNode = activeId ? NODES.find(n => n.id === activeId) ?? null : null;

  // ── vehicle animation ─────────────────────────────────────────
  const fireVehicle = useCallback((from: JNode, to: JNode) => {
    cancelAnimationFrame(animRef.current);
    cancelAnimationFrame(smokeRafRef.current);
    trailRef.current    = [];
    smokePuffsRef.current = [];

    const d       = dist(from, to);
    const isPlane = d >= 200;
    const icon    = isPlane ? "✈️" : "🚌";
    const dur     = isPlane ? 1500 : 950;
    const arc     = isPlane ? 70   : 22;
    const t0      = performance.now();

    // Unit vector pointing "behind" the vehicle (for smoke offset)
    const dlen = Math.hypot(to.x - from.x, to.y - from.y) || 1;
    const bx   = -(to.x - from.x) / dlen;
    const by   = -(to.y - from.y) / dlen;

    let lastSmokeFrame = -1;

    const tick = (now: number) => {
      const raw = Math.min((now - t0) / dur, 1);
      const e   = easeInOut(raw);
      const cx  = from.x + (to.x - from.x) * e;
      const cy  = from.y + (to.y - from.y) * e - Math.sin(Math.PI * e) * arc;

      if (isPlane) {
        // Dotted trail — keep last 22 positions
        trailRef.current = [...trailRef.current.slice(-21), { x: cx, y: cy }];
      } else {
        // Emit a smoke puff every ~40 ms
        const frame = Math.floor((now - t0) / 40);
        if (frame !== lastSmokeFrame) {
          lastSmokeFrame = frame;
          smokePuffsRef.current = [
            ...smokePuffsRef.current.slice(-14),
            { id: smokeIdRef.current++, x: cx + bx * 16, y: cy + by * 16, born: now },
          ];
        }
      }

      setVehicle({ x: cx, y: cy, icon });

      if (raw < 1) {
        animRef.current = requestAnimationFrame(tick);
      } else {
        setVehicle(null);
        trailRef.current = [];
        // Keep smoke fading after vehicle disappears
        const smokeLoop = (t: number) => {
          smokePuffsRef.current = smokePuffsRef.current.filter(p => t - p.born < 920);
          forceSmoke(n => n + 1);
          if (smokePuffsRef.current.length > 0)
            smokeRafRef.current = requestAnimationFrame(smokeLoop);
        };
        if (smokePuffsRef.current.length > 0)
          smokeRafRef.current = requestAnimationFrame(smokeLoop);
      }
    };
    animRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => () => {
    cancelAnimationFrame(animRef.current);
    cancelAnimationFrame(smokeRafRef.current);
  }, []);

  const handleNodeClick = (node: JNode) => {
    if (activeId && activeId !== node.id) {
      const prev = NODES.find(n => n.id === activeId);
      if (prev) fireVehicle(prev, node);
    }
    onNodeSelect(activeId === node.id ? null : node.id);
  };

  return (
    <div
      style={{ position: "relative", width: "100%", height: "100%", minHeight: 530, background: mapBg, overflow: "hidden" }}
      onClick={e => {
        const t = e.target as HTMLElement;
        if (!t.closest("[data-node]")) onNodeSelect(null);
      }}
    >
      {/* ── subtle grid ── */}
      <svg
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", opacity: .11 }}
        aria-hidden
      >
        <defs>
          <pattern id="cjm-g" width="44" height="44" patternUnits="userSpaceOnUse">
            <path d="M44 0L0 0 0 44" fill="none" stroke={gridCol} strokeWidth=".5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#cjm-g)" />
      </svg>

      {/* ── main SVG canvas ── */}
      <svg
        viewBox={`0 0 ${VBW} ${VBH}`}
        style={{ width: "100%", height: "100%", position: "absolute", inset: 0, display: "block" }}
        preserveAspectRatio="xMidYMid meet"
        aria-label="Mapa interactivo de carrera"
      >
        <defs>
          <filter id="cjm-glow">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
          <filter id="cjm-glow-sm">
            <feGaussianBlur in="SourceGraphic" stdDeviation="3" result="b" />
            <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
          </filter>
        </defs>

        {/* ── TRACK ── */}
        {/* outer glow */}
        <path d={TRACK} fill="none"
          stroke={dark ? "rgba(124,58,237,.1)" : "rgba(168,85,247,.07)"}
          strokeWidth="58" strokeLinecap="round" strokeLinejoin="round" />
        {/* border ring */}
        <path d={TRACK} fill="none"
          stroke={trackBd} strokeWidth="40"
          strokeLinecap="round" strokeLinejoin="round" />
        {/* fill lane */}
        <path d={TRACK} fill="none"
          stroke={trackFg} strokeWidth="32"
          strokeLinecap="round" strokeLinejoin="round" />
        {/* centre dashes */}
        <path d={TRACK} fill="none"
          stroke={dark ? "rgba(255,255,255,.055)" : "rgba(139,92,246,.18)"}
          strokeWidth="1.5" strokeDasharray="9 14" strokeLinecap="round" />

        {/* ── DIRECTION ARROWS ── */}
        {ARROWS.map((a, i) => (
          <g key={i} transform={`translate(${a.x},${a.y}) rotate(${a.a})`} opacity={dark ? .28 : .22}>
            <path d="M-7.5,0 L0,-4.5 L7.5,0 L0,4.5 Z" fill={arrowFg} />
          </g>
        ))}

        {/* ── NODES ── */}
        {NODES.map(node => {
          const ring = NCOLOR[node.type];
          const isAct = activeId === node.id;
          const isEnd = !!node.live;
          const R = isEnd ? 30 : 24;
          // Label position: above for bottom row nodes (y>400), below otherwise
          const lblY = node.y >= 380 ? node.y - R - 9 : node.y + R + 14;

          return (
            <g key={node.id} data-node={node.id}
              onClick={() => handleNodeClick(node)}
              style={{ cursor: "pointer" }}
            >
              {/* pulse ring — live node */}
              {isEnd && (
                <circle cx={node.x} cy={node.y} r={R + 8} fill="none" stroke={ring} strokeWidth="1" opacity=".3">
                  <animate attributeName="r" values={`${R + 5};${R + 18};${R + 5}`} dur="2.6s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values=".38;0;.38" dur="2.6s" repeatCount="indefinite" />
                </circle>
              )}
              {/* active halo */}
              {isAct && (
                <circle cx={node.x} cy={node.y} r={R + 8} fill="none"
                  stroke={ring} strokeWidth="1.5" opacity=".38"
                  filter="url(#cjm-glow-sm)">
                  <animate attributeName="opacity" values=".38;.18;.38" dur="1.4s" repeatCount="indefinite" />
                </circle>
              )}
              {/* main circle */}
              <circle cx={node.x} cy={node.y} r={R}
                fill={isAct ? ring : nodeBg}
                stroke={ring} strokeWidth={isAct ? 2.5 : isEnd ? 2 : 1.5}
                filter={isEnd ? "url(#cjm-glow)" : undefined}
              />
              {/* number */}
              <text x={node.x} y={node.y - 10}
                textAnchor="middle"
                style={{ fontSize: 9, fontFamily: "ui-monospace,monospace", fill: isAct ? "rgba(255,255,255,.5)" : mutedC, userSelect: "none" }}>
                {String(node.num).padStart(2, "0")}
              </text>
              {/* emoji icon */}
              <text x={node.x} y={node.y + 5}
                textAnchor="middle" dominantBaseline="central"
                style={{ fontSize: isEnd ? 22 : 17, userSelect: "none" }}>
                {node.icon}
              </text>
              {/* label */}
              <text x={node.x} y={lblY}
                textAnchor="middle"
                style={{
                  fontSize: 9.5,
                  fontFamily: "ui-monospace,monospace",
                  fill: isAct ? ring : (dark ? "rgba(255,255,255,.62)" : "rgba(80,45,130,.78)"),
                  fontWeight: isAct ? "700" : "400",
                  userSelect: "none",
                }}>
                {node.label.length > 12 ? node.label.slice(0, 11) + "…" : node.label}
              </text>
              {/* LIVE badge */}
              {node.live && (
                <>
                  <rect x={node.x - 24} y={node.y + R + 27} width={48} height={15} rx={5}
                    fill="#22c55e18" stroke="#22c55e44" strokeWidth=".8" />
                  <text x={node.x} y={node.y + R + 35}
                    textAnchor="middle" dominantBaseline="central"
                    style={{ fontSize: 8, fontFamily: "ui-monospace,monospace", fill: "#22c55e", fontWeight: 700, userSelect: "none" }}>
                    ● LIVE
                  </text>
                </>
              )}
              {/* START marker */}
              {node.isStart && (
                <text x={node.x} y={node.y + R + 24}
                  textAnchor="middle"
                  style={{ fontSize: 7, fontFamily: "ui-monospace,monospace", fill: "#10b981", opacity: .75, userSelect: "none" }}>
                  INICIO
                </text>
              )}
            </g>
          );
        })}

        {/* ── PLANE DOTTED TRAIL ── */}
        {vehicle?.icon === "✈️" && trailRef.current.map((pos, i) => {
          if (i % 3 !== 0) return null; // sample every 3rd → dotted look
          const total = trailRef.current.length;
          const age   = (i + 1) / total; // 0=oldest → 1=newest
          return (
            <circle
              key={i}
              cx={pos.x} cy={pos.y}
              r={1.4 + age * 2.2}
              fill={dark ? `rgba(200,185,255,${age * 0.58})` : `rgba(91,63,206,${age * 0.52})`}
              style={{ pointerEvents: "none" }}
            />
          );
        })}

        {/* ── BUS SMOKE ── */}
        {smokePuffsRef.current.map(puff => {
          const age   = Math.min((performance.now() - puff.born) / 900, 1);
          const alpha = 0.44 * (1 - age * age);
          const r     = 3 + age * 8.5;
          return (
            <circle
              key={puff.id}
              cx={puff.x + age * 4}
              cy={puff.y - age * 22}
              r={r}
              fill={dark ? `rgba(180,168,210,${alpha})` : `rgba(120,100,160,${alpha})`}
              style={{ pointerEvents: "none" }}
            />
          );
        })}

        {/* ── VEHICLE ── */}
        {vehicle && (() => {
          const isPlane = vehicle.icon === "✈️";
          // Rotation from last two trail points
          const trail = trailRef.current;
          let angle = 0;
          if (isPlane && trail.length >= 2) {
            const a = trail[Math.max(0, trail.length - 5)];
            const b = trail[trail.length - 1];
            angle = Math.atan2(b.y - a.y, b.x - a.x) * (180 / Math.PI);
          }
          return (
            <g
              transform={`translate(${vehicle.x},${vehicle.y}) rotate(${angle})`}
              filter="url(#cjm-glow-sm)"
              style={{ pointerEvents: "none" }}
            >
              <text
                x={0} y={0}
                textAnchor="middle" dominantBaseline="central"
                style={{ fontSize: 28, userSelect: "none" }}
              >
                {vehicle.icon}
              </text>
            </g>
          );
        })()}

        {/* ── POPUP via foreignObject ── */}
        {showPopup && activeNode && (() => {
          const ring = NCOLOR[activeNode.type];
          const { x: px, y: py } = popupPos(activeNode);
          return (
            <foreignObject x={px} y={py} width={PW} height={PH + 60}
              style={{ overflow: "visible" }}>
              {/* @ts-ignore — xmlns needed for foreignObject HTML */}
              <div data-popup="true"
                style={{
                  background: popBg,
                  border: `1px solid ${ring}38`,
                  borderRadius: 11,
                  padding: "13px 14px 12px",
                  boxShadow: dark
                    ? `0 10px 40px rgba(0,0,0,.72), 0 0 0 1px ${ring}22`
                    : `0 8px 32px rgba(0,0,0,.1), 0 0 0 1px ${ring}18`,
                  backdropFilter: "blur(16px)",
                  width: PW,
                  boxSizing: "border-box" as const,
                  position: "relative" as const,
                  fontFamily: "system-ui,-apple-system,sans-serif",
                } as React.CSSProperties}
              >
                {/* close btn */}
                <button
                  onClick={e => { e.stopPropagation(); onNodeSelect(null); }}
                  style={{
                    position: "absolute", top: 6, right: 7, background: "none",
                    border: "none", cursor: "pointer", color: mutedC,
                    fontSize: 16, lineHeight: 1, padding: "1px 5px", borderRadius: 4,
                  }}
                >×</button>

                {/* header row */}
                <div style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: 7, paddingRight: 18 }}>
                  <span style={{ fontSize: 20, flexShrink: 0 }}>{activeNode.icon}</span>
                  <div style={{ minWidth: 0 }}>
                    <p style={{ margin: 0, fontWeight: 700, fontSize: 13, color: textC, fontFamily: "ui-monospace,monospace", lineHeight: 1.2 }}>
                      {activeNode.label}
                    </p>
                    <p style={{ margin: 0, fontSize: 9.5, color: ring, fontFamily: "ui-monospace,monospace", letterSpacing: ".05em" }}>
                      {activeNode.period}
                    </p>
                  </div>
                  {activeNode.live && (
                    <span style={{
                      marginLeft: "auto", flexShrink: 0, fontSize: 7, padding: "2px 5px", borderRadius: 4,
                      background: "#22c55e12", border: "1px solid #22c55e36",
                      color: "#22c55e", fontFamily: "ui-monospace,monospace", letterSpacing: ".1em",
                    }}>● LIVE</span>
                  )}
                </div>

                <div style={{ height: 1, background: `${ring}22`, marginBottom: 7 }} />

                <p style={{ margin: "0 0 9px", fontSize: 11, lineHeight: 1.65, color: dark ? "rgba(255,255,255,.72)" : "rgba(22,8,52,.76)" }}>
                  {activeNode.desc}
                </p>

                {/* tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                  {activeNode.tags.slice(0, 4).map(tag => (
                    <span key={tag} style={{
                      fontSize: 9, padding: "2px 7px", borderRadius: 20,
                      background: `${ring}12`, border: `1px solid ${ring}30`, color: ring,
                      fontFamily: "ui-monospace,monospace",
                    }}>{tag}</span>
                  ))}
                  {activeNode.tags.length > 4 && (
                    <span style={{ fontSize: 9, padding: "2px 6px", color: mutedC, fontFamily: "ui-monospace,monospace" }}>
                      +{activeNode.tags.length - 4}
                    </span>
                  )}
                </div>

                {/* node number watermark */}
                <div style={{
                  position: "absolute", bottom: 7, right: 11,
                  fontFamily: "ui-monospace,monospace", fontSize: 8.5, color: mutedC,
                }}>#{String(activeNode.num).padStart(2, "0")}</div>
              </div>
            </foreignObject>
          );
        })()}

        {/* ── LEGEND ── */}
        {([
          { t: "job"       as NType, l: "Empresa"     },
          { t: "tech"      as NType, l: "Tecnología"  },
          { t: "study"     as NType, l: "Formación"   },
          { t: "milestone" as NType, l: "Hito"        },
        ]).map(({ t, l }, i) => (
          <g key={t} transform={`translate(806,${458 + i * 16})`}>
            <circle r={4} fill={NCOLOR[t]} />
            <text x={9} y={0} dominantBaseline="central"
              style={{ fontSize: 8, fontFamily: "ui-monospace,monospace", fill: mutedC, userSelect: "none" }}>
              {l}
            </text>
          </g>
        ))}

        {/* ── HINT ── */}
        <text x={440} y={528} textAnchor="middle"
          style={{ fontSize: 7.5, fontFamily: "ui-monospace,monospace", fill: mutedC, userSelect: "none" }}>
          CLICK EN UN PUNTO · LA INFO APARECE EN EL PANEL IZQUIERDO
        </text>
      </svg>
    </div>
  );
}
