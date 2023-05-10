from django.shortcuts import render

# Create your views here.

def index(request):
    """The Home Page for Learning Log"""
    return render(request, 'learning_logs/index.html')