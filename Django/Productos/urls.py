from django.urls import path

from Productos.views import CategoriaView,ProductoView,AddProductoView

urlpatterns = [
    path("todos-productos/", ProductoView.as_view()),
    path("crear-producto/", AddProductoView.as_view()),
    path("categorias/", CategoriaView.as_view())

]
