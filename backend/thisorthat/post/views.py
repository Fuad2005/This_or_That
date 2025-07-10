from django.shortcuts import render
from .serializers import PostSerializer, OptionSerializer
from .models import Post, Option
from rest_framework.generics import CreateAPIView, ListAPIView

# Create your views here.

class PostCreateView(CreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

class PostListView(ListAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class OptionCreateView(CreateAPIView):
    queryset = Option.objects.all()
    serializer_class = OptionSerializer

class OptionListView(ListAPIView):
    queryset = Option.objects.all()
    serializer_class = OptionSerializer