import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/envaironments';

@Injectable({
    providedIn: 'root'
})
export class PasarelaService {
    private http = inject(HttpClient);
    private URL = environment.apiURL;

    // Enviar los datos del pago y del carrito a Django
    finalizarCompra(datosPago: any, carrito: any[]): Observable<any> {
        const payload = {
            pago: datosPago,
            items: carrito
        };
        return this.http.post(`${this.URL}/finalizar-compra/`, payload);
    }
}