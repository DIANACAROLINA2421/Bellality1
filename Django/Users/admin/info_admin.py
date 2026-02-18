from django.contrib import admin
from Users.models import InfoModel

class InfoAdmin(admin.ModelAdmin):
    list_display = ('direccion','telefono', 'ciudad', 'codigo_postal')
    list_per_page = 20
    list_editable = ('telefono',)
    search_fields = ('telefono',)

    fieldsets = (
        ("Información personal", {
            "classes": ("wide",),
            "fields": ("telefono", "direccion", "ciudad", "codigo_postal")
        }),
    )

admin.site.register(InfoModel, InfoAdmin)