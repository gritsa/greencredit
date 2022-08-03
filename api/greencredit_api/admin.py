from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from greencredit_api.models import Activity, GreenCreditUser, CreditLedger, GreenCreditUserGroup,GreenCreditUserPermissions, ContentType,AdminLog,AuthPermission,AuthGroup,AuthGroupPermissions,Migrations,Session

# Register your models here.


class GreenCreditUserAdmin(UserAdmin):
    # UserAdmin.list_display += ('login_provider_id','display_picture')  # don't forget the commas
    # UserAdmin.list_filter += ('login_provider_id','display_picture')
    UserAdmin.fieldsets += (
        ("Profile Info", {"fields": ("display_picture", "title", "role")}),
    )

    UserAdmin.fieldsets += (("Is Verified", {"fields": ("is_verified",)}),)
    UserAdmin.fieldsets += (("Auth Provider", {"fields": ("auth_provider",)}),)


admin.site.register(GreenCreditUser, GreenCreditUserAdmin)
admin.site.register(Activity)
admin.site.register(GreenCreditUserPermissions)
admin.site.register(GreenCreditUserGroup)
admin.site.register(CreditLedger)
admin.site.register(AdminLog)
admin.site.register(AuthPermission)
admin.site.register(AuthGroup)
admin.site.register(AuthGroupPermissions)
admin.site.register(Migrations)
admin.site.register(Session)
admin.site.register(ContentType)
