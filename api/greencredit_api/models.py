from sqlite3 import Timestamp
from django.db import models
from django.contrib.auth.models import AbstractUser
import time
from rest_framework_simplejwt.tokens import RefreshToken

import inflect

p = inflect.engine()

# Create your models here.


class BaseModel(models.Model):
    """
    Base Model with created_at, and modified_at fields, will be inherited
    in all other models.
    """

    meta_created_ts = models.DateTimeField(
        auto_now_add=True,
        db_index=True,
        verbose_name=("Meta Created TimeStamp"),
        null=True,
        blank=True,
    )
    meta_updated_ts = models.DateTimeField(
        auto_now=True,
        db_index=True,
        verbose_name=("Meta Updated TimeStamp"),
        null=True,
        blank=True,
    )

    class Meta:
        abstract = True


def user_profile_picture(instance, filename):
    filebase, extension = filename.split(".")
    return "user_profile_picture/%s.%s" % (
        str(int(round(time.time() * 1000))),
        extension,
    )


AUTH_PROVIDERS = {
    "facebook": "facebook",
    "google": "google",
    "twitter": "twitter",
    "email": "email",
}


class GreenCreditUser(AbstractUser):
    first_name = models.CharField(max_length=255, default=None, null=True, blank=True)
    last_name = models.CharField(max_length=255, default=None, null=True, blank=True)
    email = models.EmailField(
        max_length=255,
        default=None,
        null=True,
        blank=True,
        unique=True,
    )
    display_picture = models.ImageField(
        upload_to=user_profile_picture, default=None, null=True, blank=True
    )
    created_on = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    modified_on = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    is_verified = models.BooleanField(default=False)
    is_deleted = models.BooleanField(default=False)
    auth_provider = models.CharField(
        max_length=255, blank=False, null=False, default=AUTH_PROVIDERS.get("email")
    )

    def __str__(self):
        # return self.first_name + " " + self.last_name
        return self.email

    def tokens(self):
        refresh = RefreshToken.for_user(self)
        return {"refresh": str(refresh), "access": str(refresh.access_token)}

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["username"]


def activity_photo_urls(instance, filename):
    filebase, extension = filename.split(".")
    return "activity_photo/%s.%s" % (str(int(round(time.time() * 1000))), extension)


class Activity(models.Model):
    photo_urls = models.JSONField(default="[]", null=True, blank=True)
    geo_location = models.JSONField(default=dict, null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True, null=True, blank=True)
    tags = models.JSONField(blank=True, null=True, default="[]")
    md5hash = models.TextField(null=True, blank=True)
    post_text = models.TextField(null=True, blank=True)
    user = models.ForeignKey(
        GreenCreditUser, on_delete=models.DO_NOTHING, null=True, blank=True
    )

    def __str__(self):
        return f"{self.id} Activity"
