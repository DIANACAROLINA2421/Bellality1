import { Injectable, signal, computed } from '@angular/core';

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
    // Estado privado del carrito
    private _items = signal<ItemCarrito[]>([]);

    // Señales públicas para los componentesy
    items = this._items.asReadonly();

    // Cálculos automáticos reactivos
    subtotal = computed(() =>
        this._items().reduce((acc, item) => acc + (item.precio * item.cantidad), 0)
    );

    iva = computed(() => this.subtotal() * 0.10); // IVA del 10% según tu diseño anterior

    descuento = signal<number>(0);

    total = computed(() => Math.max(0, this.subtotal() + this.iva() - this.descuento()));

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
    }

    aplicarCupon(codigo: string) {
        // Simple logic for discount coupons
        if (codigo === 'DESCUENTO10') {
            this.descuento.set(10); // 10 euros off
            return true;
        } else if (codigo === 'MITAD') {
            this.descuento.set((this.subtotal() + this.iva()) * 0.5); // 50% off
            return true;
        }
        return false;
    }
}