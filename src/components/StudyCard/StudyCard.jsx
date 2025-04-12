import React from "react";
import { motion } from "framer-motion";

function StudyCard({
  title,
  institution,
  period,
  description,
  technologies,
  location,
  url,
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="group relative overflow-hidden rounded-xl bg-gray-900/50 backdrop-blur-sm border border-white/10 hover:border-blue-500/50 transition-all duration-300"
    >
      <div className="p-6 text-center lg:text-left">
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-2xl font-poppins font-medium group-hover:text-blue-400 transition-colors">
              {title}
            </h2>
            <h3 className="text-xl text-blue-400">{institution}</h3>
            <p className="text-gray-400">{period}</p>
            <p className="text-gray-400 text-sm mt-1">{location}</p>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 text-sm"
            >
              Visitar sitio web
            </motion.a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-300"
          >
            {description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-wrap gap-2"
          >
            {technologies.map((tech, index) => (
              <motion.span
                key={index}
                whileHover={{ scale: 1.1 }}
                className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm mx-auto lg:mx-0"
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

export default StudyCard;
