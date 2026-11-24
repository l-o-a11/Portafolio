import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useTransform, type UseScrollOptions } from "framer-motion";
import { useProgresoSuave } from "../../hooks/useProgresoSuave";

type Rango = NonNullable<UseScrollOptions["offset"]>;

interface Props {
  children: ReactNode;
  className?: string;
  /** Píxeles que sube mientras aparece. */
  desde?: number;
  /** Cuándo empieza y termina el efecto, respecto a la pantalla. */
  rango?: Rango;
}

/** El bloque aparece y sube en proporción al scroll: avanza y retrocede con la rueda. */
export function ScrollReveal({
  children,
  className,
  desde = 56,
  rango = ["start 0.96", "start 0.66"],
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reducir = useReducedMotion();
  const progreso = useProgresoSuave(ref, rango);
  const opacity = useTransform(progreso, [0, 1], [0, 1]);
  const y = useTransform(progreso, [0, 1], [desde, 0]);

  if (reducir) return <div className={className}>{children}</div>;

  return (
    <motion.div
      ref={ref}
      style={{ opacity, y, willChange: "transform, opacity" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
