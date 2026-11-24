/** Composición de formas de color: se ve mientras carga el 3D o si no hay WebGL / movimiento reducido. */
export function FormasEstaticas() {
  return (
    <div aria-hidden="true" className="absolute inset-0">
      <div className="absolute left-[10%] top-[16%] size-[48%] rounded-full bg-gradient-to-br from-vivo-lavanda to-vivo-rosa" />
      <div className="absolute bottom-[10%] right-[8%] size-[34%] rounded-full bg-vivo-menta" />
      <div className="absolute right-[16%] top-[8%] size-[16%] rounded-full bg-vivo-rosa" />
      <div className="absolute bottom-[20%] left-[6%] size-[20%] rotate-12 rounded-3xl bg-vivo-teal" />
    </div>
  );
}
