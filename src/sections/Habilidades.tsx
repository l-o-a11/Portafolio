import { motion } from "framer-motion";
import { Eyebrow } from "../components/ui/Eyebrow";
import { ScrollMarquee } from "../components/scroll/ScrollMarquee";
import { ScrollReveal } from "../components/scroll/ScrollReveal";
import { categorias, nivelGeneral, type Tecnologia } from "../config/habilidades";

function Ficha({ tecnologia, color }: { tecnologia: Tecnologia; color: string }) {
  const { nombre, descripcion, Icono } = tecnologia;
  return (
    <motion.li
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 380, damping: 22 }}
      className="group flex items-start gap-4 rounded-3xl border border-borde bg-fondo p-5 shadow-suave"
    >
      <span
        className={`grid size-12 shrink-0 place-items-center rounded-2xl transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110 ${color}`}
      >
        <Icono size={24} aria-hidden="true" />
      </span>
      <div>
        <h4 className="font-semibold text-tinta">{nombre}</h4>
        <p className="mt-1 text-sm leading-relaxed text-tinta-suave">{descripcion}</p>
      </div>
    </motion.li>
  );
}

export function Habilidades() {
  return (
    <section id="habilidades" className="relative overflow-hidden bg-secundario py-28 lg:py-40">
      <h2 className="sr-only">Habilidades técnicas</h2>

      <div className="mx-auto max-w-6xl px-6">
        <Eyebrow numero="02" texto="Habilidades" />
      </div>

      <ScrollMarquee texto="Habilidades" className="mt-6" />

      <div className="mx-auto mt-10 max-w-6xl px-6">
        <ScrollReveal>
          <p className="inline-flex flex-wrap items-center gap-2 rounded-full border border-borde bg-fondo/80 px-5 py-2.5 text-sm text-tinta-suave">
            <span className="font-semibold text-tinta">Nivel general:</span> {nivelGeneral}
          </p>
        </ScrollReveal>

        <div className="mt-14 grid gap-16">
          {categorias.map((categoria, i) => (
            <ScrollReveal key={categoria.id} desde={72}>
              <article className="grid gap-6 lg:grid-cols-[15rem_1fr] lg:gap-10">
                <header>
                  <p className="font-titulo text-5xl font-medium text-vivo-rosa" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-2 text-2xl font-medium leading-tight text-tinta">
                    {categoria.titulo}
                  </h3>
                </header>
                <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {categoria.tecnologias.map((t) => (
                    <Ficha key={t.nombre} tecnologia={t} color={categoria.color} />
                  ))}
                </ul>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
