import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Studies from "./pages/Studies/Studies";
import Experience from "./pages/Experience/Experience";
import MyProjects from "./pages/MyProjects/MyProjects";
import Contact from "./pages/Contact/Contact";

function App() {
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/studies" element={<Studies />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/myprojects" element={<MyProjects />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
