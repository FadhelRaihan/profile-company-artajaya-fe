// import { Component } from 'lucide-react';
import { lazy } from 'react';

const LandingPage = lazy(() => import('../pages/main-landing'));
const MainProject = lazy(() => import('../pages/project-section/hero-projects-section'))
const SubDetailProject = lazy(() => import('../pages/project-section/subdetail-projects-section'))
const ProjectPages = lazy(() => import('../pages/main-project'))
const TeamActivitySection = lazy(() => import('../pages/team-activity-section'))

const routes = [
  {
    path: '/',
    Component: LandingPage,
  },
  {
    path: '/landing',
    Component: LandingPage,
  },
  {
    path: '/project-pages',
    Component: ProjectPages,
  },
  {
    path: '/main-project',
    Component: MainProject
  },
  {
    path: '/project/:id',
    Component: SubDetailProject
  },
  {
    path: '/team-activity-section',
    Component: TeamActivitySection
  }
];

export default routes;
