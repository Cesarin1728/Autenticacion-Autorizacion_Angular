import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  imports: [],
  selector: 'app-home.component',
  styleUrl: './home.component.css',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  nombre = signal<string | null>(null);
  correo = signal<string | null>(null);
  rol = signal<string | null>(null);

  constructor(private authService: AuthService, private router: Router) {
    this.nombre.set(this.authService.obtenerNombre());
    this.correo.set(this.authService.obtenerCorreo());
    this.rol.set(this.authService.obtenerRol());

    // El backend vuelve a validar el token
    this.authService.obtenerPerfil().subscribe({
      next: (perfil) => {
        this.nombre.set(perfil.nombre);
        this.correo.set(perfil.correo);
        this.rol.set(perfil.rol);
      },
      error: (error) => {
        if (error.status === 401) {
          this.authService.cerrarSesion();
          this.router.navigate(['/login']);
        }
      }
    });
  }
}