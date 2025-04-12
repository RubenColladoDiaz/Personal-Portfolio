import React from "react";

function MyProjects() {
  return (
    <div className="h-full w-full bg-black text-white">
      <div className="max-w-7xl mx-auto h-full flex flex-col pt-40 px-4 md:px-8">
        <h1 className="text-4xl md:text-6xl font-poppins font-medium bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text mb-12">
          Mis Proyectos
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="group relative overflow-hidden rounded-xl bg-gray-900/50 backdrop-blur-sm border border-white/10 hover:border-blue-500/50 transition-all duration-300">
            <div className="p-6 relative z-10">
              <h2 className="text-2xl font-poppins font-medium mb-2 group-hover:text-blue-400 transition-colors">
                Proyectos de Grado Superior
              </h2>
              <p className="text-gray-400 mb-4">
                Durante mi aprendizaje en desarrollo de aplicaciones
                multiplataforma y videojuegos he desarrollado multitud de
                proyectos los cuales han mejorado mis habilidades dia a dia
                utilizando nuevas herramientas.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm">
                  Java
                </span>
                <span className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full text-sm">
                  Python
                </span>
                <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm">
                  C#
                </span>
                <span className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full text-sm">
                  Unity
                </span>
              </div>
              <a
                href="https://gitlab.com/2-grado-damvi"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
              >
                Ver proyectos
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </a>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </div>

          <div className="group relative overflow-hidden rounded-xl bg-gray-900/50 backdrop-blur-sm border border-white/10 hover:border-blue-500/50 transition-all duration-300">
            <div className="p-6 relative z-10">
              <h2 className="text-2xl font-poppins font-medium mb-2 group-hover:text-blue-400 transition-colors">
                Proyectos Personales
              </h2>
              <p className="text-gray-400 mb-4">
                A lo largo de mi vida, desde que desperté mi curiosidad por la
                tecnologia y su desarrollo, he realizado varios proyectos de
                forma autodidacta y con el objetivo de demostrar mis habilidades
                en el sector.
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm">
                  React
                </span>
                <span className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full text-sm">
                  Node.js
                </span>
                <span className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm">
                  MongoDB
                </span>
              </div>
              <a
                href="https://gitlab.com/personal3532051"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
              >
                Ver proyectos
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </a>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyProjects;
