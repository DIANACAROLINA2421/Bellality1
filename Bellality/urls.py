from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include
from django.views.generic import RedirectView

admin.site.site_header = "Bellality"

urlpatterns = [
    path('', RedirectView.as_view(url='/api/', permanent=True)),
    path('admin/', admin.site.urls),
    path('api/', include('Productos.urls')),
    path('api/', include('Users.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

