import {Routes} from '@angular/router';


export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./layouts/main-layouts/main-layouts').then(m => m.MainLayouts),
        title: "inicio",

        children: [
            {
                path: '',
                loadComponent: () => import('./features/inicio/inicio').then(m => m.Inicio),
                title: "inicio",


            },

            {
                path: 'blog',
                loadComponent: () => import('./features/blog/blog').then(m => m.Blog),
                title: "blog",


            },
            {
                path: 'productos',
                loadComponent: () => import('./features/productos/productos').then(m => m.Productos),
                title: "productos",


            },
            {
                path: 'carrito',
                loadComponent: () => import('./features/carrito/carrito').then(m => m.Carrito),
                title: "carrito",


            },
            {
                path: 'sobreNosotros',
                loadComponent: () => import('./features/about/about').then(m => m.About),
                title: "sobreNosotros",


            },


        ]
    },
    {
        path: 'login',
        loadComponent: () => import('./features/auth/login/login').then(m => m.Login),
        title: "login",


    },
    {
        path: 'register',
        loadComponent: () => import('./features/auth/register/register').then(m => m.Register),
        title: "register",


    },
];



