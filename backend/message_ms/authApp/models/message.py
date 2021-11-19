from django.db import models


class Message(models.Model):
    id              = models.AutoField('Id',primary_key=True)
    origin_user     = models.IntegerField('Origin_User',null=False)
    destiny_user    = models.IntegerField('Destiny_User',null=False)
    text            = models.CharField('Text',max_length=500)
    register_date   = models.DateTimeField('Resgiter_Data',auto_now_add=True, blank=True)