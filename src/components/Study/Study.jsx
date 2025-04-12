import React from "react";
import { Link } from "react-router-dom";

const Study = ({
  studyURL,
  studyImage,
  studyTitle,
  studyCertificate,
  studyId,
  studyLocation,
  studySkills,
}) => {
  const handleClick = () => {
    console.log("Datos pasados al hacer clic:", {
      title: studyTitle,
      url: studyURL,
      image: studyImage,
      certificate: studyCertificate,
      location: studyLocation,
    });
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-montserrat font-semibold">{studyTitle}</h2>
        <Link
          className="text-blue-400 hover:text-blue-300 transition-colors duration-300"
          to={`/studies/${studyId}`}
          state={{
            title: studyTitle,
            url: studyURL,
            image: studyImage,
            certificate: studyCertificate,
            location: studyLocation,
            skills: studySkills,
          }}
          onClick={handleClick}
        >
          Ver detalles →
        </Link>
      </div>

      <a href={studyURL} className="block group">
        <div className="relative overflow-hidden rounded-lg">
          <img
            className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
            src={studyImage}
            alt={studyTitle}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </a>

      <div className="mt-4">
        <p className="text-gray-300">{studyCertificate}</p>
        <p className="text-sm text-gray-400 mt-2">{studyLocation}</p>
      </div>
    </div>
  );
};

export default Study;
