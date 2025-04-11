import React from "react";
import { Link } from "react-router-dom";

const Study = ({ studyURL, studyImage, studyTitle, studyCertificate }) => {
  return (
    <div className="pb-20 flex flex-col md:ml-14">
      <p className="font-montserrat text-2xl">{studyTitle}</p>
      <a href={studyURL} className="block w-full md:w-96">
        <img
          className="w-full md:w-96 h-72 object-cover mt-5"
          src={studyImage}
          alt={studyTitle}
        />
      </a>
      <p className="mt-5">{studyCertificate}</p>
      <Link className="underline" to="">
        Más detalles
      </Link>
    </div>
  );
};

export default Study;
