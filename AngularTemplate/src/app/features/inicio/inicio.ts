import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import { CategoriasService } from "../../core/services/categorias/categorias-service";
import { environment } from '../../../environments/environment';

@Component({
    selector: 'app-inicio',
    imports: [RouterLink],
    templateUrl: './inicio.html',
    styleUrl: './inicio.scss',
})
export class Inicio implements OnInit {
    protected categorias = signal<any[]>([]);
    private categoriaService = inject(CategoriasService);

    getImagenUrl(imagen: string): string {
        if (!imagen) return '/images/placeholder.jpg';
        if (imagen.startsWith('http')) return imagen;
        return `${environment.apiURL.replace('/api', '')}/media/${imagen}`;
    }

    onImageError(event: Event) {
        const img = event.target as HTMLImageElement;
        img.src = '/images/placeholder.jpg';
        img.onerror = null;
    }

    ngOnInit() {
        this.categoriaService.get().subscribe({
            next: (categorias) => {
                // El servicio ya hace map(res => res.data), así que recibimos el array directamente
                this.categorias.set(categorias);
            },
            error: (error) => {
                console.error('Error al cargar categorías:', error);
            }
        });
    }
}