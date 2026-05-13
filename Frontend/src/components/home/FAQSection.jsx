import { useState } from 'react'
import SectionWrapper from '../ui/SectionWrapper'
import { FiChevronDown } from 'react-icons/fi'

const faqs = [
  { q: 'هل المنصة مجانية؟', a: 'نعم، نوفر وصولاً مجانياً للمحتوى الأساسي مع خطط مدفوعة للميزات المتقدمة.' },
  { q: 'هل أحتاج خبرة سابقة؟', a: 'لا، المنصة مصممة لتناسب المبتدئين والمحترفين على حد سواء.' },
  { q: 'كيف أختار بين مساري الهجوم والدفاع؟', a: 'إذا كنت مهتماً باختبار الاختراق فاختر الأحمر، وإذا كنت ترغب في حماية الأنظمة فاختر الأزرق.' },
  { q: 'ماذا يحدث إذا أخطأت في الاختبار؟', a: 'ستتلقى مساعدة مؤقتة لـ10 ثوانٍ، ثم تعاد المحاولة من البداية لتتعلم من خطئك.' },
]

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i)

  return (
    <SectionWrapper className="bg-dark-card/30">
      <h2 className="section-title">الأسئلة الشائعة</h2>
      <p className="section-subtitle mb-12">كل ما تريد معرفته عن المنصة</p>
      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, i) => (
          <div key={i} className="glass rounded-xl overflow-hidden">
            <button
              onClick={() => toggle(i)}
              className="w-full flex justify-between items-center p-5 text-white font-medium text-lg"
            >
              <span>{faq.q}</span>
              <FiChevronDown className={`transform transition-transform ${openIndex === i ? 'rotate-180' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${openIndex === i ? 'max-h-40 pb-5 px-5' : 'max-h-0'}`}>
              <p className="text-gray-400">{faq.a}</p>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  )
}

export default FAQSection