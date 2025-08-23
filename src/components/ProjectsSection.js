import React, { useState, useRef, useEffect } from 'react';
import { Upload } from 'lucide-react';

const ProjectsSection = ({ 
  projects, 
  editMode, 
  addProject, 
  updateProject, 
  deleteProject, 
  setSelectedImage
}) => {
  const scrollContainerRef = useRef(null);
  const contentRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const animationFrameRef = useRef(null);

  // Duplicate projects for seamless looping
  const duplicatedProjects = [...projects, ...projects];

  useEffect(() => {
    if (!scrollContainerRef.current || !contentRef.current) return;

    const scrollContainer = scrollContainerRef.current;
    const content = contentRef.current;
    let scrollPosition = 0;
    const scrollSpeed = 0.5; // Adjust speed as needed

    const scroll = () => {
      if (isPaused) return;
      
      scrollPosition += scrollSpeed;
      
      // Reset scroll position when we've scrolled the entire width of the original content
      if (scrollPosition >= content.scrollWidth / 2) {
        scrollPosition = 0;
      }
      
      scrollContainer.scrollLeft = scrollPosition;
      animationFrameRef.current = requestAnimationFrame(scroll);
    };

    animationFrameRef.current = requestAnimationFrame(scroll);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPaused, projects.length]);

  return (
    <section id="projects" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl font-bold">Our Projects</h2>
          {editMode && (
            <button
              onClick={addProject}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center space-x-2"
            >
              <Upload size={18} />
              <span>Add Project</span>
            </button>
          )}
        </div>
        
        {/* Scrolling Container */}
        <div 
          ref={scrollContainerRef}
          className="overflow-x-hidden relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div 
            ref={contentRef}
            className="flex space-x-6 py-4 w-max"
          >
            {duplicatedProjects.map((project, index) => (
              <div 
                key={`${project.id}-${index}`} 
                className="flex-none w-80 bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-transform duration-300 transform hover:scale-105"
              >
                <div className="relative">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover cursor-pointer"
                    onClick={() => setSelectedImage(project)}
                  />
                  {editMode && (
                    <div className="absolute top-2 right-2 space-x-2">
                      <button
                        onClick={() => deleteProject(project.id)}
                        className="bg-red-500 text-white p-1 rounded text-xs hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  {editMode ? (
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={project.title}
                        onChange={(e) => updateProject(project.id, 'title', e.target.value)}
                        className="w-full border border-gray-300 rounded px-2 py-1 font-semibold"
                      />
                      <select
                        value={project.category}
                        onChange={(e) => updateProject(project.id, 'category', e.target.value)}
                        className="w-full border border-gray-300 rounded px-2 py-1"
                      >
                        <option value="Residential">Residential</option>
                        <option value="Apartments">Apartments</option>
                        <option value="Commercial">Commercial</option>
                      </select>
                      <textarea
                        value={project.description}
                        onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                        className="w-full border border-gray-300 rounded px-2 py-1 resize-none"
                        rows="3"
                      />
                      <div className="grid grid-cols-3 gap-2">
                        <input
                          type="text"
                          value={project.location}
                          onChange={(e) => updateProject(project.id, 'location', e.target.value)}
                          className="border border-gray-300 rounded px-2 py-1 text-sm"
                          placeholder="Location"
                        />
                        <input
                          type="text"
                          value={project.year}
                          onChange={(e) => updateProject(project.id, 'year', e.target.value)}
                          className="border border-gray-300 rounded px-2 py-1 text-sm"
                          placeholder="Year"
                        />
                        <input
                          type="text"
                          value={project.size}
                          onChange={(e) => updateProject(project.id, 'size', e.target.value)}
                          className="border border-gray-300 rounded px-2 py-1 text-sm"
                          placeholder="Size"
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                      <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full mb-3">
                        {project.category}
                      </span>
                      <p className="text-gray-600 text-sm mb-4">{project.description}</p>
                      <div className="grid grid-cols-3 gap-2 text-xs text-gray-500">
                        <div><strong>Location:</strong> {project.location}</div>
                        <div><strong>Year:</strong> {project.year}</div>
                        <div><strong>Size:</strong> {project.size}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Gradient overlays for a smoother transition */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none"></div>
        </div>

        {/* Instructions for users */}
        {!editMode && (
          <div className="text-center mt-6 text-gray-500 text-sm">
            <p>Hover to pause</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProjectsSection;