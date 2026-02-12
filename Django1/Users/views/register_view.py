from rest_framework import serializers, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from Users.serializers import RegisterSerializer


class RegisterView(APIView):
    permission_classes = (AllowAny,)

    def post(self,request):

        register_serializers=RegisterSerializer(data=request.data, many=False)

        if register_serializers.is_valid():
            return Response(register_serializers.validated_data,status=status.HTTP_201_CREATED)
        else:
            return Response(register_serializers.errors,status=status.HTTP_401_UNAUTHORIZED)