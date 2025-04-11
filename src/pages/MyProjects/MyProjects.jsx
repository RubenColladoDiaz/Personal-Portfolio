import "./MyProjects.css";

function MyProjects() {
  return (
    <div className="flex flex-col items-center text-white">
      <h1 className="text-3xl font-montserrat mt-20">Mis Proyectos</h1>
      <table className="mt-20">
        <thead>
          <tr>
            <th className="px-4 py-2">
              <a
                href="https://gitlab.com/2-grado-damvi"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://arangoya.org/wp-content/uploads/2024/02/desarrollo-apps-multiplataforma-salidas-arangoya.jpg"
                  alt="Mis proyectos del curso de DAMvi"
                  className="w-64 h-64 object-cover rounded-lg cursor-pointer mx-auto"
                />
              </a>
              <p className="mt-2 text-center">
                Mis Proyectos de Grado Superior
              </p>
            </th>
            <th className="px-4 py-2">
              <a
                href="https://gitlab.com/personal3532051"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://cdn-co.comparabien.com/s3fs-public/field/image/%C2%BFC%C3%B3mo%20hacer%20un%20proyecto%20personal.png"
                  alt="Mis proyectos personales"
                  className="w-64 h-64 object-cover rounded-lg cursor-pointer mx-auto"
                />
              </a>
              <p className="mt-2 text-center">Mis Proyectos Personales</p>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-4 py-2 text-center">
              <p className="max-w-sm text-justify text-center">
                Durante mi aprendizaje en desarrollo de aplicaciones
                multiplataforma y videojuegos he desarrollado multitud de
                proyectos los cuales han mejorado mis habilidades dia a dia
              </p>
            </td>
            <td className="px-4 py-2 text-center">
              <p className="max-w-sm text-justify text-center">
                A lo largo de mi vida, desde que desperté mi curiosidad por la
                tecnologia y su desarrollo, he realizado varios proyectos de
                forma autodidacta y con el objetivo de demostrar mis habilidades
              </p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default MyProjects;
