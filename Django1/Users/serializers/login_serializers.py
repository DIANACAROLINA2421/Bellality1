

from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken

from Users.models import CustomUser


class LoginSerializer(serializers.ModelSerializer):
    email=serializers.EmailField(max_length=100,required=True)
    password = serializers.CharField(min_length=6,required=True)


    class Meta:
        model = CustomUser
        fields = ('email', 'password')

    def validate_email(self, email):
        if email =="":
            raise serializers.ValidationError("Tienes que introducir el email")
        if "@" not in email:
            raise serializers.ValidationError("El email introducido no es valido")
        return email
    def validate_password(self, password):
        if len(password) < 6:
            raise serializers.ValidationError("El password introducido no es valido")
        return password


    def validate(self, data):
        email = data.get("email")
        password = data.get("password")

        user = CustomUser.objects.get(email=email).first()
        if not user:
            raise serializers.ValidationError("El usuario no existe")

        if not user.check_password(password):
            raise serializers.ValidationError("su contraseña es incorrecta")


        refresh_token=RefreshToken.for_user(user)
        access_token=refresh_token.access_token



        return {
            'success':True,
            "data":{
                "nombre":user.nombre,
                "email":user.email,
            },
            'access_token':str(access_token),
            'refresh_token':str(refresh_token),
        }


