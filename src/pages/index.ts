import React from "react";

const Landing = React.lazy(() => import ("@/pages/main-landing"))

const Project = React.lazy(() => import('@/pages/project-section/hero-projects-section'))
const SubDetailProject = React.lazy(() => import('@/pages/project-section/subdetail-projects-section'))
const ProjectPages = React.lazy(() => import('@/pages/main-project'))

//Testimoni
const TestimoniForm = React.lazy(() => import('@/pages/testimoni-form'))

//Activity
const TeamActivitySection = React.lazy(() => import('@/pages/team-activity-section'))

//Not Found
const Page404 = React.lazy(() => import('@/pages/404NotFound'));

export {
    Landing,
    
    Project,
    SubDetailProject,
    ProjectPages,

    TestimoniForm,

    TeamActivitySection,

    Page404,
}