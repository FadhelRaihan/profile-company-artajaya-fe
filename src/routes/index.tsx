import { Component } from 'lucide-react';
import { lazy } from 'react';

const LandingPage = lazy(() => import('@/pages/landing'));
const Login = lazy(() => import('@/pages/auth/login'));
const MainProject = lazy(() => import('@/pages/ProjectSection/main-project'))
const SubDetailProject = lazy(() => import('@/pages/ProjectSection/sub-detail-projects'))
const ProjectPages = lazy(() => import('@/pages/project-pages'))
const KegiatanKami = lazy(() => import('@/pages/kegiatan-kami-section'))

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
    path: '/ProjectPages',
    Component: ProjectPages,
  },
  {
    path: '/MainProject',
    Component: MainProject
  },
  {
    path: '/project/:id',
    Component: SubDetailProject
  },
  {
    path: '/KegiatanKami',
    Component: KegiatanKami
  }
];

export default routes;
