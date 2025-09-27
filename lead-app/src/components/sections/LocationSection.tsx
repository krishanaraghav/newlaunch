import { useIsMobile } from '../../hooks/useIsMobile'
import { PROJECT_CONFIG } from '../../config/project'

const LocationSection = () => {
  const isMobile = useIsMobile()
  const visibleLandmarks = isMobile ? PROJECT_CONFIG.landmarks.slice(0, 2) : PROJECT_CONFIG.landmarks

  return (
    <section id="location">
      <div className="section-heading">
        <h2>Location Advantage</h2>
        <a href="#contact">Ask for directions</a>
      </div>
      <div className="grid-cards">
        {visibleLandmarks.map((landmark, index) => (
          <div
            key={`landmark-${index}`}
            className="card media-card"
            style={{ '--media': `url(${landmark.image})` } as React.CSSProperties}
          >
            <h3>{landmark.name}</h3>
            <p>{landmark.description}</p>
            <span>Minutes away</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default LocationSection

