import { useEffect, useMemo, useState } from "react";
import { useCollection } from "./data";

export const GITHUB_USER = "RubenColladoDiaz";

// Repos que no se muestran: el de perfil, esta misma web y los que ya
// están en Firestore con su enlace de GitLab.
const SKIP = new Set([
  GITHUB_USER,
  "Personal-Portfolio",
  "KingOfTokyo-C-EntityFramework", // King of Tokyo
  "JS-Memory-Game", // Juego Memory
  "Unity-2D-Perlin-Noise-Map-Generator", // Perling 2D
  "Laravel-Teacher-Management", // Administrador de Instituto
  "Delivery-Manager", // Albarans Manager
]);

// Textos escritos a mano para los repos que no tienen descripción en GitHub.
// Si un repo nuevo no está aquí, se usa lo que diga GitHub.
const CURATED = {
  "Nexora-JavaSpring": {
    year: 2026,
    title_es: "Nexora API",
    title_en: "Nexora API",
    description_es:
      "API REST de comercio electrónico con Spring Boot: productos, categorías, pedidos y usuarios, con autenticación JWT, roles y gestión centralizada de errores.",
    description_en:
      "E-commerce REST API built with Spring Boot: products, categories, orders and users, with JWT authentication, roles and centralised error handling.",
    technologies: ["Java", "Spring Boot", "Spring Security", "JPA", "JWT", "Maven"],
  },
  "FCC.Management": {
    year: 2026,
    title_es: "FCC Management",
    title_en: "FCC Management",
    description_es:
      "Sistema de gestión de incidencias en .NET: una API REST organizada en capas (repositorios, servicios, DTOs) y un cliente de escritorio en Windows Forms para crear, priorizar y seguir incidencias.",
    description_en:
      "Incident management system in .NET: a layered REST API (repositories, services, DTOs) and a Windows Forms desktop client to create, prioritise and track incidents.",
    technologies: ["C#", "ASP.NET Core", "Entity Framework", "Windows Forms"],
  },
  YiiTaskManager: {
    year: 2026,
    title_es: "Task Manager (Yii 2)",
    title_en: "Task Manager (Yii 2)",
    description_es:
      "Gestor de tareas con Yii 2: crear, editar, buscar y priorizar tareas, agruparlas por categorías y controlar estados y fechas de vencimiento.",
    description_en:
      "Task manager built with Yii 2: create, edit, search and prioritise tasks, group them by category and track statuses and due dates.",
    technologies: ["PHP", "Yii 2", "MySQL", "Bootstrap", "Codeception"],
  },
  DevConnect: {
    year: 2026,
    title_es: "DevConnect",
    title_en: "DevConnect",
    description_es:
      "Red social para desarrolladores: publicaciones con código, preguntas y respuestas al estilo StackOverflow y perfiles técnicos, con autenticación JWT y refresh tokens.",
    description_en:
      "A social network for developers: posts with code, StackOverflow-style questions and answers and technical profiles, with JWT authentication and refresh tokens.",
    technologies: ["Angular", "Node.js", "TypeScript", "MySQL", "MongoDB", "JWT"],
  },
  SkillMap: {
    year: 2026,
    title_es: "SkillMap",
    title_en: "SkillMap",
    description_es:
      "Aplicación para diseñar rutas de aprendizaje: cada roadmap es un lienzo de nodos editables con su progreso, con inicio de sesión y datos en Supabase.",
    description_en:
      "An app for designing learning paths: each roadmap is a canvas of editable nodes with its own progress, with sign-in and data stored in Supabase.",
    technologies: ["Next.js", "React", "TypeScript", "Supabase"],
  },
  "Raul-Collado-Portfolio": {
    year: 2026,
    title_es: "Portfolio de Raúl Collado",
    title_en: "Raúl Collado's portfolio",
    description_es:
      "Portfolio profesional multipágina y bilingüe (ES/EN) para Raúl Collado, con un sistema de diseño propio y transiciones animadas.",
    description_en:
      "Multi-page, bilingual (ES/EN) professional portfolio for Raúl Collado, with a custom design system and animated transitions.",
    technologies: ["React", "TypeScript", "Vite", "Tailwind CSS", "Framer Motion"],
  },
  "Maria-Gatell-Portfolio": {
    year: 2026,
    title_es: "Portfolio de María Gatell",
    title_en: "María Gatell's portfolio",
    description_es:
      "Portfolio multipágina para María Gatell con selector de idioma, transiciones entre páginas y visualizaciones propias de su trayectoria.",
    description_en:
      "Multi-page portfolio for María Gatell with a language switch, page transitions and custom visualisations of her career.",
    technologies: ["React", "TypeScript", "Vite", "Tailwind CSS"],
  },
  "AI-FirstNeuralNetwork": {
    year: 2025,
    title_es: "Mi primera red neuronal",
    title_en: "My first neural network",
    description_es:
      "Una red neuronal sencilla que aprende a convertir grados Celsius a Fahrenheit a partir de unos pocos ejemplos, como primer paso en machine learning.",
    description_en:
      "A simple neural network that learns to convert Celsius to Fahrenheit from a handful of examples, as a first step into machine learning.",
    technologies: ["Python", "TensorFlow", "Keras", "NumPy", "Matplotlib"],
  },
  "Flutter-User-Manager-App": {
    year: 2025,
    title_es: "Personajes de Harry Potter",
    title_en: "Harry Potter characters",
    description_es:
      "App en Flutter para gestionar personajes de Harry Potter: listado, ficha de detalle, alta de nuevos personajes y valoraciones, conectada a Firebase.",
    description_en:
      "Flutter app to manage Harry Potter characters: list, detail view, adding new characters and ratings, backed by Firebase.",
    technologies: ["Flutter", "Dart", "Firebase"],
  },
};

const CACHE_KEY = `gh-repos-${GITHUB_USER}`;
const CACHE_MS = 60 * 60 * 1000;

const normalizeUrl = (url = "") =>
  url.trim().toLowerCase().replace(/\.git$/, "").replace(/\/+$/, "");

const prettify = (name) => name.replace(/[-_.]+/g, " ").replace(/\s+/g, " ").trim();

function toProject(repo) {
  const curated = CURATED[repo.name] || {};
  const title = prettify(repo.name);
  const description = repo.description || "";
  return {
    id: `gh-${repo.name}`,
    source: "github",
    year: curated.year || new Date(repo.created_at).getFullYear(),
    title_es: curated.title_es || title,
    title_en: curated.title_en || title,
    description_es: curated.description_es || description,
    description_en: curated.description_en || description,
    technologies:
      curated.technologies || [repo.language, ...(repo.topics || [])].filter(Boolean),
    link: repo.html_url,
    button_text_es: "Ver en GitHub",
    button_text_en: "View on GitHub",
  };
}

// Si la API no responde (límite de peticiones, sin conexión…), al menos
// se muestran los repos que ya conocemos.
const fallback = () =>
  Object.keys(CURATED).map((name) =>
    toProject({ name, html_url: `https://github.com/${GITHUB_USER}/${name}` }),
  );

async function fetchRepos() {
  try {
    const cached = JSON.parse(sessionStorage.getItem(CACHE_KEY) || "null");
    if (cached && Date.now() - cached.at < CACHE_MS) return cached.repos;
  } catch {
    /* sin sessionStorage */
  }
  const res = await fetch(
    `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=pushed`,
  );
  if (!res.ok) throw new Error(`GitHub ${res.status}`);
  const repos = (await res.json()).map((r) => ({
    name: r.name,
    description: r.description,
    language: r.language,
    topics: r.topics,
    fork: r.fork,
    archived: r.archived,
    created_at: r.created_at,
    html_url: r.html_url,
  }));
  try {
    sessionStorage.setItem(CACHE_KEY, JSON.stringify({ at: Date.now(), repos }));
  } catch {
    /* sin sessionStorage */
  }
  return repos;
}

function useGithubProjects() {
  const [projects, setProjects] = useState(null);

  useEffect(() => {
    let alive = true;
    fetchRepos()
      .then((repos) =>
        repos.filter((r) => !r.fork && !r.archived && !SKIP.has(r.name)).map(toProject),
      )
      .catch(fallback)
      .then((list) => alive && setProjects(list));
    return () => {
      alive = false;
    };
  }, []);

  return projects;
}

// Proyectos de Firestore + repos de GitHub que aún no estén en la lista.
export function useAllProjects() {
  const { status, data } = useCollection("projects");
  const github = useGithubProjects();

  const merged = useMemo(() => {
    if (!data) return null;
    const known = new Set(data.map((p) => normalizeUrl(p.link)));
    const extra = (github || []).filter((p) => !known.has(normalizeUrl(p.link)));
    return [...data, ...extra];
  }, [data, github]);

  return {
    status: status === "loading" || github === null ? "loading" : status,
    data: merged,
  };
}
