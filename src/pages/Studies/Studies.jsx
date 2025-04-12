import React from "react";
import StudyCard from "../../components/StudyCard/StudyCard";

function Studies() {
  const studies = [
    {
      title: "Desarrollo de Aplicaciones Multiplataforma y Videojuegos (DAMvi)",
      institution: "Instituto Sabadell",
      period: "2022 - 2024",
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
      period: "2020 - 2022",
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
      <div className="max-w-7xl mx-auto h-full flex flex-col pt-40 px-4 md:px-8">
        <h1 className="text-4xl md:text-6xl font-poppins font-medium bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text mb-12">
          Mis Estudios
        </h1>

        <div className="grid grid-cols-1 gap-8">
          {studies.map((study, index) => (
            <StudyCard
              key={index}
              title={study.title}
              institution={study.institution}
              period={study.period}
              description={study.description}
              technologies={study.technologies}
              location={study.location}
              url={study.url}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Studies;
