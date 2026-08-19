from django.urls import path
from .views import register_view, login_view, logout_view, dashboard
urlpatterns=[path('users/register/',register_view,name='register'),path('users/login/',login_view,name='login'),path('users/logout/',logout_view,name='logout'),path('dashboard/',dashboard,name='dashboard')]