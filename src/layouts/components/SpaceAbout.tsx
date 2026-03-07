"use client";
import React, { useEffect, useRef, useState } from "react";
import NeuralAbout from "./NeuralAbout";
import CareerJourneyMap from "./CareerJourneyMap";
import { type JNode, NODES, NCOLOR } from "./careerData";

// â”€â”€ Mobile About â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function MobileAbout({ dark, T }: { dark: boolean; T: typeof DM }) {
  const skills = [
    { cat: "Backend",       color: "#0ea5e9", items: ["Java 17", "Quarkus", "Spring Boot", "APIs REST", "BIAN"] },
    { cat: "Cloud & DevOps",color: "#06b6d4", items: ["Microsoft Azure", "Docker", "Kubernetes", "CI/CD", "ADF"] },
    { cat: "Frontend",      color: "#8b5cf6", items: ["Angular", "TypeScript", "SCSS", "TailwindCSS"] },
    { cat: "Databases",     color: "#10b981", items: ["MySQL", "Oracle", "MongoDB", "SQL"] },
  ];
  const experience = [
    { company: "Indra",              role: "Senior Backend Engineer",  period: "ago 2023 â€“ Presente", color: "#7c3aed" },
    { company: "Canvia",             role: "Analista Programador",     period: "abr 2022 â€“ ago 2023",  color: "#0ea5e9" },
    { company: "GLOBAL HITSS",       role: "Analista Programador",     period: "oct 2021 â€“ abr 2022",  color: "#06b6d4" },
    { company: "REVSA â€“ Credivargas",role: "Desarrollador",            period: "abr 2019 â€“ nov 2021",  color: "#10b981" },
  ];
  const repos = [
    { name: "pagos-microservice", lang: "Java",  desc: "Microservicio de pagos" },
    { name: "spring-security",    lang: "Java",  desc: "Caso prÃ¡ctico de seguridad" },
    { name: "service-configuration",lang:"Java", desc: "ConfiguraciÃ³n de servicios" },
    { name: "juego-memoria",      lang: "HTML",  desc: "Memory game" },
    { name: "books-app",          lang: "HTML",  desc: "App de libros" },
  ];
  const langColor: Record<string, string> = {
    Java: "#f59e0b", HTML: "#e44d26", MDX: "#8b5cf6",
  };

  const card: React.CSSProperties = {
    borderRadius: 12,
    padding: "16px",
    background: dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)",
    border: dark ? "1px solid rgba(124,58,237,0.15)" : "1px solid rgba(168,85,247,0.12)",
  };

  return (
    <div style={{ padding: "20px 16px", display: "flex", flexDirection: "column", gap: 18 }}>

      {/* â”€â”€ Name & role â”€â”€ */}
      <div style={{ textAlign: "center" }}>
        <p style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.3em", color: T.eyebrow, margin: "0 0 6px" }}>
          BACKEND ENGINEER Â· FINTECH
        </p>
        <h2 style={{ fontFamily: "monospace", fontWeight: 700, fontSize: "1.35rem", margin: "0 0 4px", color: T.text, letterSpacing: "0.04em" }}>
          Hrist Joy Bartra
        </h2>
        <p style={{ fontFamily: "monospace", fontSize: 11, color: T.textMuted, margin: 0, letterSpacing: "0.08em" }}>
          Java Â· Quarkus Â· Azure Â· BIAN
        </p>
      </div>

      {/* â”€â”€ Stats row â”€â”€ */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
        {[
          { value: "6+",  label: "AÃ±os exp." },
          { value: "4",   label: "Empresas" },
          { value: "163", label: "Commits/aÃ±o" },
        ].map((s) => (
          <div key={s.value} style={{ ...card, textAlign: "center", padding: "12px 8px" }}>
            <p style={{ fontFamily: "monospace", fontWeight: 700, fontSize: "1.3rem", margin: "0 0 2px", color: T.stat }}>{s.value}</p>
            <p style={{ fontFamily: "monospace", fontSize: 9, letterSpacing: "0.15em", color: T.textMuted, margin: 0, textTransform: "uppercase" }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* â”€â”€ Bio â”€â”€ */}
      <div style={{ ...card }}>
        <p style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.25em", color: T.eyebrow, margin: "0 0 8px" }}>ACERCA DE</p>
        <p style={{ fontSize: 13, lineHeight: 1.65, color: T.text, margin: 0 }}>
          Desarrollador de software especializado en microservicios con <strong style={{ color: T.stat }}>Java 17 y Quarkus</strong>, arquitecturas bajo estÃ¡ndar <strong style={{ color: T.stat }}>BIAN</strong> para FinTech y Neobanking. Actualmente en <strong style={{ color: T.stat }}>Indra</strong> liderando el core bancario de un Banco por WhatsApp.
        </p>
      </div>

      {/* â”€â”€ Skills â”€â”€ */}
      <div style={{ ...card }}>
        <p style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.25em", color: T.eyebrow, margin: "0 0 12px" }}>STACK TECNOLÃ“GICO</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {skills.map((group) => (
            <div key={group.cat}>
              <p style={{ fontFamily: "monospace", fontSize: 9, letterSpacing: "0.2em", color: group.color, margin: "0 0 6px", textTransform: "uppercase" }}>{group.cat}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {group.items.map((item) => (
                  <span key={item} style={{
                    fontSize: 11, padding: "3px 9px", borderRadius: 20, fontFamily: "monospace",
                    background: dark ? `${group.color}18` : `${group.color}14`,
                    border: `1px solid ${group.color}40`,
                    color: dark ? group.color : group.color,
                  }}>{item}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* â”€â”€ Experience â”€â”€ */}
      <div style={{ ...card }}>
        <p style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.25em", color: T.eyebrow, margin: "0 0 12px" }}>EXPERIENCIA</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {experience.map((exp, i) => (
            <div key={exp.company} style={{ display: "flex", gap: 12, paddingBottom: i < experience.length - 1 ? 14 : 0, position: "relative" }}>
              {/* Timeline line */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: exp.color, flexShrink: 0, marginTop: 3, boxShadow: dark ? `0 0 6px ${exp.color}` : "none" }} />
                {i < experience.length - 1 && (
                  <div style={{ width: 1, flex: 1, background: dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.1)", marginTop: 4 }} />
                )}
              </div>
              <div style={{ paddingBottom: i < experience.length - 1 ? 4 : 0 }}>
                <p style={{ fontWeight: 600, fontSize: 13, color: T.text, margin: "0 0 2px" }}>{exp.company}</p>
                <p style={{ fontSize: 12, color: exp.color, margin: "0 0 2px", fontFamily: "monospace" }}>{exp.role}</p>
                <p style={{ fontSize: 10, color: T.textMuted, margin: 0, fontFamily: "monospace", letterSpacing: "0.05em" }}>{exp.period}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* â”€â”€ GitHub repos â”€â”€ */}
      <div style={{ ...card }}>
        <p style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.25em", color: T.eyebrow, margin: "0 0 12px" }}>
          REPOSITORIOS Â· GITHUB
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {repos.map((repo) => (
            <a
              key={repo.name}
              href={`https://github.com/Hristb/${repo.name}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between",
                padding: "10px 12px", borderRadius: 8, textDecoration: "none",
                background: dark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.025)",
                border: dark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.07)",
              }}
            >
              <div>
                <p style={{ fontFamily: "monospace", fontSize: 12, color: T.stat, margin: "0 0 2px", fontWeight: 600 }}>{repo.name}</p>
                <p style={{ fontSize: 11, color: T.textMuted, margin: 0 }}>{repo.desc}</p>
              </div>
              <span style={{
                fontSize: 10, padding: "2px 8px", borderRadius: 20, fontFamily: "monospace",
                background: `${langColor[repo.lang] ?? "#888"}22`,
                border: `1px solid ${langColor[repo.lang] ?? "#888"}50`,
                color: langColor[repo.lang] ?? "#888",
              }}>{repo.lang}</span>
            </a>
          ))}
        </div>
        <a
          href="https://github.com/Hristb"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "block", textAlign: "center", marginTop: 12,
            fontFamily: "monospace", fontSize: 11, letterSpacing: "0.2em",
            color: T.stat, textDecoration: "none", textTransform: "uppercase",
          }}
        >
          Ver todos los repositorios â†’
        </a>
      </div>

      {/* â”€â”€ Links â”€â”€ */}
      <div style={{ display: "flex", gap: 10 }}>
        <a
          href="https://www.linkedin.com/in/hrist-joy-bartra-saavedra-09b71913a/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            flex: 1, textAlign: "center", padding: "11px 8px", borderRadius: 10,
            fontFamily: "monospace", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em",
            textDecoration: "none", color: "#fff",
            background: "linear-gradient(135deg, #0077b5, #005fa3)",
          }}
        >
          LINKEDIN
        </a>
        <a
          href="https://github.com/Hristb"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            flex: 1, textAlign: "center", padding: "11px 8px", borderRadius: 10,
            fontFamily: "monospace", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em",
            textDecoration: "none",
            color: dark ? "#fff" : "#1a1a1a",
            background: dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)",
            border: dark ? "1px solid rgba(255,255,255,0.15)" : "1px solid rgba(0,0,0,0.12)",
          }}
        >
          GITHUB
        </a>
        <a
          href="mailto:hristbartra@gmail.com"
          style={{
            flex: 1, textAlign: "center", padding: "11px 8px", borderRadius: 10,
            fontFamily: "monospace", fontSize: 11, fontWeight: 700, letterSpacing: "0.12em",
            textDecoration: "none", color: "#fff",
            background: "linear-gradient(135deg, #7c3aed, #5b21b6)",
          }}
        >
          EMAIL
        </a>
      </div>

    </div>
  );
}

// â”€â”€ Dark-mode detection â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
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

// â”€â”€ Themes â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const DM = {
  bg: "linear-gradient(160deg, #06051a 0%, #0b0a22 60%, #07071e 100%)",
  outerBorder: "1px solid rgba(124,58,237,0.2)",
  outerShadow: "0 0 60px rgba(124,58,237,0.08), inset 0 0 80px rgba(14,165,233,0.02)",
  headerBorder: "rgba(124,58,237,0.18)",
  footerBorder: "rgba(124,58,237,0.14)",
  accentLine: "linear-gradient(90deg, transparent, #7c3aed, #0ea5e9, transparent)",
  text: "rgba(255,255,255,0.92)",
  textMuted: "rgba(255,255,255,0.28)",
  eyebrow: "rgba(124,58,237,0.6)",
  stat: "#0ea5e9",
  statShadow: "0 0 14px rgba(14,165,233,0.45)",
  bracket: "rgba(124,58,237,0.4)",
  legendDot: "rgba(255,255,255,0.25)",
  divider: "rgba(124,58,237,0.14)",
  cardBg: "rgba(255,255,255,0.028)",
  cardBorder: "rgba(124,58,237,0.14)",
  scanlines: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.005) 3px, rgba(255,255,255,0.005) 4px)",
};

const LM = {
  bg: "linear-gradient(160deg, #fdf4ff 0%, #f0f9ff 45%, #f0fdf4 100%)",
  outerBorder: "1px solid rgba(168,85,247,0.18)",
  outerShadow: "0 4px 40px rgba(168,85,247,0.07)",
  headerBorder: "rgba(168,85,247,0.14)",
  footerBorder: "rgba(168,85,247,0.1)",
  accentLine: "linear-gradient(90deg, transparent, #f472b6, #a78bfa, #60a5fa, transparent)",
  text: "#1a0a3c",
  textMuted: "rgba(100,72,150,0.55)",
  eyebrow: "#9333ea",
  stat: "#0284c7",
  statShadow: "none",
  bracket: "rgba(168,85,247,0.35)",
  legendDot: "rgba(100,72,150,0.4)",
  divider: "rgba(168,85,247,0.1)",
  cardBg: "rgba(255,255,255,0.65)",
  cardBorder: "rgba(168,85,247,0.14)",
  scanlines: "none",
};

// â”€â”€ Corner brackets â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function CornerBrackets({ color }: { color: string }) {
  const s: React.CSSProperties = { position: "absolute", width: 14, height: 14, pointerEvents: "none" };
  return (
    <>
      <span style={{ ...s, top: 8, left: 8,  borderTop:    `1px solid ${color}`, borderLeft:  `1px solid ${color}` }} />
      <span style={{ ...s, top: 8, right: 8,  borderTop:    `1px solid ${color}`, borderRight: `1px solid ${color}` }} />
      <span style={{ ...s, bottom: 8, left: 8,  borderBottom: `1px solid ${color}`, borderLeft:  `1px solid ${color}` }} />
      <span style={{ ...s, bottom: 8, right: 8,  borderBottom: `1px solid ${color}`, borderRight: `1px solid ${color}` }} />
    </>
  );
}

// â”€â”€ Desktop static data â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
const SKILLS_DESKTOP = [
  { cat: "Backend",       color: "#0ea5e9", items: ["Java 17", "Quarkus", "Spring Boot", "APIs REST", "BIAN"] },
  { cat: "Cloud & DevOps",color: "#06b6d4", items: ["Azure", "Docker", "Kubernetes", "CI/CD", "ADF"] },
  { cat: "Frontend",      color: "#8b5cf6", items: ["Angular", "TypeScript", "TailwindCSS"] },
  { cat: "Databases",     color: "#10b981", items: ["MySQL", "Oracle", "MongoDB"] },
];

const EXPERIENCE_DESKTOP = [
  { company: "Indra",              role: "Senior Backend Engineer",  period: "ago 2023 â€“ Presente", color: "#7c3aed", live: true  },
  { company: "Canvia",             role: "Analista Programador",     period: "abr 2022 â€“ ago 2023",  color: "#0ea5e9", live: false },
  { company: "GLOBAL HITSS",       role: "Analista Programador",     period: "oct 2021 â€“ abr 2022",  color: "#06b6d4", live: false },
  { company: "REVSA â€“ Credivargas",role: "Desarrollador",            period: "abr 2019 â€“ nov 2021",  color: "#10b981", live: false },
];

// â”€â”€ Desktop Profile Panel (LEFT column) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function DesktopProfilePanel({ dark, T, activeNode, onClearNode }: {
  dark: boolean;
  T: typeof DM;
  activeNode: JNode | null;
  onClearNode: () => void;
}) {
  const [blink, setBlink] = useState(true);
  const [livePulse, setLivePulse] = useState(true);

  useEffect(() => {
    const iv1 = setInterval(() => setBlink((v) => !v), 530);
    const iv2 = setInterval(() => setLivePulse((v) => !v), 1100);
    return () => { clearInterval(iv1); clearInterval(iv2); };
  }, []);

  const card: React.CSSProperties = {
    borderRadius: 10,
    padding: "13px 15px",
    background: T.cardBg,
    border: `1px solid ${T.cardBorder}`,
  };

  // ── Node detail view (shown when user clicks a journey point) ─────────────
  if (activeNode) {
    const ring = NCOLOR[activeNode.type];
    const TYPE_NAMES: Record<string, string> = {
      job: "EMPRESA", study: "FORMACIÓN", tech: "TECNOLOGÍA",
      milestone: "HITO", home: "ORIGEN",
    };
    return (
      <div style={{
        width: 330, borderRight: `1px solid ${T.divider}`,
        padding: "24px 20px", display: "flex", flexDirection: "column",
        gap: 14, overflowY: "auto", height: "clamp(500px, 66vh, 680px)",
        position: "relative", zIndex: 10,
      }}>

        {/* Terminal prefix + back button */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ fontFamily: "ui-monospace,monospace", fontSize: 10, color: ring, margin: 0, letterSpacing: "0.08em" }}>
            $ ./node-{String(activeNode.num).padStart(2, "0")}
            <span style={{ opacity: blink ? 1 : 0, transition: "opacity 0.1s" }}>_</span>
          </p>
          <button
            onClick={onClearNode}
            style={{
              background: "none", border: `1px solid ${T.cardBorder}`,
              cursor: "pointer", borderRadius: 6, padding: "3px 9px",
              fontFamily: "ui-monospace,monospace", fontSize: 9.5,
              color: T.textMuted, letterSpacing: "0.08em",
            }}
          >← PERFIL</button>
        </div>

        {/* Big icon + name header */}
        <div style={{ textAlign: "center", padding: "10px 0 6px" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            width: 72, height: 72, borderRadius: "50%",
            background: `${ring}14`, border: `2px solid ${ring}38`,
            boxShadow: dark ? `0 0 32px ${ring}45, 0 0 64px ${ring}18` : `0 0 22px ${ring}28`,
            marginBottom: 10,
          }}>
            <span style={{ fontSize: 34 }}>{activeNode.icon}</span>
          </div>
          <h3 style={{
            fontFamily: "ui-monospace,monospace", fontWeight: 700,
            fontSize: "1.05rem", color: T.text, margin: "0 0 4px", letterSpacing: "0.04em",
          }}>{activeNode.label}</h3>
          <p style={{
            fontFamily: "ui-monospace,monospace", fontSize: 10,
            color: ring, margin: "0 0 6px", letterSpacing: "0.06em",
          }}>{activeNode.period}</p>
          {activeNode.live && (
            <span style={{
              display: "inline-flex", alignItems: "center", gap: 4, fontSize: 8,
              padding: "2px 8px", borderRadius: 4,
              background: "#22c55e12", border: "1px solid #22c55e36",
              color: "#22c55e", fontFamily: "ui-monospace,monospace", letterSpacing: "0.18em",
            }}>
              <span style={{
                width: 5, height: 5, borderRadius: "50%", background: "#22c55e",
                display: "inline-block",
                boxShadow: livePulse ? "0 0 6px #22c55e" : "none",
                transition: "box-shadow 0.5s",
              }} />
              VIVO · PRESENTE
            </span>
          )}
        </div>

        {/* Accent divider */}
        <div style={{ height: 1, background: `${ring}28` }} />

        {/* Description card */}
        <div style={{ ...card, borderColor: `${ring}28` }}>
          <p style={{ fontSize: 12.5, lineHeight: 1.75, color: T.text, margin: 0 }}>
            {activeNode.desc}
          </p>
        </div>

        {/* Tags */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {activeNode.tags.map(tag => (
            <span key={tag} style={{
              fontSize: 10.5, padding: "3px 9px", borderRadius: 20,
              fontFamily: "ui-monospace,monospace",
              background: dark ? `${ring}18` : `${ring}10`,
              border: `1px solid ${ring}40`, color: ring,
            }}>{tag}</span>
          ))}
        </div>

        {/* Type + counter */}
        <p style={{
          fontFamily: "ui-monospace,monospace", fontSize: 8.5,
          color: T.textMuted, letterSpacing: "0.2em", margin: 0, textTransform: "uppercase",
        }}>
          {TYPE_NAMES[activeNode.type]} · #{String(activeNode.num).padStart(2, "0")} / {NODES.length}
        </p>

        <div style={{ flex: 1 }} />

        {/* CTA buttons */}
        <div style={{ display: "flex", gap: 7, paddingTop: 4 }}>
          <a href="https://www.linkedin.com/in/hrist-joy-bartra-saavedra-09b71913a/"
            target="_blank" rel="noopener noreferrer"
            style={{
              flex: 1, textAlign: "center", padding: "9px 4px", borderRadius: 8,
              fontFamily: "ui-monospace,monospace", fontSize: 9.5, fontWeight: 700,
              letterSpacing: "0.12em", textDecoration: "none", color: "#fff",
              background: dark
                ? "linear-gradient(135deg, #7c3aed, #0ea5e9)"
                : "linear-gradient(135deg, #ec4899, #a855f7)",
            }}>LINKEDIN</a>
          <a href="https://github.com/Hristb"
            target="_blank" rel="noopener noreferrer"
            style={{
              flex: 1, textAlign: "center", padding: "9px 4px", borderRadius: 8,
              fontFamily: "ui-monospace,monospace", fontSize: 9.5, fontWeight: 700,
              letterSpacing: "0.12em", textDecoration: "none",
              color: dark ? "#fff" : "#1a1a1a",
              background: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
              border: dark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(0,0,0,0.1)",
            }}>GITHUB</a>
          <a href="mailto:hristbartra@gmail.com"
            style={{
              flex: 1, textAlign: "center", padding: "9px 4px", borderRadius: 8,
              fontFamily: "ui-monospace,monospace", fontSize: 9.5, fontWeight: 700,
              letterSpacing: "0.12em", textDecoration: "none", color: "#fff",
              background: "linear-gradient(135deg, #7c3aed, #5b21b6)",
            }}>EMAIL</a>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      width: 330,
      borderRight: `1px solid ${T.divider}`,
      padding: "24px 20px",
      display: "flex",
      flexDirection: "column",
      gap: 15,
      overflowY: "auto",
      height: "clamp(500px, 66vh, 680px)",
      position: "relative",
      zIndex: 10,
    }}>

      {/* Terminal whoami prefix */}
      <p style={{
        fontFamily: "ui-monospace,monospace", fontSize: 10,
        color: T.eyebrow, margin: 0, letterSpacing: "0.08em",
      }}>
        $ whoami<span style={{ opacity: blink ? 1 : 0, transition: "opacity 0.1s" }}>_</span>
      </p>

      {/* Avatar + name + LIVE badge */}
      <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
        <div style={{
          width: 62, height: 62, borderRadius: "50%", flexShrink: 0,
          background: dark
            ? "linear-gradient(135deg, #7c3aed, #0ea5e9)"
            : "linear-gradient(135deg, #a855f7, #60a5fa)",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: dark ? "0 0 24px rgba(124,58,237,0.5)" : "0 0 18px rgba(168,85,247,0.22)",
          border: dark ? "2px solid rgba(14,165,233,0.4)" : "2px solid rgba(168,85,247,0.3)",
        }}>
          <span style={{
            fontFamily: "ui-monospace,monospace", fontWeight: 700,
            fontSize: 20, color: "#fff", letterSpacing: 2,
          }}>HB</span>
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <h3 style={{
            fontFamily: "ui-monospace,monospace", fontWeight: 700,
            fontSize: "1.06rem", color: T.text, margin: "0 0 3px",
            letterSpacing: "0.04em",
          }}>Hrist Joy Bartra</h3>
          <p style={{
            fontFamily: "ui-monospace,monospace", fontSize: 8.5,
            color: T.textMuted, margin: "0 0 5px", letterSpacing: "0.14em",
          }}>SENIOR BACKEND ENGINEER</p>
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{
              width: 7, height: 7, borderRadius: "50%", background: "#22c55e", flexShrink: 0,
              boxShadow: livePulse ? "0 0 9px #22c55e, 0 0 18px #22c55e55" : "0 0 4px #22c55e",
              transition: "box-shadow 0.5s ease",
            }} />
            <span style={{
              fontFamily: "ui-monospace,monospace", fontSize: 9,
              color: "#22c55e", letterSpacing: "0.18em",
            }}>INDRA Â· PRESENTE</span>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 6 }}>
        {[
          { v: "6+",  l: "AÃ±os exp."   },
          { v: "4",   l: "Empresas"    },
          { v: "163", l: "Commits/aÃ±o" },
        ].map((s) => (
          <div key={s.v} style={{ ...card, textAlign: "center", padding: "9px 4px" }}>
            <p style={{
              fontFamily: "ui-monospace,monospace", fontWeight: 700,
              fontSize: "1.1rem", margin: "0 0 2px",
              color: T.stat, textShadow: T.statShadow,
            }}>{s.v}</p>
            <p style={{
              fontFamily: "ui-monospace,monospace", fontSize: 8,
              letterSpacing: "0.14em", color: T.textMuted,
              margin: 0, textTransform: "uppercase",
            }}>{s.l}</p>
          </div>
        ))}
      </div>

      {/* Bio */}
      <div style={{ ...card }}>
        <p style={{
          fontFamily: "ui-monospace,monospace", fontSize: 9,
          letterSpacing: "0.25em", color: T.eyebrow, margin: "0 0 7px", textTransform: "uppercase",
        }}>ACERCA DE</p>
        <p style={{ fontSize: 12.5, lineHeight: 1.7, color: T.text, margin: 0 }}>
          Especializado en microservicios con{" "}
          <strong style={{ color: T.stat }}>Java 17 + Quarkus</strong> bajo estÃ¡ndar{" "}
          <strong style={{ color: T.stat }}>BIAN</strong> para FinTech y Neobanking.
          Liderando el core bancario de un{" "}
          <strong style={{ color: T.stat }}>Banco por WhatsApp</strong>.
        </p>
      </div>

      {/* Stack */}
      <div style={{ ...card }}>
        <p style={{
          fontFamily: "ui-monospace,monospace", fontSize: 9,
          letterSpacing: "0.25em", color: T.eyebrow, margin: "0 0 10px", textTransform: "uppercase",
        }}>STACK</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {SKILLS_DESKTOP.map((g) => (
            <div key={g.cat}>
              <p style={{
                fontFamily: "ui-monospace,monospace", fontSize: 8,
                letterSpacing: "0.2em", color: g.color, margin: "0 0 4px", textTransform: "uppercase",
              }}>{g.cat}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                {g.items.map((it) => (
                  <span key={it} style={{
                    fontSize: 10, padding: "2px 7px", borderRadius: 20,
                    fontFamily: "ui-monospace,monospace",
                    background: dark ? `${g.color}18` : `${g.color}12`,
                    border: `1px solid ${g.color}40`,
                    color: g.color,
                  }}>{it}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Experience mini-timeline */}
      <div style={{ ...card }}>
        <p style={{
          fontFamily: "ui-monospace,monospace", fontSize: 9,
          letterSpacing: "0.25em", color: T.eyebrow, margin: "0 0 10px", textTransform: "uppercase",
        }}>EXPERIENCIA</p>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {EXPERIENCE_DESKTOP.map((exp, i) => (
            <div key={exp.company} style={{
              display: "flex", gap: 10, position: "relative",
              paddingBottom: i < EXPERIENCE_DESKTOP.length - 1 ? 11 : 0,
            }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                <div style={{
                  width: 8, height: 8, borderRadius: "50%",
                  background: exp.color, marginTop: 3, flexShrink: 0,
                  boxShadow: dark && exp.live ? `0 0 9px ${exp.color}, 0 0 18px ${exp.color}55` : "none",
                }} />
                {i < EXPERIENCE_DESKTOP.length - 1 && (
                  <div style={{ width: 1, flex: 1, background: T.divider, marginTop: 3 }} />
                )}
              </div>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <p style={{ fontSize: 12, fontWeight: 600, color: T.text, margin: "0 0 1px" }}>{exp.company}</p>
                  {exp.live && (
                    <span style={{
                      fontSize: 7.5, padding: "1px 5px", borderRadius: 4,
                      background: "#22c55e1a", border: "1px solid #22c55e44",
                      color: "#22c55e", fontFamily: "ui-monospace,monospace", letterSpacing: "0.1em",
                    }}>LIVE</span>
                  )}
                </div>
                <p style={{
                  fontSize: 10.5, color: exp.color, margin: "0 0 1px",
                  fontFamily: "ui-monospace,monospace",
                }}>{exp.role}</p>
                <p style={{
                  fontSize: 9.5, color: T.textMuted, margin: 0,
                  fontFamily: "ui-monospace,monospace", letterSpacing: "0.04em",
                }}>{exp.period}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA buttons */}
      <div style={{ display: "flex", gap: 7, marginTop: "auto", paddingTop: 4 }}>
        <a
          href="https://www.linkedin.com/in/hrist-joy-bartra-saavedra-09b71913a/"
          target="_blank" rel="noopener noreferrer"
          style={{
            flex: 1, textAlign: "center", padding: "9px 4px", borderRadius: 8,
            fontFamily: "ui-monospace,monospace", fontSize: 9.5, fontWeight: 700,
            letterSpacing: "0.12em", textDecoration: "none", color: "#fff",
            background: dark
              ? "linear-gradient(135deg, #7c3aed, #0ea5e9)"
              : "linear-gradient(135deg, #ec4899, #a855f7)",
          }}
        >LINKEDIN</a>
        <a
          href="https://github.com/Hristb"
          target="_blank" rel="noopener noreferrer"
          style={{
            flex: 1, textAlign: "center", padding: "9px 4px", borderRadius: 8,
            fontFamily: "ui-monospace,monospace", fontSize: 9.5, fontWeight: 700,
            letterSpacing: "0.12em", textDecoration: "none",
            color: dark ? "#fff" : "#1a1a1a",
            background: dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)",
            border: dark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(0,0,0,0.1)",
          }}
        >GITHUB</a>
        <a
          href="mailto:hristbartra@gmail.com"
          style={{
            flex: 1, textAlign: "center", padding: "9px 4px", borderRadius: 8,
            fontFamily: "ui-monospace,monospace", fontSize: 9.5, fontWeight: 700,
            letterSpacing: "0.12em", textDecoration: "none", color: "#fff",
            background: "linear-gradient(135deg, #7c3aed, #5b21b6)",
          }}
        >EMAIL</a>
      </div>
    </div>
  );
}

// â”€â”€ Main â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
export default function SpaceAbout() {
  const dark = useDarkMode();
  const T = dark ? DM : LM;
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768
  );
  const [journeyId, setJourneyId] = useState<string | null>(null);
  const journeyNode: JNode | null = journeyId ? NODES.find(n => n.id === journeyId) ?? null : null;

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  const stars = useRef(
    Array.from({ length: 55 }, () => ({
      cx: Math.random() * 100,
      cy: Math.random() * 100,
      r:  Math.random() * 1.0 + 0.3,
      opacity: Math.random() * 0.3 + 0.05,
      dur: 2.5 + Math.random() * 3,
      delay: Math.random() * 4,
    }))
  ).current;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        borderRadius: 16,
        overflow: "hidden",
        background: T.bg,
        border: T.outerBorder,
        boxShadow: T.outerShadow,
      }}
    >
      {/* Stars backdrop â€” dark mode only */}
      {dark && (
        <svg
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }}
          aria-hidden="true"
        >
          {stars.map((s, i) => (
            <circle key={i} cx={`${s.cx}%`} cy={`${s.cy}%`} r={s.r} fill="white" opacity={s.opacity}>
              <animate
                attributeName="opacity"
                values={`${s.opacity};${Math.min(s.opacity * 2.8, 0.9)};${s.opacity}`}
                dur={`${s.dur}s`}
                begin={`${s.delay}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
        </svg>
      )}

      {/* Scanlines â€” dark mode only */}
      {dark && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background: DM.scanlines,
            zIndex: 1,
          }}
        />
      )}

      {/* â”€â”€ MOBILE LAYOUT â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */}
      {isMobile ? (
        <>
          <MobileAbout dark={dark} T={T} />
          <CornerBrackets color={T.bracket} />
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: T.accentLine, opacity: dark ? 0.4 : 0.6, zIndex: 20, pointerEvents: "none" }} />
        </>
      ) : (
        <>
          {/* ── DESKTOP: full-width map + accordion side panel ── */}
          <div style={{ display: "flex", position: "relative", zIndex: 10 }}>
            {/* Accordion panel — animates in from left on node click */}
            <div style={{
              width: journeyNode ? 330 : 0,
              flexShrink: 0,
              overflow: "hidden",
              transition: "width 0.38s cubic-bezier(0.4,0,0.2,1), opacity 0.26s ease 0.12s",
              opacity: journeyNode ? 1 : 0,
            }}>
              <DesktopProfilePanel dark={dark} T={T} activeNode={journeyNode} onClearNode={() => setJourneyId(null)} />
            </div>
            {/* Map — takes all remaining width */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <CareerJourneyMap activeId={journeyId} onNodeSelect={setJourneyId} showPopup={false} />
            </div>
          </div>
          <CornerBrackets color={T.bracket} />
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, height: 1,
            background: T.accentLine, opacity: dark ? 0.4 : 0.6,
            zIndex: 20, pointerEvents: "none",
          }} />
        </>
      )}
    </div>
  );
}
