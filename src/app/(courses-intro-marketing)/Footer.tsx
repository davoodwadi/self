import React from "react";

export function Footer() {
  return (
    <footer className="py-8 text-center px-6 relative z-10 w-full bg-[var(--paper)] text-[var(--ink-3)] font-sans">
      <p className="text-sm">
        &copy; {new Date().getFullYear()}{" "}
        <a
          href="https://davoodwadi.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[var(--signal)] transition-colors duration-300"
        >
          Davood Wadi
        </a>
        .
      </p>
    </footer>
  );
}
