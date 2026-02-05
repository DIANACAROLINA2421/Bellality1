import { Component } from '@angular/core';
import {Footer} from "./components/footer/footer";
import {Header} from "./components/header/header";

@Component({
  selector: 'app-main-layouts',
    imports: [
        Footer,
        Header
    ],
  templateUrl: './main-layouts.html',
  styleUrl: './main-layouts.scss',
})
export class MainLayouts {

}
