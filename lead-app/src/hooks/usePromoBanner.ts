import { useEffect, useState } from 'react'

export const usePromoBanner = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setVisible(true), 400)
    return () => window.clearTimeout(timer)
  }, [])

  return {
    visible,
    dismiss: () => setVisible(false),
  }
}

