"use client";

import { useState, useEffect } from "react";

type Theme = "violet" | "evergreen" | "noir";

const themes: { id: Theme; label: string; dot: string }[] = [
  { id: "violet", label: "Violet", dot: "#7C3AED" },
  { id: "evergreen", label: "Evergreen", dot: "#059669" },
  { id: "noir", label: "Noir", dot: "#6366F1" },
];

function applyTheme(t: Theme) {
  if (t === "violet") {
    document.documentElement.removeAttribute("data-theme");
  } else {
    document.documentElement.setAttribute("data-theme", t);
  }
}

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>("violet");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("paper-theme") as Theme | null;
    if (saved && (saved === "violet" || saved === "evergreen" || saved === "noir")) {
      setTheme(saved);
      applyTheme(saved);
    }
  }, []);

  function select(t: Theme) {
    setTheme(t);
    applyTheme(t);
    localStorage.setItem("paper-theme", t);
  }

  if (!mounted) return null;

  return (
    <div
      role="group"
      aria-label="Color theme"
      style={{
        position: "fixed",
        bottom: "2rem",
        right: "2rem",
        zIndex: 300,
        display: "flex",
        alignItems: "center",
        gap: "0.35rem",
        background: "var(--card)",
        border: "1px solid var(--border-mid)",
        borderRadius: "99px",
        padding: "0.3rem",
        boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
        backdropFilter: "blur(10px)",
      }}
    >
      {themes.map((t) => {
        const active = theme === t.id;
        return (
          <button
            key={t.id}
            onClick={() => select(t.id)}
            aria-pressed={active}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              padding: "0.35rem 0.85rem",
              borderRadius: "99px",
              border: "none",
              cursor: "pointer",
              fontSize: "0.7rem",
              fontWeight: 700,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              fontFamily: "var(--font-body)",
              background: active
                ? `linear-gradient(135deg, ${t.dot}CC 0%, ${t.dot} 100%)`
                : "transparent",
              color: active ? "#fff" : "var(--text-muted)",
              transition: "all 0.2s ease",
            }}
          >
            <span
              style={{
                width: "7px",
                height: "7px",
                borderRadius: "50%",
                background: active ? "#fff" : t.dot,
                flexShrink: 0,
                opacity: active ? 0.85 : 1,
              }}
            />
            {/* {t.label} */}
          </button>
        );
      })}
    </div>
  );
}
