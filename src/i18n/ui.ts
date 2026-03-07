export type Lang = "es" | "en";

export const defaultLang: Lang = "es";

/** ISO 3166-1 alpha-2 codes of Spanish-speaking countries */
export const spanishCountryCodes: string[] = [
  "PE", "ES", "MX", "AR", "CO", "CL", "VE", "EC",
  "BO", "PY", "UY", "CR", "PA", "GT", "HN", "SV",
  "NI", "DO", "CU", "PR",
];

export const ui: Record<Lang, Record<string, string>> = {
  es: {
    "nav.home": "Inicio",
    "nav.about": "Sobre Mí",
    "nav.projects": "Proyectos",
    "nav.contact": "Contacto",
    "nav.cta": "Contáctame",
  },
  en: {
    "nav.home": "Home",
    "nav.about": "About Me",
    "nav.projects": "Projects",
    "nav.contact": "Contact",
    "nav.cta": "Contact Me",
  },
};
