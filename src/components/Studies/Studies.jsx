import React from "react";
import { Link } from "react-router-dom";

const Studies = () => {
  return (
    <div className="text-white">
      <div className="flex flex-col items-center text-white">
        <h1 className="text-3xl font-montserrat mt-20">Mis Estudios</h1>
      </div>
      <div className="flex flex-col md:flex-row justify-between mt-20">
        <div className="flex flex-col">
          <div className="flex flex-col md:ml-14">
            <p className="font-montserrat text-2xl">Instituto Sabadell</p>
            <a
              href="https://agora.xtec.cat/ies-sabadell/"
              className="block w-full md:w-96"
            >
              <img
                className="w-full md:w-96 h-72 object-cover mt-5"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJ4QTjoUn7qOuF8tAOtFPeVglv6dx3prTlpg&s"
                alt="Instituto Sabadell"
              />
            </a>
            <p className="mt-5">
              Desarrollo de Aplicaciones Multiplatafirma y Videojuegos (DAMvi)
            </p>
            <Link className="underline" to="">
              Más detalles
            </Link>
          </div>
          <div className="pt-20 flex flex-col md:ml-14">
            <p className="font-montserrat text-2xl">Instituto Rovira Forns</p>
            <a
              href="https://agora.xtec.cat/iesrovira-forns/"
              className="block w-full md:w-96"
            >
              <img
                className="w-full md:w-96 h-72 object-cover mt-5"
                src="https://agora.xtec.cat/iesrovira-forns/wp-content/uploads/usu2519/2021/07/Ins-3.jpg"
                alt="Instituto Rovira Forns"
              />
            </a>
            <p className="mt-5">Bachillerato Cientifico-Tecnologico</p>
            <Link className="underline" to="">
              Más detalles
            </Link>
          </div>
          <div className="pt-20 flex flex-col md:ml-14">
            <p className="font-montserrat text-2xl">
              Instituto Sagrada Familia
            </p>
            <a
              href="https://www.safasp.net/?lang=es"
              className="block w-full md:w-96"
            >
              <img
                className="w-full md:w-96 h-72 object-cover mt-5"
                src="https://www.staperpetua.cat/media/repository/directori/equipaments/altres/safa_2768.jpg"
                alt="Instituto Sagrada Familia"
              />
            </a>
            <p className="mt-5">Escuela Secundaria Obligatoria (ESO)</p>
            <Link className="underline" to="">
              Más detalles
            </Link>
          </div>
        </div>

        <div className="mr-14 mt-10 md:mt-0">
          <p className="font-montserrat text-2xl">Certificaciones Extras</p>
          <img
            className="w-full md:w-96 h-72 object-cover mt-5"
            src="https://api2.sololearn.com/v2/certificates/CC-CQEREPAF/image/jpg?t=638473123349047310"
            alt="Introducción a Java"
          />
          <img
            className="w-full md:w-96 h-72 object-cover mt-5"
            src="https://api2.sololearn.com/v2/certificates/CC-X0VRVOVO/image/jpg?t=638473385034668910"
            alt="Java Intermedio"
          />
          <img
            className="w-full md:w-96 h-72 object-cover mt-5"
            src="https://api2.sololearn.com/v2/certificates/CC-KOCJKHTH/image/jpg?t=638475064215839520"
            alt="Introducción a JavaScript"
          />
          <img
            className="w-full md:w-96 h-72 object-cover mt-5"
            src="https://api2.sololearn.com/v2/certificates/CC-KL0DUTKY/image/jpg?t=638562894306235380"
            alt="JavaScript Intermediate"
          />
        </div>
      </div>
    </div>
  );
};

export default Studies;
