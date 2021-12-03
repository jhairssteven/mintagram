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
    
    # change default field to search on get request below
    def get(self, request, *arg, **kwargs):
        return super().get(self, request, *arg, **kwargs)

    """lookup_field = "id_user" 
    
    permission_classes = (IsAuthenticated,)

    def get(self, request, *arg, **kwargs):
        token = request.META.get('HTTP_AUTHORIZATION')[7:]
        tokenBackend = TokenBackend(algorithm=settings.SIMPLE_JWT['ALGORITHM'])
        valid_data = tokenBackend.decode(token, verify=False)

        if not Users.objects.filter(id_user=kwargs['id_user']).exists():
            stringResponse = {'detail': 'Only registered users can see this info'}
            return Response(stringResponse, status=status.HTTP_401_UNAUTHORIZED)
       
        return super().get(request, *arg, **kwargs)"""