import { useRef } from "react";
import { motion, useReducedMotion, useTransform, type MotionValue } from "framer-motion";
import { useProgresoSuave } from "../../hooks/useProgresoSuave";

interface PalabraProps {
  progreso: MotionValue<number>;
  inicio: number;
  fin: number;
  children: string;
}

function Palabra({ progreso, inicio, fin, children }: PalabraProps) {
  const opacidad = useTransform(progreso, [inicio, fin], [0.14, 1]);
  return <motion.span style={{ opacity: opacidad }}>{children}</motion.span>;
}

interface Props {
  texto: string;
  className?: string;
}

/**
 * Cada palabra se ilumina según el avance del scroll (no por tiempo):
 * al subir de nuevo, el texto vuelve a apagarse.
 */
export function ScrollWords({ texto, className }: Props) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reducir = useReducedMotion();
  const progreso = useProgresoSuave(ref, ["start 0.82", "end 0.5"]);
  const palabras = texto.split(" ");
  const n = palabras.length;

  return (
    <p ref={ref} className={className}>
      <span className="sr-only">{texto}</span>
      <span aria-hidden="true">
        {palabras.map((palabra, i) => {
          const inicio = (i / n) * 0.9;
          const texto = i < n - 1 ? `${palabra} ` : palabra;
          return reducir ? (
            <span key={i}>{texto}</span>
          ) : (
            <Palabra key={i} progreso={progreso} inicio={inicio} fin={inicio + 0.1}>
              {texto}
            </Palabra>
          );
        })}
      </span>
    </p>
  );
}
