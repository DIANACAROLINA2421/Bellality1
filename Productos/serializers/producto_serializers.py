from rest_framework import serializers
from Productos.models import Categoria, Productos


class AddProductoSerializer(serializers.ModelSerializer):
    categoria = serializers.CharField(required=True)
    imagen = serializers.ImageField(write_only=True)

    class Meta:
        model = Productos
        fields = ('nombre', 'precio', 'categoria', 'descripcion', 'imagen')

    def create(self, validated_data):
        # Obtener slug de categoría
        categoria_slug = validated_data.pop('categoria')

        categoria_obj = Categoria.objects.filter(slug=categoria_slug).first()
        if not categoria_obj:
            raise serializers.ValidationError("La categoría no existe")

        # Crear producto sin imagen aún
        producto = Productos.objects.create(
            nombre=validated_data['nombre'],
            precio=validated_data['precio'],
            categoria=categoria_obj,
            descripcion=validated_data['descripcion'],
        )

        # Subir imagen a Cloudinary (CloudinaryField lo hace solo)
        producto.imagen = validated_data['imagen']
        producto.save()

        return producto
