// import { Component } from 'lucide-react';
import { lazy } from 'react';

const LandingPage = lazy(() => import('@/pages/main-landing'));
const Login = lazy(() => import('@/pages/auth/login'));
const MainProject = lazy(() => import('@/pages/project-section/hero-projects-section'))
const SubDetailProject = lazy(() => import('@/pages/project-section/subdetail-projects-section'))
const ProjectPages = lazy(() => import('@/pages/main-project'))
const TestimoniForm = lazy(() => import('@/pages/testimoni-form'))
const TeamActivitySection = lazy(() => import('@/pages/team-activity-section'))

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
    path: '/login',
    Component: Login,
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
    path: '/testimoni-form',
    Component: TestimoniForm
  },
  {
    path: '/team-activity-section',
    Component: TeamActivitySection
  }
];

export default routes;
