"use client"

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface LoadingAnimationProps {
  isVisible?: boolean
  onComplete?: () => void
}

export function LoadingAnimation({ isVisible = true, onComplete }: LoadingAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const logoRef = useRef<HTMLImageElement>(null)
  const textRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isVisible) return

    const container = containerRef.current
    const logo = logoRef.current
    const text = textRef.current
    const progress = progressRef.current

    if (!container || !logo || !text || !progress) return

    // Reset initial state
    gsap.set([logo, text, progress], {
      opacity: 0,
      scale: 0.8,
      y: 20
    })

    // Create timeline
    const tl = gsap.timeline({
      onComplete: () => {
        // Fade out after completion
        gsap.to(container, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.inOut",
          onComplete: onComplete
        })
      }
    })

    // Logo animation
    tl.to(logo, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.8,
      ease: "back.out(1.7)"
    })

    // Text animation
    tl.to(text, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.4")

    // Progress bar animation
    tl.to(progress, {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.4,
      ease: "power2.out"
    }, "-=0.2")

    // Progress fill animation
    tl.to(progress.querySelector('.progress-fill'), {
      width: "100%",
      duration: 2,
      ease: "power2.inOut"
    }, "-=0.2")

    // Logo pulse animation during loading
    tl.to(logo, {
      scale: 1.05,
      duration: 0.3,
      ease: "power2.inOut",
      repeat: 5,
      yoyo: true
    }, "-=1.8")

    // Text fade animation
    tl.to(text, {
      opacity: 0.7,
      duration: 0.3,
      ease: "power2.inOut",
      repeat: 5,
      yoyo: true
    }, "-=1.8")

    // Final logo scale up
    tl.to(logo, {
      scale: 1.1,
      duration: 0.4,
      ease: "back.out(1.7)"
    }, "+=0.2")

    // Text final animation
    tl.to(text, {
      opacity: 1,
      scale: 1.05,
      duration: 0.4,
      ease: "back.out(1.7)"
    }, "-=0.4")

    return () => {
      tl.kill()
    }
  }, [isVisible, onComplete])

  if (!isVisible) return null

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
    >
      {/* Logo */}
      <div className="relative mb-8">
        <img
          ref={logoRef}
          src="/aygit-logo-beyaz.png"
          alt="AYGIT Logo"
          className="w-40 h-40 object-contain drop-shadow-2xl"
        />
        
        {/* Glow effect */}
        <div className="absolute inset-0 w-40 h-40 bg-white/20 blur-xl rounded-full -z-10" />
      </div>

      {/* Loading Text */}
      <div 
        ref={textRef}
        className="text-white/90 text-lg font-medium mb-6 tracking-wider"
      >
        YÜKLENİYOR...
      </div>

      {/* Progress Bar */}
      <div 
        ref={progressRef}
        className="w-64 h-1 bg-white/20 rounded-full overflow-hidden"
      >
        <div 
          className="progress-fill h-full bg-gradient-to-r from-white/60 to-white/90 rounded-full shadow-lg"
          style={{ width: "0%" }}
        />
      </div>

      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => {
          // Use deterministic values based on index to avoid hydration mismatch
          const left = (i * 5.5) % 100
          const top = (i * 7.3) % 100
          const delay = (i * 0.1) % 2
          const duration = 2 + (i * 0.1) % 2
          
          return (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/30 rounded-full animate-pulse"
              style={{
                left: `${left}%`,
                top: `${top}%`,
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`
              }}
            />
          )
        })}
      </div>
    </div>
  )
}
