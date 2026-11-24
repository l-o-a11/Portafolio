interface Props {
  numero: string;
  texto: string;
}

/** Rótulo pequeño de cada sección: número + línea + nombre. */
export function Eyebrow({ numero, texto }: Props) {
  return (
    <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.22em] text-enlace">
      <span className="font-titulo text-base tracking-normal">{numero}</span>
      <span aria-hidden="true" className="h-px w-10 bg-enlace" />
      {texto}
    </p>
  );
}
