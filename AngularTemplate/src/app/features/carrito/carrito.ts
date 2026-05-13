import { Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { CarritoService } from "../../core/services/carrito/carrito.service";
import { AlertasService } from "../../core/utils/alertas.service";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-carrito',
    standalone: true,
    imports: [RouterLink, CommonModule, FormsModule],
    templateUrl: './carrito.html',
    styleUrl: './carrito.scss',
})
export class Carrito {

    public carritoService = inject(CarritoService);
    private alertService = inject(AlertasService);

    items = this.carritoService.items;
    subtotal = this.carritoService.subtotal;
    iva = this.carritoService.iva;
    total = this.carritoService.total;
    descuento = this.carritoService.descuento;
    cuponAplicado = this.carritoService.cuponAplicado;

    cuponCodigo: string = '';

    confirmarEliminar(nombre: string) {
        this.alertService.alert('Eliminar', '¿Seguro desea eliminar el producto?', 'warning');
        this.carritoService.eliminar(nombre);
    }

    cambiarCantidad(nombre: string, evento: any) {
        const valor = parseInt(evento.target.value);
        if (!isNaN(valor)) {
            this.carritoService.actualizarCantidad(nombre, valor);
        }
    }

    aplicarCupon() {

        if (this.cuponAplicado()) {
            this.alertService.alert(
                'Cupón ya aplicado',
                `Ya has aplicado el cupón "${this.cuponAplicado()}"`,
                'info'
            );
            return;
        }

        const codigo = this.cuponCodigo.trim();

        if (!codigo) {
            this.alertService.alert('Error', 'Introduce un código válido', 'error');
            return;
        }

        this.carritoService.aplicarCupon(codigo).subscribe({
            next: (resp) => {

                console.log('Respuesta del backend:', resp);

                const data = resp.body;

                if (data && data.success === true && data.data) {

                    const porcentaje = data.data.porcentaje;

                    const descuentoCalculado =
                        (this.subtotal() + this.iva()) * (porcentaje / 100);

                    this.carritoService.descuento.set(descuentoCalculado);
                    this.carritoService.cuponAplicado.set(data.data.codigo);

                    this.cuponCodigo = '';

                    this.alertService.alert(
                        'Éxito',
                        `Cupón "${data.data.codigo}" aplicado correctamente (${porcentaje}% de descuento)`,
                        'success'
                    );

                } else {
                    this.alertService.alert('Error', 'Cupón inválido', 'error');
                }
            },

            error: (err) => {
                console.error('Error al verificar el cupón:', err);
                this.alertService.alert('Error', 'Cupón inválido', 'error');
            }
        });
    }
}