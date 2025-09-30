import type { FormEventHandler } from 'react'
import { useState } from 'react'
import { PROJECT_CONFIG } from '../../config/project'
import Footer from '../layout/Footer'
import FloatingWhatsapp from '../common/FloatingWhatsapp'
import HighlightsSection from '../sections/HighlightsSection'
import AmenitiesSection from '../sections/AmenitiesSection'

type LeadMagnetLayoutProps = {
  generalWhatsAppLink: string
  formSubmitted: boolean
  onSubmit: FormEventHandler<HTMLFormElement>
  thankYouWhatsAppLink: string
}

const LeadMagnetLayout = ({
  generalWhatsAppLink,
  formSubmitted,
  onSubmit,
  thankYouWhatsAppLink,
}: LeadMagnetLayoutProps) => {
  const [unlocked, setUnlocked] = useState(false)

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    onSubmit(e)
    setUnlocked(true)
  }

  return (
    <div className="page layout-lead-magnet">
      <main className="container">
        {!unlocked ? (
          /* Gatekeeper Section */
          <section className="gatekeeper-section">
            <div className="gatekeeper-hero">
              <div className="gatekeeper-image-wrapper">
                <img
                  src={PROJECT_CONFIG.heroImage}
                  alt={PROJECT_CONFIG.projectName}
                  className="gatekeeper-image blurred"
                />
                <div className="gatekeeper-overlay">
                  <i className="fas fa-eye-slash" aria-hidden="true" />
                </div>
              </div>
            </div>

            <div className="gatekeeper-content">
              <h1>Unlock Brochure, Floor Plan & Price List</h1>
              <p className="gatekeeper-subtitle">
                Get instant access to complete project details, exclusive pricing, and floor plans.
              </p>

              <form onSubmit={handleFormSubmit} className="gatekeeper-form">
                <div className="form-field">
                  <input type="text" name="name" placeholder="Name" required />
                </div>
                <div className="form-field">
                  <input type="tel" name="phone" placeholder="Mobile" required />
                </div>
                <button type="submit" className="cta unlock-button">
                  <i className="fas fa-unlock" aria-hidden="true" /> Unlock Details
                </button>
              </form>

              <p className="gatekeeper-note">
                <i className="fas fa-shield-alt" aria-hidden="true" /> Your information is secure and will not be
                shared.
              </p>
            </div>
          </section>
        ) : (
          /* Unlocked Content */
          <>
            <header className="unlocked-header">
              <div className="container">
                <h1>{PROJECT_CONFIG.projectName}</h1>
                <p>{PROJECT_CONFIG.tagline}</p>
                <div className="unlocked-badge">
                  <i className="fas fa-check-circle" aria-hidden="true" /> Full Access Granted
                </div>
              </div>
            </header>

            <section className="unlocked-hero">
              <img src={PROJECT_CONFIG.heroImage} alt={PROJECT_CONFIG.projectName} />
            </section>

            {/* Project Details */}
            <section className="project-details">
              <h2>Project Overview</h2>
              <div className="details-grid">
                <div className="detail-card">
                  <i className="fas fa-map-marker-alt" aria-hidden="true" />
                  <h3>Location</h3>
                  <p>{PROJECT_CONFIG.location}</p>
                </div>
                <div className="detail-card">
                  <i className="fas fa-building" aria-hidden="true" />
                  <h3>Configuration</h3>
                  <p>3 & 4 BHK Luxury Apartments</p>
                </div>
                <div className="detail-card">
                  <i className="fas fa-tag" aria-hidden="true" />
                  <h3>Price Range</h3>
                  <p>₹2.5 Cr - ₹4.8 Cr</p>
                </div>
                <div className="detail-card">
                  <i className="fas fa-calendar" aria-hidden="true" />
                  <h3>Possession</h3>
                  <p>Q4 2027</p>
                </div>
              </div>
            </section>

            <HighlightsSection />
            <AmenitiesSection />

            {/* Download CTA */}
            <section className="download-section">
              <h2>Download Complete Brochure</h2>
              <a className="cta" target="_blank" rel="noreferrer" href={thankYouWhatsAppLink}>
                <i className="fas fa-download" aria-hidden="true" /> Download Brochure via WhatsApp
              </a>
            </section>

            {/* Secondary CTA - Site Visit */}
            <section className="site-visit-cta">
              <h3>Schedule a Site Visit</h3>
              <p>Experience the project firsthand with our guided tour</p>
              <a className="cta secondary" target="_blank" rel="noreferrer" href={generalWhatsAppLink}>
                <i className="fas fa-calendar-plus" aria-hidden="true" /> Book Site Visit
              </a>
            </section>
          </>
        )}
      </main>

      <Footer />
      <FloatingWhatsapp href={formSubmitted ? thankYouWhatsAppLink : generalWhatsAppLink} />
    </div>
  )
}

export default LeadMagnetLayout

