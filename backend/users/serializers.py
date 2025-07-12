
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
    


class ListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Listing
        fields = [
            'id', 'host', 'title', 'description',
            'price_per_night', 'address', 'city', 'state', 'country',
            'image', 'available_from', 'available_to', 'created_at'
        ]
        read_only_fields = ['id', 'host', 'created_at']