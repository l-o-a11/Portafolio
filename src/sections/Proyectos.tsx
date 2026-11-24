import { useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiGithub } from "react-icons/fi";
import { Eyebrow } from "../components/ui/Eyebrow";
import { ScrollReveal } from "../components/scroll/ScrollReveal";
import { filtros, proyectos, type Filtro, type Proyecto } from "../config/proyectos";
import { sitio } from "../config/site";
import { DetalleProyecto } from "./proyectos/DetalleProyecto";
import { TarjetaProyecto } from "./proyectos/TarjetaProyecto";

export function Proyectos() {
  const [filtro, setFiltro] = useState<Filtro>("Todos");
  const [abierto, setAbierto] = useState<Proyecto | null>(null);
  const cerrar = useCallback(() => setAbierto(null), []);

  const visibles =
    filtro === "Todos" ? proyectos : proyectos.filter((p) => p.categorias.includes(filtro));

  return (
    <section id="proyectos" className="relative px-6 py-28 lg:py-40">
      <div className="mx-auto max-w-6xl">
        <Eyebrow numero="03" texto="Proyectos" />
        <ScrollReveal>
          <h2 className="mt-6 text-[clamp(3rem,8vw,6.5rem)] font-medium leading-[0.95] tracking-tight text-tinta">
            Proyectos
          </h2>
        </ScrollReveal>

        <ScrollReveal className="mt-10 flex flex-wrap items-center justify-between gap-4">
          <div role="group" aria-label="Filtrar proyectos por categoría" className="flex flex-wrap gap-2">
            {filtros.map((f) => {
              const activo = filtro === f;
              return (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFiltro(f)}
                  aria-pressed={activo}
                  className={`relative rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                    activo ? "text-sobre-acento" : "bg-superficie text-tinta hover:bg-secundario"
                  }`}
                >
                  {activo && (
                    <motion.span
                      layoutId="filtro-activo"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-vivo-lavanda to-vivo-rosa"
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative">{f}</span>
                </button>
              );
            })}
          </div>
          <p aria-live="polite" className="text-sm text-tinta-suave">
            Mostrando {visibles.length} de {proyectos.length} proyectos
          </p>
        </ScrollReveal>

        <ul className="mt-10 grid gap-6 lg:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {visibles.map((proyecto) => (
              <motion.li
                key={proyecto.id}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <ScrollReveal desde={72} className="h-full">
                  <TarjetaProyecto proyecto={proyecto} onVerDetalle={() => setAbierto(proyecto)} />
                </ScrollReveal>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>

        <ScrollReveal className="mt-12">
          <a
            href={sitio.redes.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-semibold text-enlace underline-offset-4 hover:underline"
          >
            <FiGithub aria-hidden="true" />
            Ver más repositorios en GitHub
            <span className="sr-only"> (se abre en una pestaña nueva)</span>
          </a>
        </ScrollReveal>
      </div>

      <AnimatePresence>
        {abierto && <DetalleProyecto key={abierto.id} proyecto={abierto} onCerrar={cerrar} />}
      </AnimatePresence>
    </section>
  );
}
