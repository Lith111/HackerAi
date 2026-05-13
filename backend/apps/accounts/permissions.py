from rest_framework import permissions

class IsAdminUser(permissions.BasePermission):
    """
    يسمح فقط للمستخدمين من دور 'admin'.
    """
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'admin'

class IsStudentUser(permissions.BasePermission):
    """
    يسمح فقط للمستخدمين من دور 'student'.
    """
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'student'

class IsOwner(permissions.BasePermission):
    """
    يسمح للمستخدم بتعديل بياناته الشخصية فقط.
    """
    def has_object_permission(self, request, view, obj):
        return obj == request.user