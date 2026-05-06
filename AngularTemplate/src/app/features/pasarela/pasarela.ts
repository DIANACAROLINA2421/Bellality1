import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AlertasService } from '../../core/utils/alertas.service';
import { CarritoService } from '../../core/services/carrito/carrito.service';
import { PasarelaService } from '../../core/services/pasarela/pasatela.service';

@Component({
    selector: 'app-pasarela',
    standalone: true,
    imports: [RouterLink, CommonModule, FormsModule],
    templateUrl: './pasarela.html',
    styleUrl: './pasarela.scss',
})
export class Pasarela {

    private alertService = inject(AlertasService);
    private router = inject(Router);
    public carritoService = inject(CarritoService);
    private pasarelaService = inject(PasarelaService);

    formaPago: string = '';

    datosPago = {
        titular: '',
        numero: '',
        fecha: '',
        cvc: ''
    };

    confirmar() {

        // 1. Verificar login
        const token = localStorage.getItem('access_token');
        if (!token) {
            this.alertService.alert('Inicia sesión', 'Debes iniciar sesión para completar el pago', 'info');
            this.router.navigate(['/login']);
            return;
        }

        // 2. Carrito vacío
        if (this.carritoService.items().length === 0) {
            this.alertService.alert('Error', 'El carrito está vacío', 'error');
            return;
        }

        // 3. Forma de pago
        if (!this.formaPago) {
            this.alertService.alert('Error', 'Selecciona una forma de pago', 'error');
            return;
        }

        // 4. Validación tarjeta
        if (this.formaPago === 'tarjeta') {
            const { titular, numero, fecha, cvc } = this.datosPago;

            if (!titular || !numero || !fecha || !cvc) {
                this.alertService.alert('Error', 'Completa todos los datos de la tarjeta', 'error');
                return;
            }

            const soloNumeros = numero.replace(/\D/g, '');
            if (soloNumeros.length < 16 || soloNumeros.length > 19) {
                this.alertService.alert('Error', 'El número de tarjeta debe tener entre 16 y 19 dígitos', 'error');
                return;
            }
        }

        // 5. Preparar carrito y total para Django
        const carrito = this.carritoService.items().map((item: any) => ({
            nombre: item.nombre,
            cantidad: item.cantidad,
            precio: item.precio
        }));

        const total = this.carritoService.total();

        // 6. Guardar pedido en Django
        this.pasarelaService.confirmarCompra(carrito, total).subscribe({
            next: (resp) => {
                console.log('Pedido guardado:', resp);

                this.alertService.alert(
                    'Pedido en camino',
                    'Tu pedido está siendo procesado y llegará pronto',
                    'success'
                );

                this.carritoService.limpiarCarrito();
                setTimeout(() => this.router.navigate(['/']), 2500);
            },
            error: (err) => {
                console.error('Error al guardar pedido:', err);
                this.alertService.alert(
                    'Error',
                    'Hubo un problema al procesar tu pedido. Inténtalo de nuevo.',
                    'error'
                );
            }
        });
    }
}