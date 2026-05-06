import django
import os

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'Bellality.settings')
django.setup()

from Users.models import CustomUser

email = 'diana@gmail.com'
password = 'Diana1234!'

if not CustomUser.objects.filter(email=email).exists():
    CustomUser.objects.create_superuser(
        email=email,
        password=password,
        nombre='Admin',
        apellidos='Admin'
    )
    print(f'✅ Superusuario {email} creado')
else:
    print(f'⚠️ Ya existe: {email}')