from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from Productos.models.pedido_model import Pedido


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def confirmar_compra(request):

    carrito = request.data.get("carrito", [])
    for p in carrito:
        if "imagen" not in p:
            p["imagen"] = ""



    total = request.data.get("total", 0)

    pedido = Pedido.objects.create(
        user=request.user,
        productos=carrito,
        total=total
    )

    return Response({
        "success": True,
        "message": "Pedido guardado correctamente",
        "pedido_id": pedido.id
    })


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def mis_pedidos(request):

    pedidos = Pedido.objects.filter(user=request.user).order_by("-fecha")

    pedidos_json = [
        {
            "id": p.id,
            "fecha": p.fecha.strftime("%d/%m/%Y %H:%M"),
            "total": float(p.total),
            "productos": p.productos,
            "num_productos": len(p.productos) if isinstance(p.productos, list) else 0,
        }
        for p in pedidos
    ]

    return Response({"pedidos": pedidos_json})
