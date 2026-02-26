from django.db import models
from django.conf import settings
# Create your models here.

class Product(models.Model):
    CATEGORY_CHOICES = [
        ["Electronics", "Electronics"],
        ["Clothing", "Clothing"],
        ["Food", "Food"],
        ["Other", "Other"]
    ]
    
    name = models.CharField(max_length=255, db_index=True)
    description = models.TextField(blank=True)
    
    
    category = models.CharField(
        max_length=100,
        choices=CATEGORY_CHOICES,
        db_index=True
    )
    
    
    cost_price = models.DecimalField(max_digits=10, decimal_places=2)
    selling_price = models.DecimalField(max_digits=10, decimal_places=2)
    
    stock_available = models.PositiveIntegerField(default=0)
    units_sold = models.PositiveIntegerField(default=0)
    
    customer_rating = models.FloatField(default=0.0)
    
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="products"
    )
    
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    
    class Meta:
        indexes = [
            models.Index(fields=["name"]),
            models.Index(fields=["category"])
        ]
        
        ordering = ["-created_at"]
        
    def __str__(self):
        return self.name
