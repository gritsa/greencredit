from cgitb import lookup
import email
from click import option
from django.shortcuts import render
import json
from django.db.models import Q

# Create your views here.
from datetime import date
from django.http import request
from django.shortcuts import render
from rest_framework import generics, permissions, serializers, status, views
from .serializers import (
    UserCreditLedgerSerializer,
    CreditLedgerSerializer,
    EmailVerificationSerializer,
    GetAllActivitySerializer,
    LedgerStatementSerializer,
    RegisterSerializer,
    LoginSerializer,
    ResetPasswordEmailRequestSerializer,
    SetNewPasswordSerializer,
    UpdateUserProfileSerializer,
    UserActivitySerializer,
    CreditPointSerializer,
)
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .models import CreditLedger, GreenCreditUser, Activity
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
import base64

# google auth
from rest_framework.generics import GenericAPIView
from .serializers import (
    GoogleSocialAuthSerializer,
    ActivitySerializer,
    LoginSerializer,
    CreditLedgerSerializer,
    CreditPoint,
    # UserActivitySerializer,
    # ActivityImagesSerializers,
    LogoutSerializer,
)
from rest_framework import status
from rest_framework import viewsets
import os
from rest_framework.permissions import IsAuthenticated
from datetime import datetime
from django.core import serializers
import boto3
import random
from greencredit_api.helpers.DBFunction import InvokeDBFunction

# Create your views here.


class RegisterView(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request):
        if GreenCreditUser.objects.filter(auth_provider=request.data["auth_provider"]).exists():
            user = GreenCreditUser.objects.get(
                auth_provider=request.data["auth_provider"])
            serializer = RegisterSerializer(
                instance=user, data=request.data, partial=True)
            if serializer.is_valid():
                serializer.save()
                user_data = serializer.data
                tokens = RefreshToken.for_user(user).access_token
                return Response(user_data, status=status.HTTP_201_CREATED)
            return Response(status=status.HTTP_400_BAD_REQUEST)
        else:
            user = request.data
            user["last_login"] = datetime.now()
            serializer = self.serializer_class(data=user)
            serializer.is_valid(raise_exception=False)
            serializer.save()
            user_data = serializer.data
            user = GreenCreditUser.objects.get(
                auth_provider=user_data["auth_provider"])
            token = RefreshToken.for_user(user).access_token
            # current_site = get_current_site(request).domain
            # relativelink = reverse("email-verify")
            # absurl = "http://" + current_site + \
            #     relativelink + "?token=" + str(token)
            # email_body = (
            #     "Hi "
            #     + user.username
            #     + " Use below link to verify your email \n"
            #     + absurl
            # )
            # data = {
            #     "email_body": email_body,
            #     "to_email": user.email,
            #     "email_subject": "Verify your email address",
            # }

            # Util.send_email(data)

            return Response(user_data, status=status.HTTP_201_CREATED)

    # token
    def get_tokens(self, obj):
        user = GreenCreditUser.objects.get(email=obj["email"])

        return {"refresh": user.tokens()["refresh"], "access": user.tokens()["access"]}


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
            payload = jwt.decode(
                token, settings.SECRET_KEY, algorithms=["HS256"])
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
        return Response(
            {"Error": "Email does not exist"}, status=status.HTTP_400_BAD_REQUEST
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
    serializer_credit_class = CreditPoint
    # permission_classes = (IsAuthenticated,)

    def post(self, request):
        # photo_urls = request.FILES["photo_urls"]
        # ret = image.UploadImage(datetime.now(), photo_urls)
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            credit = self.serializer_credit_class(
                user_id=request.data['user'], activity_id=serializer.data['id'], amount=random.randrange(1, 1000), meta="{}", timestamp=datetime.now()
            )

            credit.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class uploadImage(generics.CreateAPIView):
    def post(self, request):
        image_base64 = request.data["photo"]
        now = datetime.now()
        filename = str(now) + '_picture.jpg'
        # imagedata = photo_urls
        s3 = boto3.resource('s3')
        try:
            object = s3.Object('greencredits3bucket', filename)
            object.put(Body=base64.b64decode(image_base64), Key=filename)
            return Response(filename, status=status.HTTP_201_CREATED)
        except Exception as e:
            return e


class GetActivity(generics.ListAPIView):
    serializer_class = GetAllActivitySerializer
    # permission_classes = (IsAuthenticated,)

    def get(self, request):
        activityType = request.data["activityType"]
        data = InvokeDBFunction().callRoutine('select * from fngetallposts(%s);', activityType)
        if data['status'] == 200:
            return dictfetchall(data['data'], data['columns'])
        else:
            return Response({'responseStatusCode': data['responseStatusCode'],
                             'description':  data['description']}, status=data['status'])

class GetUpdatedActivity(generics.UpdateAPIView):
    serializer_class = ActivitySerializer

    def post(self, request, id):
        try:
            activity = Activity.objects.get(id=id)
            activity.likes = request.data["likes"]
            activity.comments = request.data["comments"]
            activity.save()
            return Response(
                {"Message": "Activity Updated"}, status=status.HTTP_200_OK
            )
        except Activity.DoesNotExist:
            return Response(
                {"Message": "Activity does not exist"}, status=status.HTTP_404_NOT_FOUND
            )


class AddLikeToActivity(generics.UpdateAPIView):
    serializer_class = ActivitySerializer

    def post(self, request):
        postId = request.data["activityId"]
        userId = request.data["userId"]
        data = InvokeDBFunction().callRoutine(
            'select * from fnaddlikes(%s, %s);', postId,  userId)

        if data['status'] == 200:
            return dictfetchall(data['data'], data['columns'])
        else:
            return Response({'responseStatusCode': data['responseStatusCode'],
                             'description':  data['description']}, status=data['status'])


class AddCommentToActivity(generics.UpdateAPIView):
    serializer_class = ActivitySerializer

    def post(self, request):
        postId = request.data["activityId"]
        comments = request.data["comments"]
        data = InvokeDBFunction().callRoutine(
            'select * from fnaddcomment(%s, %s);', postId,  comments)

        if data['status'] == 200:
            return dictfetchall(data['data'], data['columns'])
        else:
            return Response({'responseStatusCode': data['responseStatusCode'],
                             'description':  data['description']}, status=data['status'])


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
            photo_urls = handle_uploaded_file(
                request.FILES.getlist("photo_urls"))
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


def transact(from_user_id, to_user_id, amount, meta):
    from_user = GreenCreditUser.objects.filter(id=from_user_id).first()
    to_user = GreenCreditUser.objects.filter(id=to_user_id).first()

    credit_ledger = CreditLedger(
        from_user=from_user, to_user=to_user, amount=amount, transaction_meta=meta
    )

    credit_ledger.save()
    return credit_ledger


class CreateCreditLedger(APIView):
    permission_classes = (IsAuthenticated,)

    def post(self, request):
        # validate all the request data fields are present and not empty and valid data
        if (
            "user_id" not in request.auth
            or "to_user" not in request.data
            or "amount" not in request.data
            or "transaction_meta" not in request.data
        ):
            return Response(
                {"Message": "Please provide all the required fields"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        from_user = request.auth["user_id"]
        to_user = GreenCreditUser.objects.get(id=request.data["to_user"])
        to_user = to_user.id
        amount = request.data["amount"]
        meta = request.data["transaction_meta"]
        if from_user == to_user:
            return Response(
                {"Message": "You cannot transact with yourself"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        if float(amount) <= 0:
            return Response(
                {"Message": "Amount cannot be zero or negative"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        credit_ledger = transact(from_user, to_user, amount, meta)
        return Response(
            {"Message": "Ledger is created"}, status=status.HTTP_201_CREATED
        )


def get_statement(user_id, options):
    if options:
        if "start_timestamp" in options and "end_timestamp" in options:
            start_timestamp = options["start_timestamp"]
            end_timestamp = options["end_timestamp"]
            return CreditLedger.objects.filter(
                Q(from_user=user_id) | Q(to_user=user_id),
                timestamp__range=[start_timestamp, end_timestamp],
            ).order_by("-amount")
        else:
            return CreditLedger.objects.filter(
                Q(from_user=user_id) | Q(to_user=user_id)
            ).order_by("-amount")
    else:
        return CreditLedger.objects.filter(
            Q(from_user=user_id) | Q(to_user=user_id)
        ).order_by("-amount")


def get_balance(id):
    credit_ledger = CreditLedger.objects.filter(
        Q(from_user=id) | Q(to_user=id)
    ).order_by("-id")
    balance = 0
    for ledger in credit_ledger:
        if ledger.from_user_id == id:
            balance -= ledger.amount
        else:
            balance += ledger.amount
    return balance


class GetCreditLedgerStatement(APIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = LedgerStatementSerializer

    def get(self, request, id=None):
        id = request.auth["user_id"]
        options = request.data["options"]
        try:
            user = GreenCreditUser.objects.get(id=id)
            credit_ledger = get_statement(id, options)
            serializer = self.serializer_class(credit_ledger, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except GreenCreditUser.DoesNotExist:
            return Response(
                {"Message": "User does not exist"}, status=status.HTTP_404_NOT_FOUND
            )


class GetCreditLedgerBalance(APIView):
    permission_classes = (IsAuthenticated,)
    serializer_class = CreditLedgerSerializer

    def get(self, request, id=None):
        id = request.auth["user_id"]

        try:
            # add timestamp of when the response was generated by API
            timestamp = datetime.now()
            balance = get_balance(id)
            return Response(
                {"user_id": id, "credit_balance": balance, "timestamp": timestamp},
                status=status.HTTP_200_OK,
            )
        except GreenCreditUser.DoesNotExist:
            return Response(
                {"Message": "User does not exist"}, status=status.HTTP_404_NOT_FOUND
            )

# UserCreditLedgerByUserIdView


class CreditLedgerByUserId(generics.RetrieveUpdateAPIView):
    # permission_classes = (IsAuthenticated,)
  #  lookup_field = "id"
   # queryset = CreditPoint.objects.all()
    serializer_class = CreditPointSerializer

    def get(self, request, user_id):
        data = InvokeDBFunction().callRoutine(
            'select * from fngetcreditpoints(%s);', user_id)
        if data['status'] == 200:
            return dictfetchall(data['data'], data['columns'])
        else:
            return Response({'responseStatusCode': data['responseStatusCode'],
                             'description':  data['description']}, status=data['status'])


class GetUserById(generics.RetrieveUpdateAPIView):
    serializer_class = RegisterSerializer
    # permission_classes = (IsAuthenticated,)

    def get(self, request, user_id):
        try:
            user = GreenCreditUser.objects.get(id=user_id)
            serializer = self.serializer_class(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except GreenCreditUser.DoesNotExist:
            return Response(
                {"Message": "User Id does not exist"}, status=status.HTTP_404_NOT_FOUND
            )

class AddFollowOrUnfollowToUser(generics.UpdateAPIView):
    def post(self, request):
        followUserId = request.data["follow_user_id"]
        userId = request.data["user_id"]
        data = InvokeDBFunction().callRoutine(
            'select * from fnadfollowandunfollow(%s, %s);', followUserId,  userId)

        if data['status'] == 200:
            return dictfetchall(data['data'], data['columns'])
        else:
            return Response({'responseStatusCode': data['responseStatusCode'],
                             'description':  data['description']}, status=data['status'])

class GetPopularUser(generics.ListAPIView):
  
    def get(self, request):
        data = InvokeDBFunction().callRoutine('select * from fngetpopularusers();')
        if data['status'] == 200:
            return dictfetchall(data['data'], data['columns'])
        else:
            return Response({'responseStatusCode': data['responseStatusCode'],
                             'description':  data['description']}, status=data['status'])                             


def dictfetchall(data, columns):
    if len(data) == 0:
        return Response({
                        'responseStatusCode': 400,
                        'description': 'No data found'
                        }, status=status.HTTP_200_OK)
    else:
        columns = [col[0] for col in columns]
        return Response([
            dict(zip(columns, row))
            for row in data
        ])
