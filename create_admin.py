import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'tu_proyecto.settings')
django.setup()

from django.contrib.auth import get_user_model
User = get_user_model()

email = os.environ.get('DJANGO_ADMIN_EMAIL', 'admin@example.com')
password = os.environ.get('DJANGO_ADMIN_PASSWORD', 'adminpassword')
nombre = os.environ.get('DJANGO_ADMIN_NOMBRE', 'Admin')
apellidos = os.environ.get('DJANGO_ADMIN_APELLIDOS', '')

if not User.objects.filter(email=email).exists():
    User.objects.create_superuser(email=email, password=password, nombre=nombre, apellidos=apellidos)
    print(f"Superusuario creado: {email}")
else:
    print(f"El superusuario ya existe: {email}")