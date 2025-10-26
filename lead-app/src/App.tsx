import React, { type FormEventHandler, useMemo, useState } from 'react'
import './styles/main.scss'
import { PROJECT_CONFIG } from './config/project'
import { useFooterYear } from './hooks/useFooterYear'
import { usePromoBanner } from './hooks/usePromoBanner'
import { useModal } from './hooks/useModal'
import { defaultWhatsAppMessage, useWhatsAppLink } from './utils/whatsapp'
import Header from './components/layout/Header'
import HighlightsSection from './components/sections/HighlightsSection'
import AmenitiesSection from './components/sections/AmenitiesSection'
import LocationSection from './components/sections/LocationSection'
import ContactSection from './components/sections/ContactSection'
import FloatingWhatsapp from './components/common/FloatingWhatsapp'
import AttentionNudge from './components/common/AttentionNudge'
import Modal from './components/common/Modal'
import Footer from './components/layout/Footer'

function App() {
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [whatsAppMessage, setWhatsAppMessage] = useState(defaultWhatsAppMessage())
  const [thankYouMessage, setThankYouMessage] = useState(defaultWhatsAppMessage())
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const { visible: promoVisible, dismiss: dismissPromo } = usePromoBanner()
  const { isOpen: modalOpen, closeModal } = useModal(4000) // Show modal after 4 seconds

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
    const phone = (formData.get('phone') as string) || PROJECT_CONFIG.contact.whatsapp
    const email = (formData.get('email') as string) || ''
    const preference = (formData.get('preference') as string) || 'Morning'

    const contactNote = email ? `Email: ${email}` : 'Email: Not provided'
    const message = `Hello ${PROJECT_CONFIG.companyName},\nI am ${name} and would like a call back regarding ${PROJECT_CONFIG.projectName}.\nPhone: ${phone}\nPreferred time: ${preference}\n${contactNote}`

    try {
      // Try to send email via PHP backend using Gmail SMTP
      // Use absolute path to API endpoint
      const apiPath = '/api/send-callback-gmail-smtp.php'
      
      const response = await fetch(apiPath, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          phone,
          email,
          preference,
        }),
      })

      const result = await response.json()

      if (result.success) {
        // Email sent successfully - no error message
        setSubmitError(null)
      } else {
        // Email failed but continue normally
        setSubmitError(null) // Don't show error, just continue
      }
    } catch (error) {
      // API not available - continue silently
      setSubmitError(null)
    } finally {
      setIsSubmitting(false)
    }
    
    // Always show success UI and prepare WhatsApp message
    setThankYouMessage(message)
    setWhatsAppMessage(message)
    setFormSubmitted(true)
    event.currentTarget.reset()
  }

  return (
    <div className="page">
      <AttentionNudge generalWhatsAppLink={generalWhatsAppLink} />
      
      <Header
        generalWhatsAppLink={generalWhatsAppLink}
        promoVisible={promoVisible}
        onDismissPromo={dismissPromo}
      />

      <main className="container">
        <HighlightsSection />
        <AmenitiesSection />
        <LocationSection />
        <ContactSection
          formSubmitted={formSubmitted}
          onSubmit={handleFormSubmit}
          thankYouWhatsAppLink={thankYouWhatsAppLink}
          generalWhatsAppLink={generalWhatsAppLink}
          whatsappQrUrl={whatsappQrUrl}
          callbackQrUrl={callbackQrUrl}
          isSubmitting={isSubmitting}
          submitError={submitError}
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
  )
}

export default App

