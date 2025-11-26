// import { Component } from 'lucide-react';
// import { lazy } from 'react';

// const LandingPage = lazy(() => import('@/pages/main-landing'));
// const Login = lazy(() => import('@/pages/auth/login'));
// const MainProject = lazy(() => import('@/pages/project-section/hero-projects-section'))
// const SubDetailProject = lazy(() => import('@/pages/project-section/subdetail-projects-section'))
// const ProjectPages = lazy(() => import('@/pages/main-project'))
// const TestimoniForm = lazy(() => import('@/pages/testimoni-form'))
// const TeamActivitySection = lazy(() => import('@/pages/team-activity-section'))
// const Page404 = lazy(() => import('@/pages/404NotFound'));

// const routes = [
//   {
//     path: '/',
//     Component: LandingPage,
//   },
//   {
//     path: '/landing',
//     Component: LandingPage,
//   },
//   {
//     path: '/login',
//     Component: Login,
//   },
//   {
//     path: '/project-pages',
//     Component: ProjectPages,
//   },
//   {
//     path: '/main-project',
//     Component: MainProject
//   },
//   {
//     path: '/project/:id',
//     Component: SubDetailProject
//   },
//   {
//     path: '/testimoni-form',
//     Component: TestimoniForm
//   },
//   {
//     path: '/team-activity-section',
//     Component: TeamActivitySection
//   },
//   //404 Page
//   {
//   path: '*',
//   Component: Page404,
// }
// ];

// export default routes;

import {
  Landing,
    
    Project,
    SubDetailProject,
    ProjectPages,

    TestimoniForm,

    TeamActivitySection,

    Page404,
} from "@/pages/index"

const routes = [
  {path: '/', name: "Landing", element: Landing},
  {path: "/project", name: "Project", element: Project},
  {path: "/project/:projectId", name:"Sub-Detail Project", element: SubDetailProject},
  {path: "/project-pages", name: "Project Pages", element: ProjectPages},
  {path: "/testimoni-form", name:"Testimoni Form", element: TestimoniForm},
  {path: "/team-activity-section", name: "Team Activity Section", element: TeamActivitySection},
  {path: "*", name: "404 Page", element: Page404},
];

export default routes;