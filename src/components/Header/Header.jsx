import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useFirestore, useFirestoreDocData } from "reactfire";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const headerRef = useFirestore()
    .collection("header")
    .doc("main-info");
  
  const { status, data: headerInfo } = useFirestoreDocData(headerRef);

  const navItems = [
    { path: "/myprojects", label: headerInfo?.[`projects_${i18n.language}`] },
    { path: "/experience", label: headerInfo?.[`experience_${i18n.language}`] },
    { path: "/studies", label: headerInfo?.[`education_${i18n.language}`] },
    { path: "/about", label: headerInfo?.[`about_${i18n.language}`] },
  ];

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="bg-black/80 backdrop-blur-sm text-white w-screen fixed top-0 p-5 font-montserrat font-light h-[60px] z-50 border-b border-white/10">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
        <button
          className="lg:hidden relative z-50 p-2 hover:bg-white/10 rounded-lg transition-colors"
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
              d={
                isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>

        <Link
          to="/"
          className="absolute left-1/2 -translate-x-1/2 text-xl font-medium bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text hover:opacity-80 transition-opacity"
        >
          {headerInfo?.[`name_${i18n.language}`]}
        </Link>

        <nav className="hidden lg:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`relative group transition-colors ${
                location.pathname === item.path
                  ? "text-blue-400"
                  : "text-white hover:text-gray-300"
              }`}
            >
              {item.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 transition-all group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => changeLanguage('es')}
            className={`px-2 py-1 rounded-md transition-colors ${
              i18n.language === 'es' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            ES
          </button>
          <button
            onClick={() => changeLanguage('en')}
            className={`px-2 py-1 rounded-md transition-colors ${
              i18n.language === 'en' 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
            }`}
          >
            EN
          </button>
          <Link
            to="/contact"
            className="hidden lg:block px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full hover:opacity-90 transition-opacity"
          >
            {headerInfo?.[`contact_${i18n.language}`]}
          </Link>
        </div>

        <div
          className={`lg:hidden fixed inset-0 bg-black/90 backdrop-blur-sm transition-opacity duration-300 ${
            isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsMenuOpen(false)}
        >
          <div className="absolute top-20 left-0 right-0 p-4">
            <div className="bg-gray-900/95 backdrop-blur-md rounded-xl p-6 space-y-6 border border-white/10">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block text-xl ${
                    location.pathname === item.path
                      ? "text-blue-400"
                      : "text-white hover:text-gray-300"
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="flex justify-center space-x-4">
                <button
                  onClick={() => changeLanguage('es')}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    i18n.language === 'es' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  ES
                </button>
                <button
                  onClick={() => changeLanguage('en')}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    i18n.language === 'en' 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  EN
                </button>
              </div>
              <Link
                to="/contact"
                className="block px-6 py-3 text-center bg-gradient-to-r from-blue-500 to-purple-600 rounded-full hover:opacity-90 transition-opacity"
                onClick={() => setIsMenuOpen(false)}
              >
                {headerInfo?.[`contact_${i18n.language}`]}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
