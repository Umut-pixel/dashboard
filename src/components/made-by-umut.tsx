"use client"

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface MadeByUmutProps {
  className?: string
}

export function MadeByUmut({ className = "" }: MadeByUmutProps) {
  const signatureRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (signatureRef.current) {
      // Create a very subtle animation
      gsap.set(signatureRef.current, {
        opacity: 0.03, // Very low opacity
        scale: 0.8
      })

      // Subtle floating animation
      gsap.to(signatureRef.current, {
        y: -10,
        duration: 8,
        ease: "power1.inOut",
        yoyo: true,
        repeat: -1
      })
    }
  }, [])

  return (
    <div 
      ref={signatureRef}
      className={`fixed bottom-4 right-4 pointer-events-none select-none ${className}`}
      style={{
        fontFamily: 'monospace',
        fontSize: '10px',
        color: 'rgba(255, 255, 255, 0.03)',
        textShadow: '0 0 1px rgba(255, 255, 255, 0.1)',
        transform: 'rotate(-5deg)',
        zIndex: 1000
      }}
    >
      made by umut
    </div>
  )
}
