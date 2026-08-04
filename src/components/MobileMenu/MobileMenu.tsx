"use client";

import { useEffect } from "react";
import styles from "./MobileMenu.module.css";

interface MobileMenuProps {
  open: boolean;
  links: { label: string; href: string }[];
  onClose: () => void;
}

export function MobileMenu({ open, links, onClose }: MobileMenuProps) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div
      className={`${styles.overlay}${open ? ` ${styles.overlayOpen}` : ""}`}
      aria-hidden={!open}
    >
      <nav className={styles.nav} aria-label="Menú móvil">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={styles.link}
            onClick={onClose}
            tabIndex={open ? 0 : -1}
          >
            {link.label}
          </a>
        ))}
        <a
          href="#demo"
          className={`cta-btn cta-btn-pill ${styles.cta}`}
          onClick={onClose}
          tabIndex={open ? 0 : -1}
        >
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
      </nav>
    </div>
  );
}
