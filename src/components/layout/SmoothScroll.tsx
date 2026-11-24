import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import Lenis from "lenis";

interface Props {
  /** Detiene el scroll (por ejemplo, durante la animación de entrada). */
  pausado: boolean;
}

/**
 * Scroll con inercia: la página se desliza con suavidad y las animaciones ligadas
 * al scroll avanzan sin saltos. Se desactiva si la persona prefiere menos movimiento.
 */
export function SmoothScroll({ pausado }: Props) {
  const lenis = useRef<Lenis | null>(null);
  const reducir = useReducedMotion();

  useEffect(() => {
    if (reducir) return;

    const instancia = new Lenis({ lerp: 0.09, wheelMultiplier: 0.95, smoothWheel: true });
    lenis.current = instancia;

    let raf = 0;
    const bucle = (tiempo: number) => {
      instancia.raf(tiempo);
      raf = requestAnimationFrame(bucle);
    };
    raf = requestAnimationFrame(bucle);

    // Los enlaces internos (#proyectos, #contacto…) también se deslizan con suavidad.
    const alHacerClic = (e: MouseEvent) => {
      const enlace = (e.target as Element | null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      if (!enlace) return;
      const id = enlace.getAttribute("href")!.slice(1);
      const destino = id ? document.getElementById(id) : null;
      if (!destino) return;
      e.preventDefault();
      instancia.scrollTo(destino, { offset: -72, duration: 1.5 });
      history.replaceState(null, "", `#${id}`);
    };
    document.addEventListener("click", alHacerClic);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", alHacerClic);
      instancia.destroy();
      lenis.current = null;
    };
  }, [reducir]);

  useEffect(() => {
    if (pausado) lenis.current?.stop();
    else lenis.current?.start();
  }, [pausado]);

  return null;
}
