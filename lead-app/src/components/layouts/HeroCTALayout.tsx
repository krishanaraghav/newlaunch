import type { FormEventHandler } from 'react'
import { useState } from 'react'
import { PROJECT_CONFIG } from '../../config/project'
import Header from '../layout/Header'
import Footer from '../layout/Footer'
import FloatingWhatsapp from '../common/FloatingWhatsapp'
import AttentionNudge from '../common/AttentionNudge'

type HeroCTALayoutProps = {
  generalWhatsAppLink: string
  promoVisible: boolean
  onDismissPromo: () => void
  formSubmitted: boolean
  onSubmit: FormEventHandler<HTMLFormElement>
  thankYouWhatsAppLink: string
}

const HeroCTALayout = ({
  generalWhatsAppLink,
  promoVisible,
  onDismissPromo,
  formSubmitted,
  onSubmit,
  thankYouWhatsAppLink,
}: HeroCTALayoutProps) => {
  const [showBrochureForm, setShowBrochureForm] = useState(false)

  const handleBrochureClick = () => {
    setShowBrochureForm(true)
  }

  return (
    <div className="page layout-hero-cta">
      <AttentionNudge generalWhatsAppLink={generalWhatsAppLink} />
      <Header generalWhatsAppLink={generalWhatsAppLink} promoVisible={promoVisible} onDismissPromo={onDismissPromo} />

      <main className="container">
        {/* Hero Section with Quick Facts */}
        <section className="hero-cta-main">
          <div className="hero-image">
            <img src={PROJECT_CONFIG.heroImage} alt={PROJECT_CONFIG.projectName} />
          </div>
          
          <div className="hero-cta-content">
            <h2>{PROJECT_CONFIG.projectName}</h2>
            <ul className="quick-facts">
              <li>
                <i className="fas fa-map-marker-alt" aria-hidden="true" />
                <span>
                  <strong>Location:</strong> {PROJECT_CONFIG.location}
                </span>
              </li>
              <li>
                <i className="fas fa-tag" aria-hidden="true" />
                <span>
                  <strong>Price Range:</strong> ₹2.5 Cr - ₹4.8 Cr
                </span>
              </li>
              <li>
                <i className="fas fa-calendar" aria-hidden="true" />
                <span>
                  <strong>Possession Date:</strong> Q4 2027
                </span>
              </li>
            </ul>

            <div className="hero-cta-actions">
              <a className="cta" target="_blank" rel="noreferrer" href={generalWhatsAppLink}>
                <i className="fab fa-whatsapp" aria-hidden="true" /> Get Details on WhatsApp
              </a>
              <button className="cta secondary" onClick={handleBrochureClick}>
                <i className="fas fa-download" aria-hidden="true" /> Download Brochure <span className="badge">(Form required)</span>
              </button>
            </div>
          </div>
        </section>

        {/* Brochure Form Modal */}
        {showBrochureForm && !formSubmitted && (
          <div className="modal-overlay" onClick={() => setShowBrochureForm(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setShowBrochureForm(false)}>
                <i className="fas fa-times" aria-hidden="true" />
              </button>
              <h3>Download Brochure</h3>
              <p>Please share your details to receive the complete project brochure.</p>
              <form onSubmit={onSubmit} className="brochure-form">
                <div className="form-field">
                  <label htmlFor="name">Full Name</label>
                  <input type="text" id="name" name="name" placeholder="Enter your name" required />
                </div>
                <div className="form-field">
                  <label htmlFor="phone">Phone Number</label>
                  <input type="tel" id="phone" name="phone" placeholder="+91 98765 43210" required />
                </div>
                <button type="submit" className="cta">
                  <i className="fas fa-download" aria-hidden="true" /> Download Brochure
                </button>
              </form>
            </div>
          </div>
        )}

        {formSubmitted && (
          <div className="success-message">
            <i className="fas fa-check-circle" aria-hidden="true" />
            <p>Thank you! Your brochure will be sent to you shortly.</p>
          </div>
        )}
      </main>

      <Footer />
      <FloatingWhatsapp href={formSubmitted ? thankYouWhatsAppLink : generalWhatsAppLink} />
    </div>
  )
}

export default HeroCTALayout

