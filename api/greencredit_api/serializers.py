from email.policy import default
from venv import create
from django.db import models
from django.db.models import fields
from rest_framework import serializers, status
from rest_framework_simplejwt.tokens import Token

from greencredit_api.admin import GreenCreditUserAdmin
from .models import Activity, GreenCreditUser
from django.contrib.auth import authenticate
from rest_framework.exceptions import AuthenticationFailed
import re
from rest_framework.validators import UniqueValidator
from rest_framework_simplejwt.tokens import RefreshToken, TokenError
from django.utils.encoding import (
    smart_str,
    force_str,
    smart_bytes,
    DjangoUnicodeDecodeError,
)
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.contrib.sites.shortcuts import get_current_site
from django.contrib.auth.tokens import PasswordResetTokenGenerator

# google auth
from rest_framework import serializers
from . import google
from .register import register_social_user
import os
from rest_framework.exceptions import AuthenticationFailed
from decouple import config


class RegisterSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255, min_length=6)
    password = serializers.CharField(max_length=255, min_length=6, write_only=True)

    class Meta:
        model = GreenCreditUser
        fields = ["username", "email", "password"]

    def validate(self, attrs):
        email = attrs.get("email", " ")
        username = attrs.get("username", " ")

        if not username.isalnum():
            raise serializers.ValidationError(
                "The Username should only contain alphanumeric alphanumeric"
            )

        return attrs

    def create(self, validated_data):
        return GreenCreditUser.objects.create_user(**validated_data)


class EmailVerificationSerializer(serializers.ModelSerializer):
    token = serializers.CharField(max_length=555)

    class Meta:
        model = GreenCreditUser
        fields = ["token"]


class LoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255, min_length=6)
    password = serializers.CharField(max_length=70, min_length=6, write_only=True)
    username = serializers.CharField(max_length=255, min_length=6, read_only=True)

    tokens = serializers.SerializerMethodField()

    def get_tokens(self, obj):
        user = GreenCreditUser.objects.get(email=obj["email"])

        return {"refresh": user.tokens()["refresh"], "access": user.tokens()["access"]}

    class Meta:
        model = GreenCreditUser
        fields = ["email", "password", "username", "tokens"]

    def validate(self, attrs):
        email = attrs.get("email", "")
        password = attrs.get("password", "")

        # if email and password:
        #     user = auth.authenticate(request=self.context.get('request'),
        #                         email=email, password=password)
        user = authenticate(username=email, password=password)

        if not user:
            raise AuthenticationFailed("Invalid Credentials")
        if not user.is_active:
            raise AuthenticationFailed("Account disabled, contact admin")
        if not user.is_verified:
            raise AuthenticationFailed("Email is Not Verified")

        return {"email": user.email, "username": user.username, "token": user.tokens()}
        return super().validate(attrs)


class ResetPasswordEmailRequestSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=255, min_length=6)

    class Meta:
        model = GreenCreditUser
        fields = ["email"]


class SetNewPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(min_length=6, max_length=68, write_only=True)
    uidb64 = serializers.CharField(min_length=1, write_only=True)
    token = serializers.CharField(min_length=6, write_only=True)

    class Meta:
        fields = ["password", "uidb64", "token"]

    def validate(self, attrs):
        try:
            password = attrs.get("password", "")
            token = attrs.get("token", "")
            uidb64 = attrs.get("uidb64", "")

            id = force_str(urlsafe_base64_decode(uidb64))
            user = GreenCreditUser.objects.get(id=id)

            if not PasswordResetTokenGenerator().check_token(user, token):
                raise AuthenticationFailed(
                    "The rest link is invalid", status=status.HTTP_401_UNAUTHORIZED
                )

            user.set_password(password)
            user.save()
            return user

        except Exception as e:
            raise AuthenticationFailed(
                "The rest link is invalid", status=status.HTTP_401_UNAUTHORIZED
            )

        return super().validate(attrs)


class LogoutSerializer(serializers.Serializer):
    refresh = serializers.CharField()

    default_error_messages = {"bad_token": ("Token is expired or invalid")}

    def validate(self, attrs):
        self.token = attrs["refresh"]
        return attrs

    def save(self, **kwargs):
        try:
            RefreshToken(self.token).blacklist()
        except Exception as e:
            self.fail("Invalid Token")


class GoogleSocialAuthSerializer(serializers.Serializer):
    auth_token = serializers.CharField()

    def validate_auth_token(self, auth_token):
        user_data = google.Google.validate(auth_token)
        try:
            user_data["sub"]
        except:
            raise serializers.ValidationError(
                "The token is invalid or expired. Please login again."
            )
        if user_data["aud"] != config("GOOGLE_CLIENT_ID"):
            raise AuthenticationFailed("oops, Who are you ?")

        user_id = user_data["sub"]
        email = user_data["email"]
        name = user_data["name"]
        provider = "google"

        return register_social_user(
            provider=provider, user_id=user_id, email=email, name=name
        )


class ActivitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Activity
        fields = (
            "id",
            "photo_urls",
            "geo_location",
            "timestamp",
            "tags",
            "md5hash",
            "post_text",
            "user",
        )

    # create activity
    def create(self, validated_data):
        return Activity.objects.create(**validated_data)


class UserActivitySerializer(serializers.ModelSerializer):
    activities = serializers.SerializerMethodField()

    class Meta:
        model = Activity
        fields = ["activities"]

    def get_activities(self, obj):
        activity_list = []
        activity = Activity.objects.filter(user_id=obj.id)

        for act in activity:
            activity_dic = {}
            activity_dic["id"] = act.id
            activity_dic["geo_location"] = act.geo_location
            activity_dic["timestamp"] = act.timestamp
            activity_dic["tags"] = act.tags
            activity_dic["md5hash"] = act.md5hash
            activity_dic["post_text"] = act.post_text
            activity_dic["photos_urls"] = act.photo_urls
            activity_list.append(activity_dic)
        return activity_list


class GetAllActivitySerializer(serializers.ModelSerializer):
    activities = serializers.SerializerMethodField()

    class Meta:
        model = Activity
        fields = ["activities"]

    def get_activities(self, obj):
        activity_list = []
        activity = Activity.objects.all()

        for act in activity:
            activity_dic = {}
            activity_dic["id"] = act.id
            activity_dic["geo_location"] = act.geo_location
            activity_dic["timestamp"] = act.timestamp
            activity_dic["tags"] = act.tags
            activity_dic["md5hash"] = act.md5hash
            activity_dic["post_text"] = act.post_text
            activity_dic["photos_urls"] = act.photo_urls
            activity_list.append(activity_dic)
        return activity_list
