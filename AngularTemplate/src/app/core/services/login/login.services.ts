import { Injectable } from '@angular/core';
import { environment } from "../../../../environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root',
})
export class LoginServices {

    private URL = environment.apiURL;

    constructor(private http: HttpClient) {}

    postLogin(datos: any) {
        return this.http.post<any>(`${this.URL}/login/`, datos);
    }

    // ✅ Devuelve true si hay token guardado en localStorage
    isLogged(): boolean {
        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
            return !!localStorage.getItem('access_token');
        }
        return false;
    }

    logout() {
        if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
            localStorage.removeItem('user');
            localStorage.removeItem('access_token');
        }
    }
}