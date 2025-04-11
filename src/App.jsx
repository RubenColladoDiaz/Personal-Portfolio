import { Routes, Route } from "react-router-dom";
import Header from "./pages/Header/Header";
import Home from "./pages/Home/Home";
import MyProjects from "./pages/MyProjects/MyProjects";
import Experience from "./pages/Experience/Experience";
import Studies from "./pages/Studies/Studies";
import StudyDetails from "./pages/Studies/StudyDetails";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";

function App() {
  return (
    <div className="pt-10 pb-20">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/myprojects" element={<MyProjects />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/studies" element={<Studies />} />
        {/*If we want to show different info in the same page we need to use an ID*/}
        <Route path="/studies/:id" element={<StudyDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  );
}

export default App;
