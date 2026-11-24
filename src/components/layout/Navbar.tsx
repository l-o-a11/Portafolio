import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { sitio } from "../../config/site";
import { useActiveSection } from "../../hooks/useActiveSection";
import { useTheme } from "../../hooks/useTheme";
import { ThemeToggle } from "../ui/ThemeToggle";

const IDS = sitio.navegacion.map((n) => n.id);

export function Navbar() {
  const activa = useActiveSection(IDS);
  const { tema, alternar } = useTheme();
  const [abierto, setAbierto] = useState(false);

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav
        aria-label="Navegación principal"
        className="relative flex w-full max-w-4xl items-center justify-between gap-2 rounded-full border border-borde bg-fondo/85 px-3 py-2 shadow-suave backdrop-blur-md"
      >
        <a
          href="#inicio"
          className="px-3 font-titulo text-lg font-semibold tracking-tight text-tinta"
        >
          {sitio.nombreCorto}
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {sitio.navegacion.map(({ id, etiqueta }) => {
            const esActiva = activa === id;
            return (
              <li key={id}>
                <a
                  href={`#${id}`}
                  aria-current={esActiva ? "true" : undefined}
                  className={`relative block rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    esActiva ? "text-sobre-acento" : "text-tinta-suave hover:text-tinta"
                  }`}
                >
                  {esActiva && (
                    <motion.span
                      layoutId="seccion-activa"
                      className="absolute inset-0 -z-10 rounded-full bg-acento"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {etiqueta}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-1">
          <ThemeToggle tema={tema} alternar={alternar} />
          <button
            type="button"
            onClick={() => setAbierto((v) => !v)}
            aria-expanded={abierto}
            aria-controls="menu-movil"
            aria-label={abierto ? "Cerrar menú" : "Abrir menú"}
            className="grid size-10 place-items-center rounded-full text-tinta transition-colors hover:bg-secundario md:hidden"
          >
            {abierto ? <FiX size={20} aria-hidden /> : <FiMenu size={20} aria-hidden />}
          </button>
        </div>

        <AnimatePresence>
          {abierto && (
            <motion.ul
              id="menu-movil"
              initial={{ opacity: 0, y: -8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-x-0 top-full mt-2 grid gap-1 rounded-3xl border border-borde bg-fondo p-3 shadow-suave md:hidden"
            >
              {sitio.navegacion.map(({ id, etiqueta }) => (
                <li key={id}>
                  <a
                    href={`#${id}`}
                    onClick={() => setAbierto(false)}
                    aria-current={activa === id ? "true" : undefined}
                    className={`block rounded-2xl px-4 py-3 text-base font-medium ${
                      activa === id
                        ? "bg-acento text-sobre-acento"
                        : "text-tinta hover:bg-secundario"
                    }`}
                  >
                    {etiqueta}
                  </a>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
