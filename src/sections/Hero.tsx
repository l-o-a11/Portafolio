import { lazy, Suspense, useEffect, useRef, useState } from "react";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { FiArrowDownRight, FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { FormasEstaticas } from "../components/ui/FormasEstaticas";
import { RevealText } from "../components/ui/RevealText";
import { sitio } from "../config/site";
import { soportaWebGL } from "../utils/webgl";

// El 3D se descarga solo cuando hace falta.
const HeroScene = lazy(() => import("../components/three/HeroScene"));

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

interface Props {
  /** Se vuelve true cuando termina la animación de entrada. */
  iniciar: boolean;
}

const enlacesSociales = [
  { etiqueta: "GitHub de Laura", href: sitio.redes.github, Icono: FiGithub },
  { etiqueta: "LinkedIn de Laura", href: sitio.redes.linkedin, Icono: FiLinkedin },
  { etiqueta: "Escribir a Laura por correo", href: `mailto:${sitio.correo}`, Icono: FiMail },
];

export function Hero({ iniciar }: Props) {
  const seccion = useRef<HTMLElement>(null);
  const reducir = useReducedMotion();
  const visible = useInView(seccion);
  const [con3D, setCon3D] = useState(false);
  const [ligera, setLigera] = useState(false);

  useEffect(() => {
    setCon3D(!reducir && soportaWebGL());
    setLigera(window.matchMedia("(max-width: 767px)").matches);
  }, [reducir]);

  // Al bajar, el Hero se desvanece y se aleja: todo ligado al progreso del scroll.
  const { scrollYProgress } = useScroll({
    target: seccion,
    offset: ["start start", "end start"],
  });
  const progreso = useSpring(scrollYProgress, { stiffness: 170, damping: 28, mass: 0.35 });
  const yTexto = useTransform(progreso, [0, 1], [0, reducir ? 0 : -50]);
  const opacidadTexto = useTransform(progreso, [0, 0.65], [1, reducir ? 1 : 0]);
  const yEscena = useTransform(progreso, [0, 1], [0, reducir ? 0 : 80]);
  const escalaEscena = useTransform(progreso, [0, 1], [1, reducir ? 1 : 0.88]);

  const aparece = (retraso: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: iniciar ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    transition: { duration: 0.8, delay: retraso, ease: EASE },
  });

  return (
    <section
      id="inicio"
      ref={seccion}
      className="relative isolate min-h-svh overflow-hidden px-6 pb-16 pt-28 lg:pt-32"
    >
      {/* Luces de color: degradados estáticos (más ligeros que los desenfoques). */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(55% 55% at 85% 15%, rgb(255 125 160 / 0.30), transparent 70%), radial-gradient(50% 50% at 8% 85%, rgb(111 139 255 / 0.26), transparent 70%), radial-gradient(40% 40% at 55% 100%, rgb(53 211 160 / 0.22), transparent 70%)",
        }}
      />

      <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          style={{ y: yTexto, opacity: opacidadTexto, willChange: "transform, opacity" }}
          className="relative z-10"
        >
          <motion.div {...aparece(0)} className="flex flex-wrap items-center gap-3">
            {/* Lu: avatar pequeño y discreto */}
            <span className="grid size-14 shrink-0 place-items-center rounded-full bg-gradient-to-br from-vivo-lavanda to-vivo-rosa p-[3px] shadow-suave">
              <span className="block size-full overflow-hidden rounded-full bg-acento">
                <img
                  src="/images/lu-cara-192.webp"
                  srcSet="/images/lu-cara-192.webp 192w, /images/lu-cara-384.webp 384w"
                  sizes="56px"
                  width={192}
                  height={192}
                  alt={`${sitio.avatar}, el avatar de ${sitio.nombreCorto}`}
                  decoding="async"
                  className="size-full object-cover"
                />
              </span>
            </span>
            <span className="inline-flex items-center gap-2 rounded-full border border-borde bg-destacado px-4 py-1.5 text-sm font-medium text-tinta">
              <span className="size-2 rounded-full bg-vivo-rosa" aria-hidden="true" />
              Portafolio · {sitio.ubicacion}
            </span>
          </motion.div>

          <h1 className="mt-6 text-[clamp(3.25rem,10vw,8rem)] font-medium leading-[0.92] tracking-tight text-tinta">
            <RevealText texto="Hola, soy" iniciar={iniciar} retraso={0.1} className="block" />
            <RevealText
              texto="Laura."
              iniciar={iniciar}
              retraso={0.35}
              className="block"
              palabraClassName="bg-gradient-to-r from-vivo-lavanda to-vivo-rosa bg-clip-text text-transparent"
            />
          </h1>

          <motion.p {...aparece(0.7)} className="mt-8 font-titulo text-xl text-tinta md:text-2xl">
            {sitio.titulo}
          </motion.p>

          <motion.p
            {...aparece(0.85)}
            className="mt-4 max-w-xl text-lg leading-relaxed text-tinta-suave"
          >
            {sitio.presentacionCorta}
          </motion.p>

          <motion.div {...aparece(1)} className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#proyectos"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-vivo-lavanda to-vivo-rosa px-7 py-3.5 font-semibold text-sobre-acento shadow-suave transition-transform duration-300 hover:-translate-y-0.5"
            >
              Ver proyectos
              <FiArrowDownRight
                aria-hidden="true"
                className="transition-transform group-hover:translate-x-0.5 group-hover:translate-y-0.5"
              />
            </a>
            <a
              href="#contacto"
              className="inline-flex items-center rounded-full border-2 border-vivo-lavanda bg-transparent px-7 py-3 font-semibold text-tinta transition-colors duration-300 hover:bg-vivo-lavanda hover:text-sobre-acento"
            >
              Escríbeme
            </a>
          </motion.div>

          <motion.ul {...aparece(1.15)} className="mt-8 flex items-center gap-3">
            {enlacesSociales.map(({ etiqueta, href, Icono }) => (
              <li key={etiqueta}>
                <a
                  href={href}
                  aria-label={etiqueta}
                  {...(href.startsWith("http")
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="grid size-11 place-items-center rounded-full bg-superficie text-tinta transition-all duration-300 hover:-translate-y-1 hover:bg-vivo-menta hover:text-sobre-acento"
                >
                  <Icono size={19} aria-hidden="true" />
                </a>
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Protagonista visual: formas 3D de colores vivos */}
        <motion.div
          style={{ y: yEscena, scale: escalaEscena, willChange: "transform" }}
          className="relative mx-auto aspect-square w-full max-w-md sm:max-w-lg lg:max-w-xl"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={iniciar ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
            transition={{ duration: 1.1, delay: 0.3, ease: EASE }}
            className="absolute inset-0"
          >
            {con3D ? (
              <div aria-hidden="true" className="absolute inset-0">
                <Suspense fallback={<FormasEstaticas />}>
                  <HeroScene visible={visible} ligera={ligera} />
                </Suspense>
              </div>
            ) : (
              <FormasEstaticas />
            )}
          </motion.div>
        </motion.div>
      </div>

      <div
        aria-hidden="true"
        className="absolute bottom-6 left-6 hidden items-center gap-3 text-xs font-medium uppercase tracking-[0.2em] text-tinta-suave lg:flex"
      >
        <span className="relative h-10 w-px overflow-hidden bg-borde">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-vivo-rosa"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
        Desplázate
      </div>
    </section>
  );
}
