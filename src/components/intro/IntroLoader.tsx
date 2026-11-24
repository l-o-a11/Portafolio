import { useEffect, useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import { NOMBRE } from "./nombrePaths";

/* Línea de tiempo (ms). Se dibuja → se rellena → se sostiene → se desvanece. */
const DURACION_TRAZO = 2650;
const RELLENO_INICIO = 3100;
const RELLENO_DURACION = 700;
const DESVANECER_INICIO = 5000;
const TOTAL = 5600;

const FONDO = "#121729";
const TRAZO = "#fff1e6";
const RELLENO = ["#ff8fb0", "#8fa6ff"] as const; // línea 1 rosa vivo, línea 2 lavanda vivo

const ease = (v: number) => 0.5 - 0.5 * Math.cos(Math.PI * Math.min(1, Math.max(0, v)));

interface Props {
  onFinish: () => void;
}

export function IntroLoader({ onFinish }: Props) {
  const contornos = useRef<(SVGPathElement | null)[]>([]);
  const longitudes = useRef<number[]>([]);
  const grupoContorno = useRef<SVGGElement>(null);
  const grupoRelleno = useRef<SVGGElement>(null);
  const grupoTotal = useRef<SVGGElement>(null);
  const terminado = useRef(false);

  const finalizar = () => {
    if (terminado.current) return;
    terminado.current = true;
    onFinish();
  };

  // Mide cada contorno y lo deja "sin dibujar" antes del primer pintado.
  useLayoutEffect(() => {
    longitudes.current = contornos.current.map((p) => {
      if (!p) return 0;
      const largo = p.getTotalLength();
      p.style.strokeDasharray = `${largo} ${largo}`;
      p.style.strokeDashoffset = `${largo}`;
      return largo;
    });
  }, []);

  // Un solo bucle de animación con reloj propio (se detiene si la pestaña está oculta).
  useEffect(() => {
    let raf = 0;
    let ultimo = performance.now();
    let t = 0;

    const aplicar = (ms: number) => {
      NOMBRE.glifos.forEach((g, i) => {
        const p = contornos.current[i];
        if (!p) return;
        const avance = ease((ms - g.retraso) / DURACION_TRAZO);
        p.style.strokeDashoffset = `${longitudes.current[i] * (1 - avance)}`;
      });
      const relleno = ease((ms - RELLENO_INICIO) / RELLENO_DURACION);
      if (grupoRelleno.current) grupoRelleno.current.style.opacity = `${relleno}`;
      if (grupoContorno.current) grupoContorno.current.style.opacity = `${1 - relleno}`;
      if (grupoTotal.current) {
        grupoTotal.current.style.opacity = `${1 - ease((ms - DESVANECER_INICIO) / (TOTAL - DESVANECER_INICIO))}`;
      }
    };

    const cuadro = (ahora: number) => {
      const delta = Math.min(ahora - ultimo, 100);
      ultimo = ahora;
      if (!document.hidden) t += delta;
      aplicar(t);
      if (t >= TOTAL) {
        finalizar();
        return;
      }
      raf = requestAnimationFrame(cuadro);
    };

    raf = requestAnimationFrame(cuadro);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      role="status"
      aria-live="polite"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] grid place-items-center"
      style={{ backgroundColor: FONDO }}
    >
      <span className="sr-only">Cargando el portafolio de Laura Ospina</span>

      <svg
        viewBox={NOMBRE.viewBox}
        aria-hidden="true"
        focusable="false"
        style={{ width: "min(84vw, clamp(260px, 58vw, 620px))", height: "auto" }}
      >
        <g ref={grupoTotal}>
          <g ref={grupoRelleno} style={{ opacity: 0 }}>
            {NOMBRE.glifos.map((g, i) => (
              <path key={`r-${i}`} d={g.d} fill={RELLENO[g.linea]} />
            ))}
          </g>
          <g ref={grupoContorno}>
            {NOMBRE.glifos.map((g, i) => (
              <path
                key={`c-${i}`}
                ref={(el) => {
                  contornos.current[i] = el;
                }}
                d={g.d}
                fill="none"
                stroke={TRAZO}
                strokeWidth={NOMBRE.grosorTrazo}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}
          </g>
        </g>
      </svg>

      <button
        type="button"
        onClick={finalizar}
        className="absolute bottom-6 right-6 rounded-full border border-white/25 px-4 py-2 text-sm font-medium text-[#f4ece4] transition-colors hover:bg-white/10 focus-visible:outline-[#8fa6ff]"
      >
        Omitir
      </button>
    </motion.div>
  );
}
