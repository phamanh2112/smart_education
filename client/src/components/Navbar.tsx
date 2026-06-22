'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'bg-[#0F0C29]/90 backdrop-blur-xl shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center font-bold text-lg group-hover:scale-110 transition-transform">
            E
          </div>
          <span className="text-xl font-bold">
            Edu<span className="text-gradient">Smart</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {['Home', 'Courses', 'Features', 'About'].map(item => (
            <Link
              key={item}
              href={`#${item.toLowerCase()}`}
              className="text-gray-300 hover:text-white transition-colors relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-primary transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
          <button className="px-6 py-2.5 rounded-full bg-gradient-primary text-white font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105">
            Get Started
          </button>
        </div>

        <button className="md:hidden text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden glass mx-4 mb-4 rounded-2xl p-6 animate-fade-in">
          <div className="flex flex-col gap-4">
            {['Home', 'Courses', 'Features', 'About'].map(item => (
              <Link key={item} href={`#${item.toLowerCase()}`} className="text-gray-300 hover:text-white transition-colors" onClick={() => setMenuOpen(false)}>
                {item}
              </Link>
            ))}
            <button className="px-6 py-2.5 rounded-full bg-gradient-primary text-white font-semibold">
              Get Started
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
