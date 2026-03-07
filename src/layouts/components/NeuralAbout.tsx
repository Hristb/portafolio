"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";

// ─── Types ─────────────────────────────────────────────────────────────────────
interface NodePayload {
  id: string;
  label: string;
  labelEn: string;
  category: "core" | "primary" | "tech";
  parentId?: string;
  description: string;
  descriptionEn: string;
  connections: string[];
  color: string;
}

interface SimNode extends NodePayload {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  targetBaseX: number;
  targetBaseY: number;
  r: number;
  phase: number;
}

// ─── Static layout constants ───────────────────────────────────────────────────
const PRIMARY_IDS = [
  "fullstack",
  "cloud",
  "architecture",
  "innovation",
  "values",
] as const;

const TECH_MAP: Record<string, string[]> = {
  fullstack: ["react", "nodejs", "typescript", "databases"],
  cloud: ["aws", "docker", "cicd"],
  architecture: ["cleancode", "patterns", "microservices"],
  innovation: ["ai", "performance"],
  values: ["learning", "community"],
};

const CAT_COLOR: Record<string, string> = {
  core: "#7c3aed",
  fullstack: "#0ea5e9",
  cloud: "#06b6d4",
  architecture: "#8b5cf6",
  innovation: "#f59e0b",
  values: "#10b981",
};

// ─── Node definitions ──────────────────────────────────────────────────────────
const NODES: NodePayload[] = [
  {
    id: "core",
    label: "Hrist Joy",
    labelEn: "Hrist Joy",
    category: "core",
    color: CAT_COLOR.core,
    description:
      "Senior Backend Engineer con 6+ años en FinTech y Neobanking. Microservicios bajo estándares BIAN, Java 17 y Quarkus como herramientas de impacto real en el sector financiero.",
    descriptionEn:
      "Senior Backend Engineer with 6+ years in FinTech and Neobanking. Microservices under BIAN standards, Java 17 and Quarkus as tools of real impact in the financial sector.",
    connections: [...PRIMARY_IDS],
  },
  {
    id: "fullstack",
    label: "Backend Java",
    labelEn: "Java Backend",
    category: "primary",
    color: CAT_COLOR.fullstack,
    description:
      "Desarrollo backend de alta disponibilidad con Java 17 y Quarkus. APIs robustas bajo estándares BIAN para FinTech y Neobanking. Pagos, billeteras y transferencias interbancarias.",
    descriptionEn:
      "High-availability backend with Java 17 and Quarkus. Robust APIs under BIAN standards for FinTech and Neobanking. Payments, wallets and interbank transfers.",
    connections: TECH_MAP.fullstack,
  },
  {
    id: "cloud",
    label: "Cloud & DevOps",
    labelEn: "Cloud & DevOps",
    category: "primary",
    color: CAT_COLOR.cloud,
    description:
      "Infraestructura como código, pipelines CI/CD y contenedores. La nube como plataforma de crecimiento, resiliencia y escala.",
    descriptionEn:
      "Infrastructure as code, CI/CD pipelines and containers. The cloud as a platform for growth, resilience and scale.",
    connections: TECH_MAP.cloud,
  },
  {
    id: "architecture",
    label: "Arquitectura",
    labelEn: "Architecture",
    category: "primary",
    color: CAT_COLOR.architecture,
    description:
      "Pienso en sistemas antes que en líneas de código. SOLID, Clean Architecture y patrones aplicados con propósito, no por dogma.",
    descriptionEn:
      "I think in systems before lines of code. SOLID, Clean Architecture and patterns applied with purpose, not by dogma.",
    connections: TECH_MAP.architecture,
  },
  {
    id: "innovation",
    label: "Innovación",
    labelEn: "Innovation",
    category: "primary",
    color: CAT_COLOR.innovation,
    description:
      "Exploración continua de tecnologías emergentes. IA, Edge Computing y nuevas formas de construir productos con impacto real.",
    descriptionEn:
      "Continuous exploration of emerging technologies. AI, Edge Computing and new ways to build products with real impact.",
    connections: TECH_MAP.innovation,
  },
  {
    id: "values",
    label: "Valores",
    labelEn: "Values",
    category: "primary",
    color: CAT_COLOR.values,
    description:
      "Aprendizaje continuo, mentoría y código limpio como forma de respeto. La tecnología al servicio de un impacto genuino.",
    descriptionEn:
      "Continuous learning, mentoring and clean code as a form of respect. Technology in service of genuine impact.",
    connections: TECH_MAP.values,
  },
  // ── Tech nodes ────────────────────────────────────────────────────────────────
  {
    id: "react",
    label: "Java 17 / Quarkus",
    labelEn: "Java 17 / Quarkus",
    category: "tech",
    parentId: "fullstack",
    color: CAT_COLOR.fullstack,
    description:
      "Microservicios con Quarkus y Java 17 para pagos entre tarjetas, transferencias interbancarias y billeteras digitales (Yape/Mibanco). Alto rendimiento en producción.",
    descriptionEn:
      "Microservices with Quarkus and Java 17 for card payments, interbank transfers and digital wallets (Yape/Mibanco). High performance in production.",
    connections: [],
  },
  {
    id: "nodejs",
    label: "Spring Boot",
    labelEn: "Spring Boot",
    category: "tech",
    parentId: "fullstack",
    color: CAT_COLOR.fullstack,
    description:
      "Plataformas críticas con Spring Boot: autenticación basada en tokens, sistemas de fidelización, programa de puntos/referidos y simuladores de evaluación.",
    descriptionEn:
      "Critical platforms with Spring Boot: token-based authentication, loyalty systems, referral programs and evaluation simulators.",
    connections: [],
  },
  {
    id: "typescript",
    label: "Angular / TypeScript",
    labelEn: "Angular / TypeScript",
    category: "tech",
    parentId: "fullstack",
    color: CAT_COLOR.fullstack,
    description:
      "Frontend con Angular y TypeScript. SCSS, TailwindCSS y metodología BEM para interfaces escalables. Visualizaciones de KPI y dashboards gerenciales.",
    descriptionEn:
      "Frontend with Angular and TypeScript. SCSS, TailwindCSS and BEM methodology for scalable interfaces. KPI visualizations and executive dashboards.",
    connections: [],
  },
  {
    id: "databases",
    label: "Databases",
    labelEn: "Databases",
    category: "tech",
    parentId: "fullstack",
    color: CAT_COLOR.fullstack,
    description:
      "MySQL, Oracle, SQL y MongoDB. Modelado de datos eficiente, optimización de consultas y procesos batch para sistemas financieros de alto volumen.",
    descriptionEn:
      "MySQL, Oracle, SQL and MongoDB. Efficient data modeling, query optimization and batch processes for high-volume financial systems.",
    connections: [],
  },
  {
    id: "aws",
    label: "Microsoft Azure",
    labelEn: "Microsoft Azure",
    category: "tech",
    parentId: "cloud",
    color: CAT_COLOR.cloud,
    description:
      "Azure Data Factory (ADF) para ingesta de datos, Azure Functions para chatbots y automatización, Azure Personalizer para personalización de cursos.",
    descriptionEn:
      "Azure Data Factory (ADF) for data ingestion, Azure Functions for chatbots and automation, Azure Personalizer for course personalization.",
    connections: [],
  },
  {
    id: "docker",
    label: "Docker / K8s",
    labelEn: "Docker / K8s",
    category: "tech",
    parentId: "cloud",
    color: CAT_COLOR.cloud,
    description:
      "Contenedores para entornos reproducibles. Kubernetes para orquestación y escalabilidad declarativa.",
    descriptionEn:
      "Containers for reproducible environments. Kubernetes for orchestration and declarative scalability.",
    connections: [],
  },
  {
    id: "cicd",
    label: "CI / CD",
    labelEn: "CI / CD",
    category: "tech",
    parentId: "cloud",
    color: CAT_COLOR.cloud,
    description:
      "Azure DevOps y GitHub Actions. GitHub Copilot para acelerar el ciclo de desarrollo. OpenAPI para documentación técnica automática.",
    descriptionEn:
      "Azure DevOps and GitHub Actions. GitHub Copilot to accelerate the development lifecycle. OpenAPI for automated technical documentation.",
    connections: [],
  },
  {
    id: "cleancode",
    label: "Clean Code",
    labelEn: "Clean Code",
    category: "tech",
    parentId: "architecture",
    color: CAT_COLOR.architecture,
    description:
      "SOLID, DRY, KISS. El código legible es respeto hacia el equipo y el mantenimiento futuro.",
    descriptionEn:
      "SOLID, DRY, KISS. Readable code is respect for the team and future maintainability.",
    connections: [],
  },
  {
    id: "patterns",
    label: "Patrones",
    labelEn: "Patterns",
    category: "tech",
    parentId: "architecture",
    color: CAT_COLOR.architecture,
    description:
      "Design Patterns como vocabulario común. Repository, Factory, Hexagonal, CQRS. Herramientas, no dogma.",
    descriptionEn:
      "Design Patterns as shared vocabulary. Repository, Factory, Hexagonal, CQRS. Tools, not dogma.",
    connections: [],
  },
  {
    id: "microservices",
    label: "Microservicios",
    labelEn: "Microservices",
    category: "tech",
    parentId: "architecture",
    color: CAT_COLOR.architecture,
    description:
      "Sistemas distribuidos, comunicación entre servicios, resiliencia y observabilidad a escala real.",
    descriptionEn:
      "Distributed systems, inter-service communication, resilience and observability at real scale.",
    connections: [],
  },
  {
    id: "ai",
    label: "IA & Emergentes",
    labelEn: "AI & Emerging",
    category: "tech",
    parentId: "innovation",
    color: CAT_COLOR.innovation,
    description:
      "Integración de LLMs, automatización inteligente y exploración metódica de lo que está transformando la industria.",
    descriptionEn:
      "LLM integration, intelligent automation and methodical exploration of what is transforming the industry.",
    connections: [],
  },
  {
    id: "performance",
    label: "Performance",
    labelEn: "Performance",
    category: "tech",
    parentId: "innovation",
    color: CAT_COLOR.innovation,
    description:
      "Optimización, profiling y Core Web Vitals. La velocidad no es un extra: es una responsabilidad.",
    descriptionEn:
      "Optimization, profiling and Core Web Vitals. Speed is not an extra: it is a responsibility.",
    connections: [],
  },
  {
    id: "learning",
    label: "Aprendizaje",
    labelEn: "Learning",
    category: "tech",
    parentId: "values",
    color: CAT_COLOR.values,
    description:
      "El conocimiento compartido multiplica el impacto. Aprendo, aplico, enseño. El ciclo no se detiene.",
    descriptionEn:
      "Shared knowledge multiplies impact. I learn, apply, teach. The cycle never stops.",
    connections: [],
  },
  {
    id: "community",
    label: "Comunidad",
    labelEn: "Community",
    category: "tech",
    parentId: "values",
    color: CAT_COLOR.values,
    description:
      "Open source, mentoría y difusión técnica. La tecnología es un bien que se multiplica al compartirse.",
    descriptionEn:
      "Open source, mentoring and technical outreach. Technology is a good that multiplies when shared.",
    connections: [],
  },
];

// ─── Canvas helpers ────────────────────────────────────────────────────────────
function hexToRgba(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

// ─── Layout computation ────────────────────────────────────────────────────────
function computePositions(
  w: number,
  h: number
): Record<string, { x: number; y: number }> {
  const cx = w / 2;
  const cy = h / 2;
  const minDim = Math.min(w, h);
  const r1 = minDim * 0.24;
  const r2 = minDim * 0.44;

  const pos: Record<string, { x: number; y: number }> = {};
  pos["core"] = { x: cx, y: cy };

  PRIMARY_IDS.forEach((id, i) => {
    const angle = -Math.PI / 2 + (i / PRIMARY_IDS.length) * Math.PI * 2;
    pos[id] = {
      x: cx + Math.cos(angle) * r1,
      y: cy + Math.sin(angle) * r1,
    };

    const children = TECH_MAP[id] ?? [];
    children.forEach((childId, j) => {
      const n = children.length;
      const spread = 0.55;
      const childAngle =
        n > 1 ? angle + ((j - (n - 1) / 2) / (n - 1)) * spread : angle;
      pos[childId] = {
        x: cx + Math.cos(childAngle) * r2,
        y: cy + Math.sin(childAngle) * r2,
      };
    });
  });

  return pos;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function NeuralAbout({ lang = "es" }: { lang?: "es" | "en" }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const simRef = useRef<SimNode[]>([]);
  const hoveredRef = useRef<string | null>(null);
  const selectedRef = useRef<string | null>(null);
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef<number>(Date.now());
  const langRef = useRef(lang);
  const lastSelectedRef = useRef<SimNode | null>(null);

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 640 : false
  );
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    langRef.current = lang;
  }, [lang]);

  // ── Initialise simulation ──
  const initSim = useCallback((w: number, h: number) => {
    const pos = computePositions(w, h);
    simRef.current = NODES.map((nd, i) => {
      const p = pos[nd.id] ?? { x: w / 2, y: h / 2 };
      const r =
        nd.category === "core" ? 36 : nd.category === "primary" ? 23 : 14;
      return {
        ...nd,
        x: p.x,
        y: p.y,
        baseX: p.x,
        baseY: p.y,
        targetBaseX: p.x,
        targetBaseY: p.y,
        r,
        phase: (i * 2.399) % (Math.PI * 2), // golden-angle phase spread
      };
    });
  }, []);

  // ── Update target positions on resize ──
  const updateTargetPositions = useCallback((w: number, h: number) => {
    const pos = computePositions(w, h);
    simRef.current.forEach((node) => {
      const p = pos[node.id];
      if (p) {
        node.targetBaseX = p.x;
        node.targetBaseY = p.y;
      }
    });
  }, []);

  // ── Hit testing ──
  const getNodeAt = useCallback((x: number, y: number): string | null => {
    const sorted = [...simRef.current].sort((a, b) => {
      const z: Record<string, number> = { core: 2, primary: 1, tech: 0 };
      return z[b.category] - z[a.category];
    });
    for (const n of sorted) {
      const dx = x - n.x;
      const dy = y - n.y;
      if (dx * dx + dy * dy <= (n.r + 6) ** 2) return n.id;
    }
    return null;
  }, []);

  // ── Mouse handlers (stable, no re-registration) ──
  const onMouseMove = useCallback(
    (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const hit = getNodeAt(e.clientX - rect.left, e.clientY - rect.top);
      hoveredRef.current = hit;
      canvas.style.cursor = hit ? "pointer" : "default";
    },
    [getNodeAt]
  );

  const onMouseLeave = useCallback(() => {
    hoveredRef.current = null;
    if (canvasRef.current) canvasRef.current.style.cursor = "default";
  }, []);

  const onClick = useCallback(
    (e: MouseEvent) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const hit = getNodeAt(e.clientX - rect.left, e.clientY - rect.top);
      const next = hit === selectedRef.current ? null : hit;
      selectedRef.current = next;
      setSelectedId(next);
    },
    [getNodeAt]
  );

  // ── Touch support ──
  const onTouchEnd = useCallback(
    (e: TouchEvent) => {
      const canvas = canvasRef.current;
      if (!canvas || !e.changedTouches.length) return;
      const touch = e.changedTouches[0];
      const rect = canvas.getBoundingClientRect();
      const hit = getNodeAt(
        touch.clientX - rect.left,
        touch.clientY - rect.top
      );
      const next = hit === selectedRef.current ? null : hit;
      selectedRef.current = next;
      setSelectedId(next);
      e.preventDefault();
    },
    [getNodeAt]
  );

  // ── Simulation step ──
  const step = useCallback((t: number) => {
    const springK = 0.07;
    const amplitude = 4.5;
    const freq = 0.00052;
    simRef.current.forEach((n) => {
      n.baseX += (n.targetBaseX - n.baseX) * springK;
      n.baseY += (n.targetBaseY - n.baseY) * springK;
      n.x = n.baseX + Math.sin(t * freq + n.phase) * amplitude;
      n.y = n.baseY + Math.cos(t * freq * 0.71 + n.phase * 1.31) * amplitude;
    });
  }, []);

  // ── Canvas render ──
  const renderFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (w === 0 || h === 0) return;

    const dpr = window.devicePixelRatio || 1;
    const pw = Math.round(w * dpr);
    const ph = Math.round(h * dpr);
    if (canvas.width !== pw || canvas.height !== ph) {
      canvas.width = pw;
      canvas.height = ph;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    const isDark = document.documentElement.classList.contains("dark");
    const nodes = simRef.current;
    const nodeMap = new Map(nodes.map((n) => [n.id, n]));
    const hov = hoveredRef.current;
    const sel = selectedRef.current;
    const currentLang = langRef.current;
    const elapsed = Date.now() - startTimeRef.current;

    // ── Background dot grid ──────────────────────────────────────────────────
    const dotSpacing = 28;
    ctx.fillStyle = isDark
      ? "rgba(255,255,255,0.04)"
      : "rgba(80,50,150,0.055)";
    for (let gx = dotSpacing / 2; gx < w; gx += dotSpacing) {
      for (let gy = dotSpacing / 2; gy < h; gy += dotSpacing) {
        ctx.beginPath();
        ctx.arc(gx, gy, 0.9, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    // Radial vignette
    const vignette = ctx.createRadialGradient(
      w / 2, h / 2, Math.min(w, h) * 0.18,
      w / 2, h / 2, Math.min(w, h) * 0.78
    );
    vignette.addColorStop(0, "rgba(0,0,0,0)");
    vignette.addColorStop(
      1,
      isDark ? "rgba(0,0,0,0.28)" : "rgba(30,10,80,0.06)"
    );
    ctx.fillStyle = vignette;
    ctx.fillRect(0, 0, w, h);

    // ── Draw edges ─────────────────────────────────────────────────────────────
    ctx.save();
    for (const n of nodes) {
      for (const cid of n.connections) {
        const target = nodeMap.get(cid);
        if (!target) continue;
        const isLit =
          sel === n.id ||
          sel === target.id ||
          hov === n.id ||
          hov === target.id;
        const isDimmed = sel != null && !isLit;
        const alpha = isDimmed ? 0.04 : isLit ? 0.65 : 0.15;

        const grad = ctx.createLinearGradient(n.x, n.y, target.x, target.y);
        grad.addColorStop(0, hexToRgba(n.color, alpha));
        grad.addColorStop(1, hexToRgba(target.color, alpha));

        ctx.beginPath();
        ctx.moveTo(n.x, n.y);
        ctx.lineTo(target.x, target.y);
        ctx.strokeStyle = grad;
        ctx.lineWidth = isLit ? 1.5 : 0.75;
        ctx.stroke();
      }
    }
    ctx.restore();

    // ── Flowing particles on active edges ────────────────────────────────────
    const particleSpeed = 0.00028;
    for (const n of nodes) {
      for (const cid of n.connections) {
        const target = nodeMap.get(cid);
        if (!target) continue;
        const isActiveLane =
          sel === n.id ||
          sel === target.id ||
          hov === n.id ||
          hov === target.id;
        if (!isActiveLane) continue;
        const particleColor =
          sel === n.id || hov === n.id ? n.color : target.color;
        for (let i = 0; i < 3; i++) {
          const offset = i / 3;
          const t = ((elapsed * particleSpeed + offset) % 1 + 1) % 1;
          const ppx = n.x + (target.x - n.x) * t;
          const ppy = n.y + (target.y - n.y) * t;
          const proximity = 1 - Math.abs(t - 0.5) * 2;
          ctx.beginPath();
          ctx.arc(ppx, ppy, 2.2, 0, Math.PI * 2);
          ctx.fillStyle = hexToRgba(particleColor, 0.5 + proximity * 0.4);
          ctx.shadowColor = particleColor;
          ctx.shadowBlur = 7;
          ctx.fill();
        }
        ctx.shadowBlur = 0;
      }
    }

    // ── Draw nodes (tech → primary → core) ─────────────────────────────────────
    const drawOrder = [...nodes].sort((a, b) => {
      const z: Record<string, number> = { core: 2, primary: 1, tech: 0 };
      return z[a.category] - z[b.category];
    });

    for (const n of drawOrder) {
      const isHov = hov === n.id;
      const isSel = sel === n.id;
      const isConn =
        sel != null &&
        (nodeMap.get(sel)?.connections.includes(n.id) ||
          n.connections.includes(sel));
      const isDimmed = sel != null && !isSel && !isConn;

      const rScale = isHov ? 1.22 : isSel ? 1.18 : 1;
      const r = n.r * rScale;
      const baseAlpha = isDimmed ? 0.18 : 0.88;

      // Glow
      if (isHov || isSel) {
        ctx.shadowColor = n.color;
        ctx.shadowBlur = isSel ? 22 : 14;
      } else {
        ctx.shadowBlur = 0;
      }

      // Radial fill
      const fillGrad = ctx.createRadialGradient(
        n.x - r * 0.28,
        n.y - r * 0.28,
        r * 0.04,
        n.x,
        n.y,
        r * 1.1
      );
      fillGrad.addColorStop(0, hexToRgba(n.color, baseAlpha));
      fillGrad.addColorStop(1, hexToRgba(n.color, baseAlpha * 0.55));

      ctx.beginPath();
      ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
      ctx.fillStyle = fillGrad;
      ctx.fill();

      // Specular highlight
      const specGrad = ctx.createRadialGradient(
        n.x - r * 0.28, n.y - r * 0.32, 0,
        n.x - r * 0.1,  n.y - r * 0.1,  r * 0.75
      );
      specGrad.addColorStop(
        0,
        `rgba(255,255,255,${isDimmed ? 0.04 : 0.2})`
      );
      specGrad.addColorStop(1, "rgba(255,255,255,0)");
      ctx.beginPath();
      ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
      ctx.fillStyle = specGrad;
      ctx.fill();

      // Border
      ctx.strokeStyle = hexToRgba(
        n.color,
        isSel ? 0.95 : isHov ? 0.7 : 0.28
      );
      ctx.lineWidth = isSel ? 2 : 1;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Pulse orbit (core only)
      if (n.category === "core") {
        const pulse = r + 9 + Math.sin(elapsed * 0.0019) * 4;
        const pulseAlpha = 0.18 + Math.sin(elapsed * 0.0019) * 0.07;
        ctx.beginPath();
        ctx.arc(n.x, n.y, pulse, 0, Math.PI * 2);
        ctx.strokeStyle = hexToRgba(n.color, pulseAlpha);
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Second slower orbit
        const pulse2 = r + 18 + Math.cos(elapsed * 0.0012) * 3;
        ctx.beginPath();
        ctx.arc(n.x, n.y, pulse2, 0, Math.PI * 2);
        ctx.strokeStyle = hexToRgba(n.color, 0.08);
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Labels
      const label = currentLang === "en" ? n.labelEn : n.label;
      ctx.shadowBlur = 0;

      if (n.category === "core") {
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = "bold 13px system-ui, -apple-system, sans-serif";
        ctx.fillStyle = "rgba(255,255,255,0.97)";
        ctx.fillText(label, n.x, n.y - 6);
        ctx.font = "9.5px system-ui, -apple-system, sans-serif";
        ctx.fillStyle = "rgba(255,255,255,0.48)";
        ctx.fillText(
          currentLang === "en" ? "Developer" : "Dev Full Stack",
          n.x,
          n.y + 8
        );
      } else {
        const ncx = w / 2;
        const ncy = h / 2;
        const dx = n.x - ncx;
        const dy = n.y - ncy;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const labelGap = n.category === "primary" ? r + 12 : r + 10;
        const px = n.x + (dx / dist) * labelGap;
        const py = n.y + (dy / dist) * labelGap;
        const fontSize = n.category === "primary" ? 10 : 8.5;
        const fontWeight = n.category === "primary" ? "600 " : "";
        ctx.font = `${fontWeight}${fontSize}px system-ui, -apple-system, sans-serif`;
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        const textAlpha = isDimmed ? 0.2 : 0.93;

        // Pill background
        const metrics = ctx.measureText(label);
        const pillW = metrics.width + 10;
        const pillH = fontSize + 7;
        ctx.beginPath();
        ctx.roundRect(
          px - pillW / 2,
          py - pillH / 2,
          pillW,
          pillH,
          pillH / 2
        );
        ctx.fillStyle = isDark
          ? `rgba(14,11,30,${isDimmed ? 0.28 : 0.68})`
          : `rgba(248,247,255,${isDimmed ? 0.28 : 0.8})`;
        ctx.fill();

        ctx.fillStyle = isDark
          ? `rgba(220,215,255,${textAlpha})`
          : `rgba(30,20,70,${textAlpha})`;
        ctx.fillText(label, px, py);
      }
    }
  }, []);

  // ── Animation loop ──
  const loop = useCallback(() => {
    const t = Date.now() - startTimeRef.current;
    step(t);
    renderFrame();
    rafRef.current = requestAnimationFrame(loop);
  }, [step, renderFrame]);

  // ── Setup & cleanup ──
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const w = container.clientWidth;
    const h = container.clientHeight;
    startTimeRef.current = Date.now();
    initSim(w, h);
    rafRef.current = requestAnimationFrame(loop);

    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);
    canvas.addEventListener("click", onClick);
    canvas.addEventListener("touchend", onTouchEnd, { passive: false });

    const ro = new ResizeObserver(() => {
      if (!canvas) return;
      updateTargetPositions(canvas.clientWidth, canvas.clientHeight);
    });
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(rafRef.current);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
      canvas.removeEventListener("click", onClick);
      canvas.removeEventListener("touchend", onTouchEnd);
      ro.disconnect();
    };
  }, [initSim, loop, onMouseMove, onMouseLeave, onClick, onTouchEnd, updateTargetPositions]);

  // ── Derived state ──
  const selectedNode =
    selectedId != null
      ? (simRef.current.find((n) => n.id === selectedId) ?? null)
      : null;

  // Keep content during close transition
  if (selectedNode) lastSelectedRef.current = selectedNode;
  const displayNode = selectedNode ?? lastSelectedRef.current;

  const categoryLabel = (n: NodePayload) => {
    if (n.category === "core") return lang === "en" ? "Core" : "Central";
    if (n.category === "primary") return lang === "en" ? "Area" : "Área";
    return "Skill";
  };

  return (
    <div
      ref={containerRef}
      className="relative flex overflow-hidden rounded-2xl border border-border dark:border-darkmode-border bg-light dark:bg-darkmode-light"
      style={{ height: "clamp(420px, 62vh, 660px)" }}
    >
      {/* ── Canvas area ─────────────────────────────────────────────────────── */}
      <div
        className="relative flex-shrink-0"
        style={{
          width: isMobile ? "100%" : (selectedId ? "70%" : "100%"),
          transition: "width 0.5s cubic-bezier(0.4,0,0.2,1)",
        }}
      >
        <canvas ref={canvasRef} className="block w-full h-full" />

        {/* Hint */}
        {!selectedId && (
          <p
            className="absolute bottom-4 inset-x-0 text-center text-xs pointer-events-none select-none text-text-light dark:text-darkmode-text-light opacity-50"
          >
            {lang === "en"
              ? "↗ Click a node to explore"
              : "↗ Haz clic en un nodo para explorar"}
          </p>
        )}
      </div>

      {/* ── Side panel ──────────────────────────────────────────────────────── */}
      <div
        className={
          isMobile
            ? "absolute bottom-0 left-0 right-0 z-20 bg-body dark:bg-darkmode-body border-t border-border dark:border-darkmode-border"
            : "flex-1 overflow-hidden"
        }
        style={
          isMobile
            ? {
                maxHeight: selectedId ? "52%" : "0px",
                overflowY: selectedId ? "auto" : "hidden",
                opacity: selectedId ? 1 : 0,
                transition: "max-height 0.45s ease, opacity 0.35s ease",
                pointerEvents: selectedId ? "auto" : "none",
              }
            : {
                opacity: selectedId ? 1 : 0,
                transform: selectedId ? "translateX(0)" : "translateX(20px)",
                transition:
                  "opacity 0.45s cubic-bezier(0.4,0,0.2,1), transform 0.45s cubic-bezier(0.4,0,0.2,1)",
                pointerEvents: selectedId ? "auto" : "none",
              }
        }
      >
        {displayNode && (
          <div
            className={`flex flex-col p-5 overflow-y-auto ${
              isMobile ? "" : "h-full border-l border-border dark:border-darkmode-border"
            }`}
          >            {/* Color accent bar */}
            <div
              className="absolute top-0 left-0 right-0 pointer-events-none"
              style={{
                height: "1px",
                background: `linear-gradient(90deg, transparent 0%, ${displayNode.color} 40%, ${displayNode.color} 60%, transparent 100%)`,
                opacity: 0.65,
              }}
            />            {/* Close button */}
            <button
              className="self-end mt-1 mb-4 w-7 h-7 rounded-full flex items-center justify-center text-sm font-light leading-none transition-all hover:scale-110 hover:opacity-60 flex-shrink-0 bg-border dark:bg-darkmode-border text-text-light dark:text-darkmode-text-light"
              onClick={() => {
                selectedRef.current = null;
                setSelectedId(null);
              }}
              aria-label={lang === "en" ? "Close panel" : "Cerrar panel"}
            >
              ×
            </button>

            {/* Category badge */}
            <div className="flex items-center gap-2 mb-4">
              <span
                className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase px-2.5 py-1 rounded-full"
                style={{
                  color: displayNode.color,
                  background: hexToRgba(displayNode.color, 0.12),
                  border: `1px solid ${hexToRgba(displayNode.color, 0.28)}`,
                }}
              >
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ backgroundColor: displayNode.color }}
                />
                {categoryLabel(displayNode)}
              </span>
            </div>

            {/* Node title */}
            <h3
              className="font-bold leading-snug mb-3 text-text-dark dark:text-darkmode-text-dark"
              style={{ fontSize: "clamp(1rem, 2.2vw, 1.35rem)" }}
            >
              {lang === "en" ? displayNode.labelEn : displayNode.label}
            </h3>

            {/* Description */}
            <p
              className="text-sm leading-relaxed flex-1 text-text dark:text-darkmode-text"
            >
              {lang === "en" ? displayNode.descriptionEn : displayNode.description}
            </p>

            {/* Connected nodes */}
            {displayNode.connections.length > 0 && (
              <div
                className="mt-4 pt-4 flex-shrink-0 border-t border-border dark:border-darkmode-border"
              >
                <p
                  className="text-xs uppercase tracking-widest mb-2 font-semibold text-text-light dark:text-darkmode-text-light"
                >
                  {lang === "en" ? "Connects to" : "Conecta con"}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {displayNode.connections.map((cid) => {
                    const cn = simRef.current.find((x) => x.id === cid);
                    if (!cn) return null;
                    return (
                      <button
                        key={cid}
                        className="text-xs px-2.5 py-1 rounded-full border transition-opacity hover:opacity-70"
                        style={{
                          borderColor: cn.color,
                          color: cn.color,
                          background: hexToRgba(cn.color, 0.08),
                        }}
                        onClick={() => {
                          selectedRef.current = cid;
                          setSelectedId(cid);
                        }}
                      >
                        {lang === "en" ? cn.labelEn : cn.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
