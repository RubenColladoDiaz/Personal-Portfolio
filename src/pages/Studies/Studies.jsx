import React from "react";
import { motion } from "framer-motion";
import StudyCard from "../../components/StudyCard/StudyCard";

function Studies() {
  const studies = [
    {
      title: "Desarrollo de Aplicaciones Multiplataforma y Videojuegos (DAMvi)",
      institution: "Instituto Sabadell",
      period: "2023 - 2025",
      description:
        "Formación en desarrollo de aplicaciones multiplataforma y videojuegos.",
      technologies: [
        "Desarrollo de aplicaciones Android y Flutter",
        "Programación en Java y C#",
        "Desarrollo web con HTML, CSS, JavaScript y TypeScript",
        "Bases de datos SQL, PSQL y MongoDB",
        "Desarrollo de videojuegos con Unity y Godot",
      ],
      location: "Carrer de Juvenal, 1, 08206 Sabadell, Barcelona",
      url: "https://agora.xtec.cat/ies-sabadell/",
    },
    {
      title: "Bachillerato Cientifico-Tecnologico",
      institution: "Instituto Rovira Forns",
      period: "2020 - 2023",
      description: "Formación en ciencias y tecnología.",
      technologies: [
        "Matemáticas Avanzadas",
        "Física",
        "Tecnología Industrial",
        "Dibujo Técnico",
        "Castellano",
        "Catalán",
        "Inglés",
        "Educación Física",
        "Competencias del Mundo Contemporàneo",
      ],
      location:
        "Carrer de Tierno Galván, 77, 08130 Santa Perpètua de Mogoda, Barcelona",
      url: "https://agora.xtec.cat/iesrovira-forns/",
    },
    {
      title: "Educación Secundaria Obligatoria (ESO)",
      institution: "Instituto Sagrada Familia",
      period: "2016 - 2020",
      description: "Formación básica en ciencias y tecnología.",
      technologies: [
        "Matemáticas Básicas",
        "Ciencias Naturales",
        "Tecnología",
        "Informática Básica (Scratch y Python)",
        "Inglés",
        "Educación Física",
        "Castellano",
        "Catalán",
        "Física",
      ],
      location:
        "Carrer de Puig i Cadafalch, 50, 08130 Santa Perpètua de Mogoda, Barcelona",
      url: "https://www.safasp.net/?lang=es",
    },
  ];

  return (
    <div className="h-full w-full bg-black text-white">
      <div className="max-w-7xl mx-auto h-full flex flex-col pt-40 pb-40 lg:pb-0 px-4 md:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl lg:text-left text-center font-poppins font-medium bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text mb-12"
        >
          Estudios
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 gap-8"
        >
          {studies.map((study, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 + index * 0.2 }}
            >
              <StudyCard
                title={study.title}
                institution={study.institution}
                period={study.period}
                description={study.description}
                technologies={study.technologies}
                location={study.location}
                url={study.url}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default Studies;
