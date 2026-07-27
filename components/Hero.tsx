const dishes = ["/images/dish-1.jpg", "/images/dish-2.jpg", "/images/dish-3.jpg"];

export function Hero() {
  return (
    <section className="section cover">
      <div className="photo-backdrop" aria-hidden="true">
        {dishes.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={src}
            src={src}
            alt=""
            loading={i === 0 ? "eager" : "lazy"}
          />
        ))}
      </div>
      <div className="hero-scrim" aria-hidden="true" />
      <div className="hero-glow" aria-hidden="true" />
      <div className="section-inner hero-enter">
        <div className="eyebrow">Costos App</div>
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
          <span>Lectura de factura por IA</span>
        </div>
      </div>
    </section>
  );
}
