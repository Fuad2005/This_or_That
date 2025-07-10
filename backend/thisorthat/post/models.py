from django.db import models

# Create your models here.
class Post(models.Model):
    author = models.ForeignKey('user.Profile', on_delete=models.CASCADE, related_name='posts')
    question = models.CharField(max_length=255)
    option1 = models.ForeignKey('Option', blank=True, null=True,on_delete=models.CASCADE, related_name='option1')
    option2 = models.ForeignKey('Option', blank=True, null=True,on_delete=models.CASCADE, related_name='option2')
    created_at = models.DateTimeField(auto_now_add=True)




class Option(models.Model):
    text = models.CharField(max_length=255)
    votes = models.ManyToManyField('user.Profile', blank=True, related_name='votes')