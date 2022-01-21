from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from greencredit_api.models import Activity, GreenCreditUser

# Register your models here.


class GreenCreditUserAdmin(UserAdmin):
    # UserAdmin.list_display += ('login_provider_id','display_picture')  # don't forget the commas
    # UserAdmin.list_filter += ('login_provider_id','display_picture')
    UserAdmin.fieldsets += (("Profile Photo", {"fields": ("display_picture",)}),)

    UserAdmin.fieldsets += (("Is Verified", {"fields": ("is_verified",)}),)
    UserAdmin.fieldsets += (("Auth Provider", {"fields": ("auth_provider",)}),)


admin.site.register(GreenCreditUser, GreenCreditUserAdmin)
admin.site.register(Activity)
