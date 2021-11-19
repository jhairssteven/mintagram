# Generated by Django 3.2.8 on 2021-11-17 23:00

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('authApp', '0003_auto_20211108_0947'),
    ]

    operations = [
        migrations.CreateModel(
            name='Message',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('text', models.CharField(max_length=500)),
                ('register_date', models.DateTimeField(auto_now_add=True)),
                ('destiny_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='destiny', to=settings.AUTH_USER_MODEL)),
                ('origin_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='origin', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]