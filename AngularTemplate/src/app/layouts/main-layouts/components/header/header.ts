import { Component, inject } from '@angular/core';
import { Router, RouterLink } from "@angular/router";
import { LoginServices } from "../../../../core/services/login/login.services";

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [
        RouterLink
    ],
    templateUrl: './header.html',
    styleUrl: './header.scss',
})
export class Header {
    private loginService = inject(LoginServices);
    private router = inject(Router);

    get userName(): string | null {
        if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
            return null;
        }
        const userStr = localStorage.getItem('user');
        if (userStr) {
            try {
                return JSON.parse(userStr).nombre;
            } catch (e) {
                return null;
            }
        }
        return null;
    }

    logout() {
        this.loginService.logout();
        this.router.navigate(['/']);
    }
}
