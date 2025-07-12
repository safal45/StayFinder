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

    permission_classes = [permissions.IsAuthenticated]

    
class ListingViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Listing.objects.all()
    serializer_class = ListingSerializer

    def perform_create(self, serializer):
        serializer.save(host=self.request.user)