from django.conf import settings
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework_simplejwt.backends import TokenBackend
from rest_framework.permissions import IsAuthenticated

from userProfileApp.models.users import Users
from userProfileApp.serializers.userSerializer import UserSerializer

        
class UserDetailView(generics.RetrieveAPIView):
    queryset = Users.objects.all()
    serializer_class = UserSerializer
    
    def get(self, request, *arg, **kwargs):
        return super().get(self, request, *arg, **kwargs)


class UserDetailByUsernameView(generics.ListCreateAPIView):
    
    queryset = Users.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'username'

    def get_queryset(self):
        queryset = Users.objects.filter(username__contains = str(self.kwargs['username']))
        return queryset
    