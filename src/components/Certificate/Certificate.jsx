import React from "react";

const Certificate = ({ imageUrl, title }) => {
  return (
    <div>
      <img
        src={imageUrl}
        alt={title}
        className="w-full md:w-96 h-72 object-cover mt-5"
      />
    </div>
  );
};

export default Certificate;
