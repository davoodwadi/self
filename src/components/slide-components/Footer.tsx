import React from "react";

export function Footer() {
  return (
    <footer className="py-8 text-center px-6 relative z-10 w-full">
      <p className="text-gray-600 text-sm font-light">
        &copy; {new Date().getFullYear()}{" "}
        <a
          href="https://davoodwadi.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-[var(--crimson)] transition-colors duration-300"
        >
          Davood Wadi
        </a>
        .
      </p>
    </footer>
  );
}
