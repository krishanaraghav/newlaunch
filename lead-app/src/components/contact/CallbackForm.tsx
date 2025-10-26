import React, { type FormEventHandler } from 'react'

type CallbackFormProps = {
  onSubmit: FormEventHandler<HTMLFormElement>
  generalWhatsAppLink: string
  isSubmitting?: boolean
  submitError?: string | null
}

const CallbackForm = ({ onSubmit, generalWhatsAppLink, isSubmitting = false, submitError }: CallbackFormProps) => (
  <form className="callback-form" onSubmit={onSubmit}>
    <div className="form-title">Connect in Seconds</div>
    <p className="form-subtitle">Share your details or jump straight into WhatsApp.</p>
    <div className="form-field">
      <label htmlFor="callback-name">Full Name</label>
      <input type="text" id="callback-name" name="name" placeholder="Enter your name" autoComplete="name" required disabled={isSubmitting} />
    </div>
    <div className="form-field">
      <label htmlFor="callback-phone">Phone Number</label>
      <input
        type="tel"
        id="callback-phone"
        name="phone"
        placeholder="e.g. +91 98765 43210"
        autoComplete="tel"
        inputMode="tel"
        required
        disabled={isSubmitting}
      />
      <span className="form-helper">We'll confirm within 2 hours.</span>
    </div>
    <div className="form-field">
      <label htmlFor="callback-email">Email (optional)</label>
      <input type="email" id="callback-email" name="email" placeholder="Email address" autoComplete="email" disabled={isSubmitting} />
    </div>
    {submitError && (
      <div style={{ 
        background: '#fee', 
        border: '1px solid #fcc', 
        padding: '12px', 
        borderRadius: '4px', 
        marginBottom: '15px',
        fontSize: '14px',
        color: '#c33'
      }}>
        ⚠️ {submitError}
      </div>
    )}
    <div className="cta-row">
      <button type="submit" className="cta" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            <i className="fas fa-spinner fa-spin" aria-hidden="true" /> Submitting...
          </>
        ) : (
          <>
            <i className="fas fa-paper-plane" aria-hidden="true" /> Request Callback
          </>
        )}
      </button>
      <a href={generalWhatsAppLink} className="cta secondary" target="_blank" rel="noreferrer">
        <i className="fab fa-whatsapp" aria-hidden="true" /> Chat on WhatsApp
      </a>
    </div>
  </form>
)

export default CallbackForm

