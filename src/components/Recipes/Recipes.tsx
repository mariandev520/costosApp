import { Reveal } from "@/components/Reveal";
import styles from "./Recipes.module.css";

export function Recipes() {
  return (
    <section className="section">
      <div className="section-inner">
        <Reveal>
          <div className="eyebrow">Rentabilidad real</div>
          <h2>Sabe qué plato te hace ganar dinero.</h2>
        </Reveal>
        <div className="mock-wrap" style={{ alignItems: "center" }}>
          <Reveal>
            <p className="lede" style={{ flex: 1, minWidth: 260 }}>
              Añade los ingredientes y las cantidades de una receta:
              Coquinaria calcula el coste de materia prima, suma los gastos
              generales, aplica el IVA y propone el precio de venta y el
              margen. Si cambia el precio de un ingrediente, ves al instante
              cómo afecta a cada plato.
            </p>
          </Reveal>
          <Reveal delay={120}>
            <span className="mock-label">Ejemplo ilustrativo</span>
            <div className={styles.costCard}>
              <div className={styles.dish}>Risotto de hongos</div>
              <div className={styles.row}>
                <span>Coste materia prima</span>
                <span>3,10€</span>
              </div>
              <div className={styles.row}>
                <span>Gastos generales</span>
                <span>0,90€</span>
              </div>
              <div className={styles.row}>
                <span>IVA (10%)</span>
                <span>0,64€</span>
              </div>
              <div className={`${styles.row} ${styles.rowFinal}`}>
                <span>Precio de venta</span>
                <span>12,50€</span>
              </div>
              <div className={styles.margin}>Margen: 68%</div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
