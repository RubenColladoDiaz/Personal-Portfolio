import React from "react";
import { motion } from "framer-motion";
import Project from "../../components/Project/Project";

function MyProjects() {
  const projects = [
    {
      title: "Proyectos de Grado Superior",
      description:
        "Durante mi aprendizaje en desarrollo de aplicaciones multiplataforma y videojuegos he desarrollado multitud de proyectos los cuales han mejorado mis habilidades dia a dia utilizando nuevas herramientas.",
      technologies: ["Java", "Python", "C#", "Unity"],
      link: "https://gitlab.com/2-grado-damvi",
      initialAnimation: { opacity: 0, x: -20 },
      animationDelay: 0.2,
    },
    {
      title: "Proyectos Personales",
      description:
        "A lo largo de mi vida, desde que desperté mi curiosidad por la tecnologia y su desarrollo, he realizado varios proyectos de forma autodidacta y con el objetivo de demostrar mis habilidades en el sector.",
      technologies: ["React", "Node.js", "MongoDB"],
      link: "https://gitlab.com/personal3532051",
      initialAnimation: { opacity: 0, x: 20 },
      animationDelay: 0.4,
    },
  ];

  return (
    <div className="h-full w-full bg-black text-white">
      <div className="max-w-7xl mx-auto h-full flex flex-col pt-40 px-4 md:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl lg:text-left text-center font-poppins font-medium bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text mb-12"
        >
          Mis Proyectos
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Project key={index} {...project} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyProjects;
