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

const EXPERIENCE = [
  {
    company: "Indra",
    role: "Senior Backend Engineer",
    period: "ago 2023 – Presente",
    duration: "2 años 7 meses",
    color: "#7c3aed",
    active: true,
    projects: ["Neobanco – Banco por WhatsApp", "MibancoLab – Simulador ADN", "Programa de Puntos y Referidos", "Academia del Progreso", "Yevo Comunidades"],
    tech: ["Java 17", "Quarkus", "BIAN", "Azure ADF", "GitHub Copilot", "OpenAPI"],
    highlights: [
      "Integración del core bancario con canales digitales bajo arquitectura BIAN",
      "Interoperabilidad de billeteras Yape/Mibanco y transfers por número de celular",
      "Azure Personalizer para personalización de cursos en Yevo Comunidades",
      "Uso intensivo de GitHub Copilot para aceleración del ciclo de desarrollo",
    ],
  },
  {
    company: "Canvia",
    role: "Analista Programador",
    period: "abr 2022 – ago 2023",
    duration: "1 año 5 meses",
    color: "#0ea5e9",
    active: false,
    projects: ["Sistema de Perfilamiento – INER"],
    tech: ["Java", "Spring Boot", "Oracle", "JUnit", "REST APIs"],
    highlights: [
      "Desarrollo de servicios para captura de variables de riesgo de contribuyentes",
      "Algoritmos de agrupamiento para evaluación de perfiles de riesgo",
      "Creación de reportes claros de perfiles para toma de decisiones",
    ],
  },
  {
    company: "GLOBAL HITSS",
    role: "Analista Programador",
    period: "oct 2021 – abr 2022",
    duration: "7 meses",
    color: "#06b6d4",
    active: false,
    projects: ["SIAC – Sistema de Atención al Cliente – Claro Perú"],
    tech: ["Java", "Spring Boot", "SQL", "Batch Processing", "MySQL"],
    highlights: [
      "Optimización de consultas en capa de datos para alto rendimiento",
      "Implementación de servicios para nuevas promociones y productos Claro",
      "Optimización de procesos batch de generación de boletas para clientes",
    ],
  },
  {
    company: "REVSA – Credivargas",
    role: "Desarrollador",
    period: "abr 2019 – nov 2021",
    duration: "2 años 8 meses",
    color: "#10b981",
    active: false,
    projects: ["Dashboard KPI Gerencial", "Sistema Helpdesk Open Source", "Sistema Evaluación de Postulantes"],
    tech: ["Java", "Spring Boot", "Angular", "Spring Security", "MySQL"],
    highlights: [
      "Dashboard gerencial con KPIs de ventas, cuentas por cobrar y rendimiento",
      "Implementación y capacitación de sistema Helpdesk open-source",
      "Sistema web piloto para evaluación psicológica de nuevos postulantes",
    ],
  },
];

export default function ExperienceTimeline() {
  const dark = useDarkMode();
  const [expanded, setExpanded] = useState<number | null>(0);

  const textColor = dark ? "rgba(255,255,255,0.92)" : "#1a0a3c";
  const mutedColor = dark ? "rgba(255,255,255,0.32)" : "rgba(55,30,90,0.45)";
  const subtleText = dark ? "rgba(255,255,255,0.6)" : "rgba(55,30,90,0.65)";
  const chipBg = (color: string) => dark ? `${color}14` : `${color}10`;

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      {EXPERIENCE.map((exp, i) => {
        const isOpen = expanded === i;
        return (
          <div key={exp.company} style={{ display: "flex", gap: 14 }}>

            {/* Timeline spine */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, paddingTop: 10 }}>
              <div style={{
                width: 14, height: 14, borderRadius: "50%", flexShrink: 0,
                background: (exp.active || isOpen) ? exp.color : "transparent",
                border: `2px solid ${exp.color}`,
                boxShadow: exp.active ? `0 0 12px ${exp.color}88, 0 0 24px ${exp.color}44` : "none",
                transition: "all 0.3s",
                animation: exp.active ? "expPulse 2s ease-in-out infinite" : "none",
              }} />
              {i < EXPERIENCE.length - 1 && (
                <div style={{
                  width: 2, flex: 1, minHeight: 22,
                  background: `linear-gradient(180deg, ${exp.color}55 0%, ${EXPERIENCE[i + 1].color}22 100%)`,
                  margin: "5px 0",
                }} />
              )}
            </div>

            {/* Content */}
            <div
              style={{ paddingBottom: 18, flex: 1, cursor: "pointer" }}
              onClick={() => setExpanded(isOpen ? null : i)}
            >
              {/* Header row */}
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, paddingTop: 4 }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                    <p style={{ fontWeight: 700, fontSize: 14, color: textColor, margin: 0, letterSpacing: "0.01em" }}>
                      {exp.company}
                    </p>
                    {exp.active && (
                      <span style={{
                        fontFamily: "ui-monospace, monospace", fontSize: 8.5,
                        padding: "2px 8px", borderRadius: 10,
                        background: `${exp.color}22`, border: `1px solid ${exp.color}55`,
                        color: exp.color, letterSpacing: "0.18em",
                        animation: "expPulse 2s ease-in-out infinite",
                      }}>
                        LIVE
                      </span>
                    )}
                  </div>
                  <p style={{ fontFamily: "ui-monospace, monospace", fontSize: 12, color: exp.color, margin: "0 0 2px" }}>
                    {exp.role}
                  </p>
                  <p style={{ fontFamily: "ui-monospace, monospace", fontSize: 10, color: mutedColor, margin: 0, letterSpacing: "0.05em" }}>
                    {exp.period} · {exp.duration}
                  </p>
                </div>
                <span style={{
                  color: dark ? "rgba(255,255,255,0.28)" : "rgba(0,0,0,0.22)",
                  fontSize: 18, fontWeight: 300,
                  transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                  transition: "transform 0.3s",
                  flexShrink: 0, marginTop: 5, lineHeight: 1,
                }}>›</span>
              </div>

              {/* Expandable content */}
              <div style={{
                overflow: "hidden",
                maxHeight: isOpen ? 440 : 0,
                opacity: isOpen ? 1 : 0,
                transition: "max-height 0.38s ease, opacity 0.25s ease",
                marginTop: isOpen ? 12 : 0,
              }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>

                  {/* Projects */}
                  <div>
                    <p style={{ fontFamily: "ui-monospace, monospace", fontSize: 9, letterSpacing: "0.22em", color: exp.color, margin: "0 0 6px", textTransform: "uppercase" }}>
                      Proyectos
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                      {exp.projects.map(p => (
                        <span key={p} style={{
                          fontSize: 11, padding: "2px 9px", borderRadius: 5,
                          background: chipBg(exp.color),
                          border: `1px solid ${exp.color}30`,
                          color: subtleText,
                        }}>{p}</span>
                      ))}
                    </div>
                  </div>

                  {/* Highlights */}
                  <ul style={{ margin: 0, paddingLeft: 16, display: "flex", flexDirection: "column", gap: 4 }}>
                    {exp.highlights.map(h => (
                      <li key={h} style={{ fontSize: 12.5, color: subtleText, lineHeight: 1.55 }}>{h}</li>
                    ))}
                  </ul>

                  {/* Tech chips */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                    {exp.tech.map(t => (
                      <span key={t} style={{
                        fontFamily: "ui-monospace, monospace", fontSize: 10,
                        padding: "2px 9px", borderRadius: 20,
                        background: chipBg(exp.color),
                        border: `1px solid ${exp.color}40`,
                        color: exp.color,
                      }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <style>{`
        @keyframes expPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.55; }
        }
      `}</style>
    </div>
  );
}
