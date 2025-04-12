import React from "react";

const Project = ({
  imageUrl,
  link,
  altText,
  description,
  extraDescription,
}) => {
  return (
    <div className="group">
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <div className="relative overflow-hidden rounded-lg mb-4">
          <img
            src={imageUrl}
            alt={altText}
            className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </a>

      <div className="space-y-4">
        <h2 className="text-2xl font-montserrat font-semibold group-hover:text-blue-400 transition-colors duration-300">
          {description}
        </h2>
        <p className="text-gray-300 leading-relaxed">{extraDescription}</p>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block text-blue-400 hover:text-blue-300 transition-colors duration-300"
        >
          Ver proyectos →
        </a>
      </div>
    </div>
  );
};

export default Project;
