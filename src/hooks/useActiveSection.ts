import { useEffect, useState } from "react";

/** Devuelve el id de la sección visible, para marcarla en el menú. */
export function useActiveSection(ids: readonly string[]) {
  const [activa, setActiva] = useState<string>(ids[0] ?? "");

  useEffect(() => {
    const elementos = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elementos.length === 0) return;

    const observador = new IntersectionObserver(
      (entradas) => {
        const visibles = entradas
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visibles[0]) setActiva(visibles[0].target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    elementos.forEach((el) => observador.observe(el));
    return () => observador.disconnect();
  }, [ids]);

  return activa;
}
