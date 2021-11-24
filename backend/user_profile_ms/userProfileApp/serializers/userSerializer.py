from rest_framework import serializers
from userProfileApp.models.users import Users

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = [
            'username',
            'email',
            'password',
            'profile_image'
        ]
    
    def to_representation(self, obj):
        user = obj
        return {
            'id_user': user.id_user,
            'username': user.username,
            'email': user.email,
            'profile_image': user.profile_image,
            'ocupation': user.ocupation
        }

    # def create (self, **validated_data):
    #     return Client.objects.create_user(**validated_data)
