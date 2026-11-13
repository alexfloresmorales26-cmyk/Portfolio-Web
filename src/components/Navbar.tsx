"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { es } from "../i18n/translations/es";
import { en } from "../i18n/translations/en";

interface NavbarProps {
  locale: "es" | "en";
}

export function Navbar({ locale }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const t = locale === "en" ? en : es;

  const links = [
    { href: `/${locale}/`, label: t.nav.home },
    { href: `/${locale}/acerca`, label: t.nav.about },
    { href: `/${locale}/proyectos`, label: t.nav.projects },
    { href: `/${locale}/servicios`, label: t.nav.services },
    { href: `/${locale}/blog`, label: t.blog.title },
    { href: `/${locale}/contacto`, label: t.nav.contact },
  ];

  useEffect(() => {
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false);
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, []);

  const toggleLocale = () => {
    const nextLocale = locale === "es" ? "en" : "es";
    if (typeof window !== "undefined") {
      const currentPath = window.location.pathname.replace(/^\/(es|en)/, "") || "/";
      window.location.href = `/${nextLocale}${currentPath === "/" ? "/" : currentPath}`;
    }
  };

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-border/50 bg-surface/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <a href={`/${locale}/`} className="flex items-center gap-2 text-xl font-bold text-text tracking-tight">
            <span className="text-neon-cyan">{'<'}</span>AM<span className="text-neon-cyan">{'/>'}</span>
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            {links.map((link) => (
              <a key={link.href} href={link.href} className="text-text-muted hover:text-text transition-colors">
                {link.label}
              </a>
            ))}
            <button
              onClick={toggleLocale}
              className="flex items-center gap-1.5 text-text-muted hover:text-neon-cyan transition-colors"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
              {locale === "es" ? "EN" : "ES"}
            </button>
            <ThemeToggle />
          </div>
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-10 h-10 rounded-lg bg-surface border border-border hover:bg-surface-hover flex items-center justify-center"
              aria-label="Abrir menú"
            >
              <svg className="w-5 h-5 text-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden border-t border-border/50 bg-surface"
          >
            <div className="px-6 py-4 space-y-3">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block py-3 text-text hover:text-neon-cyan transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={() => {
                  toggleLocale();
                  setIsOpen(false);
                }}
                className="w-full py-3 text-left text-text-muted hover:text-neon-cyan flex items-center justify-between transition-colors"
              >
                <span className="flex items-center gap-1.5">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                  {locale === "es" ? "EN" : "ES"}
                </span>
                <svg className="w-4 h-4 text-text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
