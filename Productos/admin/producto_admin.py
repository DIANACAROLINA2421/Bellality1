from django.contrib import admin

from Productos.models import Productos


class ProductoAdmin(admin.ModelAdmin):
    list_display = ('nombre','precio','categoria__nombre','is_active')
    readonly_fields = ('slug',)
    list_editable = ('is_active',)

admin.site.register(Productos, ProductoAdmin)

