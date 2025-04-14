import React from "react";
import { motion } from "framer-motion";
import Skills from "../../components/Skills/Skills";
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import { useTranslation } from "react-i18next";

function Experience() {
  const { i18n } = useTranslation();
  const experiencesRef = useFirestore()
    .collection("experience")
    .orderBy(`period_${i18n.language}`, "desc");

  const skillsRef = useFirestore().collection("skills");

  const { status: experiencesStatus, data: experiences } =
    useFirestoreCollectionData(experiencesRef);
  const { status: skillsStatus, data: skillsData } =
    useFirestoreCollectionData(skillsRef);

  console.log("Raw skillsData:", skillsData); // Añadido para debug

  if (experiencesStatus === "loading" || skillsStatus === "loading") {
    return (
      <div className="h-full w-full bg-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!experiences || experiences.length === 0) {
    return (
      <div className="h-full w-full bg-black text-white flex items-center justify-center">
        <p className="text-xl">No hay datos de experiencia disponibles</p>
      </div>
    );
  }

  // Convertir skillsData a un objeto con la estructura correcta
  const skills = skillsData.reduce((acc, skill) => {
    console.log("Processing skill:", skill);
    if (skill.NO_ID_FIELD) {
      acc[skill.NO_ID_FIELD] = skill;
    }
    return acc;
  }, {});

  console.log("Processed skills:", skills);

  return (
    <div className="h-full w-full bg-black text-white">
      <div className="max-w-7xl mx-auto h-full flex flex-col pt-40 pb-20 px-4 md:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl lg:text-left text-center font-poppins font-medium bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text mb-12"
        >
          {experiences[0][`page_title_${i18n.language}`]}
        </motion.h1>

        <div className="grid grid-cols-1 gap-8 mb-20">
          {experiences.map((experience, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="group relative overflow-hidden rounded-xl bg-gray-900/50 backdrop-blur-sm border border-white/10 hover:border-blue-500/50 transition-all duration-300"
            >
              <div className="p-8 relative z-10">
                <div className="flex flex-col items-center">
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={experience.link}
                    className="group block mb-8"
                  >
                    <div className="relative overflow-hidden rounded-lg">
                      <img
                        className="w-64 h-32 object-contain"
                        src={experience.logo}
                        alt={`Logo ${experience.company}`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </motion.a>

                  <div className="text-center space-y-6">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="space-y-2"
                    >
                      <h2 className="text-2xl font-poppins font-medium group-hover:text-blue-400 transition-colors">
                        {experience[`title_${i18n.language}`]}
                      </h2>
                      <h3 className="text-xl text-blue-400">
                        {experience.company}
                      </h3>
                      <p className="text-gray-400">
                        {experience[`period_${i18n.language}`]}
                      </p>
                      <p className="text-gray-400">
                        {experience[`description_${i18n.language}`]}
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.6 }}
                      className="flex flex-wrap justify-center gap-2"
                    >
                      {experience.technologies.map((tech, techIndex) => (
                        <motion.span
                          key={techIndex}
                          whileHover={{ scale: 1.1 }}
                          className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm"
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </motion.div>

                    <motion.a
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href="https://www.linkedin.com/in/ruben-collado-8aaa93211/"
                      className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-300 group"
                    >
                      {experience[`more_info_${i18n.language}`]}
                      <svg
                        className="w-4 h-4 ml-2 transform group-hover:translate-x-1 transition-transform"
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
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <Skills skills={skills} />
      </div>
    </div>
  );
}

export default Experience;
