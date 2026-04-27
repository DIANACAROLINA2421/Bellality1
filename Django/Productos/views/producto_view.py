from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from Productos.models import Productos


class ProductoView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        categoria_slug = request.query_params.get('categoria', None)
        
        if categoria_slug:
            productos = Productos.objects.filter(is_active=True, categoria__slug=categoria_slug).order_by("-categoria", "nombre")
        else:
            productos = Productos.objects.filter(is_active=True).order_by("-categoria", "nombre")

        data = [
            {
                "nombre": producto.nombre,
                "descripcion": producto.descripcion,
                "precio": producto.precio,
                "nombre_categoria": producto.categoria.nombre,
                "slug_categoria": producto.categoria.slug,
                "slug_producto": producto.slug,
                "imagen": request.build_absolute_uri(producto.image.image.url)
                if hasattr(producto, "image") and producto.image.image
                else ""

            }
            for producto in productos
        ]

        return Response({"data": data, "success": True}, status=status.HTTP_200_OK)
