from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils import timezone
from .managers import UserManager

class User(AbstractBaseUser, PermissionsMixin):
    class Role(models.TextChoices):
        STUDENT = 'student', 'Student'
        ADMIN = 'admin', 'Admin'

    class LearningPath(models.TextChoices):
        RED_TEAM = 'red_team', 'Red Team'
        BLUE_TEAM = 'blue_team', 'Blue Team'

    email = models.EmailField(unique=True)
    username = models.CharField(max_length=150, unique=True)
    full_name = models.CharField(max_length=255, blank=True, default='')
    role = models.CharField(max_length=10, choices=Role.choices, default=Role.STUDENT)
    learning_path = models.CharField(max_length=10, choices=LearningPath.choices, null=True, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)  # مطلوب لدخول Django admin
    date_joined = models.DateTimeField(default=timezone.now)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email

    @property
    def is_admin(self):
        return self.role == self.Role.ADMIN