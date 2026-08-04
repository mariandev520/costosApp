import { Reveal } from "@/components/Reveal";

const areas = [
  {
    title: "Proveedores",
    text: "Ficha de cada proveedor: productos, precio actual, IVA y variaciones de coste.",
  },
  {
    title: "Insumos",
    text: "Cada ingrediente con su unidad, categoría, precio y rendimiento por plato.",
  },
  {
    title: "Historial de precios",
    text: "Compara proveedores y detecta subidas antes de que te afecten.",
  },
  {
    title: "Informes",
    text: "Resumen de factura, cambios de precio, movimientos de stock y alertas.",
  },
  {
    title: "Platos e Ingredientes",
    text: "Recetas con coste, margen, IVA y precio de venta calculados al instante.",
  },
  {
    title: "Stock",
    text: "Qué falta, qué sobra y cuánto conviene pedir para llegar al objetivo.",
  },
];

export function Solution() {
  return (
    <section className="section">
      <div className="section-inner">
        <Reveal>
          <div className="eyebrow">Un solo lugar</div>
          <h2>Seis áreas de tu negocio, siempre a la vista.</h2>
        </Reveal>
        <div className="grid cols-3">
          {areas.map((area, i) => (
            <Reveal delay={i * 70} key={area.title} className="card">
              <h3>{area.title}</h3>
              <p>{area.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
