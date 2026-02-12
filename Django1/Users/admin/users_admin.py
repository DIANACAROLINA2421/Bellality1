from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from Users.models import CustomUser, InfoModel


class InfoPersonalInline(admin.StackedInline):
    model = InfoModel
    can_delete = False
    verbose_name = "Información personal"
    verbose_name_plural = "Datos personales"


class CustomUserAdmin(UserAdmin):

    list_display = ('email', 'nombre', 'apellidos', 'is_active')


    list_filter = ('is_active', 'is_superuser')


    search_fields = ('email', 'nombre')


    list_editable = ('is_active',)

    list_per_page = 25

    ordering = ('-email',)

    fieldsets = (
        ("Inicio de sesión", {'fields': ('email', 'password')}),
        ("Información personal", {'fields': ('nombre', 'apellidos')}),
        ("Configuración", {'fields': ('is_active', 'is_staff', 'is_superuser')}),
    )

    add_fieldsets = (
        ("Información personal", {
            'classes': ('wide',),
            'fields': ('nombre', 'apellidos')}
         ),
        ("Información de iniciar sesión", {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2')}
         ),
        ("Configuración", {
            'classes': ('wide',),
            'fields': ( 'is_active', 'is_staff', 'is_superuser',)}
         ),
    )


admin.site.register(CustomUser, CustomUserAdmin)
