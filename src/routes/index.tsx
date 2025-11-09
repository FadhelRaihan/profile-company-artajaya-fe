import { lazy } from 'react';

const LandingPage = lazy(() => import('@/pages/landing'));
const Login = lazy(() => import('@/pages/auth/login'));
const Dashboard = lazy(() => import('@/pages/dashboard'));

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
  }
];

export default routes;
