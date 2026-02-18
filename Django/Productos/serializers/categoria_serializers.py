from rest_framework import serializers

from Productos.models import Categoria

class CategoriaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Categoria
        fields = ('nombre','slug', 'image')