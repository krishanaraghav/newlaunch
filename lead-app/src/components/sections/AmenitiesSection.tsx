import { useIsMobile } from '../../hooks/useIsMobile'
import { PROJECT_CONFIG, highlightImages, highlightCTA } from '../../config/project'

const AmenitiesSection = () => {
  const isMobile = useIsMobile()
  const visibleAmenities = isMobile ? PROJECT_CONFIG.amenities.slice(0, 2) : PROJECT_CONFIG.amenities

  return (
    <section id="amenities">
      <div className="section-heading">
        <h2>Amenities & Experiences</h2>
        <a href="#contact">Plan a site visit</a>
      </div>
      <div className="grid-cards">
        {visibleAmenities.slice(0, 3).map((item, index) => {
          const media = highlightImages[index]
          return (
            <div
              key={`amenity-${index}`}
              className='card'
             // className={media ? 'card media-card' : 'card'}
             // style={media ? ({ '--media': `url(${media})` } as React.CSSProperties) : undefined}
            >
              <h3>{item}</h3>
              <p>Designed to deliver a premium community lifestyle with thoughtfully curated spaces for every resident.</p>
              <span>{highlightCTA[index] || 'Included in membership'}</span>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default AmenitiesSection

