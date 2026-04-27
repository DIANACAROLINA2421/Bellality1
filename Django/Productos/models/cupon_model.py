from django.db import models

class Cupon(models.Model):
    codigo = models.CharField(max_length=50, unique=True, verbose_name="Código del Cupón")
    porcentaje = models.PositiveIntegerField(verbose_name="Porcentaje de Descuento", help_text="Ejemplo: 10 para 10%")
    is_active = models.BooleanField(default=True, verbose_name="¿Está activo?")

    class Meta:
        db_table = 'cupones'
        verbose_name = "Cupón"
        verbose_name_plural = "Cupones"

    def __str__(self):
        return f"{self.codigo} - {self.porcentaje}%"
