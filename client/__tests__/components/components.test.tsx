import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Navbar from '@/presentation/views/components/Navbar'
import Hero from '@/presentation/views/components/Hero'
import CTA from '@/presentation/views/components/CTA'
import Footer from '@/presentation/views/components/Footer'

const mockNavLinks = [{ label: 'Home', href: '#home' }]

jest.mock('next/link', () => {
  const r = require('react')
  return function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
    return r.createElement('a', { href }, children)
  }
})

jest.mock('@/presentation/viewmodels/useNavbarViewModel', () => ({
  useNavbarViewModel: () => ({
    scrolled: false,
    menuOpen: false,
    setMenuOpen: jest.fn(),
    navLinks: mockNavLinks,
  }),
}))

jest.mock('@/presentation/viewmodels/useHeroViewModel', () => ({
  useHeroViewModel: () => ({ containerRef: { current: null } }),
}))

describe('Navbar', () => {
  it('renders brand text', () => {
    render(<Navbar />)
expect(screen.getByText(/Edu/)).toBeInTheDocument()
expect(screen.getByText(/Smart/)).toBeInTheDocument()
  })

  it('renders nav links and CTA', () => {
    render(<Navbar />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Get Started')).toBeInTheDocument()
  })
})

describe('Hero', () => {
  it('renders heading text', () => {
    render(<Hero />)
    expect(screen.getByRole('heading')).toBeInTheDocument()
    expect(screen.getByText(/Start Learning Now/)).toBeInTheDocument()
    expect(screen.getByText(/Watch Demo/)).toBeInTheDocument()
  })
})

describe('CTA', () => {
  it('renders action buttons', () => {
    render(<CTA />)
    expect(screen.getByText('Start Free Trial')).toBeInTheDocument()
    expect(screen.getByText('Schedule Demo')).toBeInTheDocument()
  })
})

describe('Footer', () => {
  it('renders link sections', () => {
    render(<Footer />)
    expect(screen.getByText('Platform')).toBeInTheDocument()
    expect(screen.getByText('Company')).toBeInTheDocument()
    expect(screen.getByText('Support')).toBeInTheDocument()
  })
})
