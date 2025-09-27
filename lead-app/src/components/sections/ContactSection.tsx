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
}

const ContactSection = ({
  formSubmitted,
  onSubmit,
  thankYouWhatsAppLink,
  generalWhatsAppLink,
  whatsappQrUrl,
  callbackQrUrl,
}: ContactSectionProps) => (
  <section className="cta-banner" id="contact">
    <div className="contact-content">
      <div className="contact-copy">
        <h2>Ready to secure your address?</h2>
        <p>
          Connect with our dedicated relationship managers for pricing, inventory, and curated walkthroughs of
          {PROJECT_CONFIG.projectName}.
        </p>
      </div>
      <div className="callback-container">
        {!formSubmitted ? <CallbackForm onSubmit={onSubmit} /> : <ThankYouPanel thankYouWhatsAppLink={thankYouWhatsAppLink} />}
      </div>
      <div className="contact-sidebar">
        <ContactActions generalWhatsAppLink={generalWhatsAppLink} />
        <QrGrid whatsappQrUrl={whatsappQrUrl} callbackQrUrl={callbackQrUrl} />
      </div>
    </div>
  </section>
)

export default ContactSection

