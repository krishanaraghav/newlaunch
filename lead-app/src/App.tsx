import type { FormEventHandler } from 'react'
import { useMemo, useState } from 'react'
import './styles/main.scss'
import { PROJECT_CONFIG } from './config/project'
import { useFooterYear } from './hooks/useFooterYear'
import { usePromoBanner } from './hooks/usePromoBanner'
import { useModal } from './hooks/useModal'
import { useTheme } from './hooks/useTheme'
import { defaultWhatsAppMessage, useWhatsAppLink } from './utils/whatsapp'
import { submitLead } from './utils/lead'
import Header from './components/layout/Header'
import HighlightsSection from './components/sections/HighlightsSection'
import AmenitiesSection from './components/sections/AmenitiesSection'
import LocationSection from './components/sections/LocationSection'
import ContactSection from './components/sections/ContactSection'
import FloatingWhatsapp from './components/common/FloatingWhatsapp'
import Footer from './components/layout/Footer'
import AttentionNudge from './components/common/AttentionNudge'
import Modal from './components/common/Modal'
import AnimatedBackground from './components/common/AnimatedBackground'

function App() {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [whatsAppMessage, setWhatsAppMessage] = useState(defaultWhatsAppMessage())
  const [thankYouMessage, setThankYouMessage] = useState(defaultWhatsAppMessage())
  const { visible: promoVisible, dismiss: dismissPromo } = usePromoBanner()
  const { isOpen: modalOpen, closeModal } = useModal(4000) // Show modal after 4 seconds
  const { isDarkMode, toggleTheme } = useTheme()

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
    setIsSubmitting(true)
    setSubmitError(null)
    
    const formData = new FormData(event.currentTarget)
    const name = (formData.get('name') as string) || 'Prospective Buyer'
    const phoneRaw = (formData.get('phone') as string) || PROJECT_CONFIG.contact.whatsapp
    const email = (formData.get('email') as string) || null

    const phone = phoneRaw.replace(/\s+/g, '')
    const emailLine = email ? `\nEmail: ${email}` : ''
    const message = `Hello ${PROJECT_CONFIG.partnerName},\nI just shared my details for ${PROJECT_CONFIG.projectName}.\nName: ${name}\nPhone: ${phone}${emailLine}`

    try {
      await submitLead({
        name,
        phone,
        email,
        message,
      })
      setSubmitError(null)
      setThankYouMessage(message)
      setWhatsAppMessage(message)
      setFormSubmitted(true)
      event.currentTarget.reset()
    } catch (error) {
      console.error('Lead submission failed', error)
      setSubmitError('Something went wrong. Please try again or contact us directly on WhatsApp.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <AnimatedBackground />
      <div className="page">
        <AttentionNudge generalWhatsAppLink={generalWhatsAppLink} />
        <Header
        generalWhatsAppLink={generalWhatsAppLink}
        promoVisible={promoVisible}
        onDismissPromo={dismissPromo}
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
      />

      <main className="container">
        <HighlightsSection />
        <AmenitiesSection />
        <LocationSection />
        <ContactSection
          formSubmitted={formSubmitted}
          isSubmitting={isSubmitting}
          submitError={submitError}
          onSubmit={handleFormSubmit}
          thankYouWhatsAppLink={thankYouWhatsAppLink}
          generalWhatsAppLink={generalWhatsAppLink}
          whatsappQrUrl={whatsappQrUrl}
          callbackQrUrl={callbackQrUrl}
        />
      </main>

      <Footer />

      <FloatingWhatsapp href={formSubmitted ? thankYouWhatsAppLink : generalWhatsAppLink} />
      
      <Modal 
        isOpen={modalOpen} 
        onClose={closeModal} 
        generalWhatsAppLink={generalWhatsAppLink} 
      />
      </div>
    </>
  )
}

export default App

