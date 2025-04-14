import React from "react";
import { motion } from "framer-motion";
import StudyCard from "../../components/StudyCard/StudyCard";
import { useFirestore, useFirestoreCollectionData } from "reactfire";
import { useTranslation } from "react-i18next";

function Studies() {
  const { i18n } = useTranslation();
  const studiesRef = useFirestore()
    .collection("studies")
    .orderBy(`period_${i18n.language}`, "desc");

  const { status, data: studies } = useFirestoreCollectionData(studiesRef);

  if (status === "loading") {
    return (
      <div className="h-full w-full bg-black text-white flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="h-full w-full bg-black text-white lg:pb-40">
      <div className="max-w-7xl mx-auto h-full flex flex-col pt-40 pb-40 lg:pb-0 px-4 md:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl lg:text-left text-center font-poppins font-medium bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text mb-12"
        >
          {studies[0][`page_title_${i18n.language}`]}
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
                title={study[`title_${i18n.language}`]}
                institution={study.institution}
                period={study[`period_${i18n.language}`]}
                description={study[`description_${i18n.language}`]}
                technologies={study[`technologies_${i18n.language}`]}
                location={study.location}
                url={study.url}
                visit_website_es={study.visit_website_es}
                visit_website_en={study.visit_website_en}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default Studies;
