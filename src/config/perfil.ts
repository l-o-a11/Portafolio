/** Datos personales y de formación. Solo información proporcionada por Laura. */
export const datosPersonales = [
  { etiqueta: "Ubicación", valor: "Bello, Colombia" },
  { etiqueta: "Idiomas", valor: "Español nativo · Inglés básico" },
  { etiqueta: "Enfoque", valor: "Automatización de procesos" },
  { etiqueta: "Personalidad", valor: "Confiable, atenta, diligente y amable" },
  { etiqueta: "Objetivo", valor: "Innovar y conocer nuevas tecnologías" },
  { etiqueta: "Fortalezas", valor: "Liderazgo natural, aprendizaje rápido y pensamiento innovador" },
] as const;

export const formacion = [
  {
    periodo: "2023 – 2024",
    titulo: "Técnico en desarrollo de software",
    institucion: "SENA",
    estado: null,
  },
  {
    periodo: "2025 – actualidad",
    titulo: "Tecnólogo en análisis y desarrollo de software",
    institucion: "SENA",
    estado: "En curso",
  },
] as const;

export const roles = ["Líder", "Vocera", "Mediadora"] as const;

/** Cursos complementarios. Se agregan fecha e institución cuando Laura las confirme. */
export const cursos = [
  { titulo: "Inteligencia artificial generativa como catalizador de la productividad" },
] as const;
