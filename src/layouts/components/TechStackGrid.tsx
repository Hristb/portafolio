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

const TECH = {
  Backend: [
    { name: "Java 17",         pct: 95, color: "#f59e0b", years: "6 años" },
    { name: "Quarkus",         pct: 88, color: "#4f6ef7", years: "2 años" },
    { name: "Spring Boot",     pct: 92, color: "#6cbd45", years: "5 años" },
    { name: "Spring Security", pct: 85, color: "#22c55e", years: "4 años" },
    { name: "REST / APIs",     pct: 96, color: "#f97316", years: "6 años" },
  ],
  Cloud: [
    { name: "Microsoft Azure",  pct: 82, color: "#0ea5e9", years: "3 años" },
    { name: "Docker",           pct: 80, color: "#2496ed", years: "3 años" },
    { name: "Kubernetes",       pct: 70, color: "#326ce5", years: "2 años" },
    { name: "Azure DevOps",     pct: 80, color: "#0078d4", years: "3 años" },
    { name: "GitHub Actions",   pct: 78, color: "#a78bfa", years: "2 años" },
  ],
  Frontend: [
    { name: "Angular",       pct: 82, color: "#dd0031", years: "4 años" },
    { name: "TypeScript",    pct: 85, color: "#3178c6", years: "4 años" },
    { name: "SCSS",          pct: 80, color: "#c6538c", years: "4 años" },
    { name: "TailwindCSS",   pct: 72, color: "#38bdf8", years: "2 años" },
  ],
  DB: [
    { name: "MySQL",   pct: 88, color: "#4479a1", years: "6 años" },
    { name: "Oracle",  pct: 82, color: "#f80000", years: "4 años" },
    { name: "MongoDB", pct: 70, color: "#47a248", years: "3 años" },
    { name: "SQL",     pct: 92, color: "#a78bfa", years: "6 años" },
  ],
} as const;

type Cat = keyof typeof TECH;

export default function TechStackGrid() {
  const dark = useDarkMode();
  const [cat, setCat] = useState<Cat>("Backend");
  const [inView, setInView] = useState(false);
  const [prevCat, setPrevCat] = useState<Cat>("Backend");
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
    setPrevCat(cat);
    setInView(false);
    setCat(c);
    setTimeout(() => setInView(true), 60);
  };

  const items = TECH[cat];

  const textColor = dark ? "rgba(255,255,255,0.88)" : "#1a0a3c";
  const mutedColor = dark ? "rgba(255,255,255,0.28)" : "rgba(100,72,150,0.5)";
  const trackBg = dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.07)";

  return (
    <div ref={ref} style={{ display: "flex", flexDirection: "column", gap: 18, width: "100%" }}>

      {/* Category tabs */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {(Object.keys(TECH) as Cat[]).map(c => (
          <button
            key={c}
            onClick={() => switchCat(c)}
            style={{
              fontFamily: "ui-monospace, monospace",
              fontSize: 11, letterSpacing: "0.18em",
              padding: "5px 15px", borderRadius: 20,
              border: cat === c ? "1px solid #7c3aed" : `1px solid ${dark ? "rgba(124,58,237,0.22)" : "rgba(124,58,237,0.2)"}`,
              background: cat === c ? "#7c3aed" : "transparent",
              color: cat === c ? "#fff" : (dark ? "rgba(255,255,255,0.5)" : "#7c3aed"),
              cursor: "pointer",
              transition: "all 0.22s",
              textTransform: "uppercase",
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
                fontFamily: "ui-monospace, monospace",
                fontSize: 12.5, color: textColor,
                fontWeight: hovered === item.name ? 700 : 400,
                transition: "font-weight 0.2s",
              }}>
                {item.name}
              </span>
              <span style={{
                fontFamily: "ui-monospace, monospace",
                fontSize: 11, color: item.color,
                transition: "all 0.2s",
              }}>
                {hovered === item.name ? item.years : `${item.pct}%`}
              </span>
            </div>
            <div style={{ height: 7, borderRadius: 4, background: trackBg, overflow: "hidden", position: "relative" }}>
              <div style={{
                height: "100%", borderRadius: 4,
                background: `linear-gradient(90deg, ${item.color}dd, ${item.color}88)`,
                width: inView ? `${item.pct}%` : "0%",
                transition: `width 0.75s cubic-bezier(.4,0,.2,1) ${i * 90}ms`,
                boxShadow: hovered === item.name ? `0 0 10px ${item.color}88` : "none",
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
              fontFamily: "ui-monospace, monospace",
              fontSize: 10, padding: "3px 10px", borderRadius: 20,
              background: hovered === item.name ? `${item.color}22` : (dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.025)"),
              border: `1px solid ${hovered === item.name ? item.color + "66" : (dark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)")}`,
              color: hovered === item.name ? item.color : mutedColor,
              cursor: "default",
              transition: "all 0.2s",
              letterSpacing: "0.05em",
            }}
          >
            {item.name}
          </span>
        ))}
      </div>
    </div>
  );
}
