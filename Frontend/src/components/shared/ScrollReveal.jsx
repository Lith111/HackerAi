import useInView from '../../hooks/useInView'

const ScrollReveal = ({ children, className = '' }) => {
  const [ref, isInView] = useInView()
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      } ${className}`}
    >
      {children}
    </div>
  )
}

export default ScrollReveal