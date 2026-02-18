import { Component } from '@angular/core';
import {Footer} from "./components/footer/footer";
import {Header} from "./components/header/header";
import {RouterOutlet} from "@angular/router";


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
export class MainLayouts {

}
