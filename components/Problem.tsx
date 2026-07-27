import { Reveal } from "@/components/Reveal";

const items = [
  {
    title: "Precios a ciegas",
    text: "Un proveedor sube un coste y no te enteras hasta cuadrar caja a fin de mes.",
  },
  {
    title: "Horas en factura",
    text: "Cargar cada compra a mano te roba tiempo que deberías pasar en la cocina o con tus clientes.",
  },
  {
    title: "Márgenes a ojo",
    text: "No sabes con certeza si un plato del menú te da beneficio o te está costando dinero.",
  },
  {
    title: "Sustos de stock",
    text: "Te quedas sin un ingrediente clave en mitad de un servicio, sin haberlo visto venir.",
  },
];

export function Problem() {
  return (
    <section className="section raised">
      <div className="section-inner">
        <Reveal>
          <div className="eyebrow">El día a día sin CostosApp</div>
          <h2>Cada semana se te escapa algo.</h2>
        </Reveal>
        <div className="grid cols-2">
          {items.map((item, i) => (
            <Reveal delay={i * 80} key={item.title} className="card">
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
