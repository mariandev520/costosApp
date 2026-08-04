import { Reveal } from "@/components/Reveal";
import styles from "./Benefits.module.css";

const benefits = [
  {
    title: "Precios al día",
    text: "Actualiza costes en segundos con una foto, no a mano y con calculadora.",
  },
  {
    title: "Margen protegido",
    text: "Detecta subidas de coste antes de que se coman la rentabilidad de un plato.",
  },
  {
    title: "Coste real, no estimado",
    text: "Cada receta muestra su coste, margen y precio de venta actualizados.",
  },
  {
    title: "Stock sin sorpresas",
    text: "Evita roturas en servicio y compras de más por no saber qué queda.",
  },
];

export function Benefits() {
  return (
    <section className="section">
      <div className="section-inner">
        <Reveal>
          <div className="eyebrow">Por qué Coquinaria</div>
          <h2>Menos papeleo. Más decisiones con datos.</h2>
        </Reveal>
        <div className={styles.benefits}>
          {benefits.map((b, i) => (
            <Reveal delay={i * 70} key={b.title} className={styles.item}>
              <span className={styles.marker}>→</span>
              <p>
                <strong>{b.title}</strong>
                {b.text}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
