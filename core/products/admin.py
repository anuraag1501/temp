from django.contrib import admin
from .models import Product
# Register your models here.

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "category",
        "selling_price",
        "stock_available",
        "units_sold",
        "created_by"
    )
    
    search_fields = ("name",)
    list_filter = ("category",)
