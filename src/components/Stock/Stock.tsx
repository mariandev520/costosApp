import { Reveal } from "@/components/Reveal";
import type { CSSProperties } from "react";
import styles from "./Stock.module.css";

const meters = [
  { label: "Harina 000", pct: 72, mark: 30, low: false, val: "18 / 25 kg" },
  { label: "Aceite oliva", pct: 18, mark: 30, low: true, val: "2 / 11 L" },
  { label: "Tomate", pct: 55, mark: 30, low: false, val: "11 / 20 kg" },
];

export function Stock() {
  return (
    <section className="section raised">
      <div className="section-inner">
        <Reveal>
          <div className="eyebrow">Stock bajo control</div>
          <h2>Ninguna sorpresa en pleno servicio.</h2>
          <p className="lede">
            Define un mínimo y un objetivo para cada ingrediente. CostosApp
            avisa qué está agotado o por debajo del mínimo, y te dice cuánto
            conviene pedir.
          </p>
        </Reveal>
        <Reveal delay={120}>
          <span className="mock-label">
            Ejemplo ilustrativo · nivel actual vs. mínimo
          </span>
          <div className={styles.meters}>
            {meters.map((m) => (
              <div className={styles.meterRow} key={m.label}>
                <span>{m.label}</span>
                <div className={styles.meterTrack}>
                  <div
                    className={`${styles.meterFill}${m.low ? ` ${styles.meterFillLow}` : ""}`}
                    style={{ "--target-w": `${m.pct}%` } as CSSProperties}
                  />
                  <div
                    className={styles.meterMark}
                    style={{ left: `${m.mark}%` }}
                  />
                </div>
                <span className={styles.meterVal}>{m.val}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
