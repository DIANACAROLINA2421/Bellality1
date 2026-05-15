from cloudinary.models import CloudinaryField
from django.core.exceptions import ValidationError
from django.db import models
from django.utils.text import slugify


class Productos(models.Model):
    nombre = models.CharField(max_length=100, unique=True)
    precio = models.DecimalField(max_digits=10, decimal_places=2)

    categoria = models.ForeignKey("Categoria", on_delete=models.CASCADE)
    descripcion = models.TextField(max_length=500)

    # ⭐ Imagen en Cloudinary
    imagen = CloudinaryField('image', blank=True, null=True)

    slug = models.SlugField(max_length=100, unique=True, null=True, blank=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = 'productos'
        ordering = ['-categoria__nombre', '-nombre']

    def __str__(self):
        return f"[PRODUCTO: {self.nombre}]"

    def save(self, *args, **kwargs):
        if not self.slug:
            prov = slugify(self.nombre)
            cont = 1
            while Productos.objects.filter(slug=prov).exists():
                prov = f"{slugify(self.nombre)}-{cont}"
                cont += 1
            self.slug = prov

        producto = Productos.objects.filter(nombre=self.nombre).first()
        if producto and producto.id != self.id:
            raise ValidationError({"nombre": ["Ya existe un producto con este nombre"]})

        super().save(*args, **kwargs)
