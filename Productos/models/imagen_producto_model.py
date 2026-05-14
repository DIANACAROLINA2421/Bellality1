from django.db import models


class ImagenProducto(models.Model):
    product = models.OneToOneField("Productos", on_delete=models.CASCADE, related_name="image")
    image = models.ImageField(upload_to="images/", null=False,
                              blank=False, verbose_name="Imagen")
    creado = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de creación")
    actualizado = models.DateTimeField(auto_now=True, verbose_name="Fecha de actualización")

    class Meta:
        db_table = "image_product"
        verbose_name = "Imagen"
        verbose_name_plural = "Imágenes"

    def __str__(self):
        return f"[IMAGEN DEL PRODUCTO: {self.product.nombre}]"

