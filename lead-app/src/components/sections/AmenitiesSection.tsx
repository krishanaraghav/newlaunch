import { amenityIcons } from '../../config/icons'
import { PROJECT_CONFIG, highlightImages, amenityCTA } from '../../config/project'

const AmenitiesSection = () => (
  <section id="amenities">
    <div className="section-heading">
      <h2>Amenities &amp; Experiences</h2>
      {/* <a href="#contact">Plan a site visit</a> */}
    </div>
    <div className="grid-cards">
      {PROJECT_CONFIG.amenities.slice(0, 3).map((amenity, index) => {
        const media = index < 2 ? highlightImages[index] : undefined
        return (
          <div
            key={`amenity-${amenity}`}
            className='card'
         //   className={media ? 'card media-card' : 'card'}
         //   style={media ? ({ '--media': `url(${media})` } as React.CSSProperties) : undefined}
          >
            <i className={`fas ${amenityIcons[index % amenityIcons.length]}`} aria-hidden="true" />
            <h3>{amenity}</h3>
            <p>Designed to deliver a premium community lifestyle with thoughtfully curated spaces for every resident.</p>
            <span>{amenityCTA}</span>
          </div>
        )
      })}
    </div>
  </section>
)

export default AmenitiesSection

