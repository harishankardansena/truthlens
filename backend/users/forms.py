from django import forms
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError

class RegisterForm(forms.ModelForm):
    email = forms.EmailField(required=True)
    first_name = forms.CharField(required=True)
    last_name = forms.CharField(required=True)
    username = forms.CharField(required=True)
    password = forms.CharField(widget=forms.PasswordInput)
    confirm_password = forms.CharField(widget=forms.PasswordInput)
    agree = forms.BooleanField(required=True)

    class Meta:
        model = User
        fields = ['first_name','last_name','email','username']

    def clean(self):
        cleaned = super().clean()
        p = cleaned.get('password')
        p2 = cleaned.get('confirm_password')
        if p != p2:
            raise ValidationError("Passwords don't match")
        email = cleaned.get('email','')
        if not email.endswith('@gmail.com'):
            raise ValidationError("Only Gmail addresses allowed")
        if User.objects.filter(email=email).exists():
            raise ValidationError("Email already registered")
        return cleaned

    def save(self, commit=True):
        user = super().save(commit=False)
        user.set_password(self.cleaned_data['password'])
        if commit: user.save()
        return user
