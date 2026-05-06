from django.contrib import admin
from Productos.models.pedido_model import Pedido

@admin.register(Pedido)
class PedidoAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'total', 'fecha']
    list_filter = ['fecha', 'user']
    ordering = ['-fecha']