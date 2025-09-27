import { PROJECT_CONFIG } from '../../config/project'
import PromoBanner from '../common/PromoBanner'

type HeaderProps = {
  generalWhatsAppLink: string
  promoVisible: boolean
  onDismissPromo: () => void
}

const Header = ({ generalWhatsAppLink, promoVisible, onDismissPromo }: HeaderProps) => (
  <header>
    <div className="container">
      <div className="top-bar">
        <div className="brand">
          <i className="fas fa-building" aria-hidden="true" />
          <span>{PROJECT_CONFIG.companyName}</span>
        </div>
        <nav>
          <ul>
            <li>
              <a href="#highlights">Highlights</a>
            </li>
            <li>
              <a href="#amenities">Amenities</a>
            </li>
            <li>
              <a href="#location">Location</a>
            </li>
          </ul>
        </nav>
        <a href="#contact" className="cta secondary">
          <i className="fas fa-user-plus" aria-hidden="true" /> Register Interest
        </a>
      </div>

      <div className="hero">
        <div className="hero-copy">
          <h1>
            Luxury Living in <span>{PROJECT_CONFIG.location}</span>
          </h1>
          <p>{PROJECT_CONFIG.description}</p>
          <div className="hero-actions">
            <a href="#contact" className="cta">
              <i className="fas fa-paper-plane" aria-hidden="true" /> Get Project Details
            </a>
            <a href={generalWhatsAppLink} className="cta secondary" target="_blank" rel="noreferrer">
              <i className="fab fa-whatsapp" aria-hidden="true" /> Chat on WhatsApp
            </a>
          </div>

          <PromoBanner visible={promoVisible} onDismiss={onDismissPromo} />

          <div className="hero-meta">
            <div className="meta-card">
              <span>Project</span>
              <span>{PROJECT_CONFIG.projectName}</span>
            </div>
            <div className="meta-card">
              <span>Configurations</span>
              <span>3 &amp; 4 BHK Residences</span>
            </div>
            <div className="meta-card">
              <span>Contact</span>
              <span>{PROJECT_CONFIG.contact.phone}</span>
            </div>
          </div>
        </div>
        <div className="hero-media">
          <img
            src={PROJECT_CONFIG.heroImage}
            alt={`${PROJECT_CONFIG.projectName} visual`}
            loading="lazy"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>
      </div>
    </div>
  </header>
)

export default Header

