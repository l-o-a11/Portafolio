import type { IconType } from "react-icons";
import {
  FiBox,
  FiDatabase,
  FiGrid,
  FiPlayCircle,
  FiLayers,
  FiShuffle,
} from "react-icons/fi";
import {
  SiAxios,
  SiCss,
  SiDocker,
  SiDotnet,
  SiExpress,
  SiFlutter,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiNodedotjs,
  SiPostman,
  SiPython,
  SiReact,
  SiSwagger,
  SiTailwindcss,
  SiThreedotjs,
  SiVitest,
} from "react-icons/si";

export interface Tecnologia {
  nombre: string;
  descripcion: string;
  Icono: IconType;
}

export interface CategoriaHabilidad {
  id: string;
  titulo: string;
  /** Clases de color del recuadro del icono. */
  color: string;
  tecnologias: Tecnologia[];
}

/** Nivel general indicado por Laura para todas las tecnologías. */
export const nivelGeneral = "Básico superior, en aprendizaje constante";

export const categorias: CategoriaHabilidad[] = [
  {
    id: "lenguajes",
    titulo: "Lenguajes de programación",
    color: "bg-vivo-lavanda text-sobre-acento",
    tecnologias: [
      { nombre: "Python", descripcion: "Lenguaje versátil para automatización y análisis de datos.", Icono: SiPython },
      { nombre: "JavaScript", descripcion: "El lenguaje de la web, en el navegador y en el servidor.", Icono: SiJavascript },
      { nombre: "HTML", descripcion: "Estructura y semántica de las páginas web.", Icono: SiHtml5 },
      { nombre: "CSS", descripcion: "Estilos, diseño responsive y animaciones.", Icono: SiCss },
    ],
  },
  {
    id: "frontend",
    titulo: "Frontend",
    color: "bg-vivo-rosa text-sobre-acento",
    tecnologias: [
      { nombre: "React", descripcion: "Biblioteca para construir interfaces con componentes.", Icono: SiReact },
      { nombre: "Tailwind CSS", descripcion: "Framework de utilidades para diseñar con rapidez.", Icono: SiTailwindcss },
      { nombre: "React Icons", descripcion: "Colección de íconos lista para usar en React.", Icono: FiGrid },
      { nombre: "Three.js", descripcion: "Gráficos 3D en el navegador con WebGL.", Icono: SiThreedotjs },
      { nombre: "Axios", descripcion: "Cliente HTTP para consumir APIs.", Icono: SiAxios },
      { nombre: "Flutter", descripcion: "Framework para crear apps móviles multiplataforma.", Icono: SiFlutter },
    ],
  },
  {
    id: "backend",
    titulo: "Backend",
    color: "bg-vivo-menta text-sobre-acento",
    tecnologias: [
      { nombre: ".NET", descripcion: "Plataforma de Microsoft para aplicaciones y servicios.", Icono: SiDotnet },
      { nombre: "ASP.NET Core Web API", descripcion: "Servicios REST con .NET.", Icono: SiDotnet },
      { nombre: "AutoMapper", descripcion: "Mapeo entre entidades y DTOs.", Icono: FiShuffle },
      { nombre: "Swagger", descripcion: "Documentación interactiva de APIs.", Icono: SiSwagger },
      { nombre: "Node.js", descripcion: "JavaScript en el servidor.", Icono: SiNodedotjs },
      { nombre: "Express", descripcion: "Framework minimalista para crear APIs con Node.", Icono: SiExpress },
    ],
  },
  {
    id: "datos",
    titulo: "Bases de datos",
    color: "bg-vivo-teal text-sobre-acento",
    tecnologias: [
      { nombre: "SQL", descripcion: "Lenguaje para consultar bases de datos relacionales.", Icono: FiDatabase },
      { nombre: "MySQL", descripcion: "Base de datos relacional de código abierto.", Icono: SiMysql },
      { nombre: "MongoDB y Mongoose", descripcion: "Base de datos de documentos y su librería de modelado.", Icono: SiMongodb },
    ],
  },
  {
    id: "herramientas",
    titulo: "Herramientas y control de versiones",
    color: "bg-vivo-lavanda text-sobre-acento",
    tecnologias: [
      { nombre: "Git", descripcion: "Control de versiones distribuido.", Icono: SiGit },
      { nombre: "GitHub", descripcion: "Repositorios y colaboración en la nube.", Icono: SiGithub },
      { nombre: "Docker", descripcion: "Contenedores para empaquetar y ejecutar aplicaciones.", Icono: SiDocker },
      { nombre: "Vitest", descripcion: "Pruebas unitarias rápidas para proyectos Vite.", Icono: SiVitest },
      { nombre: "Playwright", descripcion: "Pruebas de extremo a extremo en navegadores reales.", Icono: FiPlayCircle },
      { nombre: "Postman", descripcion: "Pruebas y exploración de peticiones a APIs.", Icono: SiPostman },
    ],
  },
  {
    id: "arquitectura",
    titulo: "Arquitectura y metodologías",
    color: "bg-vivo-rosa text-sobre-acento",
    tecnologias: [
      { nombre: "Arquitectura modular", descripcion: "Código dividido en módulos independientes.", Icono: FiBox },
      { nombre: "Clean Architecture", descripcion: "Capas con las dependencias apuntando al dominio.", Icono: FiLayers },
    ],
  },
];
