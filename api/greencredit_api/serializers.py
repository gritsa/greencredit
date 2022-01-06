from django.db import models
from django.db.models import fields
from rest_framework import serializers
from rest_framework_simplejwt.tokens import Token

from greencredit_api.admin import GreenCreditUserAdmin
from .models import GreenCreditUser
from django.contrib.auth import authenticate
from rest_framework.exceptions import AuthenticationFailed
import re
from rest_framework.validators import UniqueValidator


class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255, min_length=6)
    password = serializers.CharField(
        max_length=255, min_length=6, write_only=True)

    class Meta:
        model = GreenCreditUser
        fields = ['username', 'email', 'password']

    def validate(self, attrs):
        email = attrs.get('email', ' ')
        username = attrs.get('username', ' ')

        if not username.isalnum():
            raise serializers.ValidationError(
                'The Username should only contain alphanumeric alphanumeric')

        return attrs

    def create(self, validated_data):
        return GreenCreditUser.objects.create_user(**validated_data)


class EmailVerificationSerializer(serializers.ModelSerializer):
    token = serializers.CharField(max_length=555)

    class Meta:
        model = GreenCreditUser
        fields = ['token']


class LoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255, min_length=6)
    password = serializers.CharField(
        max_length=70, min_length=6, write_only=True)
    username = serializers.CharField(
        max_length=255, min_length=6, read_only=True)   

    tokens = serializers.SerializerMethodField()

    def get_tokens(self, obj):
        user = GreenCreditUser.objects.get(email=obj['email'])

        return {
            'refresh': user.tokens()['refresh'],
            'access': user.tokens()['access']
        }

    class Meta:
        model = GreenCreditUser
        fields = ['email', 'password','username', 'tokens']

    def validate(self, attrs):
        email = attrs.get('email', '')
        password = attrs.get('password', '')

        # if email and password:
        #     user = auth.authenticate(request=self.context.get('request'),
        #                         email=email, password=password)
        user = authenticate(username=email, password=password)

        if not user:
            raise AuthenticationFailed('Invalid Credentials')
        if not user.is_active:
            raise AuthenticationFailed('Account disabled, contact admin')
        if not user.is_verified:
            raise AuthenticationFailed('Email is Not Verified')

        return {
            'email': user.email,
            'username': user.username,
            'token': user.tokens()
        }
        return super().validate(attrs)


class ResetPasswordEmailRequestSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=255, min_length=6)

    class Meta:
        model = GreenCreditUser
        fields = ['email']
