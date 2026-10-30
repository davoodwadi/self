import React from "react";
import { DECK_THEME } from "./courses/digital-transformation/_visuals/kit";

export function Footer() {
  return (
    <footer
      style={DECK_THEME}
      className="py-8 text-center px-6 relative z-10 w-full bg-[var(--dt-white)] text-[var(--ink-3)] font-sans"
    >
      <p className="text-sm">
        &copy; {new Date().getFullYear()}{" "}
        <a
          href="https://davoodwadi.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[var(--dt-signal)] transition-colors duration-300"
        >
          Davood Wadi
        </a>
        .
      </p>
    </footer>
  );
}
