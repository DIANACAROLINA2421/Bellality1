from django.core.exceptions import ValidationError
from django.db import models
from django.utils.text import slugify


class Productos(models.Model):
    nombre = models.CharField(max_length=100, null=False, blank=False, unique=True, verbose_name="Nombre")
    precio = models.DecimalField(max_digits=10, decimal_places=2, null=False, blank=False, verbose_name="Precio")

    categoria = models.ForeignKey("Categoria", on_delete=models.CASCADE)
    descripcion = models.TextField(verbose_name="descripción", max_length=500)
    slug = models.SlugField(max_length=100, unique=True, null=True, blank=True, verbose_name="Slug")
    is_active = models.BooleanField(default=True, verbose_name="¿Está activo?")

    class Meta:
        db_table = 'productos'
        verbose_name = "Producto"
        verbose_name_plural = "Productos"
        ordering = ['-categoria__nombre', '-nombre']

    def __str__(self):
        return f"[PRODUCTO: {self.nombre} - {self.precio} - {self.categoria.nombre}]"

    def save(self, *args, **kwargs):
        if not self.slug:
            prov = slugify(self.nombre)
            cont = 1
            while Productos.objects.filter(slug=prov).exists():
                prov = slugify(self.nombre) + "-" + str(cont)
                cont = cont + 1
            self.slug = prov
        producto = Productos.objects.filter(nombre=self.nombre).first()
        if producto and producto.id != self.id:
            raise ValidationError({"nombre": ["Ya existe un producto con este nombre"], })
        super().save(*args, **kwargs)
