"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { X, Menu } from "lucide-react";

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on resize if screen becomes large
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const navLinks = [
    { name: "About", href: "/#about" },
    { name: "Teaching", href: "/#teaching" },
    { name: "Publications", href: "/#publications" },
    { name: "Services", href: "/#services" },
    { name: "Grants", href: "/#grants" },
    { name: "Curricula", href: "/#curricula" },
    { name: "Contact", href: "/#contact" },
  ];

  return (
    <>
      <nav
        className={cn(
          "fixed w-full z-[100] transition-all duration-500 ease-in-out px-6 lg:px-12",
          scrolled
            ? "py-4 bg-dark-900/60 backdrop-blur-xl border-b border-white/[0.05] shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
            : "py-6 bg-transparent border-b border-transparent",
          isOpen ? "bg-dark-900/90 backdrop-blur-2xl border-b-white/10" : "",
        )}
        id="navbar"
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          {/* Cinematic Logo */}
          <Link href="/" className="group relative flex items-center z-[110]">
            <span className="text-2xl font-serif font-light tracking-[0.3em] text-white/90 transition-all group-hover:text-white group-hover:drop-shadow-[0_0_15px_rgba(96,165,250,0.5)]">
              DW
            </span>
            <span className="absolute -bottom-2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-500/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform ease-out"></span>
          </Link>

          {/* Cinematic Desktop Links */}
          <div className="hidden lg:flex space-x-6 xl:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="group relative px-2 py-2 text-[10px] xl:text-xs uppercase tracking-[0.25em] font-light text-gray-400 hover:text-white transition-colors"
              >
                {link.name}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-accent-400 transition-all group-hover:w-full opacity-0 group-hover:opacity-100"></span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden group relative p-2 text-gray-400 hover:text-white transition-colors z-[110]"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
            <span className="absolute inset-0 bg-accent-400/20 blur-md rounded-full scale-0 group-hover:scale-100 transition-transform"></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-[90] bg-dark-900/95 backdrop-blur-2xl transition-all duration-500 ease-in-out lg:hidden",
          isOpen
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-10",
        )}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-8 px-6">
          {navLinks.map((link, i) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                "group relative text-xl uppercase tracking-[0.3em] font-light text-gray-400 hover:text-white transition-all transform duration-500",
                isOpen
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-4",
              )}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {link.name}
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-accent-400 transition-all group-hover:w-2/3"></span>
            </Link>
          ))}

          <div className="pt-12 flex space-x-6">
            {/* Optional Socials or specific CTA can go here */}
          </div>
        </div>
      </div>
    </>
  );
}
