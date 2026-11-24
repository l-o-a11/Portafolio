import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FiExternalLink, FiGithub, FiX } from "react-icons/fi";
import type { Proyecto } from "../../config/proyectos";

interface Props {
  proyecto: Proyecto;
  onCerrar: () => void;
}

const FOCUSABLES = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/** Ventana de detalle: accesible (Esc, foco atrapado y devuelto) y sin scroll de fondo. */
export function DetalleProyecto({ proyecto, onCerrar }: Props) {
  const dialogo = useRef<HTMLDivElement>(null);
  const botonCerrar = useRef<HTMLButtonElement>(null);
  const idTitulo = `titulo-${proyecto.id}`;
  const {
    nombre,
    resuelve,
    funcionalidades,
    participacion,
    tecnologias,
    estado,
    modalidad,
    repos,
    demo,
    Icono,
    degradado,
  } = proyecto;

  useEffect(() => {
    const anterior = document.activeElement as HTMLElement | null;
    botonCerrar.current?.focus();
    document.documentElement.style.overflow = "hidden";

    const alPulsar = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onCerrar();
        return;
      }
      if (e.key !== "Tab" || !dialogo.current) return;
      const items = Array.from(dialogo.current.querySelectorAll<HTMLElement>(FOCUSABLES));
      if (items.length === 0) return;
      const primero = items[0];
      const ultimo = items[items.length - 1];
      if (e.shiftKey && document.activeElement === primero) {
        e.preventDefault();
        ultimo.focus();
      } else if (!e.shiftKey && document.activeElement === ultimo) {
        e.preventDefault();
        primero.focus();
      }
    };
    document.addEventListener("keydown", alPulsar);

    return () => {
      document.removeEventListener("keydown", alPulsar);
      document.documentElement.style.overflow = "";
      anterior?.focus();
    };
  }, [onCerrar]);

  return (
    <motion.div
      data-lenis-prevent=""
      className="fixed inset-0 z-[90] grid place-items-center p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onCerrar}
    >
      <div aria-hidden="true" className="absolute inset-0 bg-[#121729]/75" />

      <motion.div
        ref={dialogo}
        role="dialog"
        aria-modal="true"
        aria-labelledby={idTitulo}
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: 48, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 32, scale: 0.98 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-h-[88svh] w-full max-w-3xl overflow-y-auto overscroll-contain rounded-[2rem] border border-borde bg-fondo shadow-suave"
      >
        <div className={`relative overflow-hidden bg-gradient-to-br ${degradado} px-8 pb-8 pt-10`}>
          <span aria-hidden="true" className="absolute -right-10 -top-12 size-48 rounded-full bg-white/25" />
          <Icono
            aria-hidden="true"
            size={84}
            className="absolute bottom-4 right-8 text-sobre-acento/80"
          />
          <button
            ref={botonCerrar}
            type="button"
            onClick={onCerrar}
            aria-label="Cerrar detalle del proyecto"
            className="absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-fondo text-tinta transition-transform hover:scale-105"
          >
            <FiX size={20} aria-hidden="true" />
          </button>
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-fondo px-3 py-1 text-xs font-semibold text-tinta">
              {estado}
            </span>
            <span className="rounded-full bg-sobre-acento/80 px-3 py-1 text-xs font-semibold text-[#f6eee6]">
              {modalidad}
            </span>
          </div>
          <h3
            id={idTitulo}
            className="mt-4 text-4xl font-medium leading-tight text-sobre-acento sm:text-5xl"
          >
            {nombre}
          </h3>
        </div>

        <div className="grid gap-8 p-8">
          <section>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-enlace">
              Qué resuelve
            </h4>
            <p className="mt-3 text-lg leading-relaxed text-tinta">{resuelve}</p>
          </section>

          <section>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-enlace">
              Funcionalidades principales
            </h4>
            <ul className="mt-3 flex flex-wrap gap-2">
              {funcionalidades.map((f) => (
                <li
                  key={f}
                  className="rounded-full bg-destacado px-4 py-2 text-sm font-medium text-tinta"
                >
                  {f}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-enlace">
              Mi participación
            </h4>
            <p className="mt-3 text-lg leading-relaxed text-tinta">{participacion}</p>
          </section>

          <section>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-enlace">
              Tecnologías
            </h4>
            <ul className="mt-3 flex flex-wrap gap-2">
              {tecnologias.map(({ nombre: tec, Icono: IconoTec }) => (
                <li
                  key={tec}
                  className="inline-flex items-center gap-2 rounded-full bg-superficie px-4 py-2 text-sm font-medium text-tinta"
                >
                  <IconoTec size={16} aria-hidden="true" />
                  {tec}
                </li>
              ))}
            </ul>
          </section>

          <div className="flex flex-wrap gap-3 border-t border-borde pt-6">
            {demo && (
              <a
                href={demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-vivo-lavanda to-vivo-rosa px-6 py-3 font-semibold text-sobre-acento transition-transform hover:-translate-y-0.5"
              >
                <FiExternalLink aria-hidden="true" />
                Ver demostración
              </a>
            )}
            {repos.map((repo) => (
              <a
                key={repo.url}
                href={repo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border-2 border-vivo-lavanda px-6 py-2.5 font-semibold text-tinta transition-colors hover:bg-vivo-lavanda hover:text-sobre-acento"
              >
                <FiGithub aria-hidden="true" />
                {repo.etiqueta}
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
