import {inject, Injectable} from '@angular/core';
import {environment} from "../../../environments/envaironments";
import {HttpClient} from "@angular/common/http";
import {Inicio} from "../../../features/inicio/inicio";

@Injectable({
  providedIn: 'root',
})

export class CategoriasService {
    private URL = environment.apiURL;
    private httpClient = inject(HttpClient);


    get(){
        return this.httpClient.get<any>(`${this.URL}/categorias/`);
    }
  
}
