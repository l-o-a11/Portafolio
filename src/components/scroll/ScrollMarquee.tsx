import { useRef } from "react";
import { motion, useReducedMotion, useTransform } from "framer-motion";
import { useProgresoSuave } from "../../hooks/useProgresoSuave";

interface Props {
  texto: string;
  className?: string;
}

/** Palabra gigante que se desliza lateralmente mientras la sección cruza la pantalla. */
export function ScrollMarquee({ texto, className }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reducir = useReducedMotion();
  const progreso = useProgresoSuave(ref, ["start end", "end start"]);
  const x = useTransform(progreso, [0, 1], reducir ? ["0%", "0%"] : ["14%", "-34%"]);

  return (
    <div ref={ref} aria-hidden="true" className={`overflow-hidden ${className ?? ""}`}>
      <motion.div
        style={{ x, willChange: "transform" }}
        className="whitespace-nowrap font-titulo text-[clamp(5rem,19vw,17rem)] font-semibold leading-[0.95] tracking-tight text-vivo-lavanda/30"
      >
        {texto}
      </motion.div>
    </div>
  );
}
