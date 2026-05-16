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
            productos = Productos.objects.filter(
                is_active=True, categoria__slug=categoria_slug
            ).order_by("-categoria", "nombre")
        else:
            productos = Productos.objects.filter(is_active=True).order_by("-categoria", "nombre")

        data = []
        for producto in productos:
            imagen_url = ""
            try:
                if hasattr(producto, "image") and producto.image and producto.image.image:
                    url = producto.image.image.url
                    if url.startswith("http"):
                        imagen_url = url  # Cloudinary → URL completa siempre
            except Exception:
                imagen_url = ""

            data.append({
                "nombre": producto.nombre,
                "descripcion": producto.descripcion,
                "precio": str(producto.precio),
                "nombre_categoria": producto.categoria.nombre,
                "slug_categoria": producto.categoria.slug,
                "slug_producto": producto.slug,
                "imagen": imagen_url,
            })

        return Response({"data": data, "success": True}, status=status.HTTP_200_OK)