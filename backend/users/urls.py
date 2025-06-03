from django.contrib import admin
from django.urls import path
from rest_framework import routers
from .views import *

router = routers.DefaultRouter()
router.register('register', RegisterViewset, basename='register')
router.register('login', LoginViewset, basename='login')
router.register('users', UserViewset, basename='users')
router.register(r'products', ProductViewset, basename='products')
router.register('cart', CartViewSet, basename='cart')
router.register('cart-items', CartItemViewSet, basename='cartitem')

urlpatterns = router.urls
