from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from Productos.models import Cupon

class CuponView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        codigo = request.query_params.get('codigo', None)
        if not codigo:
            return Response({"success": False, "message": "Código no proporcionado"}, status=status.HTTP_400_BAD_REQUEST)
        
        cupon = Cupon.objects.filter(codigo=codigo, is_active=True).first()
        if not cupon:
            return Response({"success": False, "message": "Cupón inválido o inactivo"}, status=status.HTTP_404_NOT_FOUND)
            
        return Response({
            "success": True,
            "data": {
                "codigo": cupon.codigo,
                "porcentaje": cupon.porcentaje
            }
        }, status=status.HTTP_200_OK)
