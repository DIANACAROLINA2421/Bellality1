from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from Productos.models import Categoria


class CategoriaView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        categorias = Categoria.objects.all().order_by("nombre")

        data = [{"nombre": c.nombre, "slug": c.slug} for c in categorias]

        return Response({"data": data}, status=status.HTTP_200_OK)
