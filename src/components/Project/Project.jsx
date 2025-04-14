import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const Project = ({
  title,
  description,
  technologies,
  link,
  index,
  button_text_es,
  button_text_en,
}) => {
  const { i18n } = useTranslation();
  const initialAnimation = {
    opacity: 0,
    x: index % 2 === 0 ? -20 : 20,
  };

  return (
    <motion.div
      initial={initialAnimation}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
      className="group relative overflow-hidden rounded-xl bg-gray-900/50 backdrop-blur-sm border border-white/10 hover:border-blue-500/50 transition-all duration-300"
    >
      <div className="p-6 relative z-10">
        <h2 className="text-2xl lg:text-left text-center font-poppins font-medium mb-2 group-hover:text-blue-400 transition-colors">
          {title}
        </h2>
        <p className="text-gray-400 mb-4 text-justify">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech, techIndex) => (
            <span
              key={techIndex}
              className={`px-3 py-1 lg:mx-0 mx-auto ${
                techIndex % 2 === 0
                  ? "bg-blue-500/10 text-blue-400"
                  : "bg-purple-500/10 text-purple-400"
              } rounded-full text-sm`}
            >
              {tech}
            </span>
          ))}
        </div>
        <motion.a
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
        >
          {i18n.language === "es" ? button_text_es : button_text_en}
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
        </motion.a>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.div>
  );
};

export default Project;
