import React from "react";
import Study from "../../components/Study/Study";
import Certificate from "../../components/Certificate/Certificate";

const Studies = () => {
  return (
    <div className="text-white">
      <div className="flex flex-col items-center text-white">
        <h1 className="text-3xl font-montserrat mt-20">Mis Estudios</h1>
      </div>
      <div className="flex flex-col md:flex-row justify-between mt-20">
        <div className="flex flex-col">
          <Study
            studyURL="https://agora.xtec.cat/ies-sabadell/"
            studyImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJ4QTjoUn7qOuF8tAOtFPeVglv6dx3prTlpg&s"
            studyTitle="Instituto Sabadell"
            studyCertificate="Desarrollo de Aplicaciones Multiplatafirma y Videojuegos (DAMvi)"
            studyId="sabadell"
            studyLocation="Carrer de Juvenal, 1, 08206 Sabadell, Barcelona"
            studySkills={[
              "Desarrollo de aplicaciones Android y Flutter",
              "Programación en Java y C#",
              "Desarrollo web con HTML, CSS, JavaScript y TypeScript",
              "Bases de datos SQL, PSQL y MongoDB",
              "Desarrollo de videojuegos con Unity y Godot",
            ]}
          />
          <Study
            studyURL="https://agora.xtec.cat/iesrovira-forns/"
            studyImage="https://agora.xtec.cat/iesrovira-forns/wp-content/uploads/usu2519/2021/07/Ins-3.jpg"
            studyTitle="Instituto Rovira Forns"
            studyCertificate="Bachillerato Cientifico-Tecnologico"
            studyId="rovira-forns"
            studyLocation="Carrer de Tierno Galván, 77, 08130 Santa Perpètua de Mogoda, Barcelona"
            studySkills={[
              "Matemáticas Avanzadas",
              "Física",
              "Tecnología Industrial",
              "Dibujo Técnico",
              "Castellano",
              "Catalán",
              "Inglés",
              "Educación Física",
              "Competencias del Mundo Contemporàneo",
            ]}
          />
          <Study
            studyURL="https://www.safasp.net/?lang=es"
            studyImage="https://www.staperpetua.cat/media/repository/directori/equipaments/altres/safa_2768.jpg"
            studyTitle="Instituto Sagrada Familia"
            studyCertificate="Educación Secundaria Obligatoria (ESO)"
            studyId="sagrada-familia"
            studyLocation="Carrer de Puig i Cadafalch, 50, 08130 Santa Perpètua de Mogoda, Barcelona"
            studySkills={[
              "Matemáticas Básicas",
              "Ciencias Naturales",
              "Tecnología",
              "Informática Básica (Scratch y Python)",
              "Inglés",
              "Educación Física",
              "Castellano",
              "Catalán",
              "Física"
            ]}
          />
        </div>

        <div className="mr-14 mt-10 md:mt-0">
          <p className="font-montserrat text-2xl">Certificaciones Extras</p>
          <Certificate
            imageUrl="https://api2.sololearn.com/v2/certificates/CC-CQEREPAF/image/jpg?t=638473123349047310"
            title="Introducción a Java"
          />
          <Certificate
            imageUrl="https://api2.sololearn.com/v2/certificates/CC-X0VRVOVO/image/jpg?t=638473385034668910"
            title="Java Intermedio"
          />
          <Certificate
            imageUrl="https://api2.sololearn.com/v2/certificates/CC-KOCJKHTH/image/jpg?t=638475064215839520"
            title="Introducción a JavaScript"
          />
          <Certificate
            imageUrl="https://api2.sololearn.com/v2/certificates/CC-KL0DUTKY/image/jpg?t=638562894306235380"
            title="JavaScript Intermediate"
          />
        </div>
      </div>
    </div>
  );
};

export default Studies;
