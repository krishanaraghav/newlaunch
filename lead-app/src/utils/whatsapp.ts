import { useMemo } from 'react'
import { PROJECT_CONFIG } from '../config/project'

export const formatPhone = (value: string) => value.replace(/(\d{5})(\d{5})/, '$1 $2')

export const buildWhatsAppLink = (message: string) =>
  `https://wa.me/${PROJECT_CONFIG.contact.whatsapp}?text=${encodeURIComponent(message)}`

export const defaultWhatsAppMessage = () =>
  `Hello ${PROJECT_CONFIG.partnerName}, I am interested in ${PROJECT_CONFIG.projectName} at ${PROJECT_CONFIG.location}. Please share more details.`

export const useWhatsAppLink = (message: string) => useMemo(() => buildWhatsAppLink(message), [message])

