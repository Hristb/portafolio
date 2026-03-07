"use client";
import React, { useState } from "react";

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

const REPOS = [
  {
    name: "pagos-microservice",
    lang: "Java",
    desc: "Microservicio de pagos con Quarkus y arquitectura BIAN para FinTech",
    topics: ["quarkus", "java", "fintech", "bian"],
  },
  {
    name: "spring-security",
    lang: "Java",
    desc: "Caso práctico completo de Spring Security — OAuth2, JWT y roles",
    topics: ["spring-boot", "security", "jwt", "oauth2"],
  },
  {
    name: "service-configuration",
    lang: "Java",
    desc: "Configuración centralizada de servicios en arquitectura de microservicios",
    topics: ["spring-cloud", "microservices", "config"],
  },
  {
    name: "juego-memoria",
    lang: "HTML",
    desc: "Memory game web — ejercicio de lógica y manipulación del DOM",
    topics: ["html", "css", "javascript", "game"],
  },
  {
    name: "books-app",
    lang: "HTML",
    desc: "Aplicación de gestión de libros — interfaz y lógica frontend",
    topics: ["html", "frontend", "crud"],
  },
  {
    name: "portafolio",
    lang: "Astro",
    desc: "Este sitio — construido con Astro, TypeScript y TailwindCSS",
    topics: ["astro", "typescript", "portfolio", "tailwind"],
  },
];

const LANG_COLOR: Record<string, string> = {
  Java: "#f59e0b",
  HTML: "#e44d26",
  Astro: "#ff5d01",
  TypeScript: "#3178c6",
};

export default function GitHubReposSection() {
  const dark = useDarkMode();
  const [hovered, setHovered] = useState<string | null>(null);

  const textColor = dark ? "rgba(255,255,255,0.92)" : "#1a0a3c";
  const mutedColor = dark ? "rgba(255,255,255,0.42)" : "rgba(55,30,90,0.55)";

  return (
    <div style={{ width: "100%" }}>

      {/* Section header */}
      <div style={{ textAlign: "center", marginBottom: 44 }}>
        <p style={{
          fontFamily: "ui-monospace, monospace", fontSize: 10.5,
          letterSpacing: "0.35em", color: "#7c3aed",
          margin: "0 0 10px", textTransform: "uppercase",
        }}>
          Open Source · github.com/Hristb
        </p>
        <h2 style={{
          fontFamily: "ui-monospace, monospace", fontWeight: 700,
          fontSize: "clamp(1.45rem, 3.5vw, 2rem)",
          color: textColor, margin: "0 0 10px", letterSpacing: "0.02em",
        }}>
          Repositorios Destacados
        </h2>
        <p style={{ fontSize: 15, color: mutedColor, margin: 0, maxWidth: 480, marginInline: "auto" }}>
          163 contribuciones en el último año · 16 repositorios públicos
        </p>
      </div>

      {/* Cards grid */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 270px), 1fr))",
        gap: 14,
      }}>
        {REPOS.map(repo => {
          const isH = hovered === repo.name;
          const langColor = LANG_COLOR[repo.lang] ?? "#888";
          return (
            <a
              key={repo.name}
              href={`https://github.com/Hristb/${repo.name}`}
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => setHovered(repo.name)}
              onMouseLeave={() => setHovered(null)}
              style={{
                display: "flex", flexDirection: "column", gap: 10,
                textDecoration: "none",
                borderRadius: 14, padding: "18px 20px",
                background: dark
                  ? isH ? "rgba(124,58,237,0.1)" : "rgba(255,255,255,0.028)"
                  : isH ? "rgba(124,58,237,0.05)" : "rgba(255,255,255,0.75)",
                border: isH
                  ? `1px solid ${langColor}60`
                  : dark ? "1px solid rgba(124,58,237,0.14)" : "1px solid rgba(168,85,247,0.18)",
                boxShadow: isH
                  ? `0 6px 28px ${langColor}22`
                  : dark ? "none" : "0 2px 14px rgba(168,85,247,0.06)",
                transform: isH ? "translateY(-4px)" : "translateY(0)",
                transition: "all 0.24s ease",
              }}
            >
              {/* Name row */}
              <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"
                    fill={dark ? "rgba(255,255,255,0.4)" : "rgba(100,72,150,0.4)"} />
                </svg>
                <p style={{
                  fontFamily: "ui-monospace, monospace", fontSize: 13, fontWeight: 700,
                  color: isH ? (dark ? "#93c5fd" : "#4f46e5") : (dark ? "rgba(255,255,255,0.85)" : "#3730a3"),
                  margin: 0, transition: "color 0.2s",
                }}>{repo.name}</p>
              </div>

              {/* Description */}
              <p style={{ fontSize: 12.5, color: mutedColor, margin: 0, lineHeight: 1.55, flexGrow: 1 }}>
                {repo.desc}
              </p>

              {/* Topics */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                {repo.topics.map(t => (
                  <span key={t} style={{
                    fontFamily: "ui-monospace, monospace", fontSize: 9,
                    padding: "2px 7px", borderRadius: 20,
                    background: dark ? "rgba(14,165,233,0.1)" : "rgba(14,165,233,0.08)",
                    border: "1px solid rgba(14,165,233,0.22)",
                    color: "#0ea5e9", letterSpacing: "0.05em",
                  }}>{t}</span>
                ))}
              </div>

              {/* Language badge */}
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 10, height: 10, borderRadius: "50%", background: langColor, flexShrink: 0 }} />
                <span style={{ fontFamily: "ui-monospace, monospace", fontSize: 11, color: mutedColor }}>
                  {repo.lang}
                </span>
              </div>
            </a>
          );
        })}
      </div>

      {/* CTA */}
      <div style={{ textAlign: "center", marginTop: 36 }}>
        <a
          href="https://github.com/Hristb"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            fontFamily: "ui-monospace, monospace", fontSize: 11.5,
            letterSpacing: "0.16em", padding: "10px 28px",
            borderRadius: 8, textDecoration: "none", textTransform: "uppercase",
            background: dark ? "rgba(255,255,255,0.055)" : "rgba(124,58,237,0.07)",
            border: dark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(124,58,237,0.2)",
            color: dark ? "rgba(255,255,255,0.65)" : "#7c3aed",
            transition: "all 0.22s",
          }}
        >
          Ver todos los repositorios
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </a>
      </div>
    </div>
  );
}
