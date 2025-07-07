from django.contrib.auth import (
    authenticate,
    login,
    logout,
)
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .serializers import UserSerializer
from drf_spectacular.utils import extend_schema, OpenApiResponse
from .serializers import AuthenticateSerializer

class AuthenticatedUserAPIView(APIView):
    @extend_schema(
        request=AuthenticateSerializer,
        responses={
            200: OpenApiResponse(UserSerializer),
        }
    )
    def get(self, request):
        serializer = UserSerializer(instance=request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)

class LoginAPIView(APIView):
    authentication_classes = []
    permission_classes = []
    
    @extend_schema(
        request=AuthenticateSerializer,
        responses={
            200: OpenApiResponse(UserSerializer, description='Login was success and we have the authenticated user as response.'),
        }
    )
    def post(self, request):
        serializer = AuthenticateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = serializer.validated_data
        email = data.get('email')
        password = data.get('password')

        user = authenticate(request._request, username=email, password=password)
        if not user:
            raise AuthenticationFailed()
        
        login(request._request, user)

        serializer = UserSerializer(instance=user)
        return Response(serializer.data, status=status.HTTP_200_OK)

class LogoutAPIView(APIView):
    @extend_schema(
        request=None,
        responses={
            200: OpenApiResponse(description='Logout was sucess.')
        }
    )
    def post(self, request):
        logout(request._request)
        return Response(status=status.HTTP_200_OK)
