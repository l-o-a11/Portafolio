/**
 * Datos del portafolio. Solo información proporcionada por Laura.
 * Cuando exista la API, estos datos se leerán del endpoint /api/perfil.
 */
export const sitio = {
  nombre: "Laura Ospina Acevedo",
  nombreCorto: "Laura Ospina",
  avatar: "Lu",
  titulo: "Desarrolladora Full Stack y analista de datos",
  ubicacion: "Bello, Colombia",
  presentacionCorta:
    "Me apasiona la automatización de procesos y aprender tecnologías nuevas. Construyo soluciones innovadoras que le simplifican el trabajo a las personas.",
  descripcion:
    "Soy Laura, desarrolladora Full Stack y analista de datos en formación, de Bello, Colombia. Me apasiona la automatización de procesos y aprender tecnologías nuevas. Soy confiable, diligente y amable, con liderazgo natural y capacidad de mediar en equipo. Busco construir soluciones innovadoras que le simplifiquen el trabajo a las personas.",
  correo: "ospina.lauraa@gmail.com",
  redes: {
    github: "https://github.com/l-o-a11",
    linkedin: "https://www.linkedin.com/in/laura-ospina-4750b0363/",
  },
  navegacion: [
    { id: "inicio", etiqueta: "Inicio" },
    { id: "sobre-mi", etiqueta: "Sobre mí" },
    { id: "habilidades", etiqueta: "Habilidades" },
    { id: "proyectos", etiqueta: "Proyectos" },
    { id: "formacion", etiqueta: "Formación" },
    { id: "contacto", etiqueta: "Contacto" },
  ],
} as const;
