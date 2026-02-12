from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from django.http import HttpResponse
from Productos.models import Productos


class ProductoView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):

        productos = Productos.objects.filter(is_active=True).order_by("-categoria", "nombre")  # Array objetos

        data = [
            {
                "nombre": producto.nombre,
                "precio": producto.precio,
                "nombre_categoria": producto.categoria.nombre,
                "slug_categoria": producto.categoria.slug,
                "slug_producto": producto.slug,
                "imagen": "" if not producto.image.image.url else request.build_absolute_uri(producto.image.image.url)

            }
            for producto in productos
        ]

        return Response({"data": data, "success": True}, status=status.HTTP_200_OK)


class ProduView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):

        productos = Productos.objects.filter(is_active=True).order_by("-categoria", "nombre")  # Array objetos

        data = [
            {
                "id": producto.id,
                "nombre": producto.nombre,
                "precio": producto.precio,
                "descripcion": producto.descripcion,
                "nombre_categoria": producto.categoria.nombre,
                "slug_producto": producto.slug,
                "imagen": "" if not producto.image.image.url else request.build_absolute_uri(producto.image.image.url)
            }
            for producto in productos
        ]

        return Response({"data": data, "success": True}, status=status.HTTP_200_OK)
