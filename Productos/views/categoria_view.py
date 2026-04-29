from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from Productos.models import Categoria
from Productos.serializers import CategoriaSerializer


class CategoriaView(GenericAPIView):
    permission_classes = [AllowAny]
    serializer_class = CategoriaSerializer

    def get(self, request):
        categorias = Categoria.objects.all().order_by("nombre")

        data1 = self.get_serializer(categorias, many=True).data



        return Response({"data": data1}, status=status.HTTP_200_OK)
