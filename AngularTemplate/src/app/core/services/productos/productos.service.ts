
import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../environments/envaironments";




@Injectable({
    providedIn: 'root',
})
export class ProductsService {

    private URL = environment.apiURL;

    constructor(
        private http: HttpClient,
    ) {
    }

    getProductos(): Observable<any> {
        return this.http.get<any>(`${this.URL}/todos-productos/`);
    }

    getCategorias(): Observable<any>{
        return this.http.get<any>(`${this.URL}/categorias/`);
    }


}

