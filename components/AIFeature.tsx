import { Reveal } from "@/components/Reveal";

const steps = [
  {
    n: "01",
    title: "Fotografía",
    text: "Desde el móvil, subes la foto, una imagen guardada o un PDF.",
  },
  {
    n: "02",
    title: "Lectura por IA",
    text: "Reconoce productos, cantidades, unidades, precios e IVA.",
  },
  {
    n: "03",
    title: "Revisas y confirmas",
    text: "Corriges cualquier dato antes de guardar. Nada se guarda sin tu confirmación.",
  },
  {
    n: "04",
    title: "Todo actualizado",
    text: "Precios, proveedor y movimientos de stock quedan registrados solos.",
  },
];

export function AIFeature() {
  return (
    <section className="section raised">
      <div className="section-inner">
        <Reveal>
          <div className="eyebrow">El diferencial</div>
          <h2>
            Haz una foto al albarán.
            <br />
            La IA hace el resto.
          </h2>
        </Reveal>
        <div className="ticket-strip">
          {steps.map((step, i) => (
            <Reveal delay={i * 90} key={step.n} className="step">
              <span className="n">{step.n}</span>
              <h4>{step.title}</h4>
              <p>{step.text}</p>
            </Reveal>
          ))}
        </div>
        <Reveal delay={120} className="mock-wrap">
          <div style={{ flex: 1, minWidth: 220 }}>
            <span className="mock-label">Foto del facturas</span>
            <div
              className="receipt"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 150,
                color: "var(--ink-soft)",
                fontSize: ".8rem",
              }}
            >
              📄 factura_proveedor.jpg
            </div>
          </div>
          <div className="arrow-between" aria-hidden="true">
            →
          </div>
          <div style={{ flex: 1.3, minWidth: 260 }}>
            <span className="mock-label">
              Lo que registra Coquinaria · ejemplo ilustrativo
            </span>
            <div className="receipt">
              <div className="r-head">
                <span>Distribuidora Molino Azul</span>
                <span>12/03</span>
              </div>
              <div className="r-row">
                <span>Harina 000 · 25kg</span>
                <span>18,40€</span>
              </div>
              <div className="r-row">
                <span>Aceite oliva · 5L</span>
                <span>27,90€</span>
              </div>
              <div className="r-row">
                <span>Tomate triturado · 12u</span>
                <span>14,60€</span>
              </div>
              <div className="r-row total">
                <span>Total + IVA</span>
                <span>66,63€</span>
              </div>
              <div className="r-note">⚠ Aceite oliva: +9% vs. compra anterior</div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
