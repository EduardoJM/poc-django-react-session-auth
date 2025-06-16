from django.contrib.auth import get_user_model
from rest_framework import serializers

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ['password']

class AuthenticateSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()