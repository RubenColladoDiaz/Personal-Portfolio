import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const Skills = ({ skills }) => {
  const { i18n } = useTranslation();

  if (!skills || Object.keys(skills).length === 0) {
    return null;
  }

  console.log("Skills component received:", skills);

  return (
    <div className="mb-20">
      <h2 className="text-4xl lg:text-left text-center font-poppins mb-10 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
        {i18n.language === "es" ? "Aptitudes" : "Skills"}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Object.entries(skills).map(([key, skill], index) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            className="group relative overflow-hidden rounded-xl bg-gray-900/50 backdrop-blur-sm border border-white/10 hover:border-blue-500/50 transition-all duration-300"
          >
            <div className="p-6">
              <h3 className="text-xl lg:text-left text-center font-poppins font-medium text-blue-400 mb-4">
                {skill[`category_${i18n.language}`]}
              </h3>
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                {skill.technologies &&
                  skill.technologies.map((tech, techIndex) => (
                    <motion.span
                      key={techIndex}
                      whileHover={{ scale: 1.1 }}
                      className="px-3 py-1 mx-auto lg:mx-0 bg-blue-500/10 text-blue-400 rounded-full text-sm"
                    >
                      {tech}
                    </motion.span>
                  ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Skills;
