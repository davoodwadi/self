"use client";

import { useEffect, useState } from "react";

type Theme = "violet" | "evergreen" | "noir";

const themes: { id: Theme; dot: string }[] = [
  { id: "violet", dot: "#7C3AED" },
  { id: "evergreen", dot: "#059669" },
  { id: "noir", dot: "#6366F1" },
];

function applyTheme(theme: Theme) {
  if (theme === "violet") {
    document.documentElement.removeAttribute("data-theme");
    return;
  }
  document.documentElement.setAttribute("data-theme", theme);
}

function getInitialTheme(): Theme {
  if (typeof window === "undefined") return "violet";
  const saved = localStorage.getItem("paper-theme") as Theme | null;
  return saved && themes.some((item) => item.id === saved) ? saved : "violet";
}

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  function select(nextTheme: Theme) {
    setTheme(nextTheme);
    applyTheme(nextTheme);
    localStorage.setItem("paper-theme", nextTheme);
  }

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
      {themes.map((item) => {
        const active = theme === item.id;
        return (
          <button
            key={item.id}
            onClick={() => select(item.id)}
            aria-pressed={active}
            style={{
              width: "1.75rem",
              height: "1.75rem",
              borderRadius: "99px",
              border: "none",
              cursor: "pointer",
              background: active ? item.dot : "transparent",
              display: "grid",
              placeItems: "center",
            }}
          >
            <span
              style={{
                width: "0.45rem",
                height: "0.45rem",
                borderRadius: "50%",
                background: active ? "#fff" : item.dot,
              }}
            />
          </button>
        );
      })}
    </div>
  );
}
