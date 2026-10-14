import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Credenciales } from '../modelos/credenciales';
import { RespuestaLogin } from '../modelos/respuesta-login';
import { Perfil } from '../modelos/perfil';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private url = 'http://localhost:3000/api'; // Dirección del back

    constructor(private http: HttpClient) {}

    // Enviar las credenciales al backend y recibir la respuesta
    login(usuario: Credenciales): Observable<RespuestaLogin> {
        return this.http.post<RespuestaLogin>(`${this.url}/login`, usuario);
    }

    guardarToken(token: string, rol: string, nombre: string, correo: string) {
        localStorage.setItem('token', token);
        localStorage.setItem('rol', rol);
        localStorage.setItem('nombre', nombre);
        localStorage.setItem('correo', correo);
    }

    obtenerToken() {
        return localStorage.getItem('token');
    }

    estaAutenticado() {
        return this.obtenerToken() !== null;
    }

    cerrarSesion() {
        localStorage.removeItem('token');
        localStorage.removeItem('rol');
        localStorage.removeItem('nombre');
        localStorage.removeItem('correo');
    }

    obtenerRol() {
        return localStorage.getItem('rol');
    }

    obtenerNombre() {
        return localStorage.getItem('nombre');
    }

    obtenerCorreo() {
        return localStorage.getItem('correo');
    }

    // Consultar la ruta protegida enviando el token
    obtenerPerfil(): Observable<Perfil> {
        return this.http.get<Perfil>(`${this.url}/perfil`, {
            headers: { Authorization: `Bearer ${this.obtenerToken()}` }
        });
    }

    tieneRol(rolesPermitidos: string[]): boolean {
        const rol = this.obtenerRol();
        return rol !== null && rolesPermitidos.includes(rol);
    }
}