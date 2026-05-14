import { Component, inject, signal, OnInit } from '@angular/core';
import { RouterLink } from "@angular/router";
import { CategoriasService } from "../../core/services/categorias/categorias-service";
import { LoginServices } from "../../core/services/login/login.services"; // ✅ nombre correcto
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
    private loginService = inject(LoginServices); // ✅ nombre correcto

    isLogged = false;
    codigoDescuento = "diana";

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
        this.isLogged = this.loginService.isLogged(); // ✅ método correcto

        this.categoriaService.get().subscribe({
            next: (categorias) => {
                this.categorias.set(categorias);
            },
            error: (error) => {
                console.error('Error al cargar categorías:', error);
            }
        });
    }

    copiarCodigo() {
        navigator.clipboard.writeText(this.codigoDescuento).then(() => {
            alert('✅ Código copiado: ' + this.codigoDescuento);
        });
    }
}