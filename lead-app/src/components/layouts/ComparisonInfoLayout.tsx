import type { FormEventHandler } from 'react'
import { PROJECT_CONFIG } from '../../config/project'
import Header from '../layout/Header'
import Footer from '../layout/Footer'
import FloatingWhatsapp from '../common/FloatingWhatsapp'
import HighlightsSection from '../sections/HighlightsSection'
import AmenitiesSection from '../sections/AmenitiesSection'
import LocationSection from '../sections/LocationSection'
import ContactSection from '../sections/ContactSection'

type ComparisonInfoLayoutProps = {
  generalWhatsAppLink: string
  promoVisible: boolean
  onDismissPromo: () => void
  formSubmitted: boolean
  onSubmit: FormEventHandler<HTMLFormElement>
  thankYouWhatsAppLink: string
  whatsappQrUrl: string
  callbackQrUrl: string
}

const ComparisonInfoLayout = ({
  generalWhatsAppLink,
  promoVisible,
  onDismissPromo,
  formSubmitted,
  onSubmit,
  thankYouWhatsAppLink,
  whatsappQrUrl,
  callbackQrUrl,
}: ComparisonInfoLayoutProps) => {
  return (
    <div className="page layout-comparison-info">
      <header className="simple-header">
        <div className="container">
          <div className="header-content">
            <h1>{PROJECT_CONFIG.projectName}</h1>
            <p className="tagline">{PROJECT_CONFIG.tagline}</p>
          </div>
        </div>
      </header>

      <main className="container">
        {/* Location Highlight */}
        <section className="location-highlight">
          <div className="location-icon">
            <i className="fas fa-map-marker-alt" aria-hidden="true" />
          </div>
          <div className="location-details">
            <h3>{PROJECT_CONFIG.location}</h3>
            <p>{PROJECT_CONFIG.description}</p>
          </div>
        </section>

        {/* Amenities & Highlights Grid */}
        <HighlightsSection />
        <AmenitiesSection />
        <LocationSection />

        {/* Contact Section */}
        <ContactSection
          formSubmitted={formSubmitted}
          onSubmit={onSubmit}
          thankYouWhatsAppLink={thankYouWhatsAppLink}
          generalWhatsAppLink={generalWhatsAppLink}
          whatsappQrUrl={whatsappQrUrl}
          callbackQrUrl={callbackQrUrl}
        />

        {/* Sticky CTA Bar */}
        <div className="sticky-cta-bar">
          <span className="sticky-cta-text">Interested in {PROJECT_CONFIG.projectName}?</span>
          <a className="cta compact" target="_blank" rel="noreferrer" href={generalWhatsAppLink}>
            <i className="fab fa-whatsapp" aria-hidden="true" /> Get Details
          </a>
        </div>
      </main>

      <Footer />
      <FloatingWhatsapp href={formSubmitted ? thankYouWhatsAppLink : generalWhatsAppLink} />
    </div>
  )
}

export default ComparisonInfoLayout

