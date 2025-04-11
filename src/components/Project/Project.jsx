import React from "react";

const Project = ({ imageUrl, link, altText, description, extraDescription }) => {
  return (
    <div className="px-4 py-2 text-center">
      <a href={link} target="_blank" rel="noopener noreferrer">
        <img
          src={imageUrl}
          alt={altText}
          className="w-64 h-64 object-cover rounded-lg cursor-pointer mx-auto"
        />
      </a>
      <p className="mt-2 text-center font-bold">{description}</p>
      <p className="max-w-sm text-justify text-center mt-2">{extraDescription}</p>
    </div>
  );
};

export default Project;
