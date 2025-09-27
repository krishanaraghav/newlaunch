type FloatingWhatsappProps = {
  href: string
}

const FloatingWhatsapp = ({ href }: FloatingWhatsappProps) => (
  <a className="floating-whatsapp" target="_blank" rel="noreferrer" href={href}>
    <i className="fab fa-whatsapp" aria-hidden="true" />
    <span>WhatsApp Us</span>
  </a>
)

export default FloatingWhatsapp

