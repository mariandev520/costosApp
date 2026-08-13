'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useScrollSpy } from '@/hooks/useScrollSpy';
import HoverText from '@/components/HoverText/HoverText';
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
  const progressRef = useRef(null);

  useEffect(() => {
    let ticking = false;

    const update = () => {
      ticking = false;
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 40);

      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(1, Math.max(0, scrollY / docHeight)) : 0;
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`;
      }
    };

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
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
          <HoverText as="span" type="chars" className={styles.logoText}>Costos App</HoverText>
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
              <HoverText as="span" type="chars">{label}</HoverText>
            </a>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className={styles.ctas}>
          <a
            href="#contacto"
            className={styles.ctaLogin}
            onClick={(e) => handleSmoothScroll(e, '#contacto')}
          >
            <HoverText as="span" type="chars">Registrar</HoverText>
          </a>
          <a
            href="#precio"
            className={styles.ctaLogin}
            onClick={(e) => handleSmoothScroll(e, '#precio')}
          >
            <HoverText as="span" type="chars">Iniciar Sesión</HoverText>
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

        <div className={styles.progressTrack} aria-hidden="true">
          <div ref={progressRef} className={styles.progressBar} />
        </div>
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
            <HoverText as="span" type="chars">{label}</HoverText>
          </a>
        ))}
        <div className={styles.mobileCtas}>
          <a href="#contacto" className={styles.ctaLogin} onClick={(e) => handleSmoothScroll(e, '#contacto')} tabIndex={isMenuOpen ? 0 : -1}>
            <HoverText as="span" type="chars">Registrar</HoverText>
          </a>
          <a href="#precio" className={styles.ctaLogin} onClick={(e) => handleSmoothScroll(e, '#precio')} tabIndex={isMenuOpen ? 0 : -1}>
            <HoverText as="span" type="chars">Iniciar Sesión</HoverText>
          </a>
        </div>
      </nav>
    </>
  );
}
