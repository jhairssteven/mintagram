from rest_framework import serializers
from authApp.models import message
from authApp.models.message import Message


class MessageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Message
        fields = ['origin_user', 'destiny_user', 'text', 'register_date']
    
    def to_representation(self,obj):            
            #cada vez que me pida info del  message se va a retornar de esa manera:
            message = Message.objects.get(id=obj.id)
            return {
                'id'             : message.id,
                'text'           : message.text,
                'register_date'  : message.register_date,
                'origin_user'    : message.origin_user,
                'destiny_user'   : message.destiny_user,
            }
                


                     
               


    