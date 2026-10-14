import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-iniciar-sesion.component',
  imports: [],
  styleUrl: './iniciar-sesion.component.css',
  templateUrl: './iniciar-sesion.component.html',
})
export class IniciarSesionComponent {
  constructor(private authService: AuthService, private router: Router) {}

  iniciarSesion(event: Event) {
    event.preventDefault();
    const formulario = event.target as HTMLFormElement;
    const datos = new FormData(formulario);
    const usuario = {
      correo: datos.get('correo') as string,
      contrasena: datos.get('password') as string
    };

    this.authService.login(usuario).subscribe({ // Enviamos las credenciales a authService.login
      next: (respuesta) => {
        console.log('Inicio de sesión correcto', respuesta);
        this.authService.guardarToken(respuesta.token, respuesta.rol, respuesta.nombre, respuesta.correo);
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.log('Usuario o contraseña incorrectos', error);
      }
    });
  }
}