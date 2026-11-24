import { useCallback, useEffect, useState } from "react";

export type Tema = "claro" | "oscuro";
const CLAVE = "tema";

function temaInicial(): Tema {
  return document.documentElement.classList.contains("dark") ? "oscuro" : "claro";
}

/** Maneja el modo claro/oscuro: respeta la preferencia del sistema hasta que la persona elija. */
export function useTheme() {
  const [tema, setTema] = useState<Tema>(temaInicial);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", tema === "oscuro");
  }, [tema]);

  useEffect(() => {
    const consulta = window.matchMedia("(prefers-color-scheme: dark)");
    const alCambiar = (e: MediaQueryListEvent) => {
      try {
        if (!localStorage.getItem(CLAVE)) setTema(e.matches ? "oscuro" : "claro");
      } catch {
        /* sin acceso a localStorage */
      }
    };
    consulta.addEventListener("change", alCambiar);
    return () => consulta.removeEventListener("change", alCambiar);
  }, []);

  const alternar = useCallback(() => {
    const siguiente: Tema = tema === "oscuro" ? "claro" : "oscuro";
    try {
      localStorage.setItem(CLAVE, siguiente);
    } catch {
      /* sin acceso a localStorage */
    }
    setTema(siguiente);
  }, [tema]);

  return { tema, alternar };
}
