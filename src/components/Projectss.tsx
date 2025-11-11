import React from "react";
import { projects } from "../data/projects";

const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-purple-400 mb-10 text-center">Projects</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((p, index) => (
            <div
              key={index}
              className="bg-[#0f1112] p-6 rounded-xl shadow-lg transform transition-all duration-500 hover:scale-105 hover:shadow-2xl relative"
            >
              {/* Internal badge */}
              {p.internal && (
                <span className="absolute top-4 right-4 text-xs bg-red-500 text-white px-2 py-1 rounded-full uppercase font-bold">
                  Internal
                </span>
              )}

              <h3 className="text-xl font-semibold text-purple-300">{p.title}</h3>
              <p className="text-gray-300 mt-2">{p.desc}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <span
                    key={t}
                    className="text-sm text-gray-300 bg-purple-900/30 px-2 py-1 rounded transition-all duration-300 hover:bg-purple-700 hover:scale-105"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* External project links */}
              {!p.internal && (
                <div className="mt-4 flex gap-3 flex-wrap">
                  {p.demo && (
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-300"
                    >
                      View Demo
                    </a>
                  )}
                  {p.github && (
                    <a
                      href={p.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg shadow-lg transition-all duration-300"
                    >
                      GitHub
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
