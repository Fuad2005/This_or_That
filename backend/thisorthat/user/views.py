from django.shortcuts import render
from rest_framework.generics import RetrieveAPIView, CreateAPIView, ListAPIView
from .models import User, Profile
from .serializers import RegisterSerializer, ProfileSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status, filters

# Create your views here.
class RegisterAV(RetrieveAPIView, CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer



# Send token in header
class GetProfile(RetrieveAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer

    def get_object(self):
        return self.request.user.profile
    


class GetAllProfiles(ListAPIView):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['user__username__icontains', 'user__first_name__icontains', 'user__last_name__icontains']


@api_view(["POST"])
def logout(request):
    request.user.auth_token.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)