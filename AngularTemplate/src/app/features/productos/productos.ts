import {Component, inject, OnInit, signal} from '@angular/core';
import {ProductsService} from "../../core/services/productos/productos.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-productos',
    imports: [
        RouterLink

    ],
  templateUrl: './productos.html',
  styleUrl: './productos.scss',
})
export class Productos  implements OnInit {
    protected productos=signal<any[]>([])
    private productsService=inject(ProductsService)




    ngOnInit() {
        this.productsService.getProductos().subscribe({

            next:response=>{
                console.log(response.data);
                this.productos.set(response.data)
            },
            error:error=>{
                console.log(error);
        }
        })
    }

}
