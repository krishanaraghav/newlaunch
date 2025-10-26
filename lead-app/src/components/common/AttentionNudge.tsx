import React, { useEffect, useState } from 'react'

type AttentionNudgeProps = {
  generalWhatsAppLink: string
}

const AttentionNudge = ({ generalWhatsAppLink }: AttentionNudgeProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const [hasScrolled, setHasScrolled] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const timer = window.setTimeout(() => setIsVisible(true), 6000)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return

    const handleScroll = () => {
      if (window.scrollY > 200) {
        setHasScrolled(true)
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const shouldShow = isVisible && hasScrolled && !isDismissed

  if (!shouldShow) return null

  return (
    <div className="attention-nudge visible" role="complementary">
      <div className="attention-copy">
        <strong>Trusted Partner:</strong> Schedule a call now—availability is limited this week.
        <span>Respond in under 30 minutes. Leave your number or chat with us instantly.</span>
      </div>
      <div className="attention-actions">
        <a href="#contact" className="attention-link">
          <i className="fas fa-user-check" aria-hidden="true" /> Request Callback
        </a>
        <a href={generalWhatsAppLink} className="attention-link" target="_blank" rel="noreferrer">
          <i className="fab fa-whatsapp" aria-hidden="true" /> Chat on WhatsApp
        </a>
      </div>
      <button
        type="button"
        className="attention-dismiss"
        aria-label="Hide message"
        onClick={() => setIsDismissed(true)}
      >
        <i className="fas fa-xmark" aria-hidden="true" />
      </button>
    </div>
  )
}

export default AttentionNudge
