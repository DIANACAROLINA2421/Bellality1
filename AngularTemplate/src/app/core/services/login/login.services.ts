import { Injectable } from '@angular/core';
import {environment} from "../../../environments/envaironments";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class LoginServices {

  private URL = environment.apiURL;

  constructor(private http: HttpClient) {

  }

  postLogin(datos:any){
    return this.http.post<any>(`${this.URL}/login/`,datos)
  }

  logout() {
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
        localStorage.removeItem('user');
        localStorage.removeItem('access_token');
    }
  }
}
