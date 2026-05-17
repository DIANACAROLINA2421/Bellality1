from rest_framework import serializers
from Productos.models import Categoria, ImagenProducto, Productos


class AddProductoSerializer(serializers.ModelSerializer):
    nombre = serializers.CharField(max_length=100, required=True)
    precio = serializers.DecimalField(max_digits=10, decimal_places=2, required=True)
    categoria = serializers.CharField(max_length=50, required=True)
    descripcion = serializers.CharField(max_length=500, required=True)
    imagen_url = serializers.URLField(required=False, allow_blank=True)  # ← URL en vez de ImageField

    class Meta:
        model = Productos
        fields = ('nombre', 'precio', 'categoria', 'descripcion', 'imagen_url')

    # ← validate y create fuera del Meta
    def validate_precio(self, value):
        if value <= 0:
            raise serializers.ValidationError("El precio debe ser mayor a 0")
        return value

    def create(self, validated_data):
        categoria_obj = Categoria.objects.filter(slug=validated_data['categoria']).first()
        if not categoria_obj:
            raise serializers.ValidationError({"categoria": "La categoría no existe"})

        imagen_url = validated_data.pop('imagen_url', None)  # ← extraer antes de crear

        producto = Productos.objects.create(
            nombre=validated_data['nombre'],
            precio=validated_data['precio'],
            categoria=categoria_obj,          # ← usar el objeto, no el string
            descripcion=validated_data['descripcion'],
        )

        if imagen_url:
            ImagenProducto.objects.create(
                producto=producto,
                imagen_url=imagen_url,        # ← guardar la URL
            )

        return producto