import { Component, inject, OnInit, signal } from '@angular/core';
import { ProductsService } from "../../core/services/productos/productos.service";
import { ActivatedRoute, RouterLink, RouterLinkActive } from "@angular/router";
import { AlertasService } from "../../core/utils/alertas.service";
import { CarritoService } from "../../core/services/carrito/carrito.service";

@Component({
    selector: 'app-productos',
    standalone: true,
    imports: [RouterLink, RouterLinkActive],
    templateUrl: './productos.html',
    styleUrl: './productos.scss',
})
export class Productos implements OnInit {
    protected productos = signal<any[]>([]);
    protected categorias = signal<any[]>([]);
    private productsService = inject(ProductsService);
    private carritoService = inject(CarritoService);
    private alertService = inject(AlertasService);
    private route = inject(ActivatedRoute);

    anadirCarrito(producto: any) {
        this.carritoService.agregar(producto);
        this.alertService.alert('Añadido', `${producto.nombre} se añadió a tu carrito`, 'success');
    }

    ngOnInit() {
        this.productsService.getCategorias().subscribe({
            next: (response) => {
                if (response.data) {
                    this.categorias.set(response.data);
                } else {
                    this.categorias.set(response);
                }
            },
            error: (error) => console.error('Error al cargar categorias:', error)
        });

        this.route.params.subscribe(params => {
            const slug = params['slug'];

            this.productsService.getProductos(slug).subscribe({
                next: (response) => {
                    if (response.success) {
                        this.productos.set(response.data);
                    } else if (response.data) {
                        this.productos.set(response.data);
                    }
                },
                error: (error) => {
                    console.error('Error al cargar productos:', error);
                }
            });
        });
    }
}
