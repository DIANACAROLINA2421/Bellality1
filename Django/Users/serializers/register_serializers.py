from rest_framework import serializers

from Users.models import CustomUser


class RegisterSerializer(serializers.ModelSerializer):
    nombre=serializers.CharField(max_length=50,required=True)
    email=serializers.EmailField(max_length=100,required=True)
    password1=serializers.CharField( max_length=6,required=True)
    password2=serializers.CharField(max_length=6,required=True)


    class Meta:
        model= CustomUser
        fields=('nombre','email','password1','password2')

    def validate_email(self,email):
        if CustomUser.objects.filter(email=email).exists():
            raise serializers.ValidationError("Email ya existe")
        return email
    def validate_password1(self,password1):
        if len(password1)<6:
            raise serializers.ValidationError("Password debe tener 6 caracteres")

        return password1
    def validate_password2(self,password2):
        return password2

    def validate(self,attrs):
        if attrs['password1'] != attrs['password2']:
            raise serializers.ValidationError("Contraseña no coincide")

        return attrs

    def create(self,validated_data):
        password = validated_data.pop("password1")
        validated_data.pop("password2")

        user=CustomUser.objects.create(
            email=validated_data["email"],
            nombre=validated_data["nombre"],
        )
        user.set_password(validated_data["password"])
        user.save()
        return user


