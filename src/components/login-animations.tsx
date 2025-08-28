"use client"

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface LoginAnimationsProps {
  children: React.ReactNode
}

export function LoginAnimations({ children }: LoginAnimationsProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      // Initial state - hide everything
      gsap.set(containerRef.current.children, {
        opacity: 0,
        y: 50,
        scale: 0.9
      })

      // Stagger animation for children
      gsap.to(containerRef.current.children, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        delay: 0.5
      })

      // Add floating animation to the card
      const card = containerRef.current.querySelector('[data-card]')
      if (card) {
        gsap.to(card, {
          y: -10,
          duration: 4,
          ease: "power1.inOut",
          yoyo: true,
          repeat: -1
        })
      }
    }
  }, [])

  return (
    <div ref={containerRef} className="w-full">
      {children}
    </div>
  )
}

// Add floating particles effect
export function FloatingParticles() {
  const particlesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (particlesRef.current) {
      // Create floating particles
      const particles = Array.from({ length: 20 }, (_, i) => {
        const particle = document.createElement('div')
        particle.className = 'absolute w-1 h-1 bg-white/10 rounded-full'
        particle.style.left = `${Math.random() * 100}%`
        particle.style.top = `${Math.random() * 100}%`
        particle.style.animationDelay = `${Math.random() * 5}s`
        particle.style.animationDuration = `${5 + Math.random() * 10}s`
        return particle
      })

      particles.forEach(particle => {
        particlesRef.current?.appendChild(particle)
      })

      // Animate particles
      particles.forEach((particle, i) => {
        gsap.to(particle, {
          y: -100,
          x: Math.random() * 50 - 25,
          opacity: 0,
          duration: 5 + Math.random() * 5,
          ease: "power1.out",
          repeat: -1,
          delay: Math.random() * 5
        })
      })
    }
  }, [])

  return (
    <div 
      ref={particlesRef}
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
    />
  )
}
