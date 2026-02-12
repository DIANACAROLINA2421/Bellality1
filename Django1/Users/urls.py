from django.urls import path

from Users.views import UsersView, LoginView
from Users.views.register_view import RegisterView

urlpatterns = [
    path('usuarios/',UsersView.as_view()),
    path('register',RegisterView.as_view()),
    path('login',LoginView.as_view()),
]