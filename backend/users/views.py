from django.shortcuts import render
from rest_framework import viewsets,permissions
from .serializers import *
from .models import *
from rest_framework.response import Response
from django.contrib.auth import get_user_model,authenticate
from knox.models import AuthToken
from rest_framework.decorators import api_view, permission_classes,action
import stripe
from django.conf import settings
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse
from rest_framework import status
from django.shortcuts import redirect
import traceback
from django.shortcuts import get_object_or_404

User = get_user_model()

# This is your test secret API key.
stripe.api_key = settings.STRIPE_SECRET_KEY



class LoginViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    serializer_class = LoginSerializer

    def create(self,request):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']

            user = authenticate(request,email=email,password=password)
            if user:
                _, token = AuthToken.objects.create(user)
                return Response(
                    {
                        'user':self.serializer_class(user).data,
                        'token':token
                    }
                )
            else:
                return Response({'error':'Invalid credentials'},status=401)

        else:
            return Response(serializer.errors,status=400)

class RegisterViewset(viewsets.ViewSet):
    permission_classes = [permissions.AllowAny]
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

    def create(self,request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else:
            return Response(serializer.errors,status=400)

class UserViewset(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=['get'])  # ⚡️ This adds /users/profile/
    def profile(self, request):
        user = request.user
        serializer = RegisterSerializer(user)
        return Response(serializer.data)

class ProductViewset(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Product.objects.all()
    serializer_class = ProductSerializer

    def perform_create(self, serializer):
        serializer.save(seller=self.request.user)

    @action(detail=True, methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def create_checkout_session(self, request, pk=None):
        try:
            product = self.get_object()

            stripe.api_key = settings.STRIPE_SECRET_KEY

            YOUR_DOMAIN = "http://localhost:3000"

            checkout_session = stripe.checkout.Session.create(
                payment_method_types=['card'],
                line_items=[{
                    'price_data': {
                        'currency': 'inr',
                        'unit_amount': int(product.price * 100),
                        'product_data': {
                            'name': product.product_name,
                            'description': product.description,
                        },
                    },
                    'quantity': 1,
                }],
                mode='payment',
                success_url=YOUR_DOMAIN + '/success',
                cancel_url=YOUR_DOMAIN + '/cancel',
            )

            return Response({'id': checkout_session.id})
        
        except Exception as e:
            print("🔥 Stripe Checkout Error:", str(e))
            traceback.print_exc()  # Print full traceback in console
            return Response({'error': str(e)}, status=500)

class CartViewSet(viewsets.ModelViewSet):
    serializer_class = CartSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # Only return the cart of the logged-in user
        return Cart.objects.filter(user=self.request.user)
    
class CartItemViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return CartItem.objects.filter(cart__user=self.request.user)

    def get_serializer_class(self):
        if self.request.method in ['POST', 'PUT', 'PATCH']:
            return CartItemWriteSerializer
        return CartItemReadSerializer

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context

    def perform_create(self, serializer):
        cart, _ = Cart.objects.get_or_create(user=self.request.user)
        serializer.save(cart=cart)