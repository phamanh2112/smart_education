import { useEffect, useRef, useCallback } from 'react'

interface HeroViewModel {
  containerRef: React.RefObject<HTMLDivElement | null>
}

export function useHeroViewModel(): HeroViewModel {
  const containerRef = useRef<HTMLDivElement | null>(null)

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const el = containerRef.current
    if (!el) return
    const x = (e.clientX / window.innerWidth - 0.5) * 20
    const y = (e.clientY / window.innerHeight - 0.5) * 20
    el.style.transform = `translate(${x}px, ${y}px)`
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [handleMouseMove])

  return { containerRef }
}
