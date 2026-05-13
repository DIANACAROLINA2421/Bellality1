import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";

@Injectable({
    providedIn: 'root',
})
export class ProductsService {
    private URL = environment.apiURL;
    private http = inject(HttpClient);

    getProductos(categoriaSlug?: string): Observable<any> {
        let params = new HttpParams();

        if (categoriaSlug) {
            params = params.set('categoria', categoriaSlug);
        }

        return this.http.get<any>(`${this.URL}/todos-productos/`, { params });
    }

    getCategorias(): Observable<any> {
        return this.http.get<any>(`${this.URL}/categorias/`);
    }

    deleteProducto(id: number) {
        return this.http.delete<any>(`${this.URL}/productos/${id}`);
    }
}