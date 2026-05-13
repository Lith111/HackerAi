import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 1. إرسال الـ Access Token مع كل طلب
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 2. معالجة الأخطاء وتجديد الـ Token تلقائياً
api.interceptors.response.use(
  (response) => response, // إذا كان الرد ناجحاً مرره كما هو
  async (error) => {
    const originalRequest = error.config;

    // إذا انتهت صلاحية الـ Access Token (خطأ 401) ولم نقم بالمحاولة مسبقاً
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refrech');

      if (refreshToken) {
        try {
          // طلب توكن جديد من Django باستخدام الـ Refresh Token
          const response = await axios.post(`${api.defaults.baseURL}/token/refresh/`, {
            refresh: refreshToken,
          });

          const { access } = response.data;

          // حفظ التوكن الجديد وتحديث الطلب الحالي
          localStorage.setItem('token', access);
          api.defaults.headers.common['Authorization'] = `Bearer ${access}`;
          originalRequest.headers['Authorization'] = `Bearer ${access}`;

          return api(originalRequest); // إعادة تنفيذ الطلب الأصلي
        } catch (refreshError) {
          // إذا فشل الـ Refresh أيضاً (انتهت صلاحيته) -> تسجيل خروج إجباري
          localStorage.clear();
          window.location.href = '/login'; // توجيه المستخدم لصفحة الدخول
          return Promise.reject(refreshError);
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;