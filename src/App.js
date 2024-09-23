import React, { useState, useEffect } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert'; // Elimina esto si no tienes el componente Alert definido

const Header = () => (
  <header className="bg-gray-800 text-white p-4">
    <h1 className="text-2xl">Gestión de Proyectos</h1>
  </header>
);

const Sidebar = () => (
  <aside className="bg-gray-200 w-64 p-4 h-screen">
    <nav>
      <ul>
        <li><a href="#" className="block py-2">Dashboard</a></li>
        <li><a href="#" className="block py-2">Proyectos</a></li>
        <li><a href="#" className="block py-2">Tareas</a></li>
        <li><a href="#" className="block py-2">Equipo</a></li>
      </ul>
    </nav>
  </aside>
);

const ProjectCard = ({ project }) => (
  <div className="bg-white shadow-md rounded p-4 mb-4">
    <h3 className="text-xl mb-2">{project.name}</h3>
    <p>{project.description}</p>
  </div>
);

const ProjectList = ({ projects }) => (
  <div>
    {projects.map(project => (
      <ProjectCard key={project.id} project={project} />
    ))}
  </div>
);

const CreateProjectForm = ({ onCreateProject }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'El nombre es requerido';
    if (!description.trim()) newErrors.description = 'La descripción es requerida';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onCreateProject({ name, description });
      setName('');
      setDescription('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-4">
        <label className="block mb-2">Nombre del Proyecto:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 border rounded"
        />
        {errors.name && <span className="text-red-500">{errors.name}</span>}
      </div>
      <div className="mb-4">
        <label className="block mb-2">Descripción:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
        />
        {errors.description && <span className="text-red-500">{errors.description}</span>}
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Crear Proyecto
      </button>
    </form>
  );
};

const SearchBar = ({ projects }) => {
  const [search, setSearch] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (search.trim()) {
      const filteredProjects = projects.filter(project =>
        project.name.toLowerCase().includes(search.toLowerCase())
      );
      setSuggestions(filteredProjects);
    } else {
      setSuggestions([]);
    }
  }, [search, projects]);

  return (
    <div className="relative mb-4">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Buscar proyectos..."
        className="w-full p-2 border rounded"
      />
      {suggestions.length > 0 && (
        <ul className="absolute w-full bg-white border rounded mt-1">
          {suggestions.map(project => (
            <li key={project.id} className="p-2 hover:bg-gray-100 cursor-pointer">
              {project.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const Dashboard = ({ projects, onCreateProject }) => (
  <main className="p-4">
    <h2 className="text-2xl mb-4">Dashboard</h2>
    <SearchBar projects={projects} />
    <CreateProjectForm onCreateProject={onCreateProject} />
    <ProjectList projects={projects} />
  </main>
);

const App = () => {
  const [projects, setProjects] = useState([
    { id: 1, name: 'Proyecto 1', description: 'Descripción del Proyecto 1' },
    { id: 2, name: 'Proyecto 2', description: 'Descripción del Proyecto 2' },
  ]);
  const [showNotification, setShowNotification] = useState(false);

  const handleCreateProject = (newProject) => {
    setProjects([...projects, { ...newProject, id: projects.length + 1 }]);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000);
  };

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <Dashboard projects={projects} onCreateProject={handleCreateProject} />
      </div>
      {showNotification && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded">
          Proyecto creado con éxito
        </div>
      )}
    </div>
  );
};

export default App;
