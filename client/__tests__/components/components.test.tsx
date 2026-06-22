import { render, screen } from '@testing-library/react'

// Mock next/link
jest.mock('next/link', () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  )
})

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: (props: Record<string, unknown>) => <img {...props} />,
}))

// Mock ViewModels
jest.mock('@/presentation/viewmodels/useNavbarViewModel', () => ({
  useNavbarViewModel: () => ({
    scrolled: false,
    menuOpen: false,
    setMenuOpen: jest.fn(),
    navLinks: [{ label: 'Home', href: '#home' }],
  }),
}))

jest.mock('@/presentation/viewmodels/useHeroViewModel', () => ({
  useHeroViewModel: () => ({ containerRef: { current: null } }),
}))

jest.mock('@/presentation/viewmodels/useSliderViewModel', () => ({
  useSliderViewModel: () => ({
    slides: [{ image: 'test.jpg', title: 'Test Course', desc: 'Description', tag: 'AI' }],
    currentIndex: 0,
    isLoading: false,
    error: null,
    goNext: jest.fn(),
    goPrev: jest.fn(),
    goTo: jest.fn(),
  }),
}))

jest.mock('@/presentation/viewmodels/useFeaturesViewModel', () => ({
  useFeaturesViewModel: () => ({
    features: [{ id: '1', icon: '🚀', title: 'Feature 1', desc: 'Desc', gradient: 'from-a to-b' }],
    isLoading: false,
    error: null,
  }),
}))

jest.mock('@/presentation/viewmodels/useStatsViewModel', () => ({
  useStatsViewModel: () => ({
    stats: [{ id: '1', value: '10K+', label: 'Students', icon: '🎓' }],
    isLoading: false,
    error: null,
  }),
}))

jest.mock('@/presentation/viewmodels/useTestimonialsViewModel', () => ({
  useTestimonialsViewModel: () => ({
    testimonials: [{ id: '1', name: 'Jane', role: 'Teacher', avatar: 'a.jpg', text: 'Great!', rating: 5 }],
    isLoading: false,
    error: null,
  }),
}))

describe('Components', () => {
  it('renders Navbar with links', () => {
    const Navbar = require('@/presentation/views/components/Navbar').default
    render(<Navbar />)
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('EduSmart')).toBeInTheDocument()
  })

  it('renders Hero section', () => {
    const Hero = require('@/presentation/views/components/Hero').default
    render(<Hero />)
    expect(screen.getByText('Education')).toBeInTheDocument()
    expect(screen.getByText('Smart')).toBeInTheDocument()
    expect(screen.getByText('Start Learning Now')).toBeInTheDocument()
  })

  it('renders Slider with course data', () => {
    const Slider = require('@/presentation/views/components/Slider').default
    render(<Slider />)
    expect(screen.getByText('Test Course')).toBeInTheDocument()
    expect(screen.getByText('AI')).toBeInTheDocument()
  })

  it('renders Features with feature data', () => {
    const Features = require('@/presentation/views/components/Features').default
    render(<Features />)
    expect(screen.getByText('Feature 1')).toBeInTheDocument()
  })

  it('renders Stats with stat data', () => {
    const Stats = require('@/presentation/views/components/Stats').default
    render(<Stats />)
    expect(screen.getByText('10K+')).toBeInTheDocument()
  })

  it('renders Testimonials', () => {
    const Testimonials = require('@/presentation/views/components/Testimonials').default
    render(<Testimonials />)
    expect(screen.getByText('Jane')).toBeInTheDocument()
    expect(screen.getByText('Great!')).toBeInTheDocument()
  })

  it('renders CTA section', () => {
    const CTA = require('@/presentation/views/components/CTA').default
    render(<CTA />)
    expect(screen.getByText('Start Free Trial')).toBeInTheDocument()
    expect(screen.getByText('Schedule Demo')).toBeInTheDocument()
  })

  it('renders Footer with links', () => {
    const Footer = require('@/presentation/views/components/Footer').default
    render(<Footer />)
    expect(screen.getByText('Platform')).toBeInTheDocument()
    expect(screen.getByText('Company')).toBeInTheDocument()
    expect(screen.getByText('Support')).toBeInTheDocument()
  })
})
