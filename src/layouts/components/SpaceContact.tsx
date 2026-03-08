"use client";
import React, { useEffect, useRef, useState } from "react";

export interface SocialLink {
  name: string;
  icon: string;
  link: string;
}

// ── Dark-mode detection ───────────────────────────────────────────────────────
function useDarkMode() {
  const [dark, setDark] = useState(
    () => typeof document !== "undefined" && document.documentElement.classList.contains("dark")
  );
  useEffect(() => {
    const obs = new MutationObserver(() =>
      setDark(document.documentElement.classList.contains("dark"))
    );
    obs.observe(document.documentElement, { attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);
  return dark;
}

// ── Themes ────────────────────────────────────────────────────────────────────
const DM = {
  bg: "linear-gradient(160deg, #06051a 0%, #0b0a22 60%, #07071e 100%)",
  outerBorder: "1px solid rgba(124,58,237,0.2)",
  outerShadow: "0 0 60px rgba(124,58,237,0.08), inset 0 0 80px rgba(14,165,233,0.02)",
  headerBorder: "rgba(124,58,237,0.18)",
  panelBorder: "rgba(124,58,237,0.14)",
  text: "rgba(255,255,255,0.92)",
  textMuted: "rgba(255,255,255,0.28)",
  eyebrow: "rgba(124,58,237,0.6)",
  purple: "#7c3aed",
  cyan: "#0ea5e9",
  green: "#10b981",
  infoIconBg: "rgba(124,58,237,0.1)",
  infoIconBorder: "rgba(124,58,237,0.2)",
  infoIconColor: "rgba(124,58,237,0.8)",
  infoValueColor: "rgba(255,255,255,0.72)",
  divider: "rgba(124,58,237,0.14)",
  socialLabel: "rgba(255,255,255,0.25)",
  socialBg: "rgba(124,58,237,0.05)",
  socialBorder: "rgba(124,58,237,0.22)",
  socialBgHov: "rgba(124,58,237,0.18)",
  socialBorderHov: "#7c3aed",
  socialColor: "rgba(255,255,255,0.45)",
  responseCardBg: "rgba(14,165,233,0.05)",
  responseCardBorder: "rgba(14,165,233,0.18)",
  responseCardLabel: "rgba(14,165,233,0.55)",
  inputBg: "rgba(255,255,255,0.03)",
  inputBorder: "rgba(124,58,237,0.2)",
  inputBorderFocus: "rgba(124,58,237,0.6)",
  inputBgFocus: "rgba(124,58,237,0.05)",
  inputShadowFocus: "0 0 0 3px rgba(124,58,237,0.1)",
  inputColor: "rgba(255,255,255,0.88)",
  fieldLabel: "rgba(255,255,255,0.3)",
  btnBg: "linear-gradient(135deg, #7c3aed 0%, #0ea5e9 100%)",
  btnBgOk: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
  btnShadow: "0 0 24px rgba(124,58,237,0.28)",
  btnShadowHov: "0 0 36px rgba(124,58,237,0.4)",
  errBg: "rgba(248,113,113,0.08)",
  errBorder: "rgba(248,113,113,0.28)",
  errColor: "#f87171",
  bracketColor: "rgba(124,58,237,0.65)",
  bracketDim: "rgba(124,58,237,0.22)",
  scanlines: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.005) 3px, rgba(255,255,255,0.005) 4px)",
  availBg: "rgba(16,185,129,0.08)",
  availBorder: "rgba(16,185,129,0.24)",
};

const LM = {
  bg: "linear-gradient(160deg, #fdf4ff 0%, #f0f9ff 45%, #f0fdf4 100%)",
  outerBorder: "1px solid rgba(168,85,247,0.18)",
  outerShadow: "0 4px 40px rgba(168,85,247,0.07)",
  headerBorder: "rgba(168,85,247,0.14)",
  panelBorder: "rgba(168,85,247,0.1)",
  text: "#1a0a3c",
  textMuted: "rgba(100,72,150,0.55)",
  eyebrow: "#9333ea",
  purple: "#9333ea",
  cyan: "#0284c7",
  green: "#059669",
  infoIconBg: "rgba(168,85,247,0.08)",
  infoIconBorder: "rgba(168,85,247,0.18)",
  infoIconColor: "#9333ea",
  infoValueColor: "#2d1a60",
  divider: "rgba(168,85,247,0.1)",
  socialLabel: "rgba(100,72,150,0.45)",
  socialBg: "rgba(168,85,247,0.04)",
  socialBorder: "rgba(168,85,247,0.2)",
  socialBgHov: "rgba(168,85,247,0.14)",
  socialBorderHov: "#9333ea",
  socialColor: "rgba(60,30,90,0.5)",
  responseCardBg: "rgba(2,132,199,0.05)",
  responseCardBorder: "rgba(2,132,199,0.18)",
  responseCardLabel: "&rgba(2,132,199,0.6)",
  inputBg: "#ffffff",
  inputBorder: "rgba(168,85,247,0.22)",
  inputBorderFocus: "rgba(147,51,234,0.55)",
  inputBgFocus: "rgba(168,85,247,0.03)",
  inputShadowFocus: "0 0 0 3px rgba(168,85,247,0.1)",
  inputColor: "#1a0a3c",
  fieldLabel: "rgba(100,72,150,0.55)",
  btnBg: "linear-gradient(135deg, #ec4899 0%, #a855f7 50%, #60a5fa 100%)",
  btnBgOk: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
  btnShadow: "0 0 24px rgba(168,85,247,0.2)",
  btnShadowHov: "0 0 36px rgba(168,85,247,0.35)",
  errBg: "rgba(220,38,38,0.06)",
  errBorder: "rgba(220,38,38,0.25)",
  errColor: "#dc2626",
  bracketColor: "rgba(168,85,247,0.55)",
  bracketDim: "rgba(168,85,247,0.18)",
  scanlines: "none",
  availBg: "rgba(5,150,105,0.07)",
  availBorder: "rgba(5,150,105,0.22)",
};

// ── Icon map ──────────────────────────────────────────────────────────────────
function SocialIcon({ name }: { name: string }) {
  const lc = name.toLowerCase();
  if (lc.includes("github"))
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.621.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.529 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.748-1.025 2.748-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
      </svg>
    );
  if (lc.includes("linkedin"))
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    );
  if (lc.includes("twitter") || lc.includes("x"))
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.629L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
      </svg>
    );
  if (lc.includes("facebook"))
    return (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    );
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}

// ── Corner brackets ──────────────────────────────────────────────────────────
function CornerBrackets({ lit = false, dark }: { lit?: boolean; dark: boolean }) {
  const c = lit
    ? (dark ? "rgba(124,58,237,0.65)" : "rgba(147,51,234,0.55)")
    : (dark ? "rgba(124,58,237,0.22)" : "rgba(168,85,247,0.2)");
  const s: React.CSSProperties = { position: "absolute", width: 12, height: 12, pointerEvents: "none", transition: "border-color 0.3s" };
  return (
    <>
      <span style={{ ...s, top: 7, left: 7, borderTop: `1px solid ${c}`, borderLeft: `1px solid ${c}` }} />
      <span style={{ ...s, top: 7, right: 7, borderTop: `1px solid ${c}`, borderRight: `1px solid ${c}` }} />
      <span style={{ ...s, bottom: 7, left: 7, borderBottom: `1px solid ${c}`, borderLeft: `1px solid ${c}` }} />
      <span style={{ ...s, bottom: 7, right: 7, borderBottom: `1px solid ${c}`, borderRight: `1px solid ${c}` }} />
    </>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function SpaceContact({
  formAction = "#",
  socials = [],
}: {
  formAction?: string;
  socials?: SocialLink[];
}) {
  const dark = useDarkMode();
  const T = dark ? DM : LM;

  const [blink, setBlink] = useState(true);
  const [values, setValues] = useState<Record<string, string>>({});
  const [focused, setFocused] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [hoveredSocial, setHoveredSocial] = useState<string | null>(null);

  const stars = useRef(
    Array.from({ length: 60 }, () => ({
      cx: Math.random() * 100,
      cy: Math.random() * 100,
      r: Math.random() * 1.1 + 0.3,
      opacity: Math.random() * 0.3 + 0.06,
      dur: 2.5 + Math.random() * 3,
      delay: Math.random() * 4,
    }))
  ).current;

  useEffect(() => {
    const iv = setInterval(() => setBlink((v) => !v), 530);
    return () => clearInterval(iv);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formAction || formAction === "#") return;
    setStatus("sending");
    try {
      const form = e.currentTarget;
      const res = await fetch(formAction, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      setStatus(res.ok ? "ok" : "err");
      if (res.ok) setValues({});
    } catch {
      setStatus("err");
    }
  };

  const inputBase: React.CSSProperties = {
    width: "100%",
    background: T.inputBg,
    border: `1px solid ${T.inputBorder}`,
    borderRadius: 8,
    padding: "12px 14px",
    fontSize: 13,
    color: T.inputColor,
    outline: "none",
    transition: "border-color 0.25s, background 0.25s, box-shadow 0.25s",
    fontFamily: "inherit",
    resize: "none" as const,
  };

  const inputFocused: React.CSSProperties = {
    ...inputBase,
    borderColor: T.inputBorderFocus,
    background: T.inputBgFocus,
    boxShadow: T.inputShadowFocus,
  };

  const FIELDS = [
    { key: "name",    label: "Full name",       type: "text",     required: true },
    { key: "email",   label: "Email",            type: "email",    required: true },
    { key: "subject", label: "Subject",          type: "text" },
    { key: "message", label: "Tell me your idea", type: "textarea", required: true },
  ];

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        borderRadius: 16,
        overflow: "hidden",
        background: T.bg,
        border: T.outerBorder,
        boxShadow: T.outerShadow,
      }}
    >
      {/* Stars — dark mode only */}
      {dark && (
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} aria-hidden="true">
          {stars.map((s, i) => (
            <circle key={i} cx={`${s.cx}%`} cy={`${s.cy}%`} r={s.r} fill="white" opacity={s.opacity}>
              <animate
                attributeName="opacity"
                values={`${s.opacity};${Math.min(s.opacity * 2.8, 0.9)};${s.opacity}`}
                dur={`${s.dur}s`}
                begin={`${s.delay}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
        </svg>
      )}

      {/* Scanlines — dark mode only */}
      {dark && (
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: DM.scanlines, zIndex: 1 }} />
      )}

      {/* ── HEADER ───── */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          padding: "16px 24px",
          borderBottom: `1px solid ${T.headerBorder}`,
        }}
      >
        <p style={{ fontFamily: "monospace", fontSize: 10, letterSpacing: "0.3em", color: T.eyebrow, margin: 0, marginBottom: 4 }}>
          TRANSMISSION CHANNEL · OPEN
        </p>
        <h2 style={{ fontFamily: "monospace", fontWeight: 700, fontSize: "clamp(1rem, 2.5vw, 1.2rem)", margin: 0, color: T.text, letterSpacing: "0.06em" }}>
          ESTABLISH CONTACT
          <span style={{ opacity: blink ? 1 : 0, transition: "opacity 0.1s" }}>_</span>
        </h2>
      </div>

      {/* ── BODY GRID ───── */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          display: "grid",
          gap: 0,
          minHeight: 520,
          ["--cpb" as string]: T.panelBorder,
        } as React.CSSProperties}
        className="space-contact-grid"
      >
        {/* ── LEFT PANEL ─── */}
        <div
          style={{
            padding: "24px 20px",
            display: "flex",
            flexDirection: "column",
            gap: 0,
          }}
          className="space-contact-sidebar"
        >
          {/* Availability badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "monospace",
              fontSize: 10,
              letterSpacing: "0.2em",
              color: T.green,
              background: T.availBg,
              border: `1px solid ${T.availBorder}`,
              borderRadius: 99,
              padding: "5px 12px",
              marginBottom: 24,
              width: "fit-content",
            }}
          >
            <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", backgroundColor: T.green, boxShadow: dark ? `0 0 7px ${T.green}` : "none" }} />
            AVAILABLE
          </div>

          {/* Info items */}
          {[
            {
              icon: (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
              ),
              label: "EMAIL",
              value: "hristbartra@gmail.com",
              href: "mailto:hristbartra@gmail.com",
            },
            {
              icon: (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              ),
              label: "LOCATION",
              value: "Lima, Peru",
            },
            {
              icon: (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
              ),
              label: "STATUS",
              value: "Freelance · Full-time",
            },
          ].map((item) => (
            <div key={item.label} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: 20 }}>
              <div
                style={{
                  flexShrink: 0,
                  width: 30,
                  height: 30,
                  borderRadius: 7,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: T.infoIconBg,
                  border: `1px solid ${T.infoIconBorder}`,
                  color: T.infoIconColor,
                  marginTop: 2,
                }}
              >
                {item.icon}
              </div>
              <div>
                <p style={{ fontFamily: "monospace", fontSize: 9, letterSpacing: "0.28em", color: T.textMuted, margin: 0, marginBottom: 4 }}>
                  {item.label}
                </p>
                {item.href ? (
                  <a
                    href={item.href}
                    style={{ fontFamily: "monospace", fontSize: 12, color: T.infoValueColor, textDecoration: "none", transition: "color 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = T.purple)}
                    onMouseLeave={(e) => (e.currentTarget.style.color = T.infoValueColor)}
                  >
                    {item.value}
                  </a>
                ) : (
                  <p style={{ fontFamily: "monospace", fontSize: 12, color: T.infoValueColor, margin: 0 }}>
                    {item.value}
                  </p>
                )}
              </div>
            </div>
          ))}

          {/* Divider + socials */}
          <div style={{ height: 1, background: T.divider, margin: "8px 0 20px" }} />
          <p style={{ fontFamily: "monospace", fontSize: 9, letterSpacing: "0.3em", color: T.socialLabel, marginBottom: 12 }}>
            FIND ME AT
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {socials.map((s) => {
              const isHov = hoveredSocial === s.name;
              return (
                <a
                  key={s.name}
                  href={s.link}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  aria-label={s.name}
                  onMouseEnter={() => setHoveredSocial(s.name)}
                  onMouseLeave={() => setHoveredSocial(null)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: 36,
                    height: 36,
                    borderRadius: 9,
                    border: isHov ? `1px solid ${T.socialBorderHov}` : `1px solid ${T.socialBorder}`,
                    background: isHov ? T.socialBgHov : T.socialBg,
                    color: isHov ? (dark ? "rgba(255,255,255,0.95)" : T.purple) : T.socialColor,
                    textDecoration: "none",
                    transition: "all 0.2s",
                    transform: isHov ? "translateY(-2px)" : "none",
                    boxShadow: isHov ? `0 4px 14px ${dark ? "rgba(124,58,237,0.22)" : "rgba(168,85,247,0.18)"}` : "none",
                  }}
                >
                  <SocialIcon name={s.name} />
                </a>
              );
            })}
          </div>

          {/* Response time */}
          <div style={{ marginTop: "auto", paddingTop: 32 }}>
            <div
              style={{
                padding: "12px 14px",
                borderRadius: 10,
                border: `1px solid ${T.responseCardBorder}`,
                background: T.responseCardBg,
              }}
            >
              <p style={{ fontFamily: "monospace", fontSize: 9, letterSpacing: "0.28em", color: T.cyan, opacity: 0.8, margin: 0, marginBottom: 6 }}>
                RESPONSE TIME
              </p>
              <p style={{ fontFamily: "monospace", fontSize: 18, fontWeight: 700, color: T.cyan, margin: 0, textShadow: dark ? `0 0 14px rgba(14,165,233,0.4)` : "none", lineHeight: 1 }}>
                &lt;24h
              </p>
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL — form ─── */}
        <div style={{ padding: "24px" }}>
          <form onSubmit={handleSubmit} noValidate>
            <div
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: 16 }}
              className="space-contact-form-row"
            >
              {FIELDS.slice(0, 2).map((field) => (
                <div key={field.key} style={{ position: "relative" }}>
                  <p style={{ fontFamily: "monospace", fontSize: 9, letterSpacing: "0.25em", color: T.fieldLabel, marginBottom: 8 }}>
                    {field.label}
                    {field.required && <span style={{ color: dark ? "#f87171" : "#dc2626", marginLeft: 4 }}>*</span>}
                  </p>
                  <div style={{ position: "relative" }}>
                    <CornerBrackets lit={focused === field.key} dark={dark} />
                    <input
                      name={field.key}
                      type={field.type}
                      required={field.required}
                      value={values[field.key] ?? ""}
                      onFocus={() => setFocused(field.key)}
                      onBlur={() => setFocused(null)}
                      onChange={(e) => setValues({ ...values, [field.key]: e.target.value })}
                      style={focused === field.key ? inputFocused : inputBase}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Subject */}
            <div style={{ position: "relative", marginBottom: 16 }}>
              <p style={{ fontFamily: "monospace", fontSize: 9, letterSpacing: "0.25em", color: T.fieldLabel, marginBottom: 8 }}>
                {FIELDS[2].label}
              </p>
              <div style={{ position: "relative" }}>
                <CornerBrackets lit={focused === "subject"} dark={dark} />
                <input
                  name="subject"
                  type="text"
                  value={values["subject"] ?? ""}
                  onFocus={() => setFocused("subject")}
                  onBlur={() => setFocused(null)}
                  onChange={(e) => setValues({ ...values, subject: e.target.value })}
                  style={focused === "subject" ? inputFocused : inputBase}
                />
              </div>
            </div>

            {/* Message */}
            <div style={{ position: "relative", marginBottom: 20 }}>
              <p style={{ fontFamily: "monospace", fontSize: 9, letterSpacing: "0.25em", color: T.fieldLabel, marginBottom: 8 }}>
                TELL ME YOUR IDEA
                <span style={{ color: dark ? "#f87171" : "#dc2626", marginLeft: 4 }}>*</span>
              </p>
              <div style={{ position: "relative" }}>
                <CornerBrackets lit={focused === "message"} dark={dark} />
                <textarea
                  name="message"
                  required
                  rows={5}
                  value={values["message"] ?? ""}
                  onFocus={() => setFocused("message")}
                  onBlur={() => setFocused(null)}
                  onChange={(e) => setValues({ ...values, message: e.target.value })}
                  style={focused === "message" ? { ...inputFocused, resize: "vertical" } : { ...inputBase, resize: "vertical" }}
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={status === "sending" || status === "ok"}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "13px 28px",
                borderRadius: 10,
                fontFamily: "monospace",
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: "0.2em",
                color: "white",
                background: status === "ok" ? T.btnBgOk : T.btnBg,
                border: "none",
                cursor: status === "sending" || status === "ok" ? "not-allowed" : "pointer",
                boxShadow: T.btnShadow,
                transition: "all 0.2s",
                opacity: status === "sending" ? 0.75 : 1,
              }}
              onMouseEnter={(e) => {
                if (status !== "sending" && status !== "ok") {
                  e.currentTarget.style.transform = "scale(1.02)";
                  e.currentTarget.style.boxShadow = T.btnShadowHov;
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = T.btnShadow;
              }}
            >
              {status === "sending"
                ? "TRANSMITTING..."
                : status === "ok"
                ? "TRANSMISSION SENT ✓"
                : "SEND TRANSMISSION →"}
            </button>

            {/* Error feedback */}
            {status === "err" && (
              <div
                style={{
                  marginTop: 14,
                  padding: "10px 14px",
                  borderRadius: 8,
                  background: T.errBg,
                  border: `1px solid ${T.errBorder}`,
                  fontFamily: "monospace",
                  fontSize: 11,
                  color: T.errColor,
                  letterSpacing: "0.08em",
                }}
              >
                TRANSMISSION FAILED. Try again or contact directly.
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Responsive grid override */}
      <style>{`
        @media (max-width: 720px) {
          .space-contact-grid { grid-template-columns: 1fr !important; }
          .space-contact-form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
