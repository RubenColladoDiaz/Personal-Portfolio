import "./Home.css";

function Home() {
  return (
    <div className="flex flex-col items-center text-white">
      <p className="border text-center font-montserrat w-20 mt-20">2025</p>
      <div>
        <p className="mt-36 text-white text-5xl font-poppins font-medium">
          Rubén Collado.
        </p>
        <p className="text-right">FullStack developer</p>
      </div>

      <p className="mt-40">Un poco sobre mi</p>
      <hr className="w-[1000px] border-t border-gray-600 my-4" />
      <p className="w-[800px] text-center text-gray-300 leading-7 font-montserrat">
        Soy Rubén Collado Díaz, un joven de 20 años apasionado por la tecnología
        y el desarrollo. Actualmente estoy cursando estudios en Desarrollo de
        Aplicaciones Multiplataforma y Videojuegos, donde estoy adquiriendo las
        habilidades necesarias para convertirme en un desarrollador versátil. Mi
        objetivo profesional es formar parte de una gran multinacional, donde
        pueda aplicar mis conocimientos en desarrollo web, tanto en frontend
        como en backend, o incluso explorar oportunidades en el fascinante mundo
        del desarrollo de videojuegos. Mi pasión por la programación y mi
        constante deseo de aprender me impulsan a buscar nuevos retos y
        oportunidades de crecimiento en el sector tecnológico.
      </p>
    </div>
  );
}

export default Home;
