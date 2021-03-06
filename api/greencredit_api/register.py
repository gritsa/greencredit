from django.contrib.auth import authenticate
from .models import GreenCreditUser
import os
import random
from rest_framework.exceptions import AuthenticationFailed
from decouple import config


# def generate_username(name):
#     username = "".join(name.split(" ")).lower()
#     if not GreenCreditUser.objects.filter(username=username).exists():
#         return username
#     else:
#         random_username = username + str(random.randint(0, 1000))
#         return generate_username(random_username)


def register_social_user(
    provider, user_id, email, name, first_name, last_name, display_picture
):
    filtered_user_by_email = GreenCreditUser.objects.filter(email=email)
    if filtered_user_by_email.exists():
        if provider == filtered_user_by_email[0].auth_provider:
            registered_user = authenticate(
                email=email, password=config("SOCIAL_SECRET")
            )
            return {
                "username": registered_user.username,
                "email": registered_user.email,
                # 'first_name':registered_user.first_name,
                # 'last_name':registered_user.last_name,
                "tokens": registered_user.tokens(),
            }

        else:
            raise AuthenticationFailed(
                detail="Please continue your login using "
                + filtered_user_by_email[0].auth_provider
            )

    else:
        user = {
            "username": name,
            "email": email,
            "password": config("SOCIAL_SECRET"),
            "first_name": first_name,
            "last_name": last_name,
            "display_picture": display_picture,
        }
        user = GreenCreditUser.objects.create_user(**user)
        user.is_verified = True
        user.auth_provider = provider
        user.save()

        new_user = authenticate(email=email, password=config("SOCIAL_SECRET"))

        return {
            "email": new_user.email,
            "username": new_user.username,
            "tokens": new_user.tokens(),
        }
