import { PROJECT_CONFIG } from '../../config/project'
import PromoBanner from '../common/PromoBanner'

type HeaderProps = {
  generalWhatsAppLink: string
  promoVisible: boolean
  onDismissPromo: () => void
  isDarkMode: boolean
  onToggleTheme: () => void
}

const Header = ({ generalWhatsAppLink, promoVisible, onDismissPromo, isDarkMode, onToggleTheme }: HeaderProps) => (
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
        <div className="header-actions">
          <button 
            className="theme-toggle" 
            onClick={onToggleTheme}
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <i className={`fas ${isDarkMode ? 'fa-sun' : 'fa-moon'}`} aria-hidden="true" />
          </button>
          <a href="#contact" className="cta secondary">
            <i className="fas fa-user-plus" aria-hidden="true" /> Register Interest
          </a>
        </div>
      </div>

      <div className="hero">
        <div className="hero-copy">
          <h1>
            {PROJECT_CONFIG.tagline} <span>{PROJECT_CONFIG.location}</span>
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
              <span>2, 3, 4 BHK &amp; 4 BHK + S</span>
            </div>
            <div className="meta-card">
              <span>Contact</span>
              <span>{PROJECT_CONFIG.contact.phone}</span>
            </div>
          </div>
        </div>
        <div className="hero-media">
          <div className="hero-image-wrapper">
            <img
              src={PROJECT_CONFIG.heroImage}
              alt="Emaar Sector 86 | Emaar Serenity Hills Sector 86 Gurgaon | Emaar Sec 86 Luxury Apartments"
              loading="eager"
              className="hero-image"
            />
            <div className="hero-image-badge">
              <i className="fas fa-building" aria-hidden="true" />
              <span>Premium Living</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
)

export default Header

