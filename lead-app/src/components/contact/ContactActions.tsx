type ContactActionsProps = {
  generalWhatsAppLink: string
}

const ContactActions = ({ generalWhatsAppLink }: ContactActionsProps) => (
  <div className="contact-actions">
    <div className="contact-buttons">
      <a href="tel:9289329903" className="cta" style={{ background: '#fff', color: 'var(--accent-blue)' }}>
        <i className="fas fa-phone" aria-hidden="true" /> Call Now
      </a>
      <a className="cta secondary" target="_blank" rel="noreferrer" href={generalWhatsAppLink}>
        <i className="fab fa-whatsapp" aria-hidden="true" /> Chat on WhatsApp
      </a>
    </div>
  </div>
)

export default ContactActions

