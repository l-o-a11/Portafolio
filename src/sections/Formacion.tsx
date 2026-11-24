import { useRef } from "react";
import { motion, useReducedMotion, useTransform } from "framer-motion";
import { Eyebrow } from "../components/ui/Eyebrow";
import { ScrollReveal } from "../components/scroll/ScrollReveal";
import { useProgresoSuave } from "../hooks/useProgresoSuave";
import { FiAward } from "react-icons/fi";
import { cursos, formacion, roles } from "../config/perfil";

export function Formacion() {
  const lineaRef = useRef<HTMLDivElement>(null);
  const reducir = useReducedMotion();
  const scrollYProgress = useProgresoSuave(lineaRef, ["start 0.75", "end 0.92"]);
  // La línea se dibuja a medida que se avanza por la página.
  const escalaLinea = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section id="formacion" className="relative px-6 pb-40 pt-28 lg:pt-40">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <div className="self-start lg:sticky lg:top-32">
          <Eyebrow numero="04" texto="Trayectoria" />
          <h2 className="mt-6 text-[clamp(3rem,8vw,6.5rem)] font-medium leading-[0.95] tracking-tight text-tinta">
            Formación
          </h2>

          <div className="mt-10">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-tinta-suave">
              Roles que he asumido
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {roles.map((rol, i) => (
                <li
                  key={rol}
                  className={`rounded-full px-5 py-2 font-semibold text-sobre-acento ${
                    ["bg-vivo-rosa", "bg-vivo-lavanda", "bg-vivo-menta"][i % 3]
                  }`}
                >
                  {rol}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
        <div ref={lineaRef} className="relative">
          <div aria-hidden="true" className="absolute bottom-0 left-[1.1rem] top-2 w-[3px] rounded-full bg-borde" />
          <motion.div
            aria-hidden="true"
            style={{ scaleY: reducir ? 1 : escalaLinea }}
            className="absolute bottom-0 left-[1.1rem] top-2 w-[3px] origin-top rounded-full bg-gradient-to-b from-vivo-lavanda to-vivo-rosa"
          />

          <ol className="grid gap-16">
            {formacion.map((item) => (
              <li key={item.periodo} className="relative pl-16">
                <span
                  aria-hidden="true"
                  className="absolute left-0 top-1 grid size-9 place-items-center rounded-full border border-borde bg-fondo shadow-suave"
                >
                  <span className="size-3 rounded-full bg-vivo-rosa" />
                  {item.estado && !reducir && (
                    <motion.span
                      className="absolute size-9 rounded-full border border-vivo-rosa"
                      animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                    />
                  )}
                </span>

                <ScrollReveal desde={56}>
                  <p className="font-titulo text-[clamp(2rem,4vw,3.25rem)] font-medium leading-none tracking-tight text-enlace">
                    {item.periodo}
                  </p>
                  <div className="mt-5 rounded-3xl border border-borde bg-superficie p-6 shadow-suave">
                    <h3 className="text-xl font-medium leading-snug text-tinta">{item.titulo}</h3>
                    <p className="mt-2 flex flex-wrap items-center gap-3 text-tinta-suave">
                      {item.institucion}
                      {item.estado && (
                        <span className="rounded-full bg-acento px-3 py-1 text-xs font-semibold text-sobre-acento">
                          {item.estado}
                        </span>
                      )}
                    </p>
                  </div>
                </ScrollReveal>
              </li>
            ))}
          </ol>
        </div>

        <div className="mt-20">
          <ScrollReveal>
            <h3 className="text-2xl font-medium text-tinta">Cursos y certificaciones</h3>
            <ul className="mt-6 grid gap-4">
              {cursos.map((curso) => (
                <li
                  key={curso.titulo}
                  className="flex items-start gap-4 rounded-3xl border border-borde bg-destacado p-6 shadow-suave"
                >
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-vivo-rosa text-sobre-acento">
                    <FiAward size={24} aria-hidden="true" />
                  </span>
                  <div>
                    <span className="rounded-full bg-vivo-lavanda px-3 py-1 text-xs font-semibold text-sobre-acento">
                      Curso
                    </span>
                    <p className="mt-3 font-titulo text-xl leading-snug text-tinta">{curso.titulo}</p>
                  </div>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
        </div>
      </div>
    </section>
  );
}
