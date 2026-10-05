// Orden de lectura de la web: cada página enlaza a la siguiente al final.
export const ROUTES = [
  { path: "/", key: "home" },
  { path: "/myprojects", key: "projects" },
  { path: "/experience", key: "experience" },
  { path: "/studies", key: "education" },
  { path: "/about", key: "about" },
  { path: "/contact", key: "contact" },
];

const fallback = {
  es: {
    home: "Inicio",
    projects: "Proyectos",
    experience: "Experiencia",
    education: "Estudios",
    about: "Sobre mí",
    contact: "Contacto",
  },
  en: {
    home: "Home",
    projects: "Projects",
    experience: "Experience",
    education: "Education",
    about: "About",
    contact: "Contact",
  },
};

// Las etiquetas vienen de Firestore (colección header); si aún no han
// llegado, usamos las locales para que la navegación nunca quede vacía.
export function routeLabel(key, lang, headerInfo) {
  return headerInfo?.[`${key}_${lang}`] || fallback[lang][key];
}

export function nextRoute(path) {
  const i = ROUTES.findIndex((r) => r.path === path);
  return ROUTES[(i + 1) % ROUTES.length];
}
