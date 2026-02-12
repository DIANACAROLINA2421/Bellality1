from django.contrib import admin

from Productos.models import Categoria


class CategoriaAdmin(admin.ModelAdmin):
    list_display = ('nombre','slug','creado','modificado')
    readonly_fields = ('slug','creado','modificado')

admin.site.register(Categoria, CategoriaAdmin)