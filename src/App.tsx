import { BrowserRouter, useRoutes } from 'react-router-dom';
import { Suspense } from 'react';
import routes from '@/routes';

// Komponen untuk render routes
const AppRoutes: React.FC = () => {
  const element = useRoutes(routes);
  
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
          </div>
        }>
          {element}
        </Suspense>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
};

export default App;