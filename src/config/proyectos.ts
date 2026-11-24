import type { IconType } from "react-icons";
import { FiBox, FiCoffee, FiCreditCard, FiPercent } from "react-icons/fi";
import {
  SiCss,
  SiDotnet,
  SiExpress,
  SiFlutter,
  SiHtml5,
  SiJavascript,
  SiMongodb,
  SiNodedotjs,
  SiPostman,
  SiReact,
} from "react-icons/si";

export type Categoria = "Web" | "Móvil" | "API";
export const filtros = ["Todos", "Web", "Móvil", "API"] as const;
export type Filtro = (typeof filtros)[number];

export interface TecnologiaProyecto {
  nombre: string;
  Icono: IconType;
}

export interface EnlaceProyecto {
  etiqueta: string;
  url: string;
}

export interface Proyecto {
  id: string;
  nombre: string;
  categorias: Categoria[];
  resumen: string;
  resuelve: string;
  funcionalidades: string[];
  participacion: string;
  tecnologias: TecnologiaProyecto[];
  estado: string;
  modalidad: "En equipo" | "Individual";
  repos: EnlaceProyecto[];
  demo?: string;
  Icono: IconType;
  /** Degradado de la portada (clases de Tailwind). */
  degradado: string;
}

const GITHUB = "https://github.com/l-o-a11";

/** Proyectos de Laura. Solo datos proporcionados por ella. */
export const proyectos: Proyecto[] = [
  {
    id: "unistock",
    nombre: "UniStock",
    categorias: ["Web", "Móvil", "API"],
    resumen:
      "Sistema de gestión de inventario para una empresa de venta de ropa, que también cubre producción y compras. Tiene versión web y versión móvil.",
    resuelve:
      "El manejo del inventario de una empresa de venta de ropa, junto con su producción y sus compras.",
    funcionalidades: [
      "Registro de productos",
      "Control de stock",
      "Órdenes de producción",
      "Órdenes de compra",
      "Reportes",
    ],
    participacion:
      "Trabajo en equipo. Estuve a cargo de los módulos de producción, dashboard, terceros y proveedores, tanto en la versión web como en la móvil.",
    tecnologias: [
      { nombre: "React", Icono: SiReact },
      { nombre: "Flutter", Icono: SiFlutter },
      { nombre: "ASP.NET Core", Icono: SiDotnet },
      { nombre: "Node.js", Icono: SiNodedotjs },
      { nombre: "MongoDB", Icono: SiMongodb },
    ],
    estado: "Desplegado",
    modalidad: "En equipo",
    repos: [
      { etiqueta: "Repo web", url: `${GITHUB}/Unistock` },
      { etiqueta: "Repo móvil", url: `${GITHUB}/Movil_Unistock` },
    ],
    demo: "https://unistock-omega.vercel.app/",
    Icono: FiBox,
    degradado: "from-vivo-lavanda to-vivo-rosa",
  },
  {
    id: "api-descuentos",
    nombre: "api_descuentos",
    categorias: ["API"],
    resumen: "API de práctica que calcula descuentos para una tienda.",
    resuelve:
      "Práctica de construcción de APIs aplicada a un caso de tienda: calcular descuentos.",
    funcionalidades: ["Descuentos por porcentaje", "Descuentos por persona"],
    participacion: "Proyecto individual: lo desarrollé por completo.",
    tecnologias: [
      { nombre: "Express", Icono: SiExpress },
      { nombre: "JavaScript", Icono: SiJavascript },
    ],
    estado: "Terminado",
    modalidad: "Individual",
    repos: [{ etiqueta: "Repositorio", url: `${GITHUB}/api_descuentos` }],
    Icono: FiPercent,
    degradado: "from-vivo-menta to-vivo-lavanda",
  },
  {
    id: "cuenta-bancaria",
    nombre: "CuentaBancaria",
    categorias: ["API"],
    resumen:
      "Práctica de pruebas de peticiones y manejo de APIs con un caso realista de cuenta bancaria.",
    resuelve:
      "Practicar el envío de peticiones y el manejo de APIs con un caso que podría pasar en la vida real.",
    funcionalidades: [
      "Consultar usuario",
      "Consultar saldo",
      "Transferir",
      "Manejo de errores",
    ],
    participacion: "Proyecto individual: lo desarrollé y probé por completo.",
    tecnologias: [
      { nombre: "Express", Icono: SiExpress },
      { nombre: "JavaScript", Icono: SiJavascript },
      { nombre: "Postman", Icono: SiPostman },
    ],
    estado: "Terminado",
    modalidad: "Individual",
    repos: [{ etiqueta: "Repositorio", url: `${GITHUB}/CuentaBancaria` }],
    Icono: FiCreditCard,
    degradado: "from-vivo-teal to-vivo-lavanda",
  },
  {
    id: "sabores-globales",
    nombre: "Sabores Globales",
    categorias: ["Web"],
    resumen: "Sitio web de un restaurante, hecho para practicar HTML.",
    resuelve: "Práctica de conocimientos de HTML con el sitio de un restaurante.",
    funcionalidades: ["Menú", "Contacto"],
    participacion: "Proyecto individual: lo desarrollé por completo.",
    tecnologias: [
      { nombre: "HTML", Icono: SiHtml5 },
      { nombre: "CSS", Icono: SiCss },
      { nombre: "JavaScript", Icono: SiJavascript },
    ],
    estado: "Desplegado",
    modalidad: "Individual",
    repos: [{ etiqueta: "Repositorio", url: `${GITHUB}/Sabores_globales` }],
    demo: "https://l-o-a11.github.io/Sabores_globales/",
    Icono: FiCoffee,
    degradado: "from-vivo-rosa to-vivo-menta",
  },
];
