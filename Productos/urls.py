from django.urls import path
from Productos.views import CategoriaView, ProductoView, AddProductoView, CuponView
from Productos.views.pedido_view import confirmar_compra, mis_pedidos

urlpatterns = [
    path("todos-productos/", ProductoView.as_view()),
    path("crear-producto/", AddProductoView.as_view()),
    path("categorias/", CategoriaView.as_view()),
    path("cupon/", CuponView.as_view()),
    path("confirmar-compra/", confirmar_compra, name='confirmar_compra'),  # ← directo
    path("mis-pedidos/", mis_pedidos, name='mis_pedidos'),                 # ← directo
]