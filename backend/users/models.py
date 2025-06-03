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
    address3 = models.CharField(max_length=500, null=True, blank=True)
    city = models.CharField(max_length=100, null=True, blank=False)
    country = models.CharField(max_length=100, null=True, blank=False)
    zip_code = models.CharField(max_length=10, null=True, blank=False)
    is_seller = models.BooleanField(default=False)
    store_name = models.CharField(max_length=255, null=True, blank=True)
    store_description = models.TextField(null=True, blank=True)
    gst_number = models.CharField(max_length=20, null=True, blank=True)
    wallet_balance = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    reward_points = models.IntegerField(default=0)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'phone_no', 'city', 'country','zip_code']



class Product(models.Model):
    items_image = models.ImageField(upload_to='templates/pics/items-pics', null=True, blank=True)
    product_name = models.CharField(max_length=50,null=True,blank=False)
    description = models.CharField(max_length=200,null=True,blank=True)
    price = models.CharField(max_length=120,null=True,blank=False)
    discount = models.CharField(max_length=3,null=True,blank=False)
    in_stock = models.BooleanField(default=True)
    stock = models.IntegerField(null=True, blank=False)
    category = models.CharField(max_length=100, null=True, blank=False)  # Product category (e.g., Electronics, Clothing)
    brand = models.CharField(max_length=100, null=True, blank=True)  # Optional brand name
    rating = models.FloatField(default=0, null=True, blank=True)  # Store product rating (1-5)
    num_reviews = models.PositiveIntegerField(default=0)  # Number of reviews
    seller = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name="products")  # Link to seller
    created_at = models.DateTimeField(auto_now_add=True)  # Timestamp when product is added
    updated_at = models.DateTimeField(auto_now=True)  # Auto update on modification

    def final_price(self):
        """Calculate the final price after discount."""
        if self.discount:
            return self.price * (1 - (self.discount / 100))
        return self.price

    def __str__(self):
        return self.product_name

class Cart(models.Model):
    user = models.OneToOneField(CustomUser, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def total_price(self):
        total = 0
        for item in self.cart_items.all():
            try:
                total += float(item.product.price) * item.quantity
            except:
                pass
        return total

    def __str__(self):
        return f"{self.user}'s Cart"


class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='cart_items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)

    def subtotal(self):
        """Calculate subtotal for a specific cart item"""
        return self.product.final_price() * self.quantity

    def __str__(self):
        return f"{self.quantity} x {self.product.product_name}"



@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_user_cart(sender, instance, created, **kwargs):
    """Create a cart for each new user automatically"""
    if created:
        Cart.objects.create(user=instance)

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