import { useState, useEffect, useCallback } from 'react'

interface NavbarViewModel {
  scrolled: boolean
  menuOpen: boolean
  setMenuOpen: (open: boolean) => void
  navLinks: Array<{ label: string; href: string }>
}

export function useNavbarViewModel(): NavbarViewModel {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Home', href: '#home' },
    { label: 'Courses', href: '#courses' },
    { label: 'Features', href: '#features' },
    { label: 'About', href: '#about' },
  ]

  return { scrolled, menuOpen, setMenuOpen, navLinks }
}
