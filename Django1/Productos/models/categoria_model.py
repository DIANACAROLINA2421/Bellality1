from django.db import models
from django.utils.text import slugify
from django.core.exceptions import ValidationError


class Categoria(models.Model):
    nombre = models.CharField(max_length=50, unique=True, null=False, blank=False, verbose_name="Nombre")
    slug = models.SlugField(unique=True, null=True, blank=True, verbose_name="Slug")
    creado = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de creación")
    modificado = models.DateTimeField(auto_now=True, verbose_name="Fecha de actualización")

    class Meta:
        db_table = "categoria"
        verbose_name = "Categoria"
        verbose_name_plural = "Categorías"
        ordering = ['-nombre']

    def __str__(self):
        return  self.nombre




    def save(self, *args, **kwargs):
        if not self.slug:
            prov = slugify(self.nombre)  
            cont = 1
            while Categoria.objects.filter(slug=prov).exists():
                prov = slugify(self.nombre) + "-" + str(cont)
                cont = cont + 1
            self.slug = prov
        categoria = Categoria.objects.filter(nombre=self.nombre).first()
        if categoria and categoria.id != self.id:
            raise ValidationError({"nombre": ["Ya existe un campo con este nombre"], })
        super().save(*args, **kwargs)