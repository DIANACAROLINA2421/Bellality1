from django.contrib import admin

from Productos.models import ImagenProducto


class ImagenAdmin(admin.ModelAdmin):
    list_display = ('product__nombre', 'image', 'creado', 'actualizado')
    readonly_fields = ('creado', 'actualizado')


admin.site.register(ImagenProducto, ImagenAdmin)
