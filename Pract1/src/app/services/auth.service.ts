import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Credenciales } from '../modelos/credenciales';
import { RespuestaLogin } from '../modelos/respuesta-login';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private url = 'http://localhost:3000/api';

    constructor(private http: HttpClient) {}

    // Enviar las credenciales al backend y recibir la respuesta
    login(usuario: Credenciales): Observable<RespuestaLogin> {
        return this.http.post<RespuestaLogin>(`${this.url}/login`, usuario);
    }

    guardarToken(token: string, rol: string) {
        localStorage.setItem('token', token);
        localStorage.setItem('rol', rol);
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
    }

    obtenerRol() {
        return localStorage.getItem('rol');
    }

    tieneRol(rolesPermitidos: string[]): boolean {
        const rol = this.obtenerRol();
        return rol !== null && rolesPermitidos.includes(rol);
    }
}