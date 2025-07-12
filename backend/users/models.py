from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.base_user import BaseUserManager
from django_rest_passwordreset.signals import reset_password_token_created
from django.dispatch import receiver
from django.urls import reverse
from django.template.loader import render_to_string
from django.core.mail import EmailMultiAlternatives
from django.utils.html import strip_tags
from django.conf import settings
from django.db.models.signals import post_save




# Create your models here.
class CustomUserManager(BaseUserManager):
    def create_user(self,email,password=None,**extra_fields):
        if not email:
            raise ValueError('Email is a required fields')
        
        email = self.normalize_email(email)
        user = self.model(email=email,**extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self,email,password=None,**extra_fields):
        extra_fields.setdefault('is_staff',True)
        extra_fields.setdefault('is_superuser',True)
        return self.create_user(email,password,**extra_fields)
        

class CustomUser(AbstractUser):
    profile_picture = models.ImageField(upload_to='templates/profile-pics', null=True, blank=True)
    username = models.CharField(max_length=200, unique=True, null=True, blank=False)
    email = models.EmailField(max_length=200, null=True, unique=True)
    birthday = models.DateField(null=True, blank=True)
    phone_no = models.CharField(max_length=12, blank=False)
    alternate_phone_no = models.CharField(max_length=12, null=True, blank=True)  
    address = models.CharField(max_length=500, null=True, blank=False)
    address2 = models.CharField(max_length=500, null=True, blank=True)
    city = models.CharField(max_length=100, null=True, blank=False)
    country = models.CharField(max_length=100, null=True, blank=False)
    zip_code = models.CharField(max_length=10, null=True, blank=False)
    is_host = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'phone_no', 'city', 'country','zip_code']

class Listing(models.Model):
    host = models.ForeignKey(
        CustomUser,
        on_delete=models.CASCADE,
        related_name='listings',
        limit_choices_to={'is_host': True}  
    )   
    title = models.CharField(max_length=200)
    description = models.TextField()
    price_per_night = models.DecimalField(max_digits=10, decimal_places=2)
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    image = models.ImageField(upload_to='listing_images/', blank=True, null=True)
    available_from = models.DateField()
    available_to = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)  

    def __str__(self):
        return f"{self.title} - {self.city}"

@receiver(reset_password_token_created)
def password_reset_token_created(reset_password_token,*args,**kwargs):
    sitelink = "http://localhost/5173/"
    token = "{}".format(reset_password_token.key)
    full_link = str(sitelink)+str("password-reset/")+str(token)

    print(token)
    print(full_link)

    context = {
        'full_link': full_link,
        'email_adress': reset_password_token.user.email

    }

    html_message = render_to_string("backend/email.html",context=context)
    plain_message = strip_tags(html_message)

    msg = EmailMultiAlternatives(
        subject="Request for reseting password for {title}".format(title=reset_password_token.user.email),
        body=plain_message,
        from_email="lococoder12@gmail.com",
        to=[reset_password_token.user.email]
    )

    msg.attach_alternative(html_message,"text/html")
    msg.send()