import type { RefObject } from "react";
import { useScroll, useSpring, type UseScrollOptions } from "framer-motion";

type Rango = NonNullable<UseScrollOptions["offset"]>;

/** Progreso de scroll de un elemento (0 a 1), suavizado con un resorte para que no haya tirones. */
export function useProgresoSuave(ref: RefObject<HTMLElement>, rango: Rango) {
  const { scrollYProgress } = useScroll({ target: ref, offset: rango });
  return useSpring(scrollYProgress, {
    stiffness: 170,
    damping: 28,
    mass: 0.35,
    restDelta: 0.0005,
  });
}
