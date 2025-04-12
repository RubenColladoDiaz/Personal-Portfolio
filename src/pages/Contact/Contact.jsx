import React from "react";
import { motion } from "framer-motion";

function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-4 md:p-8 lg:p-60">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 md:mb-12"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Contacto
          </h1>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-purple-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 md:p-8 border border-white/10 hover:border-blue-500/50 transition-all duration-300"
          >
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-blue-400">
              Información de Contacto
            </h2>
            <div className="space-y-4 md:space-y-6">
              <div className="flex items-center space-x-3 md:space-x-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6 text-blue-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p className="text-gray-400 text-sm md:text-base">Email</p>
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=ruben.co.diaz@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300 transition-colors text-sm md:text-base"
                  >
                    ruben.co.diaz@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-3 md:space-x-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                  <svg
                    className="w-5 h-5 md:w-6 md:h-6 text-blue-400"
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
                </div>
                <div>
                  <p className="text-gray-400 text-sm md:text-base">
                    Ubicación
                  </p>
                  <p className="text-white text-sm md:text-base">
                    Barcelona, España
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 md:p-8 border border-white/10 hover:border-blue-500/50 transition-all duration-300"
          >
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-blue-400">
              Redes Sociales
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
              <a
                href="https://www.linkedin.com/in/ruben-collado-8aaa93211/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-3 md:p-4 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-colors"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/800px-LinkedIn_logo_initials.png"
                  alt="LinkedIn"
                  className="w-6 h-6 md:w-8 md:h-8"
                />
                <span className="text-white text-sm md:text-base">
                  LinkedIn
                </span>
              </a>

              <a
                href="https://gitlab.com/ruben.co.diaz"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-3 md:p-4 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-colors"
              >
                <img
                  src="https://about.gitlab.com/images/press/logo/png/gitlab-logo-500.png"
                  alt="GitLab"
                  className="w-6 h-6 md:w-8 md:h-8"
                />
                <span className="text-white text-sm md:text-base">GitLab</span>
              </a>

              <a
                href="https://x.com/ukelchuworld"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 p-3 md:p-4 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-colors"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/X_icon_2.svg/2048px-X_icon_2.svg.png"
                  alt="X"
                  className="w-6 h-6 md:w-8 md:h-8"
                />
                <span className="text-white text-sm md:text-base">X</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
