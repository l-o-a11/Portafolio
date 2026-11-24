import { FiArrowUp, FiGithub, FiLinkedin, FiMail, FiMapPin } from "react-icons/fi";
import { ScrollMarquee } from "../components/scroll/ScrollMarquee";
import { formacion, datosPersonales } from "../config/perfil";
import { sitio } from "../config/site";

const redes = [
  { etiqueta: "GitHub", href: sitio.redes.github, Icono: FiGithub },
  { etiqueta: "LinkedIn", href: sitio.redes.linkedin, Icono: FiLinkedin },
  { etiqueta: "Correo", href: `mailto:${sitio.correo}`, Icono: FiMail },
];

const titulo = "text-xs font-semibold uppercase tracking-[0.2em] text-[#ff8fb0]";
const enlace =
  "text-[#bac3d9] transition-colors duration-300 hover:text-[#f6eee6] focus-visible:outline-[#a5b9ff]";

export function Footer() {
  const anio = new Date().getFullYear();
  const idiomas = datosPersonales.find((d) => d.etiqueta === "Idiomas")?.valor;
  const enfoque = datosPersonales.find((d) => d.etiqueta === "Enfoque")?.valor;
  const actual = formacion[formacion.length - 1];

  return (
    <footer className="relative overflow-hidden bg-[#121729] text-[#f6eee6]">
      <div aria-hidden="true" className="h-1 bg-gradient-to-r from-vivo-lavanda via-vivo-rosa to-vivo-menta" />

      <ScrollMarquee texto="Laura Ospina · Laura Ospina" className="pt-12" />

      <div className="mx-auto max-w-6xl px-6 pb-10 pt-12">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_0.8fr_1.2fr_1.2fr]">
          {/* Marca y redes */}
          <div>
            <p className="font-titulo text-3xl font-medium">{sitio.nombreCorto}</p>
            <p className="mt-2 text-[#bac3d9]">{sitio.titulo}</p>
            <p className="mt-4 max-w-sm leading-relaxed text-[#bac3d9]">{sitio.presentacionCorta}</p>
            <ul className="mt-6 flex items-center gap-3" aria-label="Redes profesionales">
              {redes.map(({ etiqueta, href, Icono }) => (
                <li key={etiqueta}>
                  <a
                    href={href}
                    aria-label={etiqueta}
                    {...(href.startsWith("http")
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="grid size-11 place-items-center rounded-full bg-[#1c2440] text-[#f6eee6] transition-all duration-300 hover:-translate-y-1 hover:bg-vivo-rosa hover:text-[#151a2b] focus-visible:outline-[#a5b9ff]"
                  >
                    <Icono size={19} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Navegación */}
          <nav aria-label="Navegación del pie de página">
            <p className={titulo}>Navegación</p>
            <ul className="mt-4 grid gap-3">
              {sitio.navegacion.map(({ id, etiqueta }) => (
                <li key={id}>
                  <a href={`#${id}`} className={enlace}>
                    {etiqueta}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contacto (también es el destino del enlace "Contacto") */}
          <div id="contacto" className="scroll-mt-24">
            <p className={titulo}>Contacto</p>
            <ul className="mt-4 grid gap-3">
              <li>
                <a href={`mailto:${sitio.correo}`} className={`${enlace} inline-flex items-center gap-2 break-all`}>
                  <FiMail aria-hidden="true" className="shrink-0" />
                  {sitio.correo}
                </a>
              </li>
              <li className="inline-flex items-center gap-2 text-[#bac3d9]">
                <FiMapPin aria-hidden="true" className="shrink-0" />
                {sitio.ubicacion}
              </li>
              <li>
                <a href={sitio.redes.github} target="_blank" rel="noopener noreferrer" className={`${enlace} inline-flex items-center gap-2`}>
                  <FiGithub aria-hidden="true" />
                  l-o-a11
                  <span className="sr-only"> en GitHub (se abre en una pestaña nueva)</span>
                </a>
              </li>
              <li>
                <a href={sitio.redes.linkedin} target="_blank" rel="noopener noreferrer" className={`${enlace} inline-flex items-center gap-2`}>
                  <FiLinkedin aria-hidden="true" />
                  Laura Ospina
                  <span className="sr-only"> en LinkedIn (se abre en una pestaña nueva)</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Resumen */}
          <div>
            <p className={titulo}>En resumen</p>
            <dl className="mt-4 grid gap-4">
              <div>
                <dt className="text-sm text-[#8d98b3]">Formación</dt>
                <dd className="mt-1 text-[#f6eee6]">
                  {actual.titulo} · {actual.institucion}
                </dd>
              </div>
              {enfoque && (
                <div>
                  <dt className="text-sm text-[#8d98b3]">Enfoque</dt>
                  <dd className="mt-1 text-[#f6eee6]">{enfoque}</dd>
                </div>
              )}
              {idiomas && (
                <div>
                  <dt className="text-sm text-[#8d98b3]">Idiomas</dt>
                  <dd className="mt-1 text-[#f6eee6]">{idiomas}</dd>
                </div>
              )}
            </dl>
          </div>
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
          <p className="text-sm text-[#bac3d9]">
            © {anio} {sitio.nombre}. Todos los derechos reservados.
          </p>
          <a
            href="#inicio"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-[#f6eee6] transition-colors duration-300 hover:bg-vivo-lavanda hover:text-[#151a2b] focus-visible:outline-[#a5b9ff]"
          >
            Volver arriba
            <FiArrowUp aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
