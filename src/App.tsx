import { BrowserRouter, useRoutes, useLocation } from "react-router-dom";
import { useEffect, Suspense } from "react";
import routes from "@/routes";


const usePageTitle = () => {
  const location = useLocation();
  useEffect(() => {
    const path = location.pathname;
    if (path.startsWith('/')) {
      document.title = 'Artajaya';
      return;
    }

    if (path === '/') {
      document.title = 'Artajaya';
      return;
    }
    const segments = path
      .split('/')
      .filter(Boolean)
      .map((segment) =>
        segment
          .split('-')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
      );
    if (segments.length === 0) {
      document.title = 'Artajaya';
    } else {
      document.title = segments.join(' - ');
    }
  }, [location]);
};


const AppRoutes: React.FC = () => {

  usePageTitle(); 

  // Konversi array routes menjadi format useRoutes
  const element = useRoutes(
    routes.map((route) => ({
      path: route.path,
      element: <route.element />,
    }))
  );

  return (
    
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-screen">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
          }
        >
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
