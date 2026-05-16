from rest_framework import serializers
from Productos.models import Categoria, ImagenProducto, Productos


class AddProductoSerializer(serializers.ModelSerializer):
    nombre = serializers.CharField(max_length=100, required=True)
    precio = serializers.DecimalField(max_digits=10, decimal_places=2, required=True)
    categoria = serializers.CharField(max_length=50, required=True)
    descripcion = serializers.CharField(max_length=500, required=True)
    imagen = serializers.ImageField(write_only=True)

    class Meta:
        model = Productos
        fields = ('nombre', 'precio', 'categoria', 'descripcion', 'imagen')

    def validate_precio(self, value):  # ← fuera de Meta
        if value <= 0:
            raise serializers.ValidationError("El precio debe ser mayor que 0")
        return value

    def create(self, validated_data):  # ← fuera de Meta
        imagen = validated_data.pop('imagen')

        categoria_obj = Categoria.objects.filter(slug=validated_data['categoria']).first()
        if not categoria_obj:
            raise serializers.ValidationError({"categoria": "La categoría no existe"})

        producto = Productos.objects.create(
            nombre=validated_data['nombre'],
            precio=validated_data['precio'],
            categoria=categoria_obj,       # ← el objeto, no el string
            descripcion=validated_data['descripcion'],
        )

        ImagenProducto.objects.create(
            product=producto,
            image=imagen,
        )

        return producto