import email
from django.shortcuts import render
import json

# Create your views here.
from datetime import date
from django.http import request
from django.shortcuts import render
from rest_framework import generics, permissions, serializers, status, views
from .serializers import (
    EmailVerificationSerializer,
    GetAllActivitySerializer,
    RegisterSerializer,
    LoginSerializer,
    ResetPasswordEmailRequestSerializer,
    SetNewPasswordSerializer,
    UpdateUserProfileSerializer,
    UserActivitySerializer,
)
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .models import GreenCreditUser, Activity
from .utils import Util
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
import jwt
from django.conf import settings
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import (
    smart_str,
    force_str,
    smart_bytes,
    DjangoUnicodeDecodeError,
)
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from .utils import Util
from rest_framework.views import APIView

# google auth
from rest_framework.generics import GenericAPIView
from .serializers import (
    GoogleSocialAuthSerializer,
    ActivitySerializer,
    LoginSerializer,
    # UserActivitySerializer,
    # ActivityImagesSerializers,
    LogoutSerializer,
)
from rest_framework import status
from rest_framework import viewsets
import os
from rest_framework.permissions import IsAuthenticated

# Create your views here.


class RegisterView(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request):
        user = request.data
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        user_data = serializer.data
        user = GreenCreditUser.objects.get(email=user_data["email"])
        token = RefreshToken.for_user(user).access_token

        current_site = get_current_site(request).domain
        relativelink = reverse("email-verify")
        absurl = "http://" + current_site + relativelink + "?token=" + str(token)
        email_body = (
            "Hi " + user.username + " Use below link to verify your email \n" + absurl
        )
        data = {
            "email_body": email_body,
            "to_email": user.email,
            "email_subject": "Verify your email address",
        }

        Util.send_email(data)

        return Response(user_data, status=status.HTTP_201_CREATED)


class VerifyEmail(views.APIView):
    serializer_class = EmailVerificationSerializer
    token_param_config = openapi.Parameter(
        "token",
        in_=openapi.IN_QUERY,
        description="Description",
        type=openapi.TYPE_STRING,
    )

    @swagger_auto_schema(manual_parameters=[token_param_config])
    def get(self, request):
        token = request.GET.get("token")
        try:

            # we are passing our secret key here to decode the token
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
            user = GreenCreditUser.objects.get(id=payload["user_id"])
            if not user.is_verified:
                user.is_verified = True
                user.save()
            return Response(
                {"Message": "Successfully activated"}, status=status.HTTP_200_OK
            )
        except jwt.ExpiredSignatureError as identifier:
            return Response(
                {"Message": "Activation Expired"}, status=status.HTTP_400_BAD_REQUEST
            )
        except jwt.exceptions.DecodeError as identifier:
            return Response(
                {"Message": "Invalid Token"}, status=status.HTTP_400_BAD_REQUEST
            )


class LoginAPIView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request):
        serializers = self.serializer_class(data=request.data)
        serializers.is_valid(raise_exception=True)
        return Response(serializers.data, status=status.HTTP_200_OK)


class RequestPasswordResetEmail(generics.GenericAPIView):
    serializer_class = ResetPasswordEmailRequestSerializer

    def post(self, request):
        data = {"request": request, "data": request.data}
        serializer = self.serializer_class(data=data)

        email = request.data["email"]

        if GreenCreditUser.objects.filter(email=email).exists():
            user = GreenCreditUser.objects.get(email=email)
            uidb64 = urlsafe_base64_encode(smart_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)
            current_site = get_current_site(request=request).domain
            relativelink = reverse(
                "password-reset-confirm", kwargs={"uidb64": uidb64, "token": token}
            )
            absurl = "http://" + current_site + relativelink
            email_body = "Hello,\n Use link below  to rest password \n" + absurl
            data = {
                "email_body": email_body,
                "to_email": user.email,
                "email_subject": "Reset your passeword",
            }

            Util.send_email(data)

        return Response(
            {"Success": "We have sent you an link to reset your password"},
            status=status.HTTP_200_OK,
        )


class PasswordTokenCheckAPI(generics.GenericAPIView):
    serializer_class = SetNewPasswordSerializer

    def get(self, request, uidb64, token):
        try:
            id = smart_str(urlsafe_base64_decode(uidb64))
            user = GreenCreditUser.objects.get(id=id)
            if not PasswordResetTokenGenerator().check_token(user, token):
                return Response(
                    {"Message": "Token is not valid , please request a new one"},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            return Response(
                {
                    "Success": True,
                    "Message": "Credentials Valid",
                    "uidb64": uidb64,
                    "token": token,
                },
                status=status.HTTP_200_OK,
            )
        except DjangoUnicodeDecodeError as identifier:
            if not PasswordResetTokenGenerator().check_token(user, token):
                return Response(
                    {"Message": "Token is not valid , please request a new one"},
                    status=status.HTTP_400_BAD_REQUEST,
                )


class SetNewPasswordAPIView(generics.GenericAPIView):
    serializer_class = SetNewPasswordSerializer

    def patch(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(
            {"success": True, "message": "Password Changed Successfully"},
            status=status.HTTP_200_OK,
        )


class LogoutAPIView(generics.GenericAPIView):
    serializer_class = LogoutSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response(
            {"success": True, "message": "Logout Successfully"},
            status=status.HTTP_200_OK,
        )


class GoogleSocialAuthView(GenericAPIView):
    serializer_class = GoogleSocialAuthSerializer

    def post(self, request):
        """

        POST with 'auth_token'

        Send an id token as from google to get user information

        """
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        data = (serializer.validated_data)["auth_token"]
        return Response(data, status=status.HTTP_200_OK)


class CreateActivity(generics.CreateAPIView):
    serializer_class = ActivitySerializer
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        photo_urls = handle_uploaded_file(request.FILES.getlist("photo_urls"))
        request.data["user"] = request.auth["user_id"]
        # conver list to json
        photo_urls = json.dumps(photo_urls)
        request.data["photo_urls"] = photo_urls
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GetActivity(generics.ListAPIView):
    serializer_class = GetAllActivitySerializer
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        try:
            activity = Activity.objects.all()
            serializer = self.serializer_class(activity)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Activity.DoesNotExist:
            return Response(
                {"Message": "Activity does not exist"}, status=status.HTTP_404_NOT_FOUND
            )


class GetUpdateActivityByID(generics.UpdateAPIView):
    serializer_class = ActivitySerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        return Activity.objects.all()

    def get(self, request, id):
        try:
            activity = Activity.objects.get(id=id)
            serializer = self.serializer_class(activity)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Activity.DoesNotExist:
            return Response(
                {"Message": "Activity does not exist"}, status=status.HTTP_404_NOT_FOUND
            )

    def put(self, request, id):
        try:
            activity = Activity.objects.get(id=id)
            photo_urls = handle_uploaded_file(request.FILES.getlist("photo_urls"))
            activity.photo_urls = photo_urls
            activity.geo_location = request.data["geo_location"]
            activity.tags = request.data["tags"]
            activity.md5hash = request.data["md5hash"]
            activity.post_text = request.data["post_text"]
            activity.save()
            return Response(
                {"Message": "Activity is updated"}, status=status.HTTP_200_OK
            )
        except Activity.DoesNotExist:
            return Response(
                {"Message": "Activity does not exist"}, status=status.HTTP_404_NOT_FOUND
            )

    def delete(self, request, id):
        try:
            activity = Activity.objects.get(id=id)
            activity.delete()
            return Response(
                {"Message": "Activity is Deleted"}, status=status.HTTP_204_NO_CONTENT
            )
        except Activity.DoesNotExist:
            return Response(
                {"Message": "Activity does not exist"}, status=status.HTTP_404_NOT_FOUND
            )


def handle_uploaded_file(files):
    photo_urls = []
    for file in files:
        with open(os.path.join(settings.MEDIA_ROOT, file.name), "wb+") as destination:
            for chunk in file.chunks():
                destination.write(chunk)
                photo_urls.append(file.name)
            destination.close()
    return photo_urls


class ActivityByUserId(generics.RetrieveUpdateAPIView):
    permission_classes = (IsAuthenticated,)
    lookup_field = "id"
    queryset = Activity.objects.all()
    serializer_class = UserActivitySerializer


class GetUpdateUserProfileByID(APIView):
    permission_classes = (IsAuthenticated,)
    lookup_field = "id"
    queryset = GreenCreditUser.objects.all()
    serializer_class = UpdateUserProfileSerializer

    def get(self, request, id):
        try:
            user = GreenCreditUser.objects.get(id=id)
            serializer = self.serializer_class(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except GreenCreditUser.DoesNotExist:
            return Response(
                {"Message": "User does not exist"}, status=status.HTTP_404_NOT_FOUND
            )

    def put(self, request, id):
        try:
            user = GreenCreditUser.objects.get(id=id)
            user.first_name = request.data["first_name"]
            user.last_name = request.data["last_name"]
            user.display_picture = request.data["display_picture"]
            user.title = request.data["title"]
            user.role = request.data["role"]
            user.save()
            return Response({"Message": "User is updated"}, status=status.HTTP_200_OK)
        except GreenCreditUser.DoesNotExist:
            return Response(
                {"Message": "User does not exist"}, status=status.HTTP_404_NOT_FOUND
            )

