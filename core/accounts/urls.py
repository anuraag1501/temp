from django.urls import path
from .views import ProtectedView
from .views import AdminOnlyView

urlpatterns = [
    path('protected/', ProtectedView.as_view()),
    path('admin-only/', AdminOnlyView.as_view())
]
