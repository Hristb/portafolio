"use client";
import React from "react";

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

const GitHubIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const CVIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" aria-hidden="true">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

export default function HeroIntro() {
  const dark = useDarkMode();

  const bg = dark
    ? "linear-gradient(160deg, #07061a 0%, #0c0b24 100%)"
    : "linear-gradient(160deg, #faf8ff 0%, #f3eeff 100%)";
  const border = dark ? "rgba(124,58,237,0.2)" : "rgba(167,139,250,0.35)";
  const nameColor = dark ? "#fff" : "#1a0a3c";
  const roleColor = dark ? "#a78bfa" : "#7c3aed";
  const mutedColor = dark ? "rgba(255,255,255,0.52)" : "rgba(60,30,100,0.55)";
  const accent = "#7c3aed";

  const btnPrimary: React.CSSProperties = {
    display: "inline-flex", alignItems: "center", gap: 8,
    padding: "10px 22px", borderRadius: 8,
    fontWeight: 600, fontSize: 13.5, textDecoration: "none",
    letterSpacing: "0.03em", color: "#fff",
    background: dark
      ? "linear-gradient(135deg, #7c3aed, #0ea5e9)"
      : "linear-gradient(135deg, #7c3aed, #6d28d9)",
    boxShadow: "0 2px 18px rgba(124,58,237,0.32)",
    transition: "opacity 0.18s",
  };

  const btnGhost: React.CSSProperties = {
    display: "inline-flex", alignItems: "center", gap: 8,
    padding: "10px 22px", borderRadius: 8,
    fontWeight: 600, fontSize: 13.5, textDecoration: "none",
    letterSpacing: "0.03em",
    color: dark ? "rgba(255,255,255,0.78)" : accent,
    background: dark ? "rgba(255,255,255,0.05)" : "rgba(124,58,237,0.06)",
    border: dark ? "1px solid rgba(255,255,255,0.11)" : `1px solid rgba(124,58,237,0.2)`,
    transition: "opacity 0.18s",
  };

  return (
    <div style={{
      width: "100%",
      borderRadius: 18,
      border: `1px solid ${border}`,
      background: bg,
      boxShadow: dark
        ? "0 0 60px rgba(124,58,237,0.08)"
        : "0 4px 40px rgba(167,139,250,0.1)",
      padding: "clamp(36px,6vw,64px) clamp(24px,6vw,56px)",
      textAlign: "center",
    }}>

      {/* Accent top line */}
      <div style={{
        position: "relative",
        height: 0, overflow: "visible",
        marginBottom: 0,
      }}>
        <div style={{
          position: "absolute", top: "-clamp(36px,6vw,64px)", left: "15%", right: "15%", height: 1,
          background: dark
            ? "linear-gradient(90deg, transparent, #7c3aed, #0ea5e9, transparent)"
            : "linear-gradient(90deg, transparent, #a78bfa, #7c3aed, transparent)",
          opacity: 0.6,
        }} />
      </div>

      {/* Available badge */}
      <div style={{ marginBottom: 20 }}>
        <span style={{
          display: "inline-flex", alignItems: "center", gap: 7,
          fontFamily: "ui-monospace, monospace", fontSize: 11,
          letterSpacing: "0.13em", textTransform: "uppercase",
          padding: "5px 14px", borderRadius: 20,
          border: "1px solid rgba(124,58,237,0.28)",
          color: dark ? "#a78bfa" : "#7c3aed",
          background: "rgba(124,58,237,0.06)",
        }}>
          <span style={{
            width: 6, height: 6, borderRadius: "50%",
            background: "#22c55e", boxShadow: "0 0 6px #22c55e",
            display: "inline-block", flexShrink: 0,
          }} />
          Disponible · Lima, Perú
        </span>
      </div>

      {/* Name */}
      <h1 style={{
        fontFamily: "ui-monospace, monospace",
        fontSize: "clamp(2rem, 6vw, 3.4rem)",
        fontWeight: 700,
        color: nameColor,
        margin: "0 0 10px",
        letterSpacing: "-0.02em",
        lineHeight: 1.15,
      }}>
        Hrist Bartra
      </h1>

      {/* Role */}
      <p style={{
        fontFamily: "ui-monospace, monospace",
        fontSize: "clamp(13px, 2vw, 15px)",
        color: roleColor,
        fontWeight: 500,
        letterSpacing: "0.06em",
        textTransform: "uppercase",
        margin: "0 0 14px",
      }}>
        Senior Engineer Developer
      </p>

      {/* One-liner */}
      <p style={{
        fontSize: "clamp(14px, 2vw, 16px)",
        color: mutedColor,
        maxWidth: 520,
        margin: "0 auto 10px",
        lineHeight: 1.65,
      }}>
        SDD · Analista IT · Java · Quarkus · Azure · Angular
      </p>

      {/* Subtle AI line */}
      <p style={{
        fontFamily: "ui-monospace, monospace",
        fontSize: 11,
        color: dark ? "rgba(167,139,250,0.45)" : "rgba(124,58,237,0.38)",
        letterSpacing: "0.08em",
        margin: "0 auto 28px",
      }}>
        github copilot · uso diario desde 2024
      </p>

      {/* Buttons */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center" }}>
        <a
          href="https://github.com/Hristb?tab=repositories"
          target="_blank" rel="noopener noreferrer"
          style={btnPrimary}
        >
          <GitHubIcon />
          Repositorios
        </a>
        <a
          href="https://www.linkedin.com/in/hrist-joy-bartra-saavedra-09b71913a/"
          target="_blank" rel="noopener noreferrer"
          style={btnGhost}
        >
          <LinkedInIcon />
          LinkedIn
        </a>
        <a
          href="/downloads/cv-hrist-bartra.pdf"
          download
          style={btnGhost}
        >
          <CVIcon />
          CV
        </a>
      </div>

    </div>
  );
}
