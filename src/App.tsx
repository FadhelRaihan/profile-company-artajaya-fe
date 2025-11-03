import { Routes, Route } from 'react-router-dom';
import Landing from './pages/landing'
import Project from './pages/project';
import ProjectDetail  from './pages/project-detail';
import ScrollToTop from './components/ScrollToTop'; // atau './ScrollToTop' jika taruh di src/




function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
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