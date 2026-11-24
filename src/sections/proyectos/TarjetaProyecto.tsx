import { FiArrowUpRight, FiExternalLink, FiGithub } from "react-icons/fi";
import type { Proyecto } from "../../config/proyectos";

interface Props {
  proyecto: Proyecto;
  onVerDetalle: () => void;
}

const enlaceSecundario =
  "inline-flex items-center gap-2 rounded-full border border-borde bg-superficie px-4 py-2 text-sm font-semibold text-tinta transition-colors duration-300 hover:bg-vivo-menta hover:text-sobre-acento";

export function TarjetaProyecto({ proyecto, onVerDetalle }: Props) {
  const { nombre, resumen, tecnologias, repos, demo, estado, modalidad, Icono, degradado } =
    proyecto;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-borde bg-fondo shadow-suave">
      {/* Portada ilustrada (sin capturas) */}
      <div className={`relative h-44 overflow-hidden bg-gradient-to-br ${degradado}`}>
        <span
          aria-hidden="true"
          className="absolute -right-8 -top-10 size-40 rounded-full bg-white/25 transition-transform duration-700 group-hover:scale-125"
        />
        <span
          aria-hidden="true"
          className="absolute -bottom-12 left-10 size-32 rounded-full bg-sobre-acento/15 transition-transform duration-700 group-hover:scale-125"
        />
        <Icono
          aria-hidden="true"
          size={72}
          className="absolute bottom-5 right-6 text-sobre-acento/85 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110"
        />
        <div className="absolute left-5 top-5 flex flex-wrap gap-2">
          <span className="rounded-full bg-fondo px-3 py-1 text-xs font-semibold text-tinta">
            {estado}
          </span>
          <span className="rounded-full bg-sobre-acento/80 px-3 py-1 text-xs font-semibold text-[#f6eee6]">
            {modalidad}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-2xl font-medium leading-tight text-tinta">{nombre}</h3>
        <p className="mt-3 leading-relaxed text-tinta-suave">{resumen}</p>

        <ul className="mt-5 flex flex-wrap gap-2" aria-label={`Tecnologías de ${nombre}`}>
          {tecnologias.map(({ nombre: tec, Icono: IconoTec }) => (
            <li
              key={tec}
              className="inline-flex items-center gap-1.5 rounded-full bg-superficie px-3 py-1.5 text-sm font-medium text-tinta"
            >
              <IconoTec size={15} aria-hidden="true" />
              {tec}
            </li>
          ))}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-3 pt-7">
          <button
            type="button"
            onClick={onVerDetalle}
            aria-label={`Ver detalles de ${nombre}`}
            className="group/boton inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-vivo-lavanda to-vivo-rosa px-5 py-2.5 text-sm font-semibold text-sobre-acento transition-transform duration-300 hover:-translate-y-0.5"
          >
            Ver detalles
            <FiArrowUpRight
              aria-hidden="true"
              className="transition-transform group-hover/boton:translate-x-0.5 group-hover/boton:-translate-y-0.5"
            />
          </button>
          {repos.map((repo) => (
            <a
              key={repo.url}
              href={repo.url}
              target="_blank"
              rel="noopener noreferrer"
              className={enlaceSecundario}
            >
              <FiGithub aria-hidden="true" />
              {repo.etiqueta}
              <span className="sr-only"> de {nombre} (se abre en una pestaña nueva)</span>
            </a>
          ))}
          {demo && (
            <a href={demo} target="_blank" rel="noopener noreferrer" className={enlaceSecundario}>
              <FiExternalLink aria-hidden="true" />
              Demo
              <span className="sr-only"> de {nombre} (se abre en una pestaña nueva)</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
