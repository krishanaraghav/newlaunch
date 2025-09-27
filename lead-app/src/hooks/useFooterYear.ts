import { useEffect } from 'react'

export const useFooterYear = () => {
  useEffect(() => {
    const yearEl = document.getElementById('footer-year')
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear().toString()
    }
  }, [])
}

