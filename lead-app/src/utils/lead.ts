export type LeadPayload = {
  name: string
  phone: string
  email?: string | null
  message?: string | null
}

export const submitLead = async (lead: LeadPayload) => {
  const endpoint = '/api/send-callback-gmail-smtp.php'
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: lead.name,
      phone: lead.phone,
      email: lead.email || '',
      preference: 'Morning',
    }),
  })

  if (!response.ok) {
    const errorText = await response.text().catch(() => null)
    throw new Error(errorText || 'Lead submission failed')
  }

  return response.json().catch(() => ({}))
}


