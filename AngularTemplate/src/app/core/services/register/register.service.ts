import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/envaironments";

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  private http = inject(HttpClient);
  private URL=`${environment.apiURL}/register/`




  postregister(datos:any){
    return this.http.post<any>(this.URL, datos)
  }
}


