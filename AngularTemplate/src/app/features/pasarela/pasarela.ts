import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Necesario para capturar inputs
import { AlertasService } from "../../core/utils/alertas.service";
import { CarritoService} from "../../core/services/carrito/carrito.service";
import { PasarelaService} from "../../core/services/pasarela/pasatela.service";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-pasarela',
    standalone: true,
    imports: [RouterLink, CommonModule, FormsModule],
    templateUrl: './pasarela.html',
    styleUrl: './pasarela.scss',
})
export class Pasarela {
    // Inyecciones
    private alertService = inject(AlertasService);
    private router = inject(Router);
    public carritoService = inject(CarritoService);
    private pasarelaService = inject(PasarelaService);

    // Modelo para el formulario
    datosPago = {
        titular: '',
        numero: '',
        fecha: '',
        cvc: ''
    };

    confirmar() {
        // Validar que el carrito no esté vacío
        if (this.carritoService.items().length === 0) {
            this.alertService.alert('Error', 'El carrito está vacío', 'error');
            return;
        }

        // Llamar al servicio de pasarela
        this.pasarelaService.finalizarCompra(this.datosPago, this.carritoService.items()).subscribe({
            next: (res) => {
                this.alertService.alert('Excelente', 'Tu pedido está en camino', 'success');

                this.carritoService.limpiarCarrito();
                setTimeout(() => this.router.navigate(['/']), 2000);
            },

        });
    }
}