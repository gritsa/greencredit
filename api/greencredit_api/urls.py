from webbrowser import get
from django.urls import path, include, re_path
from .views import (
    CreditLedgerByUserId,
    ActivityByUserId,
    CreateCreditLedger,
    GetActivity,
    GetCreditLedgerBalance,
    GetCreditLedgerStatement,
    GetUpdatedActivity,
    GetUpdateActivityByID,
    CreateActivity,
    GetUpdateUserProfileByID,
    LoginAPIView,
    LogoutAPIView,
    RegisterView,
    VerifyEmail,
    PasswordTokenCheckAPI,
    RequestPasswordResetEmail,
    SetNewPasswordAPIView,
    GoogleSocialAuthView,
    uploadImage,
    AddLikeToActivity,
    AddCommentToActivity,
    GetUserById
)
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [
    path("google/", GoogleSocialAuthView.as_view(), name="google-social-auth"),
    path("register/", RegisterView.as_view(), name="register"),
    path("login/", LoginAPIView.as_view(), name="login"),
    path("email-verify/", VerifyEmail.as_view(), name="email-verify"),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
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
    #path("api/activitys/", GetCreateActivity.as_view(), name="get-create-activity"),
    path("create/activities/", CreateActivity.as_view()),
    path("like/", AddLikeToActivity.as_view()),
    path("comments/", AddCommentToActivity.as_view()),
    path("get/activities/", GetActivity.as_view()),
    path("activities-by-id/<int:id>", GetUpdateActivityByID.as_view()),
    path("like/<int:id>", GetUpdatedActivity.as_view()),
    path("activities-by-user-id/<int:id>", ActivityByUserId.as_view()),
    path("get-update-user-profile/<int:id>", GetUpdateUserProfileByID.as_view()),
    path("credit-ledger/", CreateCreditLedger.as_view()),
    path("creditledgers-by-user-id/<int:user_id>", CreditLedgerByUserId.as_view()),
    path("check-ledger-balance/", GetCreditLedgerBalance.as_view()),
    path("check-ledger-statement/", GetCreditLedgerStatement.as_view()),
    path("uploadimage/", uploadImage.as_view()),
    path("logout/", LogoutAPIView.as_view(), name="logout"),
    path("getuserbyid/<int:user_id>", GetUserById.as_view()),
]
