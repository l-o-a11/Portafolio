import { useEffect, useState } from "react";
import { AnimatePresence, MotionConfig } from "framer-motion";
import { IntroLoader } from "./components/intro/IntroLoader";
import { Navbar } from "./components/layout/Navbar";
import { SmoothScroll } from "./components/layout/SmoothScroll";
import { Footer } from "./sections/Footer";
import { Formacion } from "./sections/Formacion";
import { Habilidades } from "./sections/Habilidades";
import { Hero } from "./sections/Hero";
import { Proyectos } from "./sections/Proyectos";
import { SobreMi } from "./sections/SobreMi";

const CLAVE_INTRO = "intro-visto";

function debeMostrarIntro(): boolean {
  // Quien prefiere menos movimiento no ve la animación de entrada.
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  try {
    return sessionStorage.getItem(CLAVE_INTRO) !== "1";
  } catch {
    return true;
  }
}

export default function App() {
  const [intro, setIntro] = useState(debeMostrarIntro);

  // Mientras corre la animación de entrada, la página no se desplaza.
  useEffect(() => {
    document.documentElement.style.overflow = intro ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [intro]);

  const terminarIntro = () => {
    try {
      sessionStorage.setItem(CLAVE_INTRO, "1");
    } catch {
      /* sin acceso a sessionStorage */
    }
    setIntro(false);
  };

  return (
    // "user" respeta prefers-reduced-motion en todas las animaciones de transformación.
    <MotionConfig reducedMotion="user">
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[110] focus:rounded-full focus:bg-acento focus:px-5 focus:py-2.5 focus:font-semibold focus:text-sobre-acento"
      >
        Saltar al contenido
      </a>

      <SmoothScroll pausado={intro} />
      <Navbar />

      <main id="contenido">
        <Hero iniciar={!intro} />
        <SobreMi />
        <Habilidades />
        <Proyectos />
        <Formacion />
      </main>

      <Footer />

      <AnimatePresence>
        {intro && <IntroLoader key="intro" onFinish={terminarIntro} />}
      </AnimatePresence>
    </MotionConfig>
  );
}
