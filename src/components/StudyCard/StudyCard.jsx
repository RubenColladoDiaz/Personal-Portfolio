import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const StudyCard = ({
  title,
  institution,
  period,
  description,
  technologies,
  location,
  url,
  visit_website_es,
  visit_website_en,
}) => {
  const { i18n } = useTranslation();

  return (
    <div className="group relative overflow-hidden rounded-xl bg-gray-900/50 backdrop-blur-sm border border-white/10 hover:border-blue-500/50 transition-all duration-300">
      <div className="p-8">
        <div className="space-y-6 text-center lg:text-left">
          <div className="space-y-2">
            <h2 className="text-2xl font-poppins font-medium text-blue-400">
              {title}
            </h2>
            <h3 className="text-xl text-gray-300">{institution}</h3>
            <p className="text-gray-400">{period}</p>
            <p className="text-gray-400">{description}</p>
          </div>

          <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
            {technologies.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-gray-400">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              <span>{location}</span>
            </div>

            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors duration-300 group"
            >
              {i18n.language === "es" ? visit_website_es : visit_website_en}
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
    </div>
  );
};

export default StudyCard;
