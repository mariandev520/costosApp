'use client';

import { useState, useEffect, useCallback } from 'react';
import { useScrollRevealMultiple } from '@/hooks/useScrollReveal';
import styles from './Footer.module.css';

export default function Footer() {
  const containerRef = useScrollRevealMultiple();
  const [showPrivacy, setShowPrivacy] = useState(false);

  const openPrivacy = (e) => {
    e.preventDefault();
    setShowPrivacy(true);
  };

  const closePrivacy = useCallback(() => {
    setShowPrivacy(false);
  }, []);

  // Lock body scroll & close on Escape
  useEffect(() => {
    if (!showPrivacy) return;
    document.body.style.overflow = 'hidden';
    const handleKey = (e) => { if (e.key === 'Escape') closePrivacy(); };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKey);
    };
  }, [showPrivacy, closePrivacy]);

  return (
    <footer id="contacto" className={styles.footer} role="contentinfo">
      <div className="container" ref={containerRef}>
        <div className={styles.top}>

          {/* Product column */}
          {/* <div className={`${styles.col} reveal`}>
            <h3 className={styles.colTitle}>Product</h3>
            <ul className={styles.navList}>
              <li><a href="#">All Product</a></li>
              <li><a href="#">Mobile App</a></li>
              <li><a href="#">Tasks</a></li>
            </ul>
          </div> */}

          {/* Information column */}
          {/* <div className={`${styles.col} reveal reveal--delay-1`}>
            <h3 className={styles.colTitle}>Information</h3>
            <ul className={styles.navList}>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Support</a></li>
            </ul>
          </div> */}

          {/* Company column */}
          {/* <div className={`${styles.col} reveal reveal--delay-2`}>
            <h3 className={styles.colTitle}>Company</h3>
            <ul className={styles.navList}>
              <li><a href="#">About us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Contact us</a></li>
              <li>
                <a href="#" aria-label="Costos.app">
                  <img
                    src="/images/logo-costos.svg"
                    alt="Costos.app Logo"
                    className={styles.logoImg}
                  />
                </a>
              </li>
            </ul>
          </div> */}

          {/* Social column */}
          {/* <div className={`${styles.col} reveal reveal--delay-3`}>
            <h3 className={styles.colTitle}>Social</h3>
            <ul className={styles.navList}>
              <li><a href="#">Facebook</a></li>
              <li><a href="#">Instagram</a></li>
              <li><a href="#">Twitter</a></li>
            </ul>
          </div> */}

        </div>

        <div className={styles.bottom}>
          <div className={styles.logo}>
            <img
              src="/images/logo-costos.svg"
              alt="Costos.app Logo"
              className={styles.logoImg}
            />
          </div>

          <div className={styles.legalLinks}>
            <a href="#" onClick={openPrivacy}>Política de privacidad</a>
            {/* <a href="#">Política de cookies</a> */}
          </div>

          {/* <div className={styles.socialIcons}>
            <a href="#" aria-label="Facebook">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>
            </a>
            <a href="#" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" /></svg>
            </a>
            <a href="#" aria-label="Twitter">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" /></svg>
            </a>
          </div> */}
        </div>
      </div>

      {/* Privacy Policy Modal */}
      {showPrivacy && (
        <div className={styles.modalOverlay} onClick={closePrivacy}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button
              className={styles.modalClose}
              onClick={closePrivacy}
              aria-label="Cerrar"
            >
              ×
            </button>

            <div className={styles.modalBody}>
              <h2 className={styles.modalTitle}>POLÍTICA DE PRIVACIDAD DE COSTOS.APP</h2>
              <p className={styles.modalUpdated}>Última actualización: Agosto de 2026</p>

              <p>En <strong>Costos.app</strong> respetamos tu privacidad y nos comprometemos a proteger los datos personales y comerciales que compartes con nosotros. Esta Política explica cómo recopilamos, utilizamos, almacenamos y protegemos tu información.</p>

              <hr className={styles.modalDivider} />

              <h3>1. RESPONSABLE DEL TRATAMIENTO DE LOS DATOS</h3>
              <ul>
                <li><strong>Razón Social:</strong> Costos App</li>
                <li><strong>Identificación Fiscal (NIF/CIF):</strong> [Número de Identificación]</li>
                <li><strong>Domicilio:</strong> 11 de Septiembre 3289</li>
                <li><strong>Correo electrónico de privacidad:</strong> contacto@costos.app</li>
              </ul>

              <hr className={styles.modalDivider} />

              <h3>2. DATOS QUE RECOPILAMOS</h3>
              <p>Para la prestación de nuestros servicios recopilamos:</p>
              <ul>
                <li><strong>a) Datos de Registro y Contacto:</strong> Nombre, apellidos, correo electrónico, número de teléfono, nombre del comercio.</li>
                <li><strong>c) Datos de Mensajería (WhatsApp y Telegram):</strong> Número de teléfono vinculado, historial de consultas enviadas al Agente IA y respuestas del sistema.</li>
                <li><strong>d) Datos Técnicos y de Navegación:</strong> Dirección IP, tipo de dispositivo, navegador, sistema operativo y cookies de sesión.</li>
              </ul>

              <hr className={styles.modalDivider} />

              <h3>3. FINALIDAD Y BASE JURÍDICA DEL TRATAMIENTO</h3>
              <div className={styles.modalTableWrapper}>
                <table className={styles.modalTable}>
                  <thead>
                    <tr>
                      <th>Finalidad del Tratamiento</th>
                      <th>Base Jurídica</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>Prestación del servicio SaaS:</strong> Lectura de facturas mediante OCR, cálculo de costes, recetas, alertas de stock e interacción con el Agente IA.</td>
                      <td>Ejecución del contrato de servicios (Art. 6.1.b GDPR / Normativa aplicable).</td>
                    </tr>
                    <tr>
                      <td><strong>Gestión de facturación y cobros</strong> de la suscripción.</td>
                      <td>Ejecución contractual y cumplimiento de obligaciones legales tributarias.</td>
                    </tr>
                    <tr>
                      <td><strong>Atención al cliente y soporte técnico.</strong></td>
                      <td>Ejecución contractual e interés legítimo.</td>
                    </tr>
                    <tr>
                      <td><strong>Mejora técnica de los modelos de lectura IA.</strong></td>
                      <td>Interés legítimo en optimizar la precisión del software.</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <hr className={styles.modalDivider} />

              <h3>4. TRATAMIENTO ESPECIAL DE FACTURAS E INTELIGENCIA ARTIFICIAL</h3>
              <ul>
                <li><strong>Lectura OCR:</strong> Las imágenes o PDFs de facturas que subes son procesados de forma automatizada por algoritmos de visión por computador e inteligencia artificial para convertir el texto de la imagen en datos estructurados.</li>
                <li><strong>Confidencialidad:</strong> Tus documentos, precios y recetas son estrictamente confidenciales. No vendemos ni compartimos la información de tus costes con competidores ni terceros.</li>
              </ul>

              <hr className={styles.modalDivider} />

              <h3>5. PROVEEDORES Y ENCARGADOS DEL TRATAMIENTO (SUBPROCESADORES)</h3>
              <p>Para poder operar la Plataforma, compartimos datos mínimos estrictamente necesarios con los siguientes proveedores de infraestructura:</p>
              <ol>
                <li><strong>Proveedores de Hosting y Nube:</strong> Almacenamiento seguro de datos, Vercel.</li>
                <li><strong>Proveedores de Inteligencia Artificial:</strong> Modelos de procesamiento de lenguaje y OCR (ej. OpenAI, Anthropic, Google Vertex AI) para la lectura de documentos y lógica del bot.</li>
                <li><strong>Plataformas de Mensajería:</strong> Meta Platforms Inc. (API de WhatsApp Business) y Telegram Messenger Inc. cuando utilizas el Agente de IA.</li>
              </ol>
              <p>Todos nuestros encargados del tratamiento están sujetos a contratos de confidencialidad y estándares de seguridad equivalentes.</p>

              <hr className={styles.modalDivider} />

              <h3>6. RETENCIÓN DE DATOS</h3>
              <ul>
                <li><strong>Durante la suscripción:</strong> Conservaremos tus datos de cuenta y datos operacionales mientras mantengas tu cuenta activa.</li>
                <li><strong>Tras la cancelación:</strong> Los datos de facturación se conservarán durante los plazos legalmente exigidos por la normativa tributaria (entre 5 y 10 años según la legislación local). Los documentos e imágenes de facturas se eliminarán o anonimizarán en un plazo máximo de 60 días tras la baja.</li>
              </ul>

              <hr className={styles.modalDivider} />

              <h3>7. TUS DERECHOS</h3>
              <p>Tienes derecho a:</p>
              <ul>
                <li><strong>Acceder</strong> a los datos personales que conservamos sobre ti.</li>
                <li><strong>Solicitar la rectificación</strong> de datos inexactos.</li>
                <li><strong>Solicitar la supresión</strong> de tus datos (&quot;derecho al olvido&quot;).</li>
                <li><strong>Oponerte o limitar</strong> el tratamiento de tus datos en determinados supuestos.</li>
                <li><strong>Solicitar la portabilidad</strong> de tus datos en un formato estructurado (CSV/JSON).</li>
                <li><strong>Retirar tu consentimiento</strong> en cualquier momento.</li>
              </ul>
              <p>Para ejercitar cualquiera de estos derechos, envía un correo a <strong>privacidad@costos.app</strong> indicando tu solicitud y acreditando tu identidad.</p>

              <hr className={styles.modalDivider} />

              <h3>8. SEGURIDAD DE LA INFORMACIÓN</h3>
              <p>Implementamos medidas técnicas y organizativas de nivel bancario, incluyendo cifrado SSL/TLS para la transmisión de datos, cifrado en reposo para bases de datos, control de acceso autenticado y copias de seguridad diarias.</p>

              <hr className={styles.modalDivider} />

              <h3>9. CAMBIOS EN LA POLÍTICA DE PRIVACIDAD</h3>
              <p>Nos reservamos el derecho de actualizar esta Política para reflejar cambios legales o funcionales. Las modificaciones sustanciales serán notificadas a través de la Plataforma o por correo electrónico.</p>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}