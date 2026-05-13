import SectionWrapper from '../ui/SectionWrapper'
import GlassCard from '../ui/GlassCard'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

const team = [
  { name: 'محمد العلي', role: 'مطور واجهات أمامية', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
  { name: 'سارة العمري', role: 'محللة أنظمة', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
  { name: 'أحمد السيد', role: 'مطور باك إند', avatar: 'https://randomuser.me/api/portraits/men/3.jpg' },
  { name: 'نورا خالد', role: 'مصممة تجربة مستخدم', avatar: 'https://randomuser.me/api/portraits/women/4.jpg' },
]

const TeamSection = () => (
  <SectionWrapper>
    <h2 className="section-title">فريق التطوير</h2>
    <p className="section-subtitle mb-12">خبراء متخصصون لصناعة أفضل تجربة تعلم</p>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {team.map((member, idx) => (
        <GlassCard key={idx} className="text-center">
          <img
            src={member.avatar}
            alt={member.name}
            className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-2 border-cyber-cyan/30"
          />
          <h3 className="text-lg font-semibold text-white">{member.name}</h3>
          <p className="text-cyber-cyan text-sm mb-3">{member.role}</p>
          <div className="flex justify-center space-x-3 text-gray-400">
            <a href="#" className="hover:text-cyber-cyan"><FaGithub /></a>
            <a href="#" className="hover:text-cyber-cyan"><FaLinkedin /></a>
          </div>
        </GlassCard>
      ))}
    </div>
  </SectionWrapper>
)

export default TeamSection