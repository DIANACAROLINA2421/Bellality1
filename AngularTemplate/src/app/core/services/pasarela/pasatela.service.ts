import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PasarelaService {
    private http = inject(HttpClient);
    private URL = environment.apiURL;

    private getHeaders(): HttpHeaders {
        const token = localStorage.getItem('access_token');
        return new HttpHeaders({
            'Authorization': `Bearer ${token}`
        });
    }

    confirmarCompra(carrito: any[], total: number): Observable<any> {
        return this.http.post(
            `${this.URL}/confirmar-compra/`,
            { carrito, total },
            { headers: this.getHeaders() }
        );
    }
}