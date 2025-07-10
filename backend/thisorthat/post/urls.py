from django.urls import path
from . import views


urlpatterns = [
    path("", views.PostListView.as_view(), name="post-list"),
    path("create/", views.PostCreateView.as_view(), name="post-create"),
    path("options/", views.OptionListView.as_view(), name="option-list"),
    path("options/create/", views.OptionCreateView.as_view(), name="option-create"),
]