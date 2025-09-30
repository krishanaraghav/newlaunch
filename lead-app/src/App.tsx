import type { FormEventHandler } from 'react'
import { useMemo, useState } from 'react'
import './styles/main.scss'
import { PROJECT_CONFIG, ACTIVE_LAYOUT } from './config/project'
import { useFooterYear } from './hooks/useFooterYear'
import { usePromoBanner } from './hooks/usePromoBanner'
import { defaultWhatsAppMessage, useWhatsAppLink } from './utils/whatsapp'
import { submitLead } from './utils/lead'
import HeroCTALayout from './components/layouts/HeroCTALayout'
import StoryFlowLayout from './components/layouts/StoryFlowLayout'
import ComparisonInfoLayout from './components/layouts/ComparisonInfoLayout'
import LeadMagnetLayout from './components/layouts/LeadMagnetLayout'

function App() {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [whatsAppMessage, setWhatsAppMessage] = useState(defaultWhatsAppMessage())
  const [thankYouMessage, setThankYouMessage] = useState(defaultWhatsAppMessage())
  const { visible: promoVisible, dismiss: dismissPromo } = usePromoBanner()

  useFooterYear()

  const generalWhatsAppLink = useWhatsAppLink(whatsAppMessage)
  const thankYouWhatsAppLink = useWhatsAppLink(thankYouMessage)

  const whatsappQrUrl = useMemo(() => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=4&data=${encodeURIComponent(generalWhatsAppLink)}`
  }, [generalWhatsAppLink])

  const callbackQrUrl = useMemo(() => {
    if (typeof window === 'undefined') return ''
    const target = `${window.location.origin}${window.location.pathname}#contact`
    return `https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=4&data=${encodeURIComponent(target)}`
  }, [])

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const name = (formData.get('name') as string) || 'Prospective Buyer'
    const phoneRaw = (formData.get('phone') as string) || PROJECT_CONFIG.contact.whatsapp
    const email = (formData.get('email') as string) || null

    const phone = phoneRaw.replace(/\s+/g, '')
    const emailLine = email ? `\nEmail: ${email}` : ''
    const message = `Hello ${PROJECT_CONFIG.companyName},\nI just shared my details for ${PROJECT_CONFIG.projectName}.\nName: ${name}\nPhone: ${phone}${emailLine}`

    try {
      await submitLead({
        name,
        phone,
        email,
        message,
      })
    } catch (error) {
      console.error('Lead submission failed', error)
    }

    setThankYouMessage(message)
    setWhatsAppMessage(message)
    setFormSubmitted(true)
    event.currentTarget.reset()
  }

  // Common props for all layouts
  const commonProps = {
    generalWhatsAppLink,
    formSubmitted,
    onSubmit: handleFormSubmit,
    thankYouWhatsAppLink,
  }

  // Render the appropriate layout based on ACTIVE_LAYOUT
  switch (ACTIVE_LAYOUT) {
    case 'hero-cta':
      return (
        <HeroCTALayout
          {...commonProps}
          promoVisible={promoVisible}
          onDismissPromo={dismissPromo}
        />
      )

    case 'story-flow':
      return (
        <StoryFlowLayout
          {...commonProps}
          promoVisible={promoVisible}
          onDismissPromo={dismissPromo}
        />
      )

    case 'comparison-info':
      return (
        <ComparisonInfoLayout
          {...commonProps}
          promoVisible={promoVisible}
          onDismissPromo={dismissPromo}
          whatsappQrUrl={whatsappQrUrl}
          callbackQrUrl={callbackQrUrl}
        />
      )

    case 'lead-magnet':
      return <LeadMagnetLayout {...commonProps} />

    default:
      // Fallback to hero-cta if layout is not recognized
      return (
        <HeroCTALayout
          {...commonProps}
          promoVisible={promoVisible}
          onDismissPromo={dismissPromo}
        />
      )
  }
}

export default App

