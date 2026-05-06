from rest_framework import serializers
from Productos.models.pedido_model import Pedido

class PedidoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pedido
        fields = ['id', 'user', 'productos', 'total', 'fecha']
