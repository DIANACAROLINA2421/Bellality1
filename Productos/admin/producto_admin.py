from django.contrib import admin
from Productos.models import Productos

class ProductoAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'precio', 'get_categoria', 'is_active')
    readonly_fields = ('slug',)
    list_editable = ('is_active',)

    def get_categoria(self, obj):
        return obj.categoria.nombre
    get_categoria.short_description = 'Categoría'

admin.site.register(Productos, ProductoAdmin)