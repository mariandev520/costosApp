'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './DemoModal.module.css';

const INITIAL_FORM = {
  nombreCompleto: '',
  direccion: '',
  pais: '',
  email: '',
  nombreComercio: '',
  paginaWeb: '',
};

const PAISES = [
  'Argentina',
  'Bolivia',
  'Chile',
  'Colombia',
  'Costa Rica',
  'Cuba',
  'Ecuador',
  'El Salvador',
  'España',
  'Estados Unidos',
  'Guatemala',
  'Honduras',
  'México',
  'Nicaragua',
  'Panamá',
  'Paraguay',
  'Perú',
  'Puerto Rico',
  'República Dominicana',
  'Uruguay',
  'Venezuela',
  'Otro',
];

const CLOSE_DURATION = 220;

export default function DemoModal({ onClose }) {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const [isClosing, setIsClosing] = useState(false);
  const dialogRef = useRef(null);
  const firstFieldRef = useRef(null);
  const closeTimeoutRef = useRef(null);

  const requestClose = () => {
    if (closeTimeoutRef.current) return;
    setIsClosing(true);
    closeTimeoutRef.current = setTimeout(onClose, CLOSE_DURATION);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') requestClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    firstFieldRef.current?.focus();

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) requestClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setStatus('submitting');

    try {
      const res = await fetch('/api/demo-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        if (data.issues) setErrors(data.issues);
        setStatus('error');
        return;
      }

      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  return createPortal(
    <div
      className={`${styles.overlay} ${isClosing ? styles.overlayClosing : ''}`}
      onMouseDown={handleOverlayClick}
    >
      <div
        ref={dialogRef}
        className={`${styles.dialog} border-glow ${isClosing ? styles.dialogClosing : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="demo-modal-title"
      >
        <button
          type="button"
          className={styles.closeButton}
          aria-label="Cerrar"
          onClick={requestClose}
        >
          ×
        </button>

        {status === 'success' ? (
          <div className={styles.successState}>
            <div className={styles.successIcon} aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
              </svg>
            </div>
            <h3 id="demo-modal-title" className={styles.title}>¡Listo!</h3>
            <p className={styles.successText}>
              En breve vas a recibir un mail de descarga en <strong>{form.email}</strong>.
            </p>
            <button type="button" className={styles.submitButton} onClick={requestClose}>
              Cerrar
            </button>
          </div>
        ) : (
          <>
            <p className={styles.kicker}>SOLICITAR DEMO</p>
            <h3 id="demo-modal-title" className={styles.title}>Quiero ver una demo</h3>
            <p className={styles.subtitle}>
              Dejanos tus datos y te enviamos el enlace de descarga por email.
            </p>

            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              <div className={styles.field} style={{ '--field-index': 0 }}>
                <label htmlFor="nombreCompleto">Nombre y apellido</label>
                <input
                  ref={firstFieldRef}
                  id="nombreCompleto"
                  name="nombreCompleto"
                  type="text"
                  value={form.nombreCompleto}
                  onChange={handleChange}
                  required
                />
                {errors.nombreCompleto && <span className={styles.error}>{errors.nombreCompleto[0]}</span>}
              </div>

              <div className={styles.field} style={{ '--field-index': 1 }}>
                <label htmlFor="direccion">Dirección</label>
                <input
                  id="direccion"
                  name="direccion"
                  type="text"
                  value={form.direccion}
                  onChange={handleChange}
                  required
                />
                {errors.direccion && <span className={styles.error}>{errors.direccion[0]}</span>}
              </div>

              <div className={styles.field} style={{ '--field-index': 2 }}>
                <label htmlFor="pais">País</label>
                <select
                  id="pais"
                  name="pais"
                  className={styles.select}
                  value={form.pais}
                  onChange={handleChange}
                  required
                >
                  <option value="" disabled>Seleccioná tu país</option>
                  {PAISES.map((pais) => (
                    <option key={pais} value={pais}>{pais}</option>
                  ))}
                </select>
                {errors.pais && <span className={styles.error}>{errors.pais[0]}</span>}
              </div>

              <div className={styles.field} style={{ '--field-index': 3 }}>
                <label htmlFor="email">Mail personal</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
                {errors.email && <span className={styles.error}>{errors.email[0]}</span>}
              </div>

              <div className={styles.divider} />

              <div className={styles.field} style={{ '--field-index': 4 }}>
                <label htmlFor="nombreComercio">Nombre del comercio</label>
                <input
                  id="nombreComercio"
                  name="nombreComercio"
                  type="text"
                  value={form.nombreComercio}
                  onChange={handleChange}
                  required
                />
                {errors.nombreComercio && <span className={styles.error}>{errors.nombreComercio[0]}</span>}
              </div>

              <div className={styles.field} style={{ '--field-index': 5 }}>
                <label htmlFor="paginaWeb">Página web (opcional)</label>
                <input
                  id="paginaWeb"
                  name="paginaWeb"
                  type="text"
                  placeholder="https://"
                  value={form.paginaWeb}
                  onChange={handleChange}
                />
              </div>

              {status === 'error' && (
                <p className={styles.formError}>
                  No pudimos enviar tu solicitud. Probá de nuevo en unos minutos.
                </p>
              )}

              <button type="submit" className={styles.submitButton} disabled={status === 'submitting'}>
                {status === 'submitting' && <span className={styles.spinner} aria-hidden="true" />}
                {status === 'submitting' ? 'Enviando…' : 'Enviar'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>,
    document.body
  );
}
