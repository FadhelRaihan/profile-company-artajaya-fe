import { Routes, Route } from 'react-router-dom';
import Landing from './pages/landing'
import Project from './pages/project';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Landing />} />

          {/* 404 Page */}
          {/* <Route path="*" element={<NotFound />} /> */}
          <Route path="/project" element={<Project />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;