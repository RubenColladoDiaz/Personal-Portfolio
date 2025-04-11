import React from "react";
import Carousel from "../../components/Carousel/Carousel";

const Experience = () => {
  return (
    <div className="items-center">
      <div className="flex flex-col items-center text-white">
        <h1 className="text-3xl font-montserrat mt-20">Mi Experiencia</h1>
      </div>

      <div className="flex flex-col items-center mt-20 text-white">
        <a href="https://mga.games/" className="flex justify-center">
          <img
            className="w-2/3"
            src="https://mga.games/assets/img/header/logo_mga.png"
            alt="Logo MGA Games"
          />
        </a>
        <p className="mt-10 font-bold">Desarrollador FullStack</p>
        <p>4 Jun 2024 - Actualidad</p>
        <a
          className="mt-10 underline font-montserrat"
          href="https://www.linkedin.com/in/ruben-collado-8aaa93211/"
        >
          Más info
        </a>
      </div>

      <div className="flex flex-col text-white items-center">
        <h1 className="text-6xl font-montserrat mt-20">Aptitudes</h1>
        <Carousel />
      </div>
    </div>
  );
};

export default Experience;
