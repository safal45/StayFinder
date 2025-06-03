
from rest_framework import serializers
from .models import *   
from django.contrib.auth import get_user_model
from decimal import Decimal, InvalidOperation


User = get_user_model()

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def to_representation(self, instance):
        ret = super().to_representation(instance)
        ret.pop('password',None)
        return ret

class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','username','email','birthday','password','phone_no','alternate_phone_no',
                  'address','zip_code','city','country')
        extra_kwargs = {'password':{'write_only':True}}

    def create(self,validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
class ProductSerializer(serializers.ModelSerializer):
    final_price = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ['id', 'items_image', 'product_name', 'description', 
            'price', 'discount', 'final_price', 'in_stock', 'stock', 
            'category', 'brand', 'rating', 'num_reviews', 
            'seller', 'created_at', 'updated_at']
        
    def get_final_price(self, obj):
        try:
            price = float(obj.price)
            discount = float(obj.discount)
            return price - (price * discount / 100)
        except (ValueError, TypeError):
            return 0  # or handle as needed


class CartItemWriteSerializer(serializers.ModelSerializer):
    product = serializers.PrimaryKeyRelatedField(queryset=Product.objects.all())

    class Meta:
        model = CartItem
        fields = ['id', 'product', 'quantity']  # Don't include 'cart'
# class CartItemWriteSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = CartItem
#         fields = ['id', 'product', 'quantity']
class CartItemReadSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    subtotal = serializers.SerializerMethodField()

    class Meta:
        model = CartItem
        fields = ['id', 'product', 'quantity', 'subtotal']

    def get_subtotal(self, obj):
        try:
            price = Decimal(obj.product.price)
            discount = Decimal(obj.product.discount or 0)
            final_price = price - (price * discount / Decimal(100))
            return float(final_price * obj.quantity)
        except (InvalidOperation, TypeError, AttributeError):
            return 0.0

# class CartItemViewSet(viewsets.ModelViewSet):
#     permission_classes = [permissions.IsAuthenticated]

#     def get_queryset(self):
#         return CartItem.objects.filter(cart__user=self.request.user)

#     def get_serializer_class(self):
#         if self.request.method in ['POST', 'PUT', 'PATCH']:
#             return CartItemWriteSerializer
#         return CartItemReadSerializer

#     def get_serializer_context(self):
#         context = super().get_serializer_context()
#         context.update({"request": self.request})
#         return context

#     def perform_create(self, serializer):
#         cart, created = Cart.objects.get_or_create(user=self.request.user)
#         serializer.save(cart=cart)

class CartSerializer(serializers.ModelSerializer):
    cart_items = CartItemReadSerializer(many=True, read_only=True, source='cartitem_set')
    total_price = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = ['id', 'user', 'created_at', 'cart_items', 'total_price']

    def get_total_price(self, obj):
        return obj.total_price()