import { lazy } from 'react';

const LandingPage = lazy(() => import('@/pages/landing'));
const Login = lazy(() => import('@/pages/auth/login'));
const Dashboard = lazy(() => import('@/pages/dashboard'));
const ProjectPage = lazy(() => import('@/pages/project'));
const ProjectDetail = lazy(() => import('@/pages/project-detail'));
const TimKami = lazy(() => import('@/pages/timKami'));

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
    path: '/dashboard',
    Component: Dashboard,
  },
  {
    path: '/project',
    Component: ProjectPage,
  },
  {
    path:'/project/:id',
    Component: ProjectDetail,
  },
  {
    path: '/timKami',
    Component: TimKami,
  }
];

export default routes;
