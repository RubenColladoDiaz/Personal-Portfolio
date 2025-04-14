import React from "react";
import { motion } from "framer-motion";
import { useFirestore, useFirestoreDocData } from "reactfire";
import { useTranslation } from "react-i18next";

function getAge() {
  const birthDate = new Date("2004-10-30");
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  return age;
}

const About = () => {
  const { i18n } = useTranslation();
  const age = getAge();
  const aboutRef = useFirestore().collection("about").doc("personal-info");

  const { status, data: aboutInfo } = useFirestoreDocData(aboutRef);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white p-4 md:p-8 pt-28 lg:p-60 pb-28">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-8 md:mb-12"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            {aboutInfo[`page_title_${i18n.language}`]}
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
            <div className="flex flex-col items-center">
              <div className="relative group">
                <img
                  className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                  src={aboutInfo.photo}
                  alt="Rubén Collado"
                />
                <div className="absolute inset-0 rounded-full bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="mt-4 md:mt-8 text-center space-y-2 md:space-y-4">
                <h2 className="text-xl md:text-2xl font-bold">
                  {aboutInfo.name}
                </h2>
                <div className="space-y-1 md:space-y-2">
                  <p className="text-gray-300 text-sm md:text-base">
                    {aboutInfo[`birthDate_${i18n.language}`]} - {age}{" "}
                    {i18n.language === "es" ? "años" : "years old"}
                  </p>
                  <p className="text-gray-300 text-sm md:text-base">
                    {aboutInfo[`location_${i18n.language}`]}
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
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-blue-400 text-center lg:text-left">
              {i18n.language === "es" ? "Más sobre mí" : "More about me"}
            </h2>
            <div className="space-y-4 md:space-y-6 text-gray-300 text-sm md:text-base text-justify">
              {aboutInfo[`description_${i18n.language}`].map(
                (paragraph, index) => (
                  <p key={index} className="leading-relaxed">
                    {paragraph}
                  </p>
                ),
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default About;
