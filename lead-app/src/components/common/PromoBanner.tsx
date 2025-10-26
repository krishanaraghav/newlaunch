type PromoBannerProps = {
  visible: boolean
  onDismiss: () => void
}

const PromoBanner = ({ visible, onDismiss }: PromoBannerProps) => (
  <aside className={`promo-banner${visible ? ' visible' : ''}`} aria-live="polite">
    <span className="promo-badge">
      <i className="fas fa-fire" aria-hidden="true" /> Limited Time Offer
    </span>
    <div className="promo-content">
      <strong>Exclusive deals on premium residences!</strong>
      <span>Unlock curated pricing and complimentary upgrades when you schedule <br /> a call today.</span>
    </div>
    <div className="promo-actions">
      <a href="#contact" className="promo-link">
        <i className="fas fa-sparkles" aria-hidden="true" /> Get Details Now
      </a>
      <button className="promo-close" type="button" aria-label="Dismiss offer" onClick={onDismiss}>
        <i className="fas fa-xmark" aria-hidden="true" />
      </button>
    </div>
  </aside>
)

export default PromoBanner

