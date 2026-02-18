from rest_framework import serializers
from Productos.models import Categoria, ImagenProducto, Productos


class AddProductoSerializer(serializers.ModelSerializer):
    nombre = serializers.CharField(max_length=100, required=True)
    precio = serializers.DecimalField(max_digits=10, decimal_places=2, required=True)
    categoria = serializers.CharField(max_length=50, required=True, )
    descripcion = serializers.CharField( max_length=500, required=True)
    imagen = serializers.ImageField(write_only=True, )

    class Meta:
        model = Productos
        fields = (
            'nombre', 'precio', 'categoria', 'descripcion', 'imagen')

        def validate_precio(self, attrs):
            return attrs

        def create(self, validated_data):
            categoria_obj = Categoria.objects.filter(slug=validated_data['categoria']).first()
            if not categoria_obj:
                raise serializers.ValidationError("Categoria no existe")

            producto = Productos.objects.create(
                nombre =validated_data['nombre'],

                precio =validated_data['precio'],

                categoria= validated_data['categoria'],

                descripcion  = validated_data['descripcion'],

            )
            imagen = ImagenProducto.objects.create(
                producto=producto,
                imagen=validated_data['imagen'],

            )
            imagen.save()
            return producto