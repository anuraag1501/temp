from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter

from .models import Product
from .serializers import ProductSerializer
from .permissions import IsAdminOrSeller, IsBuyerReadOnly

# Create your views here.

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]
    
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    
    filterset_fields = ["category"]
    search_fields = ["name"]
    ordering_fields = ["selling_price", "units_sold", "created_at"]
    
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)
        
    def get_permissions(self):
        if self.request.user.role.name == "Buyer":
            return [IsAuthenticated(), IsBuyerReadOnly()]
        
        elif self.request.user.role.name in ["Admin", "Seller"]:
            return [IsAuthenticated(), IsAdminOrSeller()]
        
        return [IsAuthenticated()]
    
    
    
