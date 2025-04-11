import React from "react";

const Contact = () => {
  return (
    <div className="text-white text-center">
      <div className="flex flex-col items-center text-white">
        <h1 className="text-3xl font-montserrat mt-20">Contáctame</h1>
      </div>
      <div>
        <div>
          <p>Correo</p>
          <p>ruben.co.diaz@gmail.com</p>
        </div>
        <div>
          <p>Mis redes</p>
          <div>
            <a href="">
              <img
                src="https://cdn-icons-png.freepik.com/256/15527/15527900.png?semt=ais_hybrid"
                alt="Logo Instagram"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
