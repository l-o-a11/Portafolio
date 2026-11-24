import { Eyebrow } from "../components/ui/Eyebrow";
import { ScrollReveal } from "../components/scroll/ScrollReveal";
import { ScrollWords } from "../components/scroll/ScrollWords";
import { datosPersonales } from "../config/perfil";
import { sitio } from "../config/site";

const COLORES_TARJETA = [
  "bg-destacado border-t-vivo-rosa",
  "bg-superficie border-t-vivo-menta",
  "bg-secundario border-t-vivo-lavanda",
] as const;

export function SobreMi() {
  return (
    <section id="sobre-mi" className="relative px-6 py-28 lg:py-40">
      <div className="mx-auto max-w-5xl">
        <h2 className="sr-only">Sobre mí</h2>
        <Eyebrow numero="01" texto="Sobre mí" />

        <ScrollWords
          texto={sitio.descripcion}
          className="mt-10 font-titulo text-[clamp(1.7rem,4vw,3.4rem)] font-medium leading-[1.18] tracking-tight text-tinta"
        />

        <dl className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {datosPersonales.map(({ etiqueta, valor }, i) => (
            <ScrollReveal key={etiqueta} desde={64}>
              <div
                className={`h-full rounded-3xl border border-t-[6px] border-borde p-6 shadow-suave transition-transform duration-300 hover:-translate-y-1 ${COLORES_TARJETA[i % COLORES_TARJETA.length]}`}
              >
                <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-tinta-suave">
                  {etiqueta}
                </dt>
                <dd className="mt-3 font-titulo text-xl leading-snug text-tinta">{valor}</dd>
              </div>
            </ScrollReveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
