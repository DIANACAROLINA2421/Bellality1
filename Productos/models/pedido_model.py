from django.db import models
from django.conf import settings


class Pedido(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    productos = models.JSONField()
    total = models.DecimalField(max_digits=10, decimal_places=2)
    fecha = models.DateTimeField(auto_now_add=True)

    def __str__(self):

        return f"Pedido {self.id} de {self.user.email}"

    class Meta:
        ordering = ['-fecha']