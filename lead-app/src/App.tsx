import type { FormEventHandler } from 'react'
import { useMemo, useState } from 'react'
import './styles/main.scss'
import { PROJECT_CONFIG } from './config/project'
import { useFooterYear } from './hooks/useFooterYear'
import { usePromoBanner } from './hooks/usePromoBanner'
import { defaultWhatsAppMessage, useWhatsAppLink } from './utils/whatsapp'
import Header from './components/layout/Header'
import HighlightsSection from './components/sections/HighlightsSection'
import AmenitiesSection from './components/sections/AmenitiesSection'
import LocationSection from './components/sections/LocationSection'
import ContactSection from './components/sections/ContactSection'
import FloatingWhatsapp from './components/common/FloatingWhatsapp'
import Footer from './components/layout/Footer'

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

  const handleFormSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const name = (formData.get('name') as string) || 'Prospective Buyer'
    const phone = (formData.get('phone') as string) || PROJECT_CONFIG.contact.whatsapp
    const email = (formData.get('email') as string) || null
    const preference = (formData.get('preference') as string) || 'Morning'

    const contactNote = email ? `Email: ${email}` : 'Email: Not provided'
    const message = `Hello ${PROJECT_CONFIG.companyName},\nI am ${name} and would like a call back regarding ${PROJECT_CONFIG.projectName}.\nPhone: ${phone}\nPreferred time: ${preference}\n${contactNote}`

    setThankYouMessage(message)
    setWhatsAppMessage(message)
    setFormSubmitted(true)
    event.currentTarget.reset()
  }

  return (
    <div className="page">
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
        />
      </main>

      <Footer />

      <FloatingWhatsapp href={formSubmitted ? thankYouWhatsAppLink : generalWhatsAppLink} />
    </div>
  )
}

export default App

