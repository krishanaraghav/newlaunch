import { useEffect, useMemo, useState } from 'react'

type AttentionNudgeProps = {
  generalWhatsAppLink: string
}

const SCROLL_THRESHOLD = 200
const DELAY_MS = 6000

const AttentionNudge = ({ generalWhatsAppLink }: AttentionNudgeProps) => {
  const [delayElapsed, setDelayElapsed] = useState(false)
  const [scrollReached, setScrollReached] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return undefined
    const timer = window.setTimeout(() => setDelayElapsed(true), DELAY_MS)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined') return undefined

    const handleScroll = () => {
      if (window.scrollY > SCROLL_THRESHOLD) {
        setScrollReached(true)
      }
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const visible = useMemo(() => delayElapsed && scrollReached && !dismissed, [delayElapsed, scrollReached, dismissed])

  if (!visible) return null

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
      <button type="button" className="attention-dismiss" aria-label="Hide message" onClick={() => setDismissed(true)}>
        <i className="fas fa-xmark" aria-hidden="true" />
      </button>
    </div>
  )
}

export default AttentionNudge


