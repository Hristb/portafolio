import { slug } from "github-slugger";
import { marked } from "marked";

// slugify
export const slugify = (content: string) => {
  return slug(content);
};

// markdownify
export const markdownify = (content: string, div?: boolean) => {
  return div ? marked.parse(content) : marked.parseInline(content);
};

// known technical terms/acronyms whose casing a naive Title Case gets wrong —
// keyed by slug (lowercase, dash-separated); a full-slug match wins over
// per-word lookup (e.g. "ci-cd" -> "CI/CD" rather than "Ci Cd")
const LABEL_OVERRIDES: Record<string, string> = {
  devops: "DevOps",
  "ia--herramientas": "IA y Herramientas",
  "ia-herramientas": "IA y Herramientas",
  "ci-cd": "CI/CD",
  cicd: "CI/CD",
  oauth2: "OAuth2",
  oauth: "OAuth",
  jwt: "JWT",
  graalvm: "GraalVM",
  "github-copilot": "GitHub Copilot",
  github: "GitHub",
  sdd: "SDD",
  mcp: "MCP",
  ia: "IA",
  ai: "AI",
  api: "API",
  apis: "APIs",
  rest: "REST",
  openapi: "OpenAPI",
  quarkus3: "Quarkus 3",
  sql: "SQL",
  bian: "BIAN",
  elk: "ELK",
};

// humanize
export const humanize = (content: string) => {
  const normalized = content
    .replace(/^[\s_-]+|[\s_-]+$/g, "")
    .replace(/[_\s]+/g, "-")
    .toLowerCase();

  if (LABEL_OVERRIDES[normalized]) return LABEL_OVERRIDES[normalized];

  return normalized
    .split("-")
    .filter(Boolean)
    .map((word) => LABEL_OVERRIDES[word] ?? word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// titleify
export const titleify = (content: string) => {
  const humanized = humanize(content);
  return humanized
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// plainify
export const plainify = (content: string) => {
  const parseMarkdown: any = marked.parse(content);
  const filterBrackets = parseMarkdown.replace(/<\/?[^>]+(>|$)/gm, "");
  const filterSpaces = filterBrackets.replace(/[\r\n]\s*[\r\n]/gm, "");
  const stripHTML = htmlEntityDecoder(filterSpaces);
  return stripHTML;
};

// strip entities for plainify
const htmlEntityDecoder = (htmlWithEntities: string) => {
  let entityList: { [key: string]: string } = {
    "&nbsp;": " ",
    "&lt;": "<",
    "&gt;": ">",
    "&amp;": "&",
    "&quot;": '"',
    "&#39;": "'",
  };
  let htmlWithoutEntities: string = htmlWithEntities.replace(
    /(&amp;|&lt;|&gt;|&quot;|&#39;)/g,
    (entity: string): string => {
      return entityList[entity];
    },
  );
  return htmlWithoutEntities;
};
