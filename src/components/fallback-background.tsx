"use client"

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface FallbackBackgroundProps {
  className?: string
}

export function FallbackBackground({ className = "" }: FallbackBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Create animated background elements
    const elements = Array.from({ length: 50 }, (_, _i) => {
      const element = document.createElement('div')
      element.className = 'absolute rounded-full opacity-20'
      element.style.width = `${Math.random() * 4 + 2}px`
      element.style.height = element.style.width
      element.style.left = `${Math.random() * 100}%`
      element.style.top = `${Math.random() * 100}%`
      element.style.background = `hsl(${Math.random() * 360}, 70%, 60%)`
      containerRef.current?.appendChild(element)
      return element
    })

    // Animate elements
    elements.forEach((element, _i) => {
      gsap.to(element, {
        x: Math.random() * 200 - 100,
        y: Math.random() * 200 - 100,
        opacity: Math.random() * 0.3 + 0.1,
        duration: Math.random() * 10 + 10,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
        delay: Math.random() * 5
      })
    })

    // Cleanup
    return () => {
      elements.forEach(element => element.remove())
    }
  }, [])

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 w-full h-full -z-10 overflow-hidden ${className}`}
      style={{ 
        background: 'linear-gradient(135deg, #000000 0%, #1a1a2e 50%, #16213e 100%)',
        width: '100vw', 
        height: '100vh' 
      }}
    />
  )
}
