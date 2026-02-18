import {Component, inject, signal} from '@angular/core';
import {RouterLink} from "@angular/router";
import {CategoriasService} from "../../core/services/categorias/categorias-service";

@Component({
    selector: 'app-inicio',
    imports: [
        RouterLink
    ],
    templateUrl: './inicio.html',
    styleUrl: './inicio.scss',
})
export class Inicio {
    protected categorias = signal<any[]>([])
    private categoriaSerivice = inject(CategoriasService)




    ngOnInit() {
        this.categoriaSerivice.get().subscribe({
            next: response => {
                this.categorias.set(response.data)
            }, error: error => {
                console.log(error)
            }
        })


    }





}

