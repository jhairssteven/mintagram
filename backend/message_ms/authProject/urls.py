
from django.urls import path
from rest_framework_simplejwt.views import (TokenObtainPairView, TokenRefreshView)
from authApp import views

urlpatterns = [
    #path('login/', TokenObtainPairView.as_view()),

    path('message/create/', views.MessageCreateView.as_view()),
    path('allmessages/<int:userId>/', views.AllMessagesView.as_view()),
    path('messages/filter/<int:user>/<int:desti_user>/', views.MessageFilterView.as_view()),
    path('message/<int:user>/<int:pk>/', views.MessageDetailView.as_view()),
    path('message/remove/<int:user>/<int:pk>/', views.MessageDeleteView.as_view()),
    
]
