import {inject, Injectable} from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Inicio} from "../../../features/inicio/inicio";
import { map } from 'rxjs/operators';


@Injectable({
    providedIn: 'root',
})

export class CategoriasService {
    private URL = environment.apiURL;
    private httpClient = inject(HttpClient);


    get() {
        return this.httpClient.get<any>(`${this.URL}/categorias/`)
            .pipe(
                map(res => res.data)
            );
    }
}
