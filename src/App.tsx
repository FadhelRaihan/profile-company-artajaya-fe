import { Routes, Route } from 'react-router-dom';
import Landing from './pages/landing'
import Project from './pages/project';
import ProjectDetail  from './pages/project-detail';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Landing />} />

          {/* 404 Page */}
          {/* <Route path="*" element={<NotFound />} /> */}

          {/* route project */}
          <Route path="/project" element={<Project />} />

          {/* route project detail */}
          <Route path="/projects/:id" element={<ProjectDetail />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;