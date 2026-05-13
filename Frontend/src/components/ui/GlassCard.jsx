const GlassCard = ({ children, className = '', hover = true }) => (
  <div className={`glass rounded-2xl p-6 ${hover ? 'glass-hover' : ''} ${className}`}>
    {children}
  </div>
)
export default GlassCard