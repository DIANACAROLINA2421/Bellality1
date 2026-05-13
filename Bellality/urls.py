from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from django.views.generic import RedirectView

admin.site.site_header = "Bellality"

urlpatterns = [
    # Redirige la raíz a /api/ (puedes cambiarlo si quieres)
    path('', RedirectView.as_view(url='/api/', permanent=True)),

    # Admin
    path('admin/', admin.site.urls),

    # API
    path('api/', include('Productos.urls')),
    path('api/', include('Users.urls')),
]


urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
