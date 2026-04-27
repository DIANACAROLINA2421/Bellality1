from django.urls import path

from Productos.views import CategoriaView,ProductoView,AddProductoView,CuponView

urlpatterns = [
    path("todos-productos/", ProductoView.as_view()),
    path("crear-producto/", AddProductoView.as_view()),
    path("categorias/", CategoriaView.as_view()),
    path("verificar-cupon/", CuponView.as_view())
]
