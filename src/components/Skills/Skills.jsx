import React from "react";

function Skills({ skills }) {
  return (
    <div className="mb-20">
      <h2 className="text-4xl lg:text-left text-center font-poppins mb-10 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
        Aptitudes
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Object.entries(skills).map(([category, items], index) => (
          <div
            key={index}
            className="group relative overflow-hidden rounded-xl bg-gray-900/50 backdrop-blur-sm border border-white/10 hover:border-blue-500/50 transition-all duration-300"
          >
            <div className="p-6">
              <h3 className="text-xl lg:text-left text-center font-poppins font-medium text-blue-400 mb-4">
                {category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {items.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="px-3 py-1 mx-auto lg:mx-0 bg-blue-500/10 text-blue-400 rounded-full text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Skills;
