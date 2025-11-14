import { Component } from 'lucide-react';
import { lazy } from 'react';

const LandingPage = lazy(() => import('@/pages/main-landing'));
const Login = lazy(() => import('@/pages/auth/login'));
const MainProject = lazy(() => import('@/pages/project-section/hero-projects-section'))
const SubDetailProject = lazy(() => import('@/pages/project-section/subdetail-projects-section'))
const ProjectPages = lazy(() => import('@/pages/main-project'))
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
    path: '/kegiatan-kami',
    Component: KegiatanKami
  }
];

export default routes;
