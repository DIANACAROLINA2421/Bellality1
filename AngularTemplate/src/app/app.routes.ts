import { Routes } from '@angular/router';


export const routes: Routes = [
    {
        path: '',
        loadComponent:()=>import('./features/auth/login/login').then(m => m.Login),
        title:"inicio",
    },
    {
        path: 'register',
        loadComponent:()=>import('./features/auth/register/register').then(m => m.Register),
        title:"register",
    },
    {
        path: 'MainLayout',
        loadComponent:()=>import('./layouts/main-layouts/main-layouts').then(m => m.MainLayouts),
        title:"MainLayout",
    },


];
