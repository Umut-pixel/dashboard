"use client"

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useTheme } from 'next-themes'

interface CustomCursorProps {
  isVisible?: boolean
}

export function CustomCursor({ isVisible = true }: CustomCursorProps) {
  const { theme, resolvedTheme } = useTheme()
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const cursorRingRef = useRef<HTMLDivElement>(null)
  
  // Use resolvedTheme for more reliable theme detection
  const currentTheme = resolvedTheme || theme || 'dark'

  // Effect to handle theme changes
  useEffect(() => {
    const cursorRing = cursorRingRef.current
    const cursorDot = cursorDotRef.current
    
    if (!cursorRing || !cursorDot) return
    
    // Update cursor colors based on current theme
    if (currentTheme === 'light') {
      cursorRing.className = 'absolute w-12 h-12 rounded-full border-4 border-black bg-black/10 shadow-xl'
      cursorDot.className = 'absolute w-3 h-3 rounded-full bg-black shadow-lg'
    } else {
      cursorRing.className = 'absolute w-12 h-12 rounded-full border-4 border-white/60'
      cursorDot.className = 'absolute w-3 h-3 rounded-full bg-white shadow-md'
    }
  }, [currentTheme])

  useEffect(() => {
    if (!isVisible) return

    const cursor = cursorRef.current
    const cursorDot = cursorDotRef.current
    const cursorRing = cursorRingRef.current

    if (!cursor || !cursorDot || !cursorRing) return

    let mouseX = 0
    let mouseY = 0
    let cursorX = 0
    let cursorY = 0
    let cursorDotX = 0
    let cursorDotY = 0

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    // Cursor animation loop
    const animateCursor = () => {
      // Smooth cursor ring animation
      cursorX += (mouseX - cursorX) * 0.1
      cursorY += (mouseY - cursorY) * 0.1
      
      // Faster cursor dot animation
      cursorDotX += (mouseX - cursorDotX) * 0.3
      cursorDotY += (mouseY - cursorDotY) * 0.3

      gsap.set(cursorRing, {
        x: cursorX - 24,
        y: cursorY - 24,
      })

      gsap.set(cursorDot, {
        x: cursorDotX - 6,
        y: cursorDotY - 6,
      })

      requestAnimationFrame(animateCursor)
    }

    // Hover effects
    const handleMouseEnter = () => {
      gsap.to(cursorRing, {
        scale: 1.2,
        duration: 0.3,
        ease: "power2.out"
      })
      gsap.to(cursorDot, {
        scale: 0.8,
        duration: 0.3,
        ease: "power2.out"
      })
    }

    const handleMouseLeave = () => {
      gsap.to(cursorRing, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      })
      gsap.to(cursorDot, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      })
    }

    // Click animation
    const handleMouseDown = () => {
      gsap.to(cursorRing, {
        scale: 0.8,
        duration: 0.1,
        ease: "power2.out"
      })
      gsap.to(cursorDot, {
        scale: 1.5,
        duration: 0.1,
        ease: "power2.out"
      })
    }

    const handleMouseUp = () => {
      gsap.to(cursorRing, {
        scale: 1.2,
        duration: 0.1,
        ease: "power2.out"
      })
      gsap.to(cursorDot, {
        scale: 0.8,
        duration: 0.1,
        ease: "power2.out"
      })
    }

    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('mouseup', handleMouseUp)

    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('button, a, [role="button"], .clickable, input, textarea, [contenteditable="true"], .editable, [draggable="true"], .draggable')
    
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', handleMouseEnter)
      element.addEventListener('mouseleave', handleMouseLeave)
    })

    // Start animation
    animateCursor()

    // Initial cursor position
    gsap.set([cursorRing, cursorDot], {
      opacity: 0
    })

    gsap.to([cursorRing, cursorDot], {
      opacity: 1,
      duration: 0.5,
      ease: "power2.out"
    })

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('mouseup', handleMouseUp)
      
      interactiveElements.forEach(element => {
        element.removeEventListener('mouseenter', handleMouseEnter)
        element.removeEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [isVisible])

  if (!isVisible) return null

  return (
    <div ref={cursorRef} className="fixed inset-0 pointer-events-none z-[9999]">
      {/* Cursor Ring */}
      <div
        ref={cursorRingRef}
        className={`absolute w-12 h-12 rounded-full border-4 ${
          currentTheme === 'light' ? 'border-black bg-black/10 shadow-xl' : 'border-white/60'
        }`}
        style={{
          transform: 'translate(-50%, -50%)',
        }}
      />
      
      {/* Cursor Dot */}
      <div
        ref={cursorDotRef}
        className={`absolute w-3 h-3 rounded-full ${
          currentTheme === 'light' ? 'bg-black shadow-lg' : 'bg-white shadow-md'
        }`}
        style={{
          transform: 'translate(-50%, -50%)',
        }}
      />
    </div>
  )
}
