const AnimatedBackground = () => {
  return (
    <div className="animated-background">
      {/* Floating particles/stars */}
      <div className="particles-container">
        {[...Array(30)].map((_, i) => (
          <div
            key={`particle-${i}`}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 20}s`,
              animationDuration: `${15 + Math.random() * 15}s`,
            }}
          />
        ))}
      </div>

      {/* Floating property icons */}
      <div className="property-icons-container">
        <div className="property-icon icon-1">
          <i className="fas fa-building" />
        </div>
        <div className="property-icon icon-2">
          <i className="fas fa-home" />
        </div>
        <div className="property-icon icon-3">
          <i className="fas fa-city" />
        </div>
        <div className="property-icon icon-4">
          <i className="fas fa-landmark" />
        </div>
        <div className="property-icon icon-5">
          <i className="fas fa-tree" />
        </div>
        <div className="property-icon icon-6">
          <i className="fas fa-star" />
        </div>
      </div>

      {/* Gradient orbs for depth */}
      <div className="gradient-orb orb-1" />
      <div className="gradient-orb orb-2" />
      <div className="gradient-orb orb-3" />
    </div>
  )
}

export default AnimatedBackground

