import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  imports: [],
  selector: 'app-home.component',
  styleUrl: './home.component.css',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  nombre: string | null;
  correo: string | null;
  rol: string | null;

  constructor(private authService: AuthService) {
    this.nombre = this.authService.obtenerNombre();
    this.correo = this.authService.obtenerCorreo();
    this.rol = this.authService.obtenerRol();
  }
}