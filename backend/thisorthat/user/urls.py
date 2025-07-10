from django.urls import path
from . import views
from rest_framework.authtoken import views as auth_views


urlpatterns = [
    path("get-all-profiles/", views.GetAllProfiles.as_view(), name="get-all-profiles"),
    path("register/", views.RegisterAV.as_view(), name="register"),
    path("login/", auth_views.obtain_auth_token, name="login"),
    path("logout/", views.logout, name="logout"),
    path("get-profile/", views.GetProfile.as_view(), name="get-profile"),
]