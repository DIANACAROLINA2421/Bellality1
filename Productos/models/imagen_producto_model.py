from django.db import models


class ImagenProducto(models.Model):
    producto = models.ForeignKey(
        "Productos",
        on_delete=models.CASCADE,
        related_name="imagenes",
        verbose_name="Producto"
    )
    imagen_url = models.URLField(max_length=500, verbose_name="URL de imagen", default="")
    es_principal = models.BooleanField(default=False, verbose_name="¿Es imagen principal?")
    orden = models.PositiveIntegerField(default=0, verbose_name="Orden")
    creado = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de creación")
    actualizado = models.DateTimeField(auto_now=True, verbose_name="Fecha de actualización")

    class Meta:
        db_table = "imagenes_producto"
        verbose_name = "Imagen"
        verbose_name_plural = "Imágenes"
        ordering = ["orden", "creado"]

    def _str_(self):
        return f"[IMAGEN DEL PRODUCTO: {self.producto.nombre} - principal={self.es_principal}]"

    def save(self, *args, **kwargs):
        if self.es_principal:
            ImagenProducto.objects.filter(
                producto=self.producto,
                es_principal=True
            ).exclude(pk=self.pk).update(es_principal=False)
        super().save(*args, **kwargs)