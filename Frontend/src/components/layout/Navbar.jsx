import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FiMenu, FiX, FiLogOut, FiUser, FiGrid } from 'react-icons/fi';
import { HiShieldCheck } from 'react-icons/hi';
import { logout } from '../../features/auth/authSlice';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    setProfileOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass backdrop-blur-md border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 rtl:space-x-reverse group">
            <HiShieldCheck className="w-8 h-8 text-cyber-cyan transition-transform group-hover:scale-110" />
            <span className="text-2xl font-bold text-white">
              Cyber<span className="text-cyber-cyan">Mentor</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-5 items-center space-x-8 rtl:space-x-reverse">
            <Link to="/" className="text-gray-300 hover:text-cyber-cyan transition">الرئيسية</Link>
            <Link to="/" className="text-gray-300 hover:text-cyber-cyan transition">عن المنصة</Link>
            <Link to="/" className="text-gray-300 hover:text-cyber-cyan transition">فريق التطوير</Link>
            <Link to="/" className="text-gray-300 hover:text-cyber-cyan transition">اتصل بنا</Link>
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex gap-5 items-center space-x-4 rtl:space-x-reverse">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center space-x-2 rtl:space-x-reverse glass rounded-full pl-4 pr-3 py-2 hover:border-cyber-cyan/30 transition"
                >
                  <span className="text-white text-sm font-medium">{user.name}</span>
                  <div className="w-8 h-8 rounded-full bg-cyber-cyan/20 flex items-center justify-center">
                    <FiUser className="text-cyber-cyan" />
                  </div>
                </button>

                {profileOpen && (
                  <div className="absolute left-0 mt-2 w-48 glass rounded-xl overflow-hidden shadow-lg z-50">
                    <Link
                      to="/dashboard"
                      className="flex items-center space-x-2 rtl:space-x-reverse px-4 py-3 text-gray-300 hover:bg-white/10 transition"
                      onClick={() => setProfileOpen(false)}
                    >
                      <FiGrid className="w-4 h-4" />
                      <span>لوحة التحكم</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center space-x-2 rtl:space-x-reverse w-full px-4 py-3 text-gray-300 hover:bg-white/10 transition"
                    >
                      <FiLogOut className="w-4 h-4" />
                      <span>تسجيل الخروج</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login" className="btn-outline text-sm py-2 px-4">تسجيل الدخول</Link>
                <Link to="/register" className="btn-primary text-sm py-2 px-4">ابدأ الآن</Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 hover:text-cyber-cyan"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden glass border-t border-white/5">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link to="/" className="block px-3 py-2 text-gray-300 hover:bg-cyber-cyan/10 rounded-lg">الرئيسية</Link>
            <Link to="/" className="block px-3 py-2 text-gray-300 hover:bg-cyber-cyan/10 rounded-lg">عن المنصة</Link>
            <Link to="/" className="block px-3 py-2 text-gray-300 hover:bg-cyber-cyan/10 rounded-lg">فريق التطوير</Link>
            <Link to="/" className="block px-3 py-2 text-gray-300 hover:bg-cyber-cyan/10 rounded-lg">اتصل بنا</Link>
            <div className="pt-2 flex flex-col space-y-2">
              {user ? (
                <>
                  <Link to="/dashboard" className="flex items-center space-x-2 rtl:space-x-reverse px-3 py-2 text-gray-300 hover:bg-white/10 rounded-lg">
                    <FiGrid className="w-4 h-4" />
                    <span>لوحة التحكم</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 rtl:space-x-reverse px-3 py-2 text-gray-300 hover:bg-white/10 rounded-lg w-full text-right"
                  >
                    <FiLogOut className="w-4 h-4" />
                    <span>تسجيل الخروج</span>
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="btn-outline text-center">تسجيل الدخول</Link>
                  <Link to="/register" className="btn-primary text-center">ابدأ الآن</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;