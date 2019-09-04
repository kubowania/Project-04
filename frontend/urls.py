from django.urls import path, re_path
from .views import Home, Assets

urlpatterns = [
    path('', Home.as_view(), name='home'),
    re_path(r'^(?P<filename>[\w\.]+)$', Assets.as_view(), name='assets'),
]
