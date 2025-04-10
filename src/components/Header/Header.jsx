import { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-black text-white w-screen fixed top-0 p-5 font-['Montserrat'] font-light">
      <button
        className="lg:hidden absolute left-5 z-50"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
          />
        </svg>
      </button>

      <div className="flex items-center relative">
        <nav
          className={`${
            isMenuOpen ? "flex" : "hidden"
          } lg:flex flex-col lg:flex-row absolute lg:relative left-0 top-full lg:top-0 w-full lg:w-auto bg-black lg:bg-transparent p-4 lg:p-0 space-y-4 lg:space-y-0`}
        >
          <Link
            to="/myprojects"
            className="hover:text-gray-300 transition-colors cursor-pointer pl-10"
          >
            Mis Proyectos
          </Link>
          <Link
            to="/experience"
            className="hover:text-gray-300 transition-colors cursor-pointer pl-10"
          >
            Experiencia
          </Link>
          <a className="hover:text-gray-300 transition-colors cursor-pointer pl-10">
            Estudios
          </a>
          <a className="hover:text-gray-300 transition-colors cursor-pointer pl-10">
            Sobre mi
          </a>
        </nav>

        <Link to="/" className="flex items-center">
          <p className="absolute left-1/2 -translate-x-1/2">RUBÉN COLLADO</p>
        </Link>

        <a className="hover:text-gray-300 transition-colors cursor-pointer ml-auto pr-10">
          Contáctame
        </a>
      </div>
    </div>
  );
}

export default Header;
