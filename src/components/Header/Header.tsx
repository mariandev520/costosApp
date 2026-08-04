"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/site-config";
import { ThemeToggle } from "@/components/ThemeToggle";
import { MobileMenu } from "@/components/MobileMenu";
import styles from "./Header.module.css";

const navLinks = [
  { label: "Sobre", href: "#sobre" },
  { label: "Beneficios", href: "#beneficios" },
  { label: "Casos de Éxito", href: "#casos" },
  { label: "Contacto", href: "#demo" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className={styles.header}>
        <a className={styles.logo} href="#">
          {siteConfig.name}
        </a>

        <nav className={styles.navLinks} aria-label="Navegación principal">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className={styles.navLink}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className={styles.actions}>
          <ThemeToggle />
          <a className="cta-btn cta-btn-pill" href="#demo">
            Quiero ver una demo
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
          <button
            type="button"
            className={styles.hamburger}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span
              className={`${styles.hamburgerBar}${menuOpen ? ` ${styles.hamburgerBarOpen}` : ""}`}
            />
          </button>
        </div>
      </header>

      <MobileMenu
        open={menuOpen}
        links={navLinks}
        onClose={() => setMenuOpen(false)}
      />
    </>
  );
}
