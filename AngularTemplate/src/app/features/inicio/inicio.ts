import { Component, inject, signal } from '@angular/core';
import { RouterLink } from "@angular/router";
import { CategoriasService } from "../../core/services/categorias/categorias-service";
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-inicio',
    imports: [
        RouterLink
    ],
    templateUrl: './inicio.html',
    styleUrl: './inicio.scss',
})
export class Inicio {
    protected categorias = signal<any[]>([]);
    private categoriaService = inject(CategoriasService);

    getImagenUrl(imagen: string): string {
        if (!imagen) return '/images/placeholder.jpg';
        if (imagen.startsWith('http')) return imagen;
        const base = environment.apiURL.replace('/api/', '').replace('/api', '');
        return `${base}/media/${imagen}`;
    }

    onImageError(event: Event) {
        const img = event.target as HTMLImageElement;
        img.src = '/images/placeholder.jpg';
        img.onerror = null;
    }

    ngOnInit() {
        this.categoriaService.get().subscribe({
            next: response => {
                this.categorias.set(response.data);
            },
            error: error => {
                console.log(error);
            }
        });
    }
}