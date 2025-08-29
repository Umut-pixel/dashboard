"use client"

import { useEffect, useRef } from 'react'

interface UnicornStudioSimpleProps {
  projectId: string
  className?: string
}

export function UnicornStudioSimple({ projectId, className = "" }: UnicornStudioSimpleProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    console.log('UnicornStudioSimple: Loading for projectId:', projectId)

    // Load Unicorn Studio script directly
    const script = document.createElement("script")
    script.src = "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.29/dist/unicornStudio.umd.js"
    script.async = true
    
    script.onload = () => {
      console.log('UnicornStudio script loaded successfully')
      
      // Wait a bit for the script to initialize
      setTimeout(() => {
        try {
          // Try to initialize UnicornStudio
          if (typeof window !== 'undefined' && (window as any).UnicornStudio) {
            console.log('Calling UnicornStudio.init()')
            ;(window as any).UnicornStudio.init()
            console.log('UnicornStudio initialized successfully')
          } else {
            console.log('UnicornStudio not found in window object')
          }
        } catch (error) {
          console.error('Error initializing UnicornStudio:', error)
        }
      }, 100)
    }
    
    script.onerror = () => {
      console.error('Failed to load UnicornStudio script')
    }
    
    document.head.appendChild(script)

    return () => {
      // Cleanup if needed
    }
  }, [projectId])

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 w-full h-full -z-10 ${className}`}
      data-us-project={projectId}
      style={{ 
        width: '100vw', 
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -10,
        background: 'transparent'
      }}
    />
  )
}


