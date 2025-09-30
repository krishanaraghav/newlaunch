import type { FormEventHandler } from 'react'
import { useState } from 'react'
import { PROJECT_CONFIG, COUNTDOWN_CONFIG, highlightImages } from '../../config/project'
import Header from '../layout/Header'
import Footer from '../layout/Footer'
import FloatingWhatsapp from '../common/FloatingWhatsapp'
import CountdownTimer from '../common/CountdownTimer'
import LockedContent from '../common/LockedContent'

type StoryFlowLayoutProps = {
  generalWhatsAppLink: string
  promoVisible: boolean
  onDismissPromo: () => void
  formSubmitted: boolean
  onSubmit: FormEventHandler<HTMLFormElement>
  thankYouWhatsAppLink: string
}

const StoryFlowLayout = ({
  generalWhatsAppLink,
  promoVisible,
  onDismissPromo,
  formSubmitted,
  onSubmit,
  thankYouWhatsAppLink,
}: StoryFlowLayoutProps) => {
  const [unlocked, setUnlocked] = useState(false)
  const [showUnlockForm, setShowUnlockForm] = useState(false)

  const handleUnlock = () => {
    setShowUnlockForm(true)
  }

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    onSubmit(e)
    setUnlocked(true)
    setShowUnlockForm(false)
  }

  return (
    <div className="page layout-story-flow">
      <Header generalWhatsAppLink={generalWhatsAppLink} promoVisible={promoVisible} onDismissPromo={onDismissPromo} />

      <main className="container">
        {/* Countdown Section */}
        <section className="countdown-section">
          <CountdownTimer
            targetDate={COUNTDOWN_CONFIG.targetDate}
            title={COUNTDOWN_CONFIG.title}
            subtitle={COUNTDOWN_CONFIG.subtitle}
          />
        </section>

        {/* Story Cards */}
        <section className="story-cards">
          {highlightImages.slice(0, 2).map((image, idx) => (
            <div key={idx} className="story-card">
              <img src={image} alt={`Feature ${idx + 1}`} loading="lazy" />
              <div className="story-card-overlay">
                <span className="story-badge">Featured</span>
              </div>
            </div>
          ))}

          {/* Locked Content Card */}
          <div className="story-card locked-card">
            <LockedContent isLocked={!unlocked} onUnlock={handleUnlock} unlockText="Unlock Pricing">
              <img src={highlightImages[2]} alt="Pricing Details" loading="lazy" />
              {unlocked && (
                <div className="pricing-reveal">
                  <h3>Pricing Details</h3>
                  <p>3 BHK: Starting from ₹2.5 Cr</p>
                  <p>4 BHK: Starting from ₹3.8 Cr</p>
                </div>
              )}
            </LockedContent>
          </div>
        </section>

        {/* Unlock Form Modal */}
        {showUnlockForm && !unlocked && (
          <div className="modal-overlay" onClick={() => setShowUnlockForm(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={() => setShowUnlockForm(false)}>
                <i className="fas fa-times" aria-hidden="true" />
              </button>
              <h3>Unlock Exclusive Pricing</h3>
              <p>Share your details to access pricing, floor plans, and availability.</p>
              <form onSubmit={handleFormSubmit} className="unlock-form">
                <div className="form-field">
                  <label htmlFor="name">Full Name</label>
                  <input type="text" id="name" name="name" placeholder="Enter your name" required />
                </div>
                <div className="form-field">
                  <label htmlFor="phone">Phone Number</label>
                  <input type="tel" id="phone" name="phone" placeholder="+91 98765 43210" required />
                </div>
                <button type="submit" className="cta">
                  <i className="fas fa-unlock" aria-hidden="true" /> Unlock Pricing
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <section className="story-cta">
          <h3>Ready to Explore More?</h3>
          <a className="cta" target="_blank" rel="noreferrer" href={generalWhatsAppLink}>
            <i className="fab fa-whatsapp" aria-hidden="true" /> Chat with Us on WhatsApp
          </a>
        </section>
      </main>

      <Footer />
      <FloatingWhatsapp href={formSubmitted ? thankYouWhatsAppLink : generalWhatsAppLink} />
    </div>
  )
}

export default StoryFlowLayout

