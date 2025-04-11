import React from "react";

const Contact = () => {
  return (
    <div className="text-white text-center">
      <div className="flex flex-col items-center text-white">
        <h1 className="text-3xl font-montserrat mt-20">Contáctame</h1>
      </div>
      <div>
        <div className="mt-20">
          <p className="text-2xl">Correo</p>
          <p className="mt-5 font-montserrat">ruben.co.diaz@gmail.com</p>
        </div>
        <div className="mt-20">
          <p className="text-xl">Mis redes</p>
          <div className="flex justify-center items-center gap-4">
            <a
              href="https://www.instagram.com/ukelchu/"
              className="inline-block"
            >
              <img
                className="w-24 h-24"
                src="https://cdn-icons-png.freepik.com/256/15527/15527900.png?semt=ais_hybrid"
                alt="Logo Instagram"
              />
            </a>
            <a href="https://x.com/ukelchuworld" className="inline-block">
              <img
                className="w-36 h-36"
                src="https://cdn.iconscout.com/icon/free/png-256/free-twitter-x-9581782-7740647.png"
                alt="Logo X"
              />
            </a>
            <a
              href="https://www.linkedin.com/in/ruben-collado-8aaa93211/"
              className="inline-block"
            >
              <img
                className="w-24 h-24"
                src="https://cdn-icons-png.freepik.com/256/15707/15707753.png?semt=ais_hybrid"
                alt="Logo LinkedIn"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
