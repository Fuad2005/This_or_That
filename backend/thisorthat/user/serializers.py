from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token
from .models import Profile


class RegisterSerializer(serializers.ModelSerializer):
    token = serializers.SerializerMethodField(read_only=True)
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'username', 'email', 'password', 'token']
        read_only_fields = ['id']
        extra_kwargs = {
            'password': {'write_only': True}
        }




    def get_token(self, obj):
        token = Token.objects.get_or_create(user=obj)[0].key
        return token
    
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Profile.objects.create(user=user)
        return user
    

class ProfileSerializer(serializers.ModelSerializer):
    user = RegisterSerializer()
    posts = serializers.SerializerMethodField()
    votes = serializers.SerializerMethodField()
    class Meta:
        model = Profile
        fields = ['id', 'user', 'created_at', 'posts', 'votes', 'created_at']
        read_only_fields = ['id', 'created_at']


    def get_posts(self, obj):
        posts = obj.posts.all()
        return [{'id': post.id, 'question': post.question, 'option1': post.option1.text, 'option1_votes': post.option1.votes.count(), 'option2': post.option2.text, 'option2_votes': post.option2.votes.count(), 'author': post.author.user.username, 'author_id': post.author.id} for post in posts]

    def get_votes(self, obj):
        votes = obj.votes.all()
        return [{'id': vote.id, 'text': vote.text, 'question_id': vote.post.id } for vote in votes]