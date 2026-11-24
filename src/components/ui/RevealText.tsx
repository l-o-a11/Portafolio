import { Fragment } from "react";
import { motion } from "framer-motion";

interface Props {
  texto: string;
  className?: string;
  /** Segundos de espera antes de la primera palabra. */
  retraso?: number;
  /** Cuando es false, las palabras esperan fuera de la vista. */
  iniciar?: boolean;
  /** Clases extra para cada palabra (por ejemplo, un degradado de color). */
  palabraClassName?: string;
}

/** Revela el texto palabra por palabra, subiendo desde una máscara (estilo editorial). */
export function RevealText({
  texto,
  className,
  retraso = 0,
  iniciar = true,
  palabraClassName = "",
}: Props) {
  const palabras = texto.split(" ");
  return (
    <span className={className}>
      <span className="sr-only">{texto}</span>
      <span aria-hidden="true">
        {palabras.map((palabra, i) => (
          <Fragment key={`${palabra}-${i}`}>
            <span
              className="inline-block overflow-hidden pb-[0.14em] align-bottom"
              style={{ marginBottom: "-0.14em" }}
            >
              <motion.span
                className={`inline-block ${palabraClassName}`}
                initial={{ y: "115%" }}
                animate={{ y: iniciar ? "0%" : "115%" }}
                transition={{
                  duration: 0.95,
                  ease: [0.22, 1, 0.36, 1],
                  delay: retraso + i * 0.09,
                }}
              >
                {palabra}
              </motion.span>
            </span>
            {i < palabras.length - 1 ? " " : null}
          </Fragment>
        ))}
      </span>
    </span>
  );
}
