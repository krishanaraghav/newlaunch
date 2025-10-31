import React, { useEffect } from 'react'
import { PROJECT_CONFIG } from '../../config/project'

type ModalProps = {
  isOpen: boolean
  onClose: () => void
  generalWhatsAppLink: string
}

const Modal = ({ isOpen, onClose, generalWhatsAppLink }: ModalProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget as HTMLFormElement)
    const name = formData.get('name') as string
    const phone = formData.get('phone') as string
    const email = formData.get('email') as string

    const message = `Hello ${PROJECT_CONFIG.partnerName}, I am interested in ${PROJECT_CONFIG.projectName}.
    
Name: ${name}
Phone: ${phone}
Email: ${email || 'Not provided'}

Please share more details about the project.`

    const whatsappUrl = `https://wa.me/${PROJECT_CONFIG.contact.whatsapp}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, '_blank')
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          <i className="fas fa-xmark" aria-hidden="true" />
        </button>
        
        <div className="modal-header">
          <h2>Get Exclusive Details</h2>
          <p>Limited time offer - Get personalized pricing and special incentives for premium residences</p>
        </div>

        <form onSubmit={handleSubmit} className="callback-form">
          <div className="form-field">
            <label htmlFor="modal-name">Full Name *</label>
            <input
              type="text"
              id="modal-name"
              name="name"
              placeholder="Enter your full name"
              autoComplete="name"
              required
            />
          </div>
          
          <div className="form-field">
            <label htmlFor="modal-phone">Phone Number *</label>
            <input
              type="tel"
              id="modal-phone"
              name="phone"
              placeholder="+91 98765 43210"
              autoComplete="tel"
              inputMode="tel"
              required
            />
          </div>
          
          <div className="form-field">
            <label htmlFor="modal-email">Email Address</label>
            <input
              type="email"
              id="modal-email"
              name="email"
              placeholder="your.email@example.com"
              autoComplete="email"
            />
          </div>
          
          <div className="cta-row">
            <button type="submit" className="cta">
              <i className="fas fa-paper-plane" aria-hidden="true" /> Get Details Now
            </button>
            <a href={generalWhatsAppLink} className="cta secondary" target="_blank" rel="noreferrer">
              <i className="fab fa-whatsapp" aria-hidden="true" /> Chat on WhatsApp
            </a>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Modal

