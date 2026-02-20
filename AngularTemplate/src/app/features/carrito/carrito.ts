import {Component, inject} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {AlertasService} from "../../core/utils/alertas.service";

@Component({
    selector: 'app-carrito',
    imports: [
        RouterLink
    ],
    templateUrl: './carrito.html',
    styleUrl: './carrito.scss',
})
export class Carrito {
    private alertService = inject(AlertasService)
    private router = inject(Router);


    eliminar() {

        this.alertService.alert('Alerta', 'Seguro desea eliminar el producto', 'warning')
    }
}
