import React from "react";

function StudyCard({
  title,
  institution,
  period,
  description,
  technologies,
  location,
  url,
}) {
  return (
    <div className="group relative overflow-hidden rounded-xl bg-gray-900/50 backdrop-blur-sm border border-white/10 hover:border-blue-500/50 transition-all duration-300">
      <div className="p-6">
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-poppins font-medium group-hover:text-blue-400 transition-colors">
              {title}
            </h2>
            <h3 className="text-xl text-blue-400">{institution}</h3>
            <p className="text-gray-400">{period}</p>
            <p className="text-gray-400 text-sm mt-1">{location}</p>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 text-sm"
            >
              Visitar sitio web
            </a>
          </div>

          <p className="text-gray-300">{description}</p>

          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default StudyCard;
