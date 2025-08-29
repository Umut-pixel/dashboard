"use client"

import { useEffect, useRef } from 'react'

interface UnicornStudioEmbeddedProps {
  projectId: string
  className?: string
}

export function UnicornStudioEmbedded({ projectId, className = "" }: UnicornStudioEmbeddedProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return

    // Check if already initialized
    if (window.UnicornStudio?.isInitialized) return

    // Initialize UnicornStudio exactly as provided
    if (!window.UnicornStudio) {
      window.UnicornStudio = { isInitialized: false }
    }

    const script = document.createElement("script")
    script.src = "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.29/dist/unicornStudio.umd.js"
    script.onload = function() {
      if (!window.UnicornStudio.isInitialized) {
        try {
          // Try to initialize using the global UnicornStudio object
          if (typeof (window as any).UnicornStudio !== 'undefined' && (window as any).UnicornStudio.init) {
            (window as any).UnicornStudio.init()
            window.UnicornStudio.isInitialized = true
            console.log('UnicornStudio initialized successfully')
          } else {
            console.log('UnicornStudio loaded but init function not found')
          }
        } catch (error) {
          console.error('Error initializing UnicornStudio:', error)
        }
      }
    }
    script.onerror = function() {
      console.error('Failed to load UnicornStudio script')
    }
    
    document.head.appendChild(script)
  }, [])

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 w-full h-full -z-10 ${className}`}
      data-us-project={projectId}
      style={{ width: '100vw', height: '100vh' }}
    />
  )
}


