// ── Shared career journey data ──────────────────────────────────────────────
// Separated to avoid Vite Fast Refresh conflicts with non-component exports.

export type NType = "job" | "study" | "tech" | "milestone" | "home";

export interface JNode {
  id: string;
  num: number;
  x: number;
  y: number;
  type: NType;
  label: string;
  icon: string;
  period: string;
  desc: string;
  tags: string[];
  live?: boolean;
  isStart?: boolean;
}

export const NODES: JNode[] = [
  {
    id: "home", num: 1, x: 80, y: 450, type: "home", isStart: true,
    label: "Lima, Perú", icon: "🏡", period: "El Inicio",
    desc: "Todo empezó aquí. Curioso por naturaleza, rompí mis primeras PCs antes de aprender a programarlas. Lima fue el punto de partida.",
    tags: ["Origen", "Curiosidad", "Perú"],
  },
  {
    id: "uni", num: 2, x: 220, y: 450, type: "study",
    label: "UNU", icon: "🎓", period: "2016 – 2022",
    desc: "Universidad Nacional de Ucayali · Ingeniería de Sistemas. Bachiller 2022. Base teórica slida que la práctica en producción completa cada día.",
    tags: ["Ingeniería Sistemas", "Algoritmos", "Java", "Redes"],
  },
  {
    id: "first_code", num: 3, x: 370, y: 450, type: "milestone",
    label: "Primer App", icon: "💻", period: "2017",
    desc: "Primera app real sin frameworks. Un bug de 3 horas que resultó ser una coma fue el que me hizo amar el desarrollo de software.",
    tags: ["HTML", "CSS", "JavaScript", "MySQL"],
  },
  {
    id: "revsa", num: 4, x: 510, y: 450, type: "job",
    label: "REVSA", icon: "🌱", period: "2016 – nov 2021",
    desc: "Primer empleo formal en REVSA – Credivargas (Ucayali). Cinco años construyendo desde intranet y sistemas de gestión hasta un Dashboard KPI con microservicios. Entendí qué es software en producción real.",
    tags: ["Java", "PHP", "SQL Server", "MariaDB", "Angular", "APIs REST"],
  },
  {
    id: "docker", num: 5, x: 710, y: 395, type: "tech",
    label: "Docker & K8s", icon: "🐳", period: "2021",
    desc: "De 'funciona en mi máquina' a 'funciona en cualquier máquina'. Contenedores, orquestación y mi primer clúster Kubernetes.",
    tags: ["Docker", "Kubernetes", "DevOps", "Containers"],
  },
  {
    id: "ghitss", num: 6, x: 762, y: 278, type: "job",
    label: "Global HITSS", icon: "🏢", period: "oct 2021 – abr 2022",
    desc: "Analista Programador. Primer contacto con proyectos bancarios enterprise a escala. El mundo de la banca desde adentro.",
    tags: ["Java", "Spring", "Oracle", "REST APIs"],
  },
  {
    id: "azure", num: 7, x: 722, y: 140, type: "tech",
    label: "Azure", icon: "☁️", period: "2022",
    desc: "Certificación AZ-900 y uso real en producción. Azure Data Factory, pipelines CI/CD, infraestructura como código.",
    tags: ["Microsoft Azure", "ADF", "Cloud", "IaC"],
  },
  {
    id: "canvia", num: 8, x: 570, y: 60, type: "job",
    label: "Canvia", icon: "💡", period: "abr 2022 – ago 2023",
    desc: "Proyectos fintech de alta complejidad. Diseñar para millones de transacciones te cambia la perspectiva para siempre.",
    tags: ["Java 17", "Microservicios", "Azure", "Spring Boot"],
  },
  {
    id: "bian", num: 9, x: 400, y: 62, type: "tech",
    label: "Estándar BIAN", icon: "🏦", period: "2023",
    desc: "Banking Industry Architecture Network. El framework global para arquitecturas bancarias. Una forma diferente de pensar los servicios financieros.",
    tags: ["BIAN", "FinTech", "Arquitectura", "Banca"],
  },
  {
    id: "quarkus", num: 10, x: 238, y: 62, type: "tech",
    label: "Quarkus", icon: "⚡", period: "2023",
    desc: "Supersonic Subatomic Java. Migré de Spring Boot y los tiempos de arranque bajaron a 200ms. Binarios nativos con GraalVM.",
    tags: ["Quarkus", "Java 17", "GraalVM", "Native"],
  },
  {
    id: "cicd", num: 11, x: 80, y: 170, type: "tech",
    label: "CI/CD", icon: "🔄", period: "2023",
    desc: "Automatización end-to-end: GitHub Actions, Azure Pipelines, SonarQube. En mi equipo, sin pipeline no hay delivery.",
    tags: ["GitHub Actions", "Azure Pipelines", "SonarQube", "Quality"],
  },
  {
    id: "oss", num: 12, x: 80, y: 314, type: "milestone",
    label: "Open Source", icon: "🐙", period: "2023 – hoy",
    desc: "Repositorios públicos en GitHub: microservicio de pagos, Spring Security, configuración de servicios. El código que habla por mí.",
    tags: ["GitHub", "Open Source", "Java", "Microservicios"],
  },
  {
    id: "waba", num: 13, x: 232, y: 372, type: "milestone",
    label: "Banco × WhatsApp", icon: "📱", period: "2024 – hoy",
    desc: "Core técnico de un banco 100% operado por WhatsApp. APIs BIAN multicapa, Quarkus en producción, monitoreo con ELK Stack y desarrollo impulsado por IA con SDD + GitHub Copilot.",
    tags: ["WhatsApp API", "Quarkus", "BIAN", "ELK", "AI SDD"],
  },
  {
    id: "indra", num: 14, x: 432, y: 293, type: "job",
    live: true,
    label: "Indra · MiBanco", icon: "🚀", period: "ago 2023 – Presente",
    desc: "Senior Backend Engineer en Nuevos Modelos Digitales MiBanco. Neobanco (Banco por WhatsApp), BIAN, Quarkus, Angular, Azure, ELK, SDD con GitHub Copilot. Fullstack en el ecosistema MiBancoLab: Academia de Progreso, YEVO, Puntos y Referidos.",
    tags: ["Senior", "Java 17", "Quarkus", "BIAN", "Angular", "AI SDD", "ELK"],
  },
];

export const NCOLOR: Record<NType, string> = {
  job:       "#7c3aed",
  study:     "#0ea5e9",
  tech:      "#06b6d4",
  milestone: "#f59e0b",
  home:      "#10b981",
};
