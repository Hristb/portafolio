export type Tipo = "til" | "libro" | "reflexion";

export const TIPOS: Record<
  Tipo,
  { label: string; emoji: string; desc: string; badgeCls: string; rowAccentCls: string }
> = {
  til: {
    label: "TIL",
    emoji: "🧠",
    desc: "Today I Learned",
    badgeCls: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
    rowAccentCls: "hover:border-emerald-400",
  },
  libro: {
    label: "Libro",
    emoji: "📖",
    desc: "Nota de lectura",
    badgeCls: "bg-violet-100 text-violet-800 dark:bg-violet-900/40 dark:text-violet-300",
    rowAccentCls: "hover:border-violet-400",
  },
  reflexion: {
    label: "Reflexión",
    emoji: "💭",
    desc: "Pensamiento propio",
    badgeCls: "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
    rowAccentCls: "hover:border-amber-400",
  },
};

/** Lista de filtros para el UI — orden fijo */
export const FILTROS = [
  { valor: "todos", label: "Todas" },
  { valor: "til",   label: `${TIPOS.til.emoji} TIL` },
  { valor: "libro", label: `${TIPOS.libro.emoji} Libros` },
  { valor: "reflexion", label: `${TIPOS.reflexion.emoji} Reflexiones` },
] as const;
