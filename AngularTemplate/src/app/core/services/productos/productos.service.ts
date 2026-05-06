import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http"; // 1. Importar HttpParams
import { Observable } from "rxjs";
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root',
})
export class ProductsService {
    private URL = environment.apiURL;
    private http = inject(HttpClient); // Uso de inject para mayor limpieza

    // 2. Modificamos para recibir el slug de la categoría
    getProductos(categoriaSlug?: string): Observable<any> {
        let params = new HttpParams();

        if (categoriaSlug) {
            // Este nombre 'categoria' debe coincidir con request.query_params.get('categoria') en Django
            params = params.set('categoria', categoriaSlug);
        }

        // 3. ¡IMPORTANTE! Pasar el objeto { params } como segundo argumento
        return this.http.get<any>(`${this.URL}/todos-productos/`, { params });
    }

    getCategorias(): Observable<any>{
        return this.http.get<any>(`${this.URL}/categorias/`);
    }

    deleteProducto(id: number) {
        return this.http.delete<any>(`${this.URL}/productos/${id}`);
    }
}