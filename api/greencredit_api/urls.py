from webbrowser import get
from django.urls import path, include, re_path
from .views import (
    ActivityByUserId,
    GetActivity,
    GetUpdateActivityByID,
    CreateActivity,
    LoginAPIView,
    LogoutAPIView,
    RegisterView,
    UpdateUserProfileByID,
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
    # path("api/activitys/", GetCreateActivity.as_view(), name="get-create-activity"),
    path("create/activities/", CreateActivity.as_view()),
    path("get/activities/", GetActivity.as_view()),
    path("activities-by-id/<int:id>", GetUpdateActivityByID.as_view()),
    path("activities-by-user-id/<int:id>", ActivityByUserId.as_view()),
    path("update-user-profile/<int:id>", UpdateUserProfileByID.as_view()),
    path("logout/", LogoutAPIView.as_view(), name="logout"),
]
