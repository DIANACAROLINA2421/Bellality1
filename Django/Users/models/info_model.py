from django.db import models


class InfoModel(models.Model):
    direccion=models.CharField(max_length=200,blank=False,null=False)
    telefono=models.CharField(max_length=200,blank=False,null=False)
    ciudad=models.CharField(max_length=200,blank=False,null=False)
    codigo_postal=models.CharField(max_length=200,blank=False,null=False)
    user=models.ForeignKey('CustomUser',on_delete=models.CASCADE, related_name='info')



    def __str__(self):
        return f"{self.direccion} {self.telefono} {self.ciudad} {self.codigo_postal}"

    class Meta:
        db_table = 'info'
        verbose_name = 'Info personal'
        verbose_name_plural = 'informacion personales'