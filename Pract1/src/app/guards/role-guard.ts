import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { inject, Inject } from '@angular/core';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    // Obtenemos los roles permitidos en la ruta. Del data de app.ruotes.ts
    const rolesPermitidos: string[] = route.data['roles'] ?? [];

    // Verificar que exista una sesion
    if (!authService.estaAutenticado()) {
      return router.createUrlTree(['/login']);
    }

    // Verificar si el usuario tiene permisos
    if (authService.tieneRol(rolesPermitidos)) {
      return true; // Permitimos el acceso
    }

    return router.createUrlTree(['/sin-acceso']);
};