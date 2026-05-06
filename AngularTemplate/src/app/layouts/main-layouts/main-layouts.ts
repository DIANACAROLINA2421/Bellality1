import { Component, OnInit } from '@angular/core';
import { Footer } from "./components/footer/footer";
import { Header } from "./components/header/header";
import { RouterOutlet } from "@angular/router";

@Component({
    selector: 'app-main-layouts',
    imports: [
        Footer,
        Header,
        RouterOutlet,
    ],
    templateUrl: './main-layouts.html',
    styleUrl: './main-layouts.scss',
})
export class MainLayouts implements OnInit {

    isLoggedIn = false;

    ngOnInit(): void {
        this.isLoggedIn = !!localStorage.getItem('access_token');
    }
}
