from django.conf import settings
from django.utils import translation
from django.utils.functional import empty
from rest_framework import generics, status
from rest_framework.response import Response

from authApp.models.message import Message
from authApp.serializers.messageSerializer import MessageSerializer


# traer todos los mensajes que ha enviado el usuario
class AllMessagesView(generics.ListCreateAPIView):
    serializer_class   = MessageSerializer

    def get_queryset(self):
        queryset = Message.objects.filter(origin_user=self.kwargs['user'])
        return queryset

# traer todos los mensajes de un solo usuario destino
class MessageFilterView(generics.ListCreateAPIView):
    serializer_class   = MessageSerializer

    def get_queryset(self):
        queryset = Message.objects.filter(origin_user =self.kwargs['user'],
        destiny_user=self.kwargs['desti_user'])
        return queryset

# traer solo un mensaje
class MessageDetailView(generics.RetrieveAPIView):
    queryset           = Message.objects.all()
    serializer_class = MessageSerializer

    def get_queryset(self):
        queryset = Message.objects.filter(origin_user =self.kwargs['user'],
        id=self.kwargs['pk'])
        return queryset

# Crear un mensaje
class MessageCreateView(generics.CreateAPIView):
    serializer_class = MessageSerializer

    def post(self, request, *args, **kwargs):
       
        serializer = MessageSerializer(data=request.data)
        # valida que los tipos de datos que vienen en la peticion sean los mismos
        # que se necesitan en el serializador, si encuentra fallo manda la excepcion
        serializer.is_valid(raise_exception=True)
        # si todo bien, invoca la funcion save, o sea guardar en la DB
        serializer.save()
        return Response("Mensaje creado",status=status.HTTP_201_CREATED)
    
# borrar un mensaje
class MessageDeleteView(generics.DestroyAPIView):
    queryset           = Message.objects.all()
    serializer_class = MessageSerializer

    def delete(self, request, *args, **kwargs):
        super().delete(request, *args, **kwargs)
        stringResponse = {'detail':'Order Deleted'}
        return Response(stringResponse,status=status.HTTP_204_NO_CONTENT)

    """def delete_queryset(self):
        queryset = Message.objects.filter(origin_user=self.kwargs['user'],
        id=self.kwargs['pk'])
        return Response(status=status.HTTP_204_NO_CONTENT)"""
    

