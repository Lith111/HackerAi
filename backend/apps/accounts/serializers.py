from rest_framework import serializers
from django.contrib.auth import authenticate, get_user_model
from django.contrib.auth.password_validation import validate_password

User = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    learning_path = serializers.ChoiceField(choices=User.LearningPath.choices, required=True)

    class Meta:
        model = User
        fields = ('email', 'username', 'full_name', 'password', 'password2', 'learning_path')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "كلمتا المرور غير متطابقتين"})
        return attrs

    def create(self, validated_data):
        validated_data.pop('password2')
        learning_path = validated_data.pop('learning_path')
        user = User.objects.create_user(
            email=validated_data['email'],
            username=validated_data['username'],
            password=validated_data['password'],
            full_name=validated_data.get('full_name', ''),
            learning_path=learning_path
        )
        return user
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    password = serializers.CharField(write_only=True, required=True)
    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        if email and password:
            user = authenticate(request=self.context.get('request'), email=email, password=password)
            if not user:
                raise serializers.ValidationError("بيانات الدخول غير صحيحة")
        else:
            raise serializers.ValidationError("يجب إدخال البريد الإلكتروني وكلمة المرور")

        attrs['user'] = user
        return attrs
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'username', 'full_name', 'role', 'learning_path', 'date_joined')
        read_only_fields = ('id', 'role', 'date_joined','email','username')