"""uploader URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url
from app.views import register_view, login_view, logout_view, current_session_view, file_view
from django.conf import settings

urlpatterns = [
    url(r'^api/v1/register/?$', register_view, name='register'),
    url(r'^api/v1/login/?$', login_view, name='login'),
    url(r'^api/v1/logout/?', logout_view, name='logout'),
    url(r'^api/v1/current-session/?', current_session_view, name='current-session'),
    url(r'^api/v1/file/(?P<filename>.*)/?', file_view, name='file'),
]
