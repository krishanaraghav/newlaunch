import type { FormEventHandler } from 'react'

type CallbackFormProps = {
  onSubmit: FormEventHandler<HTMLFormElement>
}

const CallbackForm = ({ onSubmit }: CallbackFormProps) => (
  <form className="callback-form" onSubmit={onSubmit}>
    <div className="form-title">Request a Call Back</div>
    <div className="form-field">
      <label htmlFor="callback-name">Full Name</label>
      <input type="text" id="callback-name" name="name" placeholder="Enter your name" autoComplete="name" required />
    </div>
    <div className="form-field">
      <label htmlFor="callback-phone">Phone Number</label>
      <input
        type="tel"
        id="callback-phone"
        name="phone"
        placeholder="e.g. +91 98765 43210"
        autoComplete="tel"
        required
      />
    </div>
    <div className="form-field">
      <label htmlFor="callback-email">Email (optional)</label>
      <input type="email" id="callback-email" name="email" placeholder="Enter your email" autoComplete="email" />
    </div>
    <div className="form-field">
      <label htmlFor="callback-preference">Preferred Slot</label>
      <select id="callback-preference" name="preference" defaultValue="Morning">
        <option value="Morning">Morning (9 AM - 12 PM)</option>
        <option value="Afternoon">Afternoon (12 PM - 4 PM)</option>
        <option value="Evening">Evening (4 PM - 7 PM)</option>
      </select>
    </div>
    <div className="form-note">Our relationship manager will connect via call within 2 hours.</div>
    <button type="submit" className="cta">
      <i className="fas fa-phone-volume" aria-hidden="true" /> Submit Request
    </button>
  </form>
)

export default CallbackForm

