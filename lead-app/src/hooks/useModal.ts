import { useEffect, useState } from 'react'

export const useModal = (delay: number = 5000) => {
  const [isOpen, setIsOpen] = useState(false)
  const [hasShown, setHasShown] = useState(false)

  useEffect(() => {
    if (hasShown) return

    const timer = setTimeout(() => {
      setIsOpen(true)
      setHasShown(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay, hasShown])

  const closeModal = () => setIsOpen(false)

  return {
    isOpen,
    closeModal,
  }
}

