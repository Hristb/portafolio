"use client";
import React, { useEffect, useRef, useState } from "react";

const TECH = {
  Backend: [
    { name: "Java 17",         pct: 95, color: "#f59e0b", years: "6 años" },
    { name: "Quarkus",         pct: 88, color: "#4f6ef7", years: "2 años" },
    { name: "Spring Boot",     pct: 92, color: "#6cbd45", years: "5 años" },
    { name: "Spring Security", pct: 85, color: "#22c55e", years: "4 años" },
    { name: "REST / APIs",     pct: 96, color: "#f97316", years: "6 años" },
    { name: "Node.js",         pct: 72, color: "#339933", years: "2 años" },
  ],
  Cloud: [
    { name: "Microsoft Azure",  pct: 82, color: "#0ea5e9", years: "3 años" },
    { name: "Docker",           pct: 80, color: "#2496ed", years: "3 años" },
    { name: "Kubernetes",       pct: 70, color: "#326ce5", years: "2 años" },
    { name: "Azure DevOps",     pct: 80, color: "#0078d4", years: "3 años" },
    { name: "GitHub Actions",   pct: 78, color: "#2088ff", years: "2 años" },
    { name: "ELK Stack",        pct: 74, color: "#f4b942", years: "2 años" },
    { name: "SonarCloud",       pct: 75, color: "#f3702a", years: "2 años" },
  ],
  Frontend: [
    { name: "Angular",       pct: 82, color: "#dd0031", years: "4 años" },
    { name: "TypeScript",    pct: 85, color: "#3178c6", years: "4 años" },
    { name: "SCSS",          pct: 80, color: "#c6538c", years: "4 años" },
    { name: "TailwindCSS",   pct: 72, color: "#38bdf8", years: "2 años" },
  ],
  DB: [
    { name: "MySQL",     pct: 88, color: "#4479a1", years: "6 años" },
    { name: "Oracle",   pct: 82, color: "#f80000", years: "4 años" },
    { name: "MongoDB",  pct: 70, color: "#47a248", years: "3 años" },
    { name: "SQL",      pct: 92, color: "#6b7280", years: "6 años" },
    { name: "Azure SQL", pct: 80, color: "#0078d4", years: "3 años" },
  ],
} as const;

type Cat = keyof typeof TECH;

export default function TechStackGrid() {
  const [cat, setCat] = useState<Cat>("Backend");
  const [inView, setInView] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold: 0.2 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  const switchCat = (c: Cat) => {
    setInView(false);
    setCat(c);
    setTimeout(() => setInView(true), 60);
  };

  const items = TECH[cat];

  return (
    <div ref={ref} style={{ display: "flex", flexDirection: "column", gap: 18, width: "100%" }}>

      {/* Category tabs */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {(Object.keys(TECH) as Cat[]).map(c => (
          <button
            key={c}
            onClick={() => switchCat(c)}
            style={{
              fontSize: 12.5, fontWeight: 500,
              padding: "5px 15px", borderRadius: 20,
              border: `1px solid ${cat === c ? "var(--ink-dark)" : "var(--edge)"}`,
              background: cat === c ? "var(--ink-dark)" : "transparent",
              color: cat === c ? "var(--surface)" : "var(--ink)",
              cursor: "pointer",
              transition: "all 0.22s",
            }}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Skill bars */}
      <div style={{ display: "flex", flexDirection: "column", gap: 11 }}>
        {items.map((item, i) => (
          <div
            key={`${cat}-${item.name}`}
            onMouseEnter={() => setHovered(item.name)}
            onMouseLeave={() => setHovered(null)}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
              <span style={{
                fontSize: 13, color: "var(--ink)",
                fontWeight: hovered === item.name ? 700 : 400,
                transition: "font-weight 0.2s",
              }}>
                {item.name}
              </span>
              <span style={{
                fontSize: 11.5, color: "var(--ink-light)",
                transition: "all 0.2s",
              }}>
                {hovered === item.name ? item.years : `${item.pct}%`}
              </span>
            </div>
            <div style={{ height: 6, borderRadius: 4, background: "var(--surface-alt)", overflow: "hidden", position: "relative" }}>
              <div style={{
                height: "100%", borderRadius: 4,
                background: item.color,
                width: inView ? `${item.pct}%` : "0%",
                transition: `width 0.75s cubic-bezier(.4,0,.2,1) ${i * 90}ms`,
              }} />
            </div>
          </div>
        ))}
      </div>

      {/* Summary chips */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 4 }}>
        {items.map(item => (
          <span
            key={item.name}
            onMouseEnter={() => setHovered(item.name)}
            onMouseLeave={() => setHovered(null)}
            style={{
              fontSize: 11.5, padding: "3px 10px", borderRadius: 20,
              background: hovered === item.name ? `${item.color}18` : "transparent",
              border: `1px solid ${hovered === item.name ? item.color : "var(--edge)"}`,
              color: hovered === item.name ? item.color : "var(--ink-light)",
              cursor: "default",
              transition: "all 0.2s",
            }}
          >
            {item.name}
          </span>
        ))}
      </div>
    </div>
  );
}
