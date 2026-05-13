import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  loginUser,
  registerUser,
  clearError,
} from "../features/auth/authSlice";
import { useNavigate, Navigate } from "react-router-dom";
import { HiShieldCheck } from "react-icons/hi";
import { FiMail, FiLock, FiUser } from "react-icons/fi";

const AuthPage = () => {
  const location = useLocation();
  const [isLogin, setIsLogin] = useState(true); // true for login, false for register
  const [learningPath, setLearningPath] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, error,token } = useSelector((state) => state.auth);

  // إذا كان المستخدم مسجلاً بالفعل، حول إلى لوحة التحكم
  

  const toggleMode = () => {
    setIsLogin(!isLogin);
    dispatch(clearError());
  };
  useEffect(() => {
    if (location.pathname === '/register') {
      setIsLogin(false);
    }else{
      setIsLogin(true);
    }
    if(location.search === '?path=red'){
      setLearningPath('red_team');
    }else{
      setLearningPath('blue_team');
    }
    if (user && !token) {
      setIsLogin(true)
    }
    if (user && token) {
      navigate('/dashboard');
    }
      
  }, [location.pathname, location.search,user,token]);
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    if (isLogin) {
      dispatch(loginUser({ email: data.email, password: data.password }));
    } else {
      dispatch(
        registerUser({
          full_name: data.name,
          email: data.email,
          username: data.username,
          password: data.password,
          password2: data.password_confirmation,
          learning_path: data.learning_path,
        }),
      );
    }
  };

  return (
    <div className="min-h-screen flex pt-10">
      {/* النصف الأيسر: صورة توضيحية (يظهر على الشاشات الكبيرة) */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-cyber-cyan/20 to-cyber-violet/20 items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-dark-bg/60 backdrop-blur-sm"></div>
        <div className="relative z-10 text-center p-12">
          <HiShieldCheck className="w-32 h-32 text-cyber-cyan mx-auto mb-8 animate-pulse" />
          <h2 className="text-4xl font-bold text-white mb-6">
            {isLogin ? "مرحباً بعودتك!" : "انضم إلى مجتمع الأمن السيبراني"}
          </h2>
          <p className="text-gray-300 text-lg max-w-md mx-auto leading-relaxed">
            {isLogin
              ? "سجل دخولك لاستكمال رحلتك التعليمية والوصول إلى مختبر المحاكاة."
              : "أنشئ حساباً الآن وابدأ رحلة تعلم الأمن السيبراني من الصفر إلى الاحتراف."}
          </p>
        </div>
      </div>

      {/* النصف الأيمن: النموذج */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12 bg-dark-card/30">
        <div className="w-full max-w-md">
          {/* شعار صغير للجوال */}
          <div className="lg:hidden flex items-center justify-center mb-8">
            <HiShieldCheck className="w-10 h-10 text-cyber-cyan" />
            <span className="text-2xl font-bold text-white ml-2">
              Cyber<span className="text-cyber-cyan">Mentor</span>
            </span>
          </div>

          <h1 className="text-3xl font-bold text-white mb-2 text-center">
            {isLogin ? "تسجيل الدخول" : "إنشاء حساب جديد"}
          </h1>
          <p className="text-gray-400 text-center mb-8">
            {isLogin
              ? "أدخل بياناتك للوصول إلى دوراتك"
              : "أدخل بياناتك لبدء التعلم"}
          </p>

          {error && (
            <div className="bg-cyber-rose/20 border border-cyber-rose/50 text-cyber-rose rounded-xl p-3 mb-6 text-sm text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-300 mb-2 text-sm"
                >
                  الاسم الكامل
                </label>
                <div className="relative">
                  <FiUser className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    id="name"
                    name="full_name"
                    required
                    className="w-full bg-dark-bg border border-dark-border rounded-xl py-3 pr-10 pl-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyber-cyan transition"
                    placeholder="محمد العلي"
                  />
                </div>
              </div>
            )}
            {!isLogin && (
              <div>
                <label
                  htmlFor="username"
                  className="block text-gray-300 mb-2 text-sm"
                >
                  اسم مستخدم 
                </label>
                <div className="relative">
                  <FiUser className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="text"
                    id="username"
                    name="username"
                    required
                    className="w-full bg-dark-bg border border-dark-border rounded-xl py-3 pr-10 pl-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyber-cyan transition"
                    placeholder="example_user123"
                  />
                </div>
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-gray-300 mb-2 text-sm"
              >
                البريد الإلكتروني
              </label>
              <div className="relative">
                <FiMail className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full bg-dark-bg border border-dark-border rounded-xl py-3 pr-10 pl-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyber-cyan transition"
                  placeholder="example@cybermentor.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-gray-300 mb-2 text-sm"
              >
                كلمة المرور
              </label>
              <div className="relative">
                <FiLock className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  className="w-full bg-dark-bg border border-dark-border rounded-xl py-3 pr-10 pl-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyber-cyan transition"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {!isLogin && (
              <div>
                <label
                  htmlFor="password_confirmation"
                  className="block text-gray-300 mb-2 text-sm"
                >
                  تأكيد كلمة المرور
                </label>
                <div className="relative">
                  <FiLock className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="password"
                    id="password_confirmation"
                    name="password_confirmation"
                    required
                    className="w-full bg-dark-bg border border-dark-border rounded-xl py-3 pr-10 pl-4 text-white placeholder-gray-500 focus:outline-none focus:border-cyber-cyan transition"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            )}
             {!isLogin &&(
              <select defaultValue="" className="w-full bg-dark-bg border border-dark-border rounded-xl py-4 pr-10 pl-4 h-15 text-white  focus:outline-none focus:border-cyber-cyan transition" name="learning_path" value={learningPath} onChange={(e) => setLearningPath(e.target.value)}>
                <option value="" disabled>
                  اختر مسار التعلم
                </option>
                <option value="blue_team" selected={learningPath === 'blue_team'}>فريق الازرق</option>
                 <option value="red_team" selected={learningPath === 'red_team'}>فريق الأحمر</option>
              </select>
             )}

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading
                ? "جاري المعالجة..."
                : isLogin
                  ? "تسجيل الدخول"
                  : "إنشاء الحساب"}
            </button>
          </form>
            

          <div className="mt-6 text-center text-gray-400">
            {isLogin ? "ليس لديك حساب؟ " : "لديك حساب بالفعل؟ "}
            <button
              onClick={toggleMode}
              className="text-cyber-cyan hover:underline font-semibold"
            >
              {isLogin ? "أنشئ حساباً" : "سجل دخولك"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
