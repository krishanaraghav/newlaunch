import { PROJECT_CONFIG } from '../../config/project'

const LocationSection = () => (
  <section id="location">
    <div className="section-heading">
      <h2>Location Advantage</h2>
      <a href="#contact">Ask for directions</a>
    </div>
    <div className="grid-cards">
      {PROJECT_CONFIG.landmarks.map((landmark) => (
        <div
          key={landmark.name}
          className="card media-card"
          style={{ '--media': `url(${landmark.image})` } as React.CSSProperties}
        >
          <i className="fas fa-location-dot" aria-hidden="true" />
          <h3>{landmark.name}</h3>
          <p>{landmark.description}</p>
          <span>Minutes away</span>
        </div>
      ))}
    </div>
  </section>
)

export default LocationSection

