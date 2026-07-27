"use client";

import { useState, type FormEvent } from "react";
import { siteConfig } from "@/lib/site-config";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const nombre = String(form.get("nombre") ?? "");
    const negocio = String(form.get("negocio") ?? "");
    const email = String(form.get("email") ?? "");
    const telefono = String(form.get("telefono") ?? "");
    const mensaje = String(form.get("mensaje") ?? "");

    const subject = `Demo Coquinaria App — ${negocio || nombre}`;
    const body = [
      `Nombre: ${nombre}`,
      `Negocio: ${negocio}`,
      `Email: ${email}`,
      `Teléfono: ${telefono}`,
      "",
      mensaje,
    ].join("\n");

    window.location.href = `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    setSent(true);
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label>
          <span>Nombre</span>
          <input type="text" name="nombre" required autoComplete="name" />
        </label>
        <label>
          <span>Negocio</span>
          <input type="text" name="negocio" autoComplete="organization" />
        </label>
      </div>
      <div className="form-row">
        <label>
          <span>Email</span>
          <input type="email" name="email" required autoComplete="email" />
        </label>
        <label>
          <span>Teléfono</span>
          <input type="tel" name="telefono" autoComplete="tel" />
        </label>
      </div>
      <label>
        <span>Contanos un poco de tu negocio</span>
        <textarea name="mensaje" rows={3} />
      </label>
      <button className="cta-btn" type="submit">
        Enviar y coordinar demo
      </button>
      {sent && (
        <p className="form-note" role="status">
          Se abrió tu cliente de email con los datos cargados — confirmá el
          envío desde ahí.
        </p>
      )}
    </form>
  );
}
