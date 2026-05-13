import { Link } from 'react-router-dom'

const CTAButton = ({ to, children, variant = 'primary', className = '' }) => {
  const base = variant === 'primary' ? 'btn-primary' : 'btn-outline'
  return (
    <Link to={to} className={`${base} ${className}`}>
      {children}
    </Link>
  )
}

export default CTAButton