import { highlightIcons } from '../../config/icons'
import { PROJECT_CONFIG, highlightLabels, highlightImages } from '../../config/project'

const HighlightsSection = () => (
  <section id="highlights">
    <div className="section-heading">
      <h2>Project Highlights</h2>
      <a href="#contact">View brochure</a>
    </div>
    <div className="grid-cards">
      {PROJECT_CONFIG.highlights.slice(0, 4).map((item, index) => {
        const media = highlightImages[index]
        const icon = highlightIcons[index] || 'fa-star'
        const label = highlightLabels[index] || `Signature Highlight ${index + 1}`
        return (
          <div
            key={`highlight-${index}`}
           // className={media ? 'card media-card' : 'card'}
           className="card"
           // style={media ? ({ '--media': `url(${media})` } as React.CSSProperties) : undefined}
          >
            <i className={`fas ${icon}`} aria-hidden="true" />
            <h3>{label}</h3>
            <p>{item}</p>
            <span>Explore details</span>
          </div>
        )
      })}
    </div>
  </section>
)

export default HighlightsSection

