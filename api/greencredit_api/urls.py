from django.urls import path, include
from .views import (
    LoginAPIView,
    RegisterView,
    VerifyEmail,
    PasswordTokenCheckAPI,
    RequestPasswordResetEmail,
    SetNewPasswordAPIView,
    GoogleSocialAuthView,
)
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)


urlpatterns = [
    # path('google-login/', include(login_patterns)),
    # path('logout/', LogoutApi.as_view(), name='logout'),
    path("google/", GoogleSocialAuthView.as_view(), name="google-social-auth"),
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginAPIView.as_view(), name="login"),
    path("email-verify/", VerifyEmail.as_view(), name="email-verify"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    path(
        "request-rest-email/",
        RequestPasswordResetEmail.as_view(),
        name="request-rest-email",
    ),
    path(
        "password-reset/<uidb64>/<token>/",
        PasswordTokenCheckAPI.as_view(),
        name="password-reset-confirm",
    ),
    path(
        "password-reset-complete",
        SetNewPasswordAPIView.as_view(),
        name="password-reset-complete",
    ),
]
