
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from Users.serializers.login_serializers import LoginSerializer


class LoginView(APIView):
    permission_classes = [AllowAny] #si quiero que este identificado el que me vahacer la consulta en allowAny es cualquiera

    def post(self, request):

        login_serializer=LoginSerializer(data=request.data,many = False)

        if login_serializer.is_valid():

            return Response(login_serializer.validated_data,status=status.HTTP_200_OK)

        else:
            return Response(login_serializer.errors,status=status.HTTP_400_BAD_REQUEST)





