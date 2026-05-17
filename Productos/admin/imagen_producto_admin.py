from django.contrib import admin
from Productos.models import ImagenProducto


class ImagenAdmin(admin.ModelAdmin):
    list_display = ('get_producto_nombre', 'imagen_url', 'es_principal', 'orden', 'creado', 'actualizado')
    list_filter = ('es_principal',)
    readonly_fields = ('creado', 'actualizado')

    def get_producto_nombre(self, obj):
        return obj.producto.nombre
    get_producto_nombre.short_description = 'Producto'


admin.site.register(ImagenProducto, ImagenAdmin)