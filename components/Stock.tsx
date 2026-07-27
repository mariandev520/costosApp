import { Reveal } from "@/components/Reveal";
import type { CSSProperties } from "react";

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
            Define un mínimo y un objetivo para cada ingrediente. Coquinaria
            avisa qué está agotado o por debajo del mínimo, y te dice cuánto
            conviene pedir.
          </p>
        </Reveal>
        <Reveal delay={120}>
          <span className="mock-label">
            Ejemplo ilustrativo · nivel actual vs. mínimo
          </span>
          <div className="meters">
            {meters.map((m) => (
              <div className="meter-row" key={m.label}>
                <span>{m.label}</span>
                <div className="meter-track">
                  <div
                    className={`meter-fill${m.low ? " low" : ""}`}
                    style={{ "--target-w": `${m.pct}%` } as CSSProperties}
                  />
                  <div className="meter-mark" style={{ left: `${m.mark}%` }} />
                </div>
                <span className="meter-val">{m.val}</span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
