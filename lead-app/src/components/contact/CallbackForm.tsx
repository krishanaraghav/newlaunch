import type { FormEventHandler } from 'react'
import { useId, useState } from 'react'

type CallbackFormProps = {
  onSubmit: FormEventHandler<HTMLFormElement>
  generalWhatsAppLink: string
  isSubmitting?: boolean
  submitError?: string | null
}

const CallbackForm = ({ onSubmit, generalWhatsAppLink, isSubmitting = false, submitError = null }: CallbackFormProps) => {
  const nameId = useId()
  const phoneId = useId()
  const emailId = useId()
  const [showEmail, setShowEmail] = useState(false)

  return (
    <form className="callback-form" onSubmit={onSubmit}>
      <div className="form-title">Connect in Seconds</div>
      <p className="form-subtitle">Share your details or jump straight into WhatsApp.</p>
      <div className="form-field">
        <label htmlFor={nameId}>Full Name</label>
        <input type="text" id={nameId} name="name" placeholder="Enter your name" autoComplete="name" required />
      </div>
      <div className="form-field">
        <label htmlFor={phoneId}>Phone Number</label>
        <input
          type="tel"
          id={phoneId}
          name="phone"
          placeholder="e.g. +91 98765 43210"
          autoComplete="tel"
          inputMode="tel"
          required
        />
        <span className="form-helper">We’ll confirm within 2 hours.</span>
      </div>
      {showEmail ? (
        <div className="form-field">
          <label htmlFor={emailId}>Email (optional)</label>
          <input type="email" id={emailId} name="email" placeholder="Email address" autoComplete="email" />
        </div>
      ) : (
        <button type="button" className="inline-toggle" onClick={() => setShowEmail(true)}>
          Add email (optional)
        </button>
      )}
      {submitError && (
        <div className="form-error" role="alert">
          <i className="fas fa-exclamation-circle" aria-hidden="true" />
          <span>{submitError}</span>
        </div>
      )}
      <div className="cta-row">
        <button type="submit" className="cta" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <span className="loading-spinner" />
              Submitting...
            </>
          ) : (
            <>
              <i className="fas fa-paper-plane" aria-hidden="true" /> Request Callback
            </>
          )}
        </button>
        <a 
          className={`cta secondary ${isSubmitting ? 'disabled' : ''}`} 
          target="_blank" 
          rel="noreferrer" 
          href={generalWhatsAppLink}
        >
          <i className="fab fa-whatsapp" aria-hidden="true" /> Chat on WhatsApp
        </a>
      </div>
    </form>
  )
}

export default CallbackForm

