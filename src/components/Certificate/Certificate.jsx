import React from "react";

const Certificate = ({ imageUrl, title }) => {
  return (
    <div className="group">
      <div className="relative overflow-hidden rounded-lg">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-64 object-contain transform group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <h3 className="text-white font-montserrat text-lg">{title}</h3>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
