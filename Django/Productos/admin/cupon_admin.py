from django.contrib import admin
from Productos.models import Cupon

@admin.register(Cupon)
class CuponAdmin(admin.ModelAdmin):
    list_display = ('codigo', 'porcentaje', 'is_active')
    search_fields = ('codigo',)
    list_filter = ('is_active',)
