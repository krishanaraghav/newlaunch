import type { FormEventHandler } from 'react'
import { PROJECT_CONFIG } from '../../config/project'
import CallbackForm from '../contact/CallbackForm'
import ThankYouPanel from '../contact/ThankYouPanel'
import ContactActions from '../contact/ContactActions'
import QrGrid from '../contact/QrGrid'

type ContactSectionProps = {
  formSubmitted: boolean
  onSubmit: FormEventHandler<HTMLFormElement>
  thankYouWhatsAppLink: string
  generalWhatsAppLink: string
  whatsappQrUrl: string
  callbackQrUrl: string
  isSubmitting?: boolean
  submitError?: string | null
}

const ContactSection = ({
  formSubmitted,
  onSubmit,
  thankYouWhatsAppLink,
  generalWhatsAppLink,
  whatsappQrUrl,
  callbackQrUrl,
  isSubmitting = false,
  submitError,
}: ContactSectionProps) => (
  <section className="cta-banner" id="contact">
    <div className="contact-urgency" role="note">
      <span className="urgency-badge">
        <i className="fas fa-clock" aria-hidden="true" /> Instant follow-up
      </span>
      <span>90% of our site visits are booked within 30 minutes—leave your details to secure a slot.</span>
    </div>
    <div className="contact-content">
      <div className="contact-copy">
        <h2>Ready to secure your address?</h2>
        <p>
          Connect with our dedicated relationship managers for pricing, inventory, and curated walkthroughs of{' '}
          {PROJECT_CONFIG.projectName}.
        </p>
        <div className="trust-badges">
          <span>
            <i className="fas fa-shield-check" aria-hidden="true" /> RERA Registered
          </span>
          <span>
            <i className="fas fa-user-tie" aria-hidden="true" /> Certified Advisors
          </span>
          <span>
            <i className="fas fa-star" aria-hidden="true" /> 4.8/5 Buyer Rating
          </span>
        </div>
      </div>
      <div className="callback-container">
        {formSubmitted ? (
          <ThankYouPanel thankYouWhatsAppLink={thankYouWhatsAppLink} />
        ) : (
          <CallbackForm 
            onSubmit={onSubmit} 
            generalWhatsAppLink={generalWhatsAppLink}
            isSubmitting={isSubmitting}
            submitError={submitError}
          />
        )}
      </div>
      <div className="contact-sidebar">
        <ContactActions generalWhatsAppLink={generalWhatsAppLink} />
        <QrGrid whatsappQrUrl={whatsappQrUrl} callbackQrUrl={callbackQrUrl} />
      </div>
    </div>
  </section>
)

export default ContactSection

