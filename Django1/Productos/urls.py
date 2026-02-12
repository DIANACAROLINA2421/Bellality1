from django.urls import path

from Productos.views import CategoriaView,ProductoView,ProduView

urlpatterns = [
    path("todos-productos/", ProductoView.as_view()),
    path("mis-productos/", ProduView.as_view()),
    path("categorias/", CategoriaView.as_view())

]
