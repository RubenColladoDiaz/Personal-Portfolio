import "./MyProjects.css";
import Project from "../../components/Project/Project";

function MyProjects() {
  return (
    <div className="flex flex-col items-center text-white">
      <h1 className="text-3xl font-montserrat mt-20">Mis Proyectos</h1>
      <table className="mt-20">
        <tbody>
          <tr>
            <td className="px-4 py-2">
              <Project
                imageUrl="https://arangoya.org/wp-content/uploads/2024/02/desarrollo-apps-multiplataforma-salidas-arangoya.jpg"
                link="https://gitlab.com/2-grado-damvi"
                altText="Mis proyectos del curso de DAMvi"
                description="Mis Proyectos de Grado Superior"
                extraDescription="Durante mi aprendizaje en desarrollo de aplicaciones multiplataforma y videojuegos he desarrollado multitud de proyectos los cuales han mejorado mis habilidades dia a dia utilizando nuevas herramientas"
              />
            </td>
            <td className="px-4 py-2">
              <Project
                imageUrl="https://cdn-co.comparabien.com/s3fs-public/field/image/%C2%BFC%C3%B3mo%20hacer%20un%20proyecto%20personal.png"
                link="https://gitlab.com/personal3532051"
                altText="Mis proyectos personales"
                description="Mis Proyectos Personales"
                extraDescription="A lo largo de mi vida, desde que desperté mi curiosidad por la tecnologia y su desarrollo, he realizado varios proyectos de forma autodidacta y con el objetivo de demostrar mis habilidades en el sector"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default MyProjects;
