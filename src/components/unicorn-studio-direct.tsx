"use client"

import { useEffect, useRef } from 'react'

interface UnicornStudioDirectProps {
  projectId: string
  className?: string
}

export function UnicornStudioDirect({ projectId, className = "" }: UnicornStudioDirectProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return

    // Check if already initialized
    if ((window as any).UnicornStudio?.isInitialized) return

    // Initialize exactly as provided in your code
    if (!(window as any).UnicornStudio) {
      (window as any).UnicornStudio = { isInitialized: false }
      
      const script = document.createElement("script")
      script.src = "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.29/dist/unicornStudio.umd.js"
      script.onload = function() {
        if (!(window as any).UnicornStudio.isInitialized) {
          try {
            // Use the global UnicornStudio object that should be available after script load
            if (typeof (window as any).UnicornStudio !== 'undefined' && (window as any).UnicornStudio.init) {
              (window as any).UnicornStudio.init()
              (window as any).UnicornStudio.isInitialized = true
              console.log('UnicornStudio initialized successfully')
            } else {
              // Try alternative initialization
              const globalUnicornStudio = (window as any).UnicornStudio
              if (globalUnicornStudio && globalUnicornStudio.init) {
                globalUnicornStudio.init()
                (window as any).UnicornStudio.isInitialized = true
                console.log('UnicornStudio initialized via global object')
              } else {
                console.log('UnicornStudio loaded but init function not available')
              }
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
    }
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


