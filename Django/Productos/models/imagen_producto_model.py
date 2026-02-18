from django.db import models


class ImagenProducto(models.Model):
    product = models.OneToOneField("Productos", on_delete=models.CASCADE, related_name="image")
    image = models.ImageField(upload_to="images/", null=False,
                              blank=False, verbose_name="Imagen")  # images/nombre.extension
    creado = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de creación")
    actualizado = models.DateTimeField(auto_now=True, verbose_name="Fecha de actualización")

    class Meta:
        db_table = "image_product"
        verbose_name = "Imagen"
        verbose_name_plural = "Imágenes"

    def __str__(self):
        return f"[IMAGEN DEL PRODUCTO: {self.product.nombre}]"

    def save(self, *args, **kwargs):
        if self.image:
            # nombre.extension
            nombre_imagen = self.product.slug
            extension = self.image.name.split(".")[-1]
            self.image.name = f"{nombre_imagen}.{extension}"
        super().save(*args, **kwargs)
