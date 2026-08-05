'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import styles from './Navbar.module.css';

const NAV_LINKS = [
  { href: '#hero', label: 'Home' },
  { href: '#funcionalidades', label: 'Features' },
  { href: '#escaner-ia', label: 'Todo' },
  { href: '#precio', label: 'Pricing' },
];

const SECTION_IDS = ['hero', 'funcionalidades', 'escaner-ia', 'precio'];

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const activeSection = useScrollSpy(SECTION_IDS);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isMenuOpen) setIsMenuOpen(false);
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  const handleSmoothScroll = useCallback((e, href) => {
    e.preventDefault();
    setIsMenuOpen(false);

    if (pathname !== '/') {
      router.push(href === '#hero' ? '/' : `/${href}`);
      return;
    }

    if (href === '#hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const target = document.querySelector(href);
    if (target) {
      const navbarEl = document.getElementById('navbar');
      const navbarHeight = navbarEl ? navbarEl.offsetHeight : 0;
      const top = target.getBoundingClientRect().top + window.scrollY - navbarHeight - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }, [pathname, router]);

  return (
    <>
      <header
        id="navbar"
        className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}
        role="banner"
      >
        <a
          href="#hero"
          className={styles.logo}
          aria-label="Coquinaria — Volver al inicio"
          onClick={(e) => handleSmoothScroll(e, '#hero')}
        >
          <span className={styles.logoText}>Coquinaria</span>
        </a>

        {/* Desktop Navigation */}
        <nav className={styles.links} aria-label="Navegación principal">
          {NAV_LINKS.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className={activeSection === href.slice(1) ? styles.active : ''}
              onClick={(e) => handleSmoothScroll(e, href)}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className={styles.ctas}>
          <a
            href="#contacto"
            className={styles.ctaRegister}
            onClick={(e) => handleSmoothScroll(e, '#contacto')}
          >
            Registrar
          </a>
          <a
            href="#precio"
            className={styles.ctaLogin}
            onClick={(e) => handleSmoothScroll(e, '#precio')}
          >
            Login
          </a>
        </div>

        {/* Hamburger */}
        <button
          className={`${styles.hamburger} ${isMenuOpen ? styles.hamburgerOpen : ''}`}
          aria-label={isMenuOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>

      {/* Mobile Menu Overlay */}
      <nav
        id="mobile-menu"
        className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ''}`}
        aria-label="Menú móvil"
        aria-hidden={!isMenuOpen}
      >
        {NAV_LINKS.map(({ href, label }) => (
          <a
            key={href}
            href={href}
            onClick={(e) => handleSmoothScroll(e, href)}
            tabIndex={isMenuOpen ? 0 : -1}
          >
            {label}
          </a>
        ))}
        <div className={styles.mobileCtas}>
          <a href="#contacto" className={styles.ctaLogin} onClick={(e) => handleSmoothScroll(e, '#contacto')} tabIndex={isMenuOpen ? 0 : -1}>
            Registrar
          </a>
          <a href="#precio" className={styles.ctaLogin} onClick={(e) => handleSmoothScroll(e, '#precio')} tabIndex={isMenuOpen ? 0 : -1}>
            Login
          </a>
        </div>
      </nav>
    </>
  );
}
