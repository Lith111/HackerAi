const SectionWrapper = ({ children, className = '' }) => (
  <section className={`py-16 md:py-24 ${className}`}>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  </section>
)
export default SectionWrapper