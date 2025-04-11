import React, { useState } from "react";

function getAge() {
  const today = new Date();
  const BirthDate = new Date(2004, 9, 30);

  let age = today.getFullYear() - BirthDate.getFullYear();
  const month = today.getMonth() - BirthDate.getMonth();

  if (month < 0 || (month === 0 && today.getDate() < BirthDate.getDate())) {
    age--;
  }

  return age;
}

const About = () => {
  const [age, setAge] = useState(getAge());

  return (
    <div>
      <div className="flex flex-col items-center text-white">
        <h1 className="text-3xl font-montserrat mt-20">Sobre mi</h1>
        <img
          className="w-48 h-48 rounded-full object-cover mt-20"
          src="https://media.licdn.com/dms/image/v2/D4E03AQHo1wskj_5Wog/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1718292624993?e=1749686400&v=beta&t=a-TYHhaHLueKNudoxCDCi8gKkpapbjc-obwu2rInSug"
          alt="Rubén Collado"
        />
        <div className="mt-10 text-center">
          <p className="text-xl font-bold font-montserrat mb-5">
            Rubén Collado Díaz
          </p>
          <p>30 de Octubre de 2004 - {age} años</p>
          <p>Barcelona, España</p>

          <div className="mt-10 max-w-2xl px-4">
            <h2 className="text-xl font-bold mb-4">Más sobre mí</h2>
            <p className="mb-4">
              Además de mi pasión por la programación, disfruto explorando
              nuevas tecnologías y tendencias en el sector. Me considero una
              persona curiosa y autodidacta, siempre buscando aprender algo
              nuevo.
            </p>
            <p className="mb-4">
              En mi tiempo libre, me gusta mantenerme activo practicando deporte
              y explorando la naturaleza. También disfruto de la fotografía y el
              diseño, lo que me ayuda a mantener una perspectiva creativa en mi
              trabajo.
            </p>
            <p>
              Mi objetivo es seguir creciendo profesionalmente mientras
              contribuyo a proyectos innovadores que tengan un impacto positivo
              en la sociedad.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
