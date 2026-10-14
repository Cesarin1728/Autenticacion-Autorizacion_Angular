import { Routes } from '@angular/router';
import { IniciarSesionComponent } from './componentes/iniciar-sesion.component/iniciar-sesion.component';
import { HomeComponent } from './componentes/home.component/home.component';
import { SinAccesoComponent } from './componentes/sin-acceso.component/sin-acceso.component';
import { authGuard } from './guards/auth-guard';
import { roleGuard } from './guards/role-guard';

export const routes: Routes = [
    // { path: '', component: IniciarSesionComponent }
    { // Si no hay nada, lleva a login 
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: IniciarSesionComponent
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [authGuard, roleGuard],
        data: { // roleGuard lee la lista de los roles permitidos
            roles: ['Admin', 'Almacen', 'Trabajador']
        }
    },
    {
        path: 'sin-acceso',
        component: SinAccesoComponent
    }
];