export function Hero() {
  return (
    <section className="section cover">
      <div className="hero-glow" aria-hidden="true" />
      <div className="section-inner hero-enter">
        <div className="eyebrow">Coquinaria App</div>
        <h1>
          Tu cocina, bajo control
          <br />
          desde una sola pantalla.
        </h1>
        <p className="lede">
          Compras, costes, recetas y stock — centralizados y siempre
          actualizados, para decidir con datos y no a ojo.
        </p>
        <div className="tags">
          <span>Proveedores</span>
          <span>Recetas y márgenes</span>
          <span>Stock</span>
          <span>Lectura de albaranes por IA</span>
        </div>
      </div>
    </section>
  );
}
