type ContactActionsProps = {
  generalWhatsAppLink: string
}

const ContactActions = ({ generalWhatsAppLink }: ContactActionsProps) => (
  <div className="contact-actions">
    <div className="cta-stack">
      <span className="cta-label">Prefer WhatsApp?</span>
      <div className="contact-buttons">
        <a className="cta whatsapp" target="_blank" rel="noreferrer" href={generalWhatsAppLink}>
          <i className="fab fa-whatsapp" aria-hidden="true" /> Join on WhatsApp
        </a>
        <a href="tel:9289329903" className="cta phone">
          <i className="fas fa-phone" aria-hidden="true" /> Call Now
        </a>
      </div>
    </div>
  </div>
)

export default ContactActions

