import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidoService } from '../../core/services/pedidos/pedido.service';

@Component({
    selector: 'app-pedidos',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './pedidos.html',
    styleUrls: ['./pedidos.scss'],
})
export class PedidosComponent implements OnInit {
    pedidos: any[] = [];

    constructor(private pedidoService: PedidoService) {}

    ngOnInit(): void {
        this.pedidoService.obtenerMisPedidos().subscribe({
            next: (resp: any) => {
                this.pedidos = resp.pedidos;
            },
            error: (err: any) => {
                console.error('Error al obtener pedidos:', err);
            }
        });
    }
}