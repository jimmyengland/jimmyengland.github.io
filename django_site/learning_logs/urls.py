"""Defines URL patterns for learning_logs."""

from django.conf.urls import path

from . import views

urlpatterns = [
    # Home page
    path('', views.index, name='index'),
]