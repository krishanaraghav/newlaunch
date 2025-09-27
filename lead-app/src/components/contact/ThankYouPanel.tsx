type ThankYouPanelProps = {
  thankYouWhatsAppLink: string
}

const ThankYouPanel = ({ thankYouWhatsAppLink }: ThankYouPanelProps) => (
  <div className="callback-thanks">
    <i className="fas fa-circle-check" aria-hidden="true" />
    <h3>Thanks for your request!</h3>
    <p>
      Our relationship manager will call you within 2 hours. A confirmation message has just been prepared for WhatsApp in case you need
      to follow up.
    </p>
    <div className="cta-group">
      <a href="tel:9289329903" className="cta" style={{ background: '#fff', color: 'var(--accent-blue)' }}>
        <i className="fas fa-phone" aria-hidden="true" /> Call Now
      </a>
      <a className="cta secondary" target="_blank" rel="noreferrer" href={thankYouWhatsAppLink}>
        <i className="fab fa-whatsapp" aria-hidden="true" /> Share Details on WhatsApp
      </a>
    </div>
  </div>
)

export default ThankYouPanel

