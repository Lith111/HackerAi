import SectionWrapper from '../ui/SectionWrapper'
import GlassCard from '../ui/GlassCard'
import { HiAcademicCap, HiLightBulb, HiSelector } from 'react-icons/hi'

const features = [
  {
    icon: <HiAcademicCap className="w-8 h-8 text-cyber-violet" />,
    title: 'أسلوب التعلم التبايني',
    desc: 'كل درس مقسم لأربعة أقسام: نظرية الثغرة، استغلالها، الحماية النظرية، ثم الكود الآمن، مما يضمن فهماً عميقاً.'
  },
  {
    icon: <HiLightBulb className="w-8 h-8 text-cyber-violet" />,
    title: 'الذكاء الاصطناعي المرشد',
    desc: 'شات بوت مجيب طوال الرحلة، ومساعد مؤقت داخل الاختبارات يمنحك تلميحاً لمدة 10 ثوانٍ فقط لتعتمد على نفسك.'
  },
  {
    icon: <HiSelector className="w-8 h-8 text-cyber-violet" />,
    title: 'مسارات تخصصية',
    desc: 'مسار الهجوم (Red Team) لتعلم الاختراق الأخلاقي، ومسار الدفاع (Blue Team) لتحصين الأنظمة وكشف الثغرات.'
  },
]

const FeaturesSection = () => (
  <SectionWrapper className="bg-dark-card/30">
    <h2 className="section-title">مميزات أساسية</h2>
    <p className="section-subtitle mb-12">لماذا CyberMentor مختلفة عن أي منصة أخرى؟</p>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {features.map((feat, i) => (
        <GlassCard key={i} className="flex flex-col items-start text-right">
          <div className="mb-4 p-3 rounded-full bg-cyber-violet/10">
            {feat.icon}
          </div>
          <h3 className="text-2xl font-bold text-white mb-3">{feat.title}</h3>
          <p className="text-gray-400 leading-relaxed">{feat.desc}</p>
        </GlassCard>
      ))}
    </div>
  </SectionWrapper>
)

export default FeaturesSection