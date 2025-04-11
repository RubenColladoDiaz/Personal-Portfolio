import React from "react";
import { useLocation } from "react-router-dom";

const StudyDetails = () => {
  const { state: school } = useLocation();

  if (!school) {
    return <div className="text-white">Estudio no encontrado</div>;
  }

  return (
    <div className="min-h-screen p-8 text-white">
      <div className="flex flex-col items-center text-white">
        <h1 className="text-3xl font-montserrat mt-20">{school.title}</h1>
        <p>{school.location}</p>
        <img
          className="mt-10 w-96 h-72 object-cover rounded-lg"
          src={school.image}
          alt={school.title}
        />
      </div>
      <p className="text-3xl font-montserrat mt-10 text-center">
        Habilidades adquiridas
      </p>
      <ul className="mt-10 text-center max-w-2xl mx-auto">
        {school.skills?.map((skill, index) => (
          <li
            key={index}
            className="mb-1 font-poppins font-light tracking-wide"
          >
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudyDetails;
