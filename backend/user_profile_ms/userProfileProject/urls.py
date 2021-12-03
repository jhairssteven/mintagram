"""userProfileProject URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt.views import (TokenObtainPairView, TokenRefreshView)
from userProfileApp import views

urlpatterns = [
    path('admin/', admin.site.urls),

    path('u/login/',            TokenObtainPairView.as_view()), # user login
    path('u/refresh/',          TokenRefreshView.as_view()),    # user token refresh
    path('u/signup/',            views.UserCreateView.as_view()), # user signup
    path('u/e/<email>/',        views.EmailExistsView.as_view()),  # check email exists
    path('u/id/<int:pk>/',  views.UserDetailView.as_view()), # get user detail- el endpoint tiene que llamrse <int:pk>
    path('verifyToken/', views.VerifyTokenView.as_view())
]
