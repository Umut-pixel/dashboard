"use client"

import { useEffect, useRef } from 'react'

interface UnicornStudioHtmlProps {
  projectId: string
  className?: string
}

export function UnicornStudioHtml({ projectId, className = "" }: UnicornStudioHtmlProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    console.log('UnicornStudioHtml: Setting up for projectId:', projectId)

    // Check if script is already loaded
    const existingScript = document.querySelector('script[src*="unicornstudio.js"]')
    if (!existingScript) {
      // Load the script in head
      const script = document.createElement("script")
      script.src = "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.29/dist/unicornStudio.umd.js"
      script.async = true
      
      script.onload = () => {
        console.log('UnicornStudio script loaded in head')
        
        // Initialize after a short delay
        setTimeout(() => {
          try {
            if ((window as any).UnicornStudio && typeof (window as any).UnicornStudio.init === 'function') {
              console.log('Initializing UnicornStudio from head')
              ;(window as any).UnicornStudio.init()
            }
          } catch (error) {
            console.error('Error initializing UnicornStudio:', error)
          }
        }, 200)
      }
      
      document.head.appendChild(script)
    }

    // Set up the div element
    if (containerRef.current) {
      containerRef.current.setAttribute('data-us-project', projectId)
      console.log('UnicornStudio div set up with projectId:', projectId)
    }
  }, [projectId])

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 w-full h-full -z-10 ${className}`}
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

// Add UnicornStudio to window object
declare global {
  interface Window {
    UnicornStudio?: any
  }
}
