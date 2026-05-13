import SectionWrapper from '../ui/SectionWrapper'
import GlassCard from '../ui/GlassCard'
import { FaBookOpen, FaTerminal, FaRobot, FaUserGraduate } from 'react-icons/fa'

const steps = [
  { icon: <FaBookOpen className="w-8 h-8 text-cyber-cyan" />, title: 'تعلم', desc: 'درس نظري متكامل يشرح الثغرة، الاختراق، الحماية النظرية والكود الآمن.' },
  { icon: <FaTerminal className="w-8 h-8 text-cyber-cyan" />, title: 'طبق', desc: 'مختبر تيرمنال وهمي يحاكي نظاماً حقيقياً لتطبيق ما تعلمته بأوامر عملية.' },
  { icon: <FaRobot className="w-8 h-8 text-cyber-cyan" />, title: 'أخطئ', desc: 'عند الخطأ، يقدم الذكاء الاصطناعي مساعدة لمدة 10 ثوانٍ فقط ثم يختفي لتحاول مجدداً.' },
  { icon: <FaUserGraduate className="w-8 h-8 text-cyber-cyan" />, title: 'اتقن', desc: 'بعد المحاولة الذاتية، تثبت مهاراتك وتنتقل للمستوى التالي بثقة.' },
]

const HowItWorksSection = () => (
  <SectionWrapper className="bg-dark-bg">
    <h2 className="section-title">كيف تعمل المنصة؟</h2>
    <p className="section-subtitle mb-12">رحلة تعلم متكاملة مصممة لترسيخ المعلومات</p>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {steps.map((step, idx) => (
        <GlassCard key={idx} className="text-center flex flex-col items-center">
          <div className="mb-4 p-3 rounded-full bg-cyber-cyan/10">
            {step.icon}
          </div>
          <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
          <p className="text-gray-400 text-sm">{step.desc}</p>
        </GlassCard>
      ))}
    </div>
  </SectionWrapper>
)

export default HowItWorksSection