from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .permissions import IsAdminRole

# Create your views here.
class ProtectedView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        return Response({
            "message": "You are authenticate!",
            "user": request.user.email,
            "role": request.user.role.name if request.user.role else None
        })


class AdminOnlyView(APIView):
    permission_classes = [IsAuthenticated, IsAdminRole]
    
    def get(self, request):
        return Response({
            "message": "Welcome Admin",
            "user": request.user.email,
            "role": request.user.role.name
        })