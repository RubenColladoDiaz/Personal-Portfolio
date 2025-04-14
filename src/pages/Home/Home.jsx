import React from "react";
import { useFirestore, useFirestoreDocData } from "reactfire";

function getAge() {
  const today = new Date();
  let age = today.getFullYear();
  return age;
}

function Home() {
  const homeRef = useFirestore()
    .collection("home")
    .doc("main-info");
  
  const { status, data: homeInfo } = useFirestoreDocData(homeRef);

  if (status === "loading") {
    return (
      <div className="h-[calc(100vh-60px)] w-full flex items-center justify-center text-white relative overflow-hidden mt-[60px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  let age = getAge();
  return (
    <div className="h-[calc(100vh-60px)] w-full flex flex-col items-center justify-center text-white relative overflow-hidden mt-[60px]">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black opacity-90" />

      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 text-center mb-40">
        <div className="mb-8">
          <p className="text-2xl font-montserrat tracking-widest animate-pulse">
            {age}
          </p>
        </div>

        <div className="space-y-4">
          <h1 className="lg:text-8xl text-4xl md:text-9xl font-poppins font-medium bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text animate-fade-in">
            {homeInfo.name}.
          </h1>
          <p className="lg:text-4xl text-xl font-montserrat text-gray-300 animate-slide-up">
            {homeInfo.title}
          </p>
        </div>
      </div>

      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 w-3/4 max-w-4xl">
        <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent" />
      </div>

      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `float ${3 + Math.random() * 5}s infinite ease-in-out`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;
