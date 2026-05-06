import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PedidoService {
    private apiUrl: string = environment.apiURL;

    constructor(private http: HttpClient) {}

    private getHeaders(): HttpHeaders {
        const token = localStorage.getItem('access_token');
        return new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
    }

    obtenerMisPedidos(): Observable<any> {
        return this.http.get(`${this.apiUrl}/mis-pedidos/`, {
            headers: this.getHeaders()
        });
    }

    confirmarCompra(carrito: any[], total: number): Observable<any> {
        return this.http.post(
            `${this.apiUrl}/confirmar-compra/`,
            { carrito, total },
            { headers: this.getHeaders() }
        );
    }
}