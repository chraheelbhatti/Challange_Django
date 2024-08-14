from django.contrib import admin
from .models import User, Profile


class UserAdmin(admin.ModelAdmin):
    list_display = ('email', 'first_name', 'last_name', 'wallet_address', 'is_admin', 'is_staff', 'is_active')
    search_fields = ('email', 'first_name', 'last_name', 'wallet_address')
    readonly_fields = ('created_at', 'updated_at')

    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()


admin.site.register(User, UserAdmin)
admin.site.register(Profile)
