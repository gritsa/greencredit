from django.shortcuts import render

# Create your views here.
from datetime import date
from django.http import request
from django.shortcuts import render
from rest_framework import generics, permissions, serializers, status, views
from .serializers import EmailVerificationSerializer, RegisterSerializer, LoginSerializer, ResetPasswordEmailRequestSerializer,SetNewPasswordSerializer
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from .models import GreenCreditUser
from .utils import Util
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
import jwt
from django.conf import settings
from drf_yasg.utils import swagger_auto_schema
from drf_yasg import openapi

from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import smart_str, force_str, smart_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from .utils import Util
# Create your views here.


class RegisterView(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request):
        user = request.data
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        user_data = serializer.data
        user = GreenCreditUser.objects.get(email=user_data['email'])
        token = RefreshToken.for_user(user).access_token

        current_site = get_current_site(request).domain
        relativelink = reverse('email-verify')
        absurl = "http://" + current_site+relativelink + "?token=" + str(token)
        email_body = 'Hi ' + user.username + \
            ' Use below link to verify your email \n' + absurl
        data = {'email_body': email_body, 'to_email': user.email,
                'email_subject': 'Verify your email address'}

        Util.send_email(data)

        return Response(user_data, status=status.HTTP_201_CREATED)


class VerifyEmail(views.APIView):
    serializer_class = EmailVerificationSerializer
    token_param_config = openapi.Parameter(
        'token', in_=openapi.IN_QUERY, description='Description', type=openapi.TYPE_STRING)

    @swagger_auto_schema(manual_parameters=[token_param_config])
    def get(self, request):
        token = request.GET.get('token')
        try:

            # we are passing our secret key here to decode the token
            payload = jwt.decode(
                token, settings.SECRET_KEY, algorithms=['HS256'])
            print(payload)
            user = GreenCreditUser.objects.get(id=payload['user_id'])
            # print(user)
            if not user.is_verified:
                # print(user.is_verified)
                user.is_verified = True
                user.save()
            return Response({'Message': "Successfully activated"}, status=status.HTTP_200_OK)
        except jwt.ExpiredSignatureError as identifier:
            return Response({"Message": "Activation Expired"}, status=status.HTTP_400_BAD_REQUEST)
        except jwt.exceptions.DecodeError as identifier:
            return Response({"Message": "Invalid Token"}, status=status.HTTP_400_BAD_REQUEST)


class LoginAPIView(generics.GenericAPIView):
    serializer_class = LoginSerializer

    def post(self, request):
        serializers = self.serializer_class(data=request.data)
        serializers.is_valid(raise_exception=True)
        print(serializers.data)
        return Response(serializers.data, status=status.HTTP_200_OK)


 
class RequestPasswordResetEmail(generics.GenericAPIView):
    serializer_class = ResetPasswordEmailRequestSerializer

    def post(self,request):
        data ={'request':request,'data': request.data}
        serializer = self.serializer_class(data=data)

        email = request.data['email']

        if GreenCreditUser.objects.filter(email=email).exists():
            user = GreenCreditUser.objects.get(email=email)
            uidb64 = urlsafe_base64_encode(smart_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)
            current_site = get_current_site(
                request=request).domain
            relativelink = reverse(
                'password-reset-confirm', kwargs={'uidb64': uidb64, 'token': token})
            absurl = "http://" + current_site + relativelink
            email_body = 'Hello,\n Use link below  to rest password \n' + absurl
            data = {'email_body': email_body, 'to_email': user.email,
                    'email_subject': 'Reset your passeword'}

            Util.send_email(data)


        return Response({'Success':'We have sent you an link to reset your password'},status=status.HTTP_200_OK)


class PasswordTokenCheckAPI(generics.GenericAPIView):
    def get(self,request,uidb64,token):
        try:
            id = smart_str(urlsafe_base64_decode(uidb64))
            user = GreenCreditUser.objects.get(id=id)
            if not PasswordResetTokenGenerator().check_token(user, token):
                return Response({'Message':'Token is not valid , please request a new one'},status=status.HTTP_400_BAD_REQUEST)

            return Response({'Success':True,'message':'Credetials Valid','uidb64':uidb64,'token':token},status=status.HTTP_200_OK)
        except DjangoUnicodeDecodeError as identifier:
            if not PasswordResetTokenGenerator().check_token(user, token):
                return Response({'Message':'Take is not valid , please request a new one'},status=status.HTTP_400_BAD_REQUEST)


class SetNewPasswordAPIView(generics.GenericAPIView):
    serializer_class = SetNewPasswordSerializer

    def patch(self,request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({'success':True,'message':'Password Changed Successfully'},status=status.HTTP_200_OK)


