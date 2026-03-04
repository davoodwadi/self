"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";

const NAV_LINKS = [
  { name: "About", href: "/#about" },
  { name: "Teaching", href: "/#teaching" },
  { name: "Research", href: "/#publications" },
  { name: "Service", href: "/#services" },
  { name: "Grants", href: "/#grants" },
  { name: "Curriculum", href: "/#curricula" },
  { name: "Contact", href: "/#contact" },
] as const;

const getHashFromHref = (href: string) => {
  const hashIndex = href.indexOf("#");
  return hashIndex >= 0 ? href.slice(hashIndex) : "";
};

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [hasUserNavigated, setHasUserNavigated] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      if (window.scrollY > 5) {
        setHasUserNavigated(true);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      setHasUserNavigated(true);
      setActiveSection(window.location.hash || "");
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    const ids = NAV_LINKS.map((link) =>
      getHashFromHref(link.href).replace("#", ""),
    ).filter(Boolean);

    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!hasUserNavigated) {
          return;
        }

        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (!visible.length) {
          return;
        }

        setActiveSection(`#${visible[0].target.id}`);
      },
      {
        root: null,
        rootMargin: "-45% 0px -45% 0px",
        threshold: [0.2, 0.4, 0.6],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      observer.disconnect();
    };
  }, [hasUserNavigated]);

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
            <span className="text-2xl font-serif font-light tracking-[0.3em] text-white transition-all group-hover:text-white group-hover:drop-shadow-[0_0_15px_rgba(96,165,250,0.5)]">
              DW
            </span>
            <span className="absolute -bottom-2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-accent-500/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform ease-out"></span>
          </Link>

          {/* Desktop Navigation Menu */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList className="space-x-3 xl:space-x-5">
              {NAV_LINKS.map((link) => {
                const linkHash = getHashFromHref(link.href);
                const isActive = activeSection === linkHash;

                return (
                  <NavigationMenuItem key={link.name}>
                    <NavigationMenuLink asChild>
                      <Link
                        href={link.href}
                        onClick={() => {
                          setHasUserNavigated(true);
                          setActiveSection(linkHash);
                        }}
                        className={cn(
                          "peer relative rounded-full  px-3.5 py-2.5 text-[14px] xl:text-[15px] uppercase tracking-[0.16em] font-medium transition-[color,transform,background-color,border-color,box-shadow] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-[1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-400/45 focus-visible:ring-offset-0",
                          isActive
                            ? "border-accent-400/35 bg-accent-500/10 text-accent-200 shadow-[0_0_24px_rgba(59,130,246,0.2)]"
                            : "border-white/5 bg-dark-900/15 text-gray-300/95 hover:border-accent-400/25 hover:bg-dark-800/45 hover:text-accent-300",
                        )}
                      >
                        {link.name}
                        <span
                          className={cn(
                            "pointer-events-none absolute -bottom-0.5 left-1/2 h-[1px] -translate-x-1/2 bg-gradient-to-r from-transparent via-accent-500 to-transparent transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
                            isActive
                              ? "w-[88%] opacity-100"
                              : "w-0 opacity-0 peer-hover:w-[88%] peer-hover:opacity-100",
                          )}
                        ></span>
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>

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
          {NAV_LINKS.map((link, i) => {
            const linkHash = getHashFromHref(link.href);
            const isActive = activeSection === linkHash;

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => {
                  setHasUserNavigated(true);
                  setActiveSection(linkHash);
                  setIsOpen(false);
                }}
                className={cn(
                  "group relative rounded-full border px-5 py-2.5 text-lg uppercase tracking-[0.22em] font-light transition-all duration-500",
                  isOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4",
                  isActive
                    ? "border-accent-400/35 bg-accent-500/10 text-accent-200 shadow-[0_0_24px_rgba(59,130,246,0.22)]"
                    : "border-white/10 text-gray-300/90 hover:border-accent-400/30 hover:text-white",
                )}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                {link.name}
                <span
                  className={cn(
                    "absolute -bottom-2 left-1/2 h-[1px] -translate-x-1/2 bg-accent-400 transition-all duration-500",
                    isActive ? "w-2/3" : "w-0 group-hover:w-2/3",
                  )}
                ></span>
              </Link>
            );
          })}

          <div className="pt-12 flex space-x-6">
            {/* Optional Socials or specific CTA can go here */}
          </div>
        </div>
      </div>
    </>
  );
}
