import React, { useEffect, useState } from "react";

type Lang = "es" | "en";

export default function LangSwitcher() {
  const [lang, setLang] = useState<Lang>("es");

  useEffect(() => {
    setLang((document.documentElement.getAttribute("lang") || "es") as Lang);
    const handler = (e: Event) =>
      setLang((e as CustomEvent<Lang>).detail);
    document.addEventListener("lang-changed", handler);
    return () => document.removeEventListener("lang-changed", handler);
  }, []);

  const switchLang = () => {
    const next: Lang = lang === "es" ? "en" : "es";
    document.documentElement.setAttribute("lang", next);
    localStorage.setItem("portfolio-lang", next);
    setLang(next);
    document.dispatchEvent(new CustomEvent("lang-changed", { detail: next }));
  };

  return (
    <button
      onClick={switchLang}
      aria-label={lang === "es" ? "Switch to English" : "Cambiar a Español"}
      title={lang === "es" ? "Switch to English" : "Cambiar a Español"}
      className="mr-5 flex items-center gap-1 border-r border-border pr-5 text-sm font-semibold text-text-dark transition-colors hover:text-primary dark:border-darkmode-border dark:text-darkmode-text-dark dark:hover:text-darkmode-primary"
    >
      <svg
        aria-hidden="true"
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 1 0 20M12 2a14.5 14.5 0 0 0 0 20M2 12h20" />
      </svg>
      <span>{lang === "es" ? "EN" : "ES"}</span>
    </button>
  );
}
