import { AnimatePresence, motion } from "framer-motion";
import { FiMoon, FiSun } from "react-icons/fi";
import type { Tema } from "../../hooks/useTheme";

interface Props {
  tema: Tema;
  alternar: () => void;
}

export function ThemeToggle({ tema, alternar }: Props) {
  const esOscuro = tema === "oscuro";
  return (
    <button
      type="button"
      onClick={alternar}
      aria-label={esOscuro ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      className="relative grid size-10 place-items-center rounded-full text-tinta transition-colors hover:bg-secundario"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={tema}
          initial={{ rotate: -80, opacity: 0, scale: 0.6 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 80, opacity: 0, scale: 0.6 }}
          transition={{ duration: 0.22 }}
          className="absolute"
        >
          {esOscuro ? <FiSun size={18} aria-hidden /> : <FiMoon size={18} aria-hidden />}
        </motion.span>
      </AnimatePresence>
    </button>
  );
}
