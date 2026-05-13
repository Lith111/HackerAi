import { Link } from 'react-router-dom'
import { FaTwitter, FaGithub, FaLinkedin } from 'react-icons/fa'
import { HiShieldCheck } from 'react-icons/hi'

const Footer = () => {
  return (
    <footer className="bg-dark-card border-t border-white/5 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <HiShieldCheck className="w-6 h-6 text-cyber-cyan" />
              <span className="text-xl font-bold text-white">Cyber<span className="text-cyber-cyan">Mentor</span></span>
            </Link>
            <p className="text-gray-400 text-sm">
              منصة تعليمية متكاملة لتعلم الأمن السيبراني بأسلوب عملي تفاعلي.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">روابط سريعة</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/" className="hover:text-cyber-cyan">الرئيسية</Link></li>
              <li><Link to="/" className="hover:text-cyber-cyan">عن المنصة</Link></li>
              <li><Link to="/" className="hover:text-cyber-cyan">الدروس</Link></li>
              <li><Link to="/" className="hover:text-cyber-cyan">المختبر</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">روابط قانونية</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link to="/" className="hover:text-cyber-cyan">سياسة الخصوصية</Link></li>
              <li><Link to="/" className="hover:text-cyber-cyan">شروط الاستخدام</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-semibold mb-4">تابعنا</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-cyber-cyan transition"><FaTwitter className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-cyber-cyan transition"><FaGithub className="w-5 h-5" /></a>
              <a href="#" className="text-gray-400 hover:text-cyber-cyan transition"><FaLinkedin className="w-5 h-5" /></a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/5 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} CyberMentor. جميع الحقوق محفوظة.
        </div>
      </div>
    </footer>
  )
}

export default Footer