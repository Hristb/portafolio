"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────
export interface Mission {
  id: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  image?: string;
  categories: string[];
  tags: string[];
  author: string;
}

type View = "hangar" | "brief" | "pilot";

// ── Dark-mode detection ───────────────────────────────────────────────────────
function useDarkMode() {
  const [dark, setDark] = useState(
    () => typeof document !== "undefined" && document.documentElement.classList.contains("dark")
  );
  useEffect(() => {
    const obs = new MutationObserver(() =>
      setDark(document.documentElement.classList.contains("dark"))
    );
    obs.observe(document.documentElement, { attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);
  return dark;
}

// ── Themes ────────────────────────────────────────────────────────────────────
const DM = {
  bg: "linear-gradient(160deg, #06051a 0%, #0b0a22 60%, #07071e 100%)",
  outerBorder: "1px solid rgba(124,58,237,0.2)",
  outerShadow: "0 0 60px rgba(124,58,237,0.08), inset 0 0 80px rgba(14,165,233,0.02)",
  headerBorder: "rgba(124,58,237,0.18)",
  tabBorder: "rgba(124,58,237,0.14)",
  text: "rgba(255,255,255,0.92)",
  textMuted: "rgba(255,255,255,0.42)",
  textFaint: "rgba(255,255,255,0.28)",
  eyebrow: "rgba(124,58,237,0.65)",
  purple: "#7c3aed",
  cyan: "#0ea5e9",
  green: "#10b981",
  rankBadgeBg: "rgba(14,165,233,0.08)",
  rankBadgeBorder: "rgba(14,165,233,0.28)",
  rankBadgeColor: "#0ea5e9",
  tabActiveBg: "rgba(124,58,237,0.08)",
  tabActiveColor: "#7c3aed",
  tabActiveBorder: "#7c3aed",
  tabColor: "rgba(255,255,255,0.42)",
  tabDisabled: "rgba(255,255,255,0.18)",
  exploredCounter: "rgba(255,255,255,0.28)",
  cardBg: "rgba(255,255,255,0.025)",
  cardBorder: "rgba(255,255,255,0.07)",
  cardBorderHov: "rgba(124,58,237,0.55)",
  cardBgHov: "rgba(124,58,237,0.08)",
  cardShadowHov: "0 0 24px rgba(124,58,237,0.14), inset 0 0 20px rgba(124,58,237,0.04)",
  codeColor: "rgba(255,255,255,0.28)",
  codeColorExplored: "#7c3aed",
  titleColor: "rgba(255,255,255,0.9)",
  descColor: "rgba(255,255,255,0.38)",
  chipBg: "rgba(14,165,233,0.08)",
  chipBorder: "rgba(14,165,233,0.18)",
  chipColor: "rgba(14,165,233,0.85)",
  launchColor: "rgba(255,255,255,0.25)",
  launchColorHov: "#7c3aed",
  signalInactive: "rgba(255,255,255,0.1)",
  briefCardBg: "linear-gradient(135deg, rgba(124,58,237,0.07) 0%, rgba(14,165,233,0.04) 100%)",
  briefCardBorder: "rgba(124,58,237,0.32)",
  accentLine: "linear-gradient(90deg, transparent, #7c3aed, #0ea5e9, transparent)",
  accentLineOpacity: 0.5,
  statColor: "rgba(255,255,255,0.3)",
  statsValueColor: "#0ea5e9",
  statsValueShadow: "0 0 16px rgba(14,165,233,0.4)",
  techChipBg: "rgba(14,165,233,0.04)",
  techChipBorder: "rgba(14,165,233,0.18)",
  techChipColor: "rgba(14,165,233,0.88)",
  progressBg: "rgba(255,255,255,0.07)",
  progressFill: "linear-gradient(90deg, #7c3aed, #0ea5e9)",
  progressShadow: "0 0 10px rgba(14,165,233,0.45)",
  divider: "rgba(255,255,255,0.07)",
  pilotHeaderBg: "rgba(124,58,237,0.05)",
  pilotHeaderBorder: "rgba(124,58,237,0.3)",
  achBorderUnlocked: "rgba(16,185,129,0.32)",
  achBgUnlocked: "rgba(16,185,129,0.06)",
  achIconBgUnlocked: "rgba(16,185,129,0.15)",
  achIconBgLocked: "rgba(255,255,255,0.05)",
  achIconColorLocked: "rgba(255,255,255,0.2)",
  achBorderLocked: "rgba(255,255,255,0.07)",
  achBgLocked: "rgba(255,255,255,0.02)",
  achLabelUnlocked: "#10b981",
  achLabelLocked: "rgba(255,255,255,0.3)",
  achDescColor: "rgba(255,255,255,0.3)",
  backBtnColor: "rgba(124,58,237,0.7)",
  scanlines: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.006) 3px, rgba(255,255,255,0.006) 4px)",
  tagManifestBg: "rgba(124,58,237,0.1)",
  tagManifestBorder: "rgba(124,58,237,0.22)",
  tagManifestColor: "rgba(124,58,237,0.9)",
  btnBg: "linear-gradient(135deg, #7c3aed 0%, #0ea5e9 100%)",
  btnShadow: "0 0 24px rgba(124,58,237,0.28)",
  btnShadowHov: "0 0 36px rgba(124,58,237,0.4)",
  tagCountBg: "rgba(124,58,237,0.2)",
  achCountBg: "rgba(16,185,129,0.2)",
  achCountColor: "#10b981",
  statusActive: "#10b981",
  statusInactive: "#6b7280",
};

const LM = {
  bg: "linear-gradient(160deg, #fdf4ff 0%, #f0f9ff 45%, #f0fdf4 100%)",
  outerBorder: "1px solid rgba(168,85,247,0.18)",
  outerShadow: "0 4px 40px rgba(168,85,247,0.07)",
  headerBorder: "rgba(168,85,247,0.14)",
  tabBorder: "rgba(168,85,247,0.1)",
  text: "#1a0a3c",
  textMuted: "rgba(30,10,60,0.45)",
  textFaint: "rgba(100,72,150,0.5)",
  eyebrow: "#9333ea",
  purple: "#9333ea",
  cyan: "#0284c7",
  green: "#059669",
  rankBadgeBg: "rgba(2,132,199,0.07)",
  rankBadgeBorder: "rgba(2,132,199,0.22)",
  rankBadgeColor: "#0284c7",
  tabActiveBg: "rgba(147,51,234,0.06)",
  tabActiveColor: "#9333ea",
  tabActiveBorder: "#9333ea",
  tabColor: "rgba(30,10,60,0.45)",
  tabDisabled: "rgba(30,10,60,0.2)",
  exploredCounter: "rgba(100,72,150,0.45)",
  cardBg: "rgba(255,255,255,0.75)",
  cardBorder: "rgba(168,85,247,0.15)",
  cardBorderHov: "rgba(147,51,234,0.45)",
  cardBgHov: "rgba(168,85,247,0.05)",
  cardShadowHov: "0 4px 24px rgba(168,85,247,0.12)",
  codeColor: "rgba(100,72,150,0.4)",
  codeColorExplored: "#9333ea",
  titleColor: "#1a0a3c",
  descColor: "rgba(60,40,100,0.55)",
  chipBg: "rgba(2,132,199,0.07)",
  chipBorder: "rgba(2,132,199,0.2)",
  chipColor: "#0284c7",
  launchColor: "rgba(100,72,150,0.3)",
  launchColorHov: "#9333ea",
  signalInactive: "rgba(168,85,247,0.12)",
  briefCardBg: "linear-gradient(135deg, rgba(168,85,247,0.05) 0%, rgba(2,132,199,0.03) 100%)",
  briefCardBorder: "rgba(168,85,247,0.25)",
  accentLine: "linear-gradient(90deg, transparent, #f472b6, #a78bfa, #60a5fa, transparent)",
  accentLineOpacity: 0.6,
  statColor: "rgba(100,72,150,0.45)",
  statsValueColor: "#0284c7",
  statsValueShadow: "none",
  techChipBg: "rgba(2,132,199,0.06)",
  techChipBorder: "rgba(2,132,199,0.2)",
  techChipColor: "#0284c7",
  progressBg: "rgba(168,85,247,0.08)",
  progressFill: "linear-gradient(90deg, #ec4899, #a855f7, #60a5fa)",
  progressShadow: "none",
  divider: "rgba(168,85,247,0.1)",
  pilotHeaderBg: "rgba(168,85,247,0.04)",
  pilotHeaderBorder: "rgba(168,85,247,0.22)",
  achBorderUnlocked: "rgba(5,150,105,0.3)",
  achBgUnlocked: "rgba(5,150,105,0.05)",
  achIconBgUnlocked: "rgba(5,150,105,0.12)",
  achIconBgLocked: "rgba(168,85,247,0.05)",
  achIconColorLocked: "rgba(100,72,150,0.25)",
  achBorderLocked: "rgba(168,85,247,0.1)",
  achBgLocked: "rgba(168,85,247,0.02)",
  achLabelUnlocked: "#059669",
  achLabelLocked: "rgba(100,72,150,0.4)",
  achDescColor: "rgba(100,72,150,0.5)",
  backBtnColor: "#9333ea",
  scanlines: "none",
  tagManifestBg: "rgba(168,85,247,0.07)",
  tagManifestBorder: "rgba(168,85,247,0.18)",
  tagManifestColor: "#9333ea",
  btnBg: "linear-gradient(135deg, #ec4899 0%, #a855f7 50%, #60a5fa 100%)",
  btnShadow: "0 0 24px rgba(168,85,247,0.2)",
  btnShadowHov: "0 0 36px rgba(168,85,247,0.35)",
  tagCountBg: "rgba(147,51,234,0.12)",
  achCountBg: "rgba(5,150,105,0.12)",
  achCountColor: "#059669",
  statusActive: "#059669",
  statusInactive: "#9ca3af",
};

// Rainbow border cycle for light mode cards
const RAINBOW = [
  "rgba(244,114,182,0.4)",  // pink
  "rgba(167,139,250,0.4)",  // violet
  "rgba(96,165,250,0.4)",   // blue
  "rgba(52,211,153,0.4)",   // emerald
  "rgba(251,191,36,0.4)",   // amber
  "rgba(249,115,22,0.35)",  // orange
];

// ── Gamification ──────────────────────────────────────────────────────────────
const RANKS = [
  { min: 1000, label: "ADMIRAL",   stars: 5 },
  { min: 700,  label: "COMMANDER", stars: 4 },
  { min: 400,  label: "PILOT",     stars: 3 },
  { min: 200,  label: "NAVIGATOR", stars: 2 },
  { min: 0,    label: "CADET",     stars: 1 },
] as const;

const ACHIEVEMENTS = [
  {
    id: "first_contact",
    icon: "◉",
    label: "FIRST CONTACT",
    desc: "Opened your first mission",
    check: (explored: Set<string>) => explored.size >= 1,
  },
  {
    id: "navigator",
    icon: "◈",
    label: "NAVIGATOR",
    desc: "Explored 3 missions",
    check: (explored: Set<string>) => explored.size >= 3,
  },
  {
    id: "full_clearance",
    icon: "◆",
    label: "FULL CLEARANCE",
    desc: "All missions explored",
    check: (explored: Set<string>, total: number) => total > 0 && explored.size >= total,
  },
  {
    id: "specialist",
    icon: "▣",
    label: "SPECIALIST",
    desc: "Two missions from same category",
    check: (explored: Set<string>, _total: number, missions: Mission[]) => {
      const freq: Record<string, number> = {};
      missions
        .filter((m) => explored.has(m.id))
        .forEach((m) => m.categories.forEach((c) => { freq[c] = (freq[c] || 0) + 1; }));
      return Object.values(freq).some((v) => v >= 2);
    },
  },
];

function getRank(xp: number) {
  return RANKS.find((r) => xp >= r.min) ?? RANKS[RANKS.length - 1];
}

function getMissionXP(mission: Mission): number {
  return 100 + mission.tags.length * 25 + mission.categories.length * 50;
}

function getMissionCode(index: number): string {
  return `M-${String(index + 1).padStart(3, "0")}`;
}

// ── Sub-components ────────────────────────────────────────────────────────────
function CornerBrackets({ lit = false, T }: { lit?: boolean; T: typeof DM | typeof LM }) {
  const color = lit ? T.cardBorderHov : T.cardBorder;
  const shared: React.CSSProperties = {
    position: "absolute",
    width: 12,
    height: 12,
    pointerEvents: "none",
    transition: "border-color 0.3s",
    borderColor: color,
  };
  return (
    <>
      <span style={{ ...shared, top: 6, left: 6, borderTop: `1px solid ${color}`, borderLeft: `1px solid ${color}` }} />
      <span style={{ ...shared, top: 6, right: 6, borderTop: `1px solid ${color}`, borderRight: `1px solid ${color}` }} />
      <span style={{ ...shared, bottom: 6, left: 6, borderBottom: `1px solid ${color}`, borderLeft: `1px solid ${color}` }} />
      <span style={{ ...shared, bottom: 6, right: 6, borderBottom: `1px solid ${color}`, borderRight: `1px solid ${color}` }} />
    </>
  );
}

function SignalBars({ strength, max = 5, T }: { strength: number; max?: number; T: typeof DM | typeof LM }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 2 }} title={`Signal: ${strength}/${max}`}>
      {Array.from({ length: max }, (_, i) => (
        <div
          key={i}
          style={{
            width: 3,
            height: 4 + i * 2.5,
            borderRadius: 1,
            backgroundColor: i < strength
              ? `hsl(${260 + i * 15}, 75%, ${58 + i * 4}%)`
              : T.signalInactive,
            transition: "background-color 0.3s",
          }}
        />
      ))}
    </div>
  );
}

function StatusDot({ active, T }: { active: boolean; T: typeof DM | typeof LM }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "monospace", fontSize: 11, letterSpacing: "0.15em", color: active ? T.statusActive : T.statusInactive }}>
      <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", backgroundColor: active ? T.statusActive : T.statusInactive, boxShadow: active && T === DM ? `0 0 6px ${T.statusActive}` : "none" }} />
      {active ? "ACTIVE" : "ARCHIVED"}
    </span>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function SpaceMissions({
  missions,
  blogFolder = "blog",
}: {
  missions: Mission[];
  blogFolder?: string;
}) {
  const dark = useDarkMode();
  const T = dark ? DM : LM;

  const [view, setView] = useState<View>("hangar");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [explored, setExplored] = useState<Set<string>>(new Set());
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [blink, setBlink] = useState(true);
  const [xpToast, setXpToast] = useState<number | null>(null);
  const xpTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const stars = useRef(
    Array.from({ length: 70 }, () => ({
      cx: `${Math.random() * 100}%`,
      cy: `${Math.random() * 100}%`,
      r: Math.random() * 1.1 + 0.3,
      opacity: Math.random() * 0.35 + 0.08,
      dur: `${2.5 + Math.random() * 3}s`,
      delay: `${Math.random() * 4}s`,
    }))
  ).current;

  useEffect(() => {
    const iv = setInterval(() => setBlink((v) => !v), 530);
    return () => clearInterval(iv);
  }, []);

  const totalXP = [...explored].reduce((sum, id) => {
    const m = missions.find((m) => m.id === id);
    return sum + (m ? getMissionXP(m) : 0);
  }, 0);
  const rank = getRank(totalXP);
  const unlockedAchievements = ACHIEVEMENTS.filter((a) =>
    a.check(explored, missions.length, missions)
  );

  const openMission = useCallback(
    (id: string) => {
      const wasExplored = explored.has(id);
      setSelectedId(id);
      setView("brief");
      if (!wasExplored) {
        const m = missions.find((m) => m.id === id);
        if (m) {
          setExplored((prev) => { const next = new Set(prev); next.add(id); return next; });
          if (xpTimerRef.current) clearTimeout(xpTimerRef.current);
          setXpToast(getMissionXP(m));
          xpTimerRef.current = setTimeout(() => setXpToast(null), 2800);
        }
      }
    },
    [explored, missions]
  );

  const selectedMission = missions.find((m) => m.id === selectedId) ?? null;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        borderRadius: 16,
        overflow: "hidden",
        background: T.bg,
        border: T.outerBorder,
        minHeight: "clamp(520px, 72vh, 820px)",
        boxShadow: T.outerShadow,
      }}
    >
      {/* Stars — dark mode only */}
      {dark && (
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} aria-hidden="true">
          {stars.map((s, i) => (
            <circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill="white" opacity={s.opacity}>
              <animate attributeName="opacity" values={`${s.opacity};${Math.min(s.opacity * 2.8, 0.9)};${s.opacity}`} dur={s.dur} begin={s.delay} repeatCount="indefinite" />
            </circle>
          ))}
        </svg>
      )}

      {/* Scanlines — dark mode only */}
      {dark && (
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: DM.scanlines, zIndex: 1 }} />
      )}

      {/* XP Toast */}
      {xpToast !== null && (
        <div
          style={{
            position: "absolute", top: 64, right: 20, zIndex: 50,
            fontFamily: "monospace", fontSize: 16, fontWeight: 700,
            color: T.green, textShadow: dark ? `0 0 14px ${T.green}` : "none",
            pointerEvents: "none",
            animation: "spaceMissionsFloatUp 2.8s ease-out forwards",
          }}
        >
          +{xpToast} XP
        </div>
      )}

      {/* ── HEADER ─── */}
      <div
        style={{
          position: "relative", zIndex: 10,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "16px 20px",
          borderBottom: `1px solid ${T.headerBorder}`,
          backdropFilter: dark ? "blur(10px)" : "none",
        }}
      >
        <div>
          <p style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.3em", color: T.eyebrow, margin: 0, marginBottom: 4 }}>
            MISSION CONTROL · SECTOR 7
          </p>
          <h2 style={{ fontFamily: "monospace", fontWeight: 700, fontSize: "clamp(1rem, 2.5vw, 1.25rem)", margin: 0, color: T.text, letterSpacing: "0.06em" }}>
            PROJECT LOG
            <span style={{ opacity: blink ? 1 : 0, transition: "opacity 0.1s" }}>_</span>
          </h2>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              fontFamily: "monospace", fontSize: 11, fontWeight: 700,
              padding: "6px 14px", borderRadius: 99,
              color: T.rankBadgeColor,
              border: `1px solid ${T.rankBadgeBorder}`,
              background: T.rankBadgeBg,
              letterSpacing: "0.1em",
            }}
          >
            {totalXP} XP · {rank.label}
          </div>
        </div>
      </div>

      {/* ── TABS ─── */}
      <div
        style={{
          position: "relative", zIndex: 10,
          display: "flex", alignItems: "stretch",
          borderBottom: `1px solid ${T.tabBorder}`,
          backdropFilter: dark ? "blur(10px)" : "none",
          overflowX: "auto",
        }}
      >
        {[
          { id: "hangar" as View, icon: "◉", label: "HANGAR", badge: missions.length, disabled: false },
          { id: "brief" as View, icon: "◈", label: "MISSION", badge: null, disabled: !selectedId },
          { id: "pilot" as View, icon: "◆", label: "PILOT LOG", badge: unlockedAchievements.length || null, disabled: false, badgeIsAch: true },
        ].map((tab) => {
          const active = view === tab.id;
          return (
            <button
              key={tab.id}
              disabled={tab.disabled}
              onClick={() => !tab.disabled && setView(tab.id)}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "12px 16px",
                fontFamily: "monospace", fontSize: 11, letterSpacing: "0.2em",
                cursor: tab.disabled ? "not-allowed" : "pointer",
                background: active ? T.tabActiveBg : "transparent",
                color: tab.disabled ? T.tabDisabled : active ? T.tabActiveColor : T.tabColor,
                borderBottom: active ? `2px solid ${T.tabActiveBorder}` : "2px solid transparent",
                border: "none", outline: "none", whiteSpace: "nowrap",
                transition: "all 0.2s",
              }}
            >
              {tab.icon} {tab.label}
              {tab.badge != null && tab.badge > 0 && (
                <span style={{
                  fontFamily: "monospace", fontSize: 10, padding: "1px 6px", borderRadius: 99,
                  background: tab.badgeIsAch ? T.achCountBg : T.tagCountBg,
                  color: tab.badgeIsAch ? T.achCountColor : T.purple,
                }}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", paddingRight: 20, fontFamily: "monospace", fontSize: 10, letterSpacing: "0.15em", color: T.exploredCounter, whiteSpace: "nowrap" }}>
          {explored.size}/{missions.length} EXPLORED
        </div>
      </div>

      {/* ── CONTENT ─── */}
      <div style={{ position: "relative", zIndex: 10, padding: 20, minHeight: 420 }}>

        {/* ══ HANGAR ══ */}
        {view === "hangar" && (
          <div>
            {missions.length === 0 ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", paddingTop: 80, paddingBottom: 80 }}>
                <p style={{ fontFamily: "monospace", fontSize: 12, letterSpacing: "0.3em", color: T.textFaint }}>
                  NO MISSIONS CATALOGUED
                </p>
              </div>
            ) : (
              <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 260px), 1fr))" }}>
                {missions.map((mission, idx) => {
                  const xp = getMissionXP(mission);
                  const isExplored = explored.has(mission.id);
                  const isHov = hoveredId === mission.id;
                  const isActive = !mission.tags.includes("archived");

                  return (
                    <div
                      key={mission.id}
                      onMouseEnter={() => setHoveredId(mission.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      onClick={() => openMission(mission.id)}
                      style={{
                        position: "relative",
                        cursor: "pointer",
                        borderRadius: 12,
                        border: isHov
                          ? `1px solid ${T.cardBorderHov}`
                          : isExplored
                          ? `1px solid ${dark ? "rgba(124,58,237,0.22)" : RAINBOW[idx % RAINBOW.length]}`
                          : dark
                          ? `1px solid ${T.cardBorder}`
                          : `1px solid ${RAINBOW[idx % RAINBOW.length]}`,
                        background: isHov ? T.cardBgHov : T.cardBg,
                        padding: "1.25rem",
                        boxShadow: isHov ? T.cardShadowHov : "none",
                        transition: "all 0.25s ease",
                        backdropFilter: dark ? "none" : "blur(4px)",
                      }}
                    >
                      <CornerBrackets lit={isHov} T={T} />

                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                        <span style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.25em", color: isExplored ? T.codeColorExplored : T.codeColor }}>
                          #{getMissionCode(idx)}
                        </span>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          {isExplored && (
                            <span style={{ fontFamily: "monospace", fontSize: 9, color: T.green, opacity: 0.7 }}>✓ LOG</span>
                          )}
                          <StatusDot active={isActive} T={T} />
                        </div>
                      </div>

                      <h3 style={{ fontWeight: 700, fontSize: "clamp(0.85rem, 1.5vw, 0.95rem)", lineHeight: 1.35, marginBottom: 8, color: T.titleColor, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                        {mission.title}
                      </h3>

                      <p style={{ fontSize: 12, lineHeight: 1.6, color: T.descColor, marginBottom: 14, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                        {mission.description}
                      </p>

                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
                        {mission.categories.slice(0, 3).map((cat) => (
                          <span key={cat} style={{ fontFamily: "monospace", fontSize: 10, padding: "2px 8px", borderRadius: 3, color: T.chipColor, background: T.chipBg, border: `1px solid ${T.chipBorder}`, letterSpacing: "0.05em" }}>
                            {cat}
                          </span>
                        ))}
                      </div>

                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                          <SignalBars strength={Math.min(mission.tags.length, 5)} T={T} />
                          <span style={{ fontFamily: "monospace", fontSize: 11, color: T.green }}>+{xp}XP</span>
                        </div>
                        <span style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.2em", color: isHov ? T.launchColorHov : T.launchColor, transition: "color 0.2s" }}>
                          LAUNCH →
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ══ MISSION BRIEF ══ */}
        {view === "brief" && selectedMission && (
          <div style={{ maxWidth: 680, margin: "0 auto" }}>
            <button
              onClick={() => setView("hangar")}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                fontFamily: "monospace", fontSize: 11, letterSpacing: "0.2em",
                color: T.backBtnColor, background: "none", border: "none",
                cursor: "pointer", marginBottom: 24, padding: 0, transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.6")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              ← RETURN TO HANGAR
            </button>

            <div
              style={{
                position: "relative", padding: "1.5rem", borderRadius: 14,
                border: `1px solid ${T.briefCardBorder}`,
                background: T.briefCardBg,
                marginBottom: 16,
              }}
            >
              <CornerBrackets lit T={T} />
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: T.accentLine, opacity: T.accentLineOpacity, borderRadius: "14px 14px 0 0" }} />

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                <span style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.3em", color: T.eyebrow }}>
                  #{getMissionCode(missions.findIndex((m) => m.id === selectedMission.id))}
                </span>
                <StatusDot active={!selectedMission.tags.includes("archived")} T={T} />
              </div>

              <h2 style={{ fontWeight: 700, fontSize: "clamp(1.1rem, 2.5vw, 1.45rem)", lineHeight: 1.3, marginBottom: 14, color: T.titleColor }}>
                {selectedMission.title}
              </h2>

              <p style={{ fontSize: 13, lineHeight: 1.7, color: T.descColor, marginBottom: 20 }}>
                {selectedMission.description || "No briefing available."}
              </p>

              <div style={{ marginBottom: 20 }}>
                <p style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.3em", color: T.statColor, marginBottom: 10 }}>TECH MANIFEST</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {[...selectedMission.categories, ...selectedMission.tags].map((t) => (
                    <span key={t} style={{ fontFamily: "monospace", fontSize: 11, padding: "4px 12px", borderRadius: 4, color: T.tagManifestColor, background: T.tagManifestBg, border: `1px solid ${T.tagManifestBorder}`, letterSpacing: "0.05em" }}>
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ display: "flex", alignItems: "flex-start", gap: 28, paddingTop: 16, borderTop: `1px solid ${T.divider}`, flexWrap: "wrap" }}>
                <div>
                  <p style={{ fontFamily: "monospace", fontSize: 9, letterSpacing: "0.3em", color: T.statColor, marginBottom: 6 }}>SIGNAL</p>
                  <SignalBars strength={Math.min(selectedMission.tags.length, 5)} T={T} />
                </div>
                <div>
                  <p style={{ fontFamily: "monospace", fontSize: 9, letterSpacing: "0.3em", color: T.statColor, marginBottom: 4 }}>MISSION XP</p>
                  <p style={{ fontFamily: "monospace", fontSize: 16, fontWeight: 700, color: T.green, margin: 0, textShadow: dark ? `0 0 10px ${T.green}` : "none" }}>
                    +{getMissionXP(selectedMission)}
                  </p>
                </div>
                <div>
                  <p style={{ fontFamily: "monospace", fontSize: 9, letterSpacing: "0.3em", color: T.statColor, marginBottom: 4 }}>AUTHOR</p>
                  <p style={{ fontFamily: "monospace", fontSize: 12, color: T.textMuted, margin: 0 }}>{selectedMission.author}</p>
                </div>
                <div>
                  <p style={{ fontFamily: "monospace", fontSize: 9, letterSpacing: "0.3em", color: T.statColor, marginBottom: 4 }}>YEAR</p>
                  <p style={{ fontFamily: "monospace", fontSize: 12, color: T.textMuted, margin: 0 }}>{new Date(selectedMission.date).getFullYear()}</p>
                </div>
              </div>
            </div>

            <a
              href={`/${blogFolder}/${selectedMission.slug}`}
              style={{
                display: "flex", alignItems: "center", justifyContent: "center", gap: 12,
                width: "100%", padding: "14px 24px", borderRadius: 12,
                fontFamily: "monospace", fontSize: 13, fontWeight: 700, letterSpacing: "0.2em",
                color: "white", background: T.btnBg,
                boxShadow: T.btnShadow, textDecoration: "none",
                transition: "opacity 0.2s, transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.9"; e.currentTarget.style.transform = "scale(1.01)"; e.currentTarget.style.boxShadow = T.btnShadowHov; }}
              onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = T.btnShadow; }}
            >
              OPEN TRANSMISSION →
            </a>
          </div>
        )}

        {/* ══ PILOT LOG ══ */}
        {view === "pilot" && (
          <div style={{ maxWidth: 680, margin: "0 auto" }}>
            <div style={{ position: "relative", padding: "1.5rem", borderRadius: 14, border: `1px solid ${T.pilotHeaderBorder}`, background: T.pilotHeaderBg, marginBottom: 20 }}>
              <CornerBrackets lit T={T} />
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: T.accentLine, opacity: T.accentLineOpacity, borderRadius: "14px 14px 0 0" }} />

              <p style={{ fontFamily: "monospace", fontSize: 9, letterSpacing: "0.35em", color: T.textFaint, marginBottom: 6 }}>
                // CLASSIFIED RECORD //
              </p>

              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                <div>
                  <h3 style={{ fontWeight: 700, fontSize: "1.3rem", color: T.text, margin: 0, marginBottom: 4 }}>Hrist Joy</h3>
                  <p style={{ fontFamily: "monospace", fontSize: 13, color: T.purple, margin: 0, textShadow: dark ? `0 0 10px rgba(124,58,237,0.4)` : "none" }}>
                    {"★".repeat(rank.stars)}{"☆".repeat(Math.max(0, 5 - rank.stars))} {rank.label}
                  </p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontFamily: "monospace", fontSize: "1.8rem", fontWeight: 700, color: T.statsValueColor, margin: 0, textShadow: T.statsValueShadow, lineHeight: 1 }}>
                    {totalXP}
                  </p>
                  <p style={{ fontFamily: "monospace", fontSize: 9, letterSpacing: "0.3em", color: T.statColor, margin: 0 }}>TOTAL XP</p>
                </div>
              </div>

              <div style={{ marginTop: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.2em", color: T.textMuted }}>MISSION PROGRESS</span>
                  <span style={{ fontFamily: "monospace", fontSize: 10, color: T.textMuted }}>{explored.size} / {missions.length}</span>
                </div>
                <div style={{ width: "100%", height: 6, borderRadius: 99, background: T.progressBg, overflow: "hidden" }}>
                  <div style={{ height: "100%", borderRadius: 99, background: T.progressFill, boxShadow: T.progressShadow, width: `${missions.length > 0 ? (explored.size / missions.length) * 100 : 0}%`, transition: "width 0.7s cubic-bezier(0.4,0,0.2,1)" }} />
                </div>
              </div>
            </div>

            {/* Tech Arsenal */}
            <div style={{ marginBottom: 20 }}>
              <p style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.28em", color: T.statColor, marginBottom: 12 }}>// TECH ARSENAL //</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {(() => {
                  const freq: Record<string, number> = {};
                  missions.forEach((m) =>
                    [...m.categories, ...m.tags].forEach((t) => { freq[t] = (freq[t] || 0) + 1; })
                  );
                  return Object.entries(freq)
                    .sort(([, a], [, b]) => b - a)
                    .slice(0, 14)
                    .map(([tech, count]) => (
                      <span key={tech} style={{ fontFamily: "monospace", fontSize: Math.min(11, 9 + count * 0.8), padding: "4px 10px", borderRadius: 99, color: T.techChipColor, background: T.techChipBg, border: `1px solid ${T.techChipBorder}`, letterSpacing: "0.04em" }}>
                        {tech} <span style={{ opacity: 0.45 }}>×{count}</span>
                      </span>
                    ));
                })()}
              </div>
            </div>

            {/* Achievements */}
            <div>
              <p style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.28em", color: T.statColor, marginBottom: 12 }}>// ACHIEVEMENTS //</p>
              <div style={{ display: "grid", gap: 10, gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 260px), 1fr))" }}>
                {ACHIEVEMENTS.map((ach) => {
                  const unlocked = unlockedAchievements.some((u) => u.id === ach.id);
                  return (
                    <div key={ach.id} style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", borderRadius: 10, border: unlocked ? `1px solid ${T.achBorderUnlocked}` : `1px solid ${T.achBorderLocked}`, background: unlocked ? T.achBgUnlocked : T.achBgLocked, opacity: unlocked ? 1 : 0.42, transition: "all 0.3s" }}>
                      <span style={{ width: 34, height: 34, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 16, background: unlocked ? T.achIconBgUnlocked : T.achIconBgLocked, color: unlocked ? T.achLabelUnlocked : T.achIconColorLocked }}>
                        {ach.icon}
                      </span>
                      <div>
                        <p style={{ fontFamily: "monospace", fontSize: 10, fontWeight: 700, letterSpacing: "0.15em", color: unlocked ? T.achLabelUnlocked : T.achLabelLocked, margin: 0, marginBottom: 3 }}>
                          {ach.label}
                        </p>
                        <p style={{ fontSize: 11, color: T.achDescColor, margin: 0, lineHeight: 1.4 }}>
                          {ach.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spaceMissionsFloatUp {
          0%   { opacity: 1;   transform: translateY(0px);  }
          70%  { opacity: 0.8; transform: translateY(-28px); }
          100% { opacity: 0;   transform: translateY(-48px); }
        }
      `}</style>
    </div>
  );
}
