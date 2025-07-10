from rest_framework import serializers
from .models import Post, Option
from rest_framework.exceptions import AuthenticationFailed




class OptionSerializer(serializers.ModelSerializer):


    class Meta:
        model = Option
        fields = ['id', 'text', 'votes']
        read_only_fields = ['id']


        


class PostSerializer(serializers.ModelSerializer):
    option1 = OptionSerializer()
    option2 = OptionSerializer()
    author = serializers.SerializerMethodField()

    def get_author(self, obj):
        return {
            'id': obj.author.id,
            'first_name': obj.author.user.first_name,
            'last_name': obj.author.user.last_name,
            'username': obj.author.user.username,
            'email': obj.author.user.email,
            'created_at': obj.author.created_at
        }


    class Meta:
        model = Post
        fields = ['id', 'question', 'created_at', 'author', 'option1', 'option2']
        read_only_fields = ['id', 'created_at', 'author']

    def create(self, validated_data):
        request = self.context.get('request')
        if request.user.is_anonymous:
            raise AuthenticationFailed('Authentication required')
        profile = request.user.profile

        option1_data = validated_data.pop('option1')
        option2_data = validated_data.pop('option2')

        post = Post.objects.create(author=profile, **validated_data)
        option1 = Option.objects.create(text=option1_data['text'])
        option2 = Option.objects.create(text=option2_data['text'])

        post.option1 = option1
        post.option2 = option2
        post.save()
        return post