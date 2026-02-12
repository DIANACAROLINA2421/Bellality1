import {Routes} from '@angular/router';


export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./layouts/main-layouts/main-layouts').then(m => m.MainLayouts),
        title: "inicio",

    },
    {
        path: 'login',
        loadComponent: () => import('./features/auth/login/login').then(m => m.Login),
        title: "login",


    },
    {
        path: 'register',
        loadComponent:()=>import('./features/auth/register/register').then(m => m.Register),
        title:"register",



    },
    {
        path: 'blog',
        loadComponent:()=>import('./features/blog/blog').then(m => m.Blog),
        title:"blog",



    },


];
