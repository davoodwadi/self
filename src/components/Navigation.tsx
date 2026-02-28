"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "/#about" },
    { name: "Expertise", href: "/#expertise" },
    { name: "Publications", href: "/#publications" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <nav
      className={cn(
        "fixed w-full z-50 transition-all ease-in-out px-6 md:px-12",
        scrolled
          ? "py-4 bg-dark-900/60 backdrop-blur-xl border-b border-white/[0.05] shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
          : "py-6 bg-transparent border-b border-transparent",
      )}
      id="navbar"
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Cinematic Logo */}
        <Link href="/" className="group relative flex items-center">
          <span className="text-2xl font-serif font-light tracking-[0.3em] text-white/90 transition-all group-hover:text-white group-hover:drop-shadow-[0_0_15px_rgba(96,165,250,0.5)]">
            DW
          </span>
          <span className="absolute -bottom-2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-500/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform ease-out"></span>
        </Link>

        {/* Cinematic Desktop Links */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="group relative px-2 py-2 text-sm uppercase tracking-[0.25em] font-light text-gray-400 hover:text-white transition-colors"
            >
              {link.name}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-accent-400 transition-all group-hover:w-full opacity-0 group-hover:opacity-100"></span>
            </Link>
          ))}
        </div>

        {/* Mobile Menu Button (Cinematic fade/glow) */}
        <button className="md:hidden group relative p-2 text-gray-400 hover:text-white transition-colors">
          <svg
            className="w-6 h-6 transform transition-transform group-hover:scale-110"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
          <span className="absolute inset-0 bg-accent-400/20 blur-md rounded-full scale-0 group-hover:scale-100 transition-transform"></span>
        </button>
      </div>
    </nav>
  );
}
