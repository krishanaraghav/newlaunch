import { useIsMobile } from '../../hooks/useIsMobile'
import { highlightIcons } from '../../config/icons'
import { PROJECT_CONFIG, highlightLabels, highlightImages, highlightCTA } from '../../config/project'

const HighlightsSection = () => {
  const isMobile = useIsMobile()
  const visibleHighlights = isMobile ? PROJECT_CONFIG.highlights.slice(0, 2) : PROJECT_CONFIG.highlights

  return (
    <section id="highlights">
      <div className="section-heading">
        <h2>Emaar Sector 86 Highlights | Emaar Serenity Hills Sec 86 Gurgaon</h2>
        <a href="#contact">View brochure</a>
      </div>
      <div className="grid-cards">
        {visibleHighlights.slice(0, 3).map((item, index) => {
          const media = highlightImages[index]
          const icon = highlightIcons[index] || 'fa-star'
          const label = highlightLabels[index] || `Signature Highlight ${index + 1}`
          return (
            <div
              key={`highlight-${index}`}
              className='card'
              //className={media ? 'card media-card' : 'card'}
              //style={media ? ({ '--media': `url(${media})` } as React.CSSProperties) : undefined}
            >
              <i className={`fas ${icon}`} aria-hidden="true" />
              <h3>{label}</h3>
              <p>{item}</p>
              <span>{highlightCTA[index] || 'Learn more'}</span>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default HighlightsSection

