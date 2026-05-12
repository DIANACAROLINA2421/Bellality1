import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface ItemCarrito {
    nombre: string;
    descripcion: string;
    precio: number;
    cantidad: number;
    imagen?: string;
}

@Injectable({
    providedIn: 'root',
})
export class CarritoService {

    private API_URL = 'https://bellality1-production.up.railway.app/api/cupon/';

    constructor(private http: HttpClient) {}

    private _items = signal<ItemCarrito[]>([]);
    items = this._items.asReadonly();

    subtotal = computed(() =>
        this._items().reduce((acc, item) => acc + (item.precio * item.cantidad), 0)
    );

    iva = computed(() => this.subtotal() * 0.10);

    descuento = signal<number>(0);


    cuponAplicado = signal<string | null>(null);

    total = computed(() =>
        Math.max(0, this.subtotal() + this.iva() - this.descuento())
    );

    agregar(producto: any) {
        const actual = this._items();
        const existe = actual.find(i => i.nombre === producto.nombre);

        if (existe) {
            this._items.update(items => items.map(i =>
                i.nombre === producto.nombre ? { ...i, cantidad: i.cantidad + 1 } : i
            ));
        } else {
            this._items.update(items => [...items, { ...producto, cantidad: 1 }]);
        }
    }

    eliminar(nombre: string) {
        this._items.update(items => items.filter(i => i.nombre !== nombre));
    }

    actualizarCantidad(nombre: string, cantidad: number) {
        if (cantidad <= 0) return;
        this._items.update(items => items.map(i =>
            i.nombre === nombre ? { ...i, cantidad } : i
        ));
    }

    limpiarCarrito() {
        this._items.set([]);
        this.descuento.set(0);
        this.cuponAplicado.set(null);
    }

    aplicarCupon(codigo: string) {
        return this.http.get<any>(`${this.API_URL}?codigo=${codigo}`);
    }


}
