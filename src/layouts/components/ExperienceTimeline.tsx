"use client";
import React, { useState } from "react";

const EXPERIENCE = [
  {
    company: "Indra · MiBanco",
    role: "Senior Backend Engineer",
    period: "ago 2023 – Presente",
    duration: "2 años 9 meses",
    active: true,
    projects: ["Neobanco – Banco por WhatsApp", "MibancoLab – Simulador ADN", "Programa de Puntos y Referidos", "Academia de Progreso", "YEVO – Comunidades", "Azure Personalizer"],
    tech: ["Java 17", "Quarkus", "Spring Boot", "Angular", "Node.js", "BIAN", "Azure ADF", "Azure Functions", "ELK Stack", "SonarCloud", "GitHub Copilot", "SDD"],
    highlights: [
      "Desarrollo de APIs y microservicios multicapa para conectar el Neobanco (WhatsApp) al core bancario bajo estándares BIAN",
      "Interoperabilidad de billeteras Yape/Mibanco, transferencias interbancarias y pagos entre tarjetas",
      "Fullstack en MiBancoLab: Angular + microservicios + ADF para Academia de Progreso, cargas masivas y gestión de cursos/certificados",
      "Integración ChatBot Botmaker en YEVO y Azure Functions para módulos financieros y automatización",
      "Azure Personalizer para personalización de cursos; Azure Data Factory para cargas masivas y flujos de reenganche",
      "Desarrollo AI-driven: GitHub Copilot con Prompt Engineering avanzado y metodología SDD (Spec-Driven Development)",
      "Monitoreo y análisis de incidencias en producción con ELK Stack (Elasticsearch, Logstash, Kibana)",
    ],
  },
  {
    company: "Canvia",
    role: "Analista Programador",
    period: "abr 2022 – ago 2023",
    duration: "1 año 5 meses",
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
  const [expanded, setExpanded] = useState<number | null>(0);

  return (
    <div style={{ display: "flex", flexDirection: "column", width: "100%" }}>
      {EXPERIENCE.map((exp, i) => {
        const isOpen = expanded === i;
        const accent = exp.active ? "var(--accent)" : "var(--ink-light)";
        return (
          <div key={exp.company} style={{ display: "flex", gap: 14 }}>

            {/* Timeline spine */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, paddingTop: 10 }}>
              <div style={{
                width: 12, height: 12, borderRadius: "50%", flexShrink: 0,
                background: (exp.active || isOpen) ? accent : "transparent",
                border: `2px solid ${accent}`,
                transition: "all 0.3s",
              }} />
              {i < EXPERIENCE.length - 1 && (
                <div style={{
                  width: 1, flex: 1, minHeight: 22,
                  background: "var(--edge)",
                  margin: "5px 0",
                }} />
              )}
            </div>

            {/* Content */}
            <div
              style={{ paddingBottom: 20, flex: 1, cursor: "pointer" }}
              onClick={() => setExpanded(isOpen ? null : i)}
            >
              {/* Header row */}
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, paddingTop: 4 }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                    <p style={{ fontWeight: 700, fontSize: 15, color: "var(--ink-dark)", margin: 0 }}>
                      {exp.company}
                    </p>
                    {exp.active && (
                      <span style={{
                        fontSize: 9.5, fontWeight: 600,
                        padding: "2px 8px", borderRadius: 10,
                        border: "1px solid var(--accent)",
                        color: "var(--accent)", letterSpacing: "0.06em",
                      }}>
                        actual
                      </span>
                    )}
                  </div>
                  <p style={{ fontSize: 13, color: "var(--ink)", margin: "0 0 2px" }}>
                    {exp.role}
                  </p>
                  <p style={{ fontSize: 12, color: "var(--ink-light)", margin: 0 }}>
                    {exp.period} · {exp.duration}
                  </p>
                </div>
                <span style={{
                  color: "var(--ink-light)",
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
                    <p style={{ fontSize: 10, letterSpacing: "0.12em", color: "var(--ink-light)", margin: "0 0 6px", textTransform: "uppercase" }}>
                      Proyectos
                    </p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                      {exp.projects.map(p => (
                        <span key={p} style={{
                          fontSize: 11.5, padding: "2px 9px", borderRadius: 5,
                          border: "1px solid var(--edge)",
                          color: "var(--ink)",
                        }}>{p}</span>
                      ))}
                    </div>
                  </div>

                  {/* Highlights */}
                  <ul style={{ margin: 0, paddingLeft: 16, display: "flex", flexDirection: "column", gap: 4 }}>
                    {exp.highlights.map(h => (
                      <li key={h} style={{ fontSize: 13, color: "var(--ink-light)", lineHeight: 1.6 }}>{h}</li>
                    ))}
                  </ul>

                  {/* Tech chips */}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                    {exp.tech.map(t => (
                      <span key={t} style={{
                        fontSize: 11, padding: "2px 9px", borderRadius: 20,
                        border: "1px solid var(--edge)",
                        color: "var(--ink-light)",
                      }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
