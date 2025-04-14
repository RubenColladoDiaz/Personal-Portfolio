import React from "react";
import { motion } from "framer-motion";
import Project from "../../components/Project/Project";
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import { useTranslation } from "react-i18next";

function MyProjects() {
  const { i18n } = useTranslation();
  const projectsRef = useFirestore().collection("projects");

  const { status, data: projects } = useFirestoreCollectionData(projectsRef);

  if (status === "loading") {
    return (
      <div className="h-full w-full bg-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-black text-white">
      <div className="max-w-7xl mx-auto h-full flex flex-col pt-40 pb-40 px-4 md:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl lg:text-left text-center font-poppins font-medium bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text mb-12"
        >
          {projects[0][`page_title_${i18n.language}`]}
        </motion.h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <Project
              key={index}
              {...project}
              index={index}
              title={project[`title_${i18n.language}`]}
              description={project[`description_${i18n.language}`]}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MyProjects;
