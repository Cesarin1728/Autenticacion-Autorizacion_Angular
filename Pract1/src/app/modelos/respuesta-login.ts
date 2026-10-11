export interface RespuestaLogin { // Datos recibidos del backend
    token: string;
    nombre: string;
    correo: string;
    rol: string;
}