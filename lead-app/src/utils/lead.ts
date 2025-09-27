import { PROJECT_CONFIG } from '../config/project'

export type LeadPayload = {
  name: string
  phone: string
  email?: string | null
  message?: string | null
}

const buildFormSubmitBody = ({ name, phone, email, message }: LeadPayload) => {
  const payload: Record<string, string> = {
    name,
    phone,
    email: email?.trim() || 'Not provided',
    message: message?.trim() || 'Not provided',
    project: PROJECT_CONFIG.projectName,
    location: PROJECT_CONFIG.location,
    _subject: `New enquiry via ${PROJECT_CONFIG.projectName}`,
    _captcha: 'false',
    _template: 'table',
    _autoresponse: `Thank you for contacting ${PROJECT_CONFIG.companyName}. Our team will connect with you shortly.`,
  }

  if (PROJECT_CONFIG.contact.ccEmails?.length) {
    payload._cc = PROJECT_CONFIG.contact.ccEmails.join(',')
  }

  if (typeof window !== 'undefined') {
    payload.source = window.location.href
  }

  return payload
}

export const submitLead = async (lead: LeadPayload) => {
  const endpoint = `https://formsubmit.co/ajax/${PROJECT_CONFIG.contact.email}`
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(buildFormSubmitBody(lead)),
  })

  if (!response.ok) {
    const errorText = await response.text().catch(() => null)
    throw new Error(errorText || 'Lead submission failed')
  }

  return response.json().catch(() => ({}))
}


