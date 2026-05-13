from django.contrib import auth
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken 
from drf_spectacular.utils import extend_schema
from django.contrib.auth import get_user_model
from . import serializers

User = get_user_model()

@extend_schema(tags=['Authentication'])
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = serializers.RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        # يمكن إعادة توكن مباشرة بعد التسجيل، لكن هنا نعيد بيانات المستخدم بسيطة
        user_serializer = serializers.UserSerializer(user)
        return Response(user_serializer.data, status=status.HTTP_201_CREATED)
@extend_schema(tags=['Authentication'])
class LoginView(TokenObtainPairView):
    serializer_class = serializers.LoginSerializer
    permission_classes = (permissions.AllowAny,)
    
    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']

        # الطريقة الصحيحة لإنشاء التوكن يدوياً
        refresh = RefreshToken.for_user(user)

        return Response({
            'tokens':{
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            },
            'user': serializers.UserSerializer(user).data
        }, status=status.HTTP_200_OK)
@extend_schema(tags=['user'])
class UserMeView(generics.RetrieveUpdateDestroyAPIView):
    """
    جلب أو تحديث أو حذف  بيانات المستخدم الحالي.
    """
    serializer_class = serializers.UserSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def get_object(self):
        return self.request.user
