import CTAButton from '../ui/CTAButton'
import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
const HeroSection = () => {
  const canvasRef = useRef(null)
  const {user,token} = useSelector((state) => state.auth)
  // تأثير الشبكة الرقمية
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animationFrameId
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#%&@'
    const fontSize = 14
    let columns = 0
    let drops = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      columns = Math.floor(canvas.width / fontSize)
      drops = Array(columns).fill(1)
    }

    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.05)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.font = `${fontSize}px monospace`

      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)]
        ctx.fillStyle = i % 3 === 0 ? '#22d3ee' : '#a78bfa'
        ctx.fillText(text, i * fontSize, drops[i] * fontSize)

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i]++
      }
      animationFrameId = requestAnimationFrame(draw)
    }

    draw()

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 opacity-30"
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-dark-bg/80 via-dark-bg/40 to-dark-bg z-10" />

      <div className="relative z-20 text-center max-w-4xl mx-auto px-4">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">
            <span className="text-white">أتقن فنون </span>
            <span className="gradient-text">الأمن السيبراني</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
            من الصفر إلى الاحتراف. تعلم، طبق، أخطئ، وأتقن في بيئة محاكاة تفاعلية تعتمد على الذكاء الاصطناعي المرشد.
          </p>
         {user && token ? (
            <div className="text-green-400">
              <h1 className='text-4xl m-5'>مرحباً, {user.full_name}!</h1>
              <CTAButton  className='bg-green-400 text-white' to="/dashboard">
              <Link to="/dashboard" className="text-white hover:text-cyber-purple">
                انتقل إلى لوحة التحكم
              </Link>
              </CTAButton>
            </div>
          ):
          (
             <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CTAButton to="/register?path=red" className="!bg-gradient-to-r !from-cyber-rose !to-red-400 !text-white border-0">
              ابدأ مسار الاختراق
            </CTAButton>
            <CTAButton to="/register?path=blue" className="!border-2 !border-cyber-cyan !text-white hover:!bg-cyber-cyan/10">
              ابدأ مسار الحماية
            </CTAButton>
          </div>
          )
          }
        </div>
      </div>
    </section>
  )
}

export default HeroSection