"use client"

import { useEffect, useRef, useState } from 'react'
import { FallbackBackground } from './fallback-background'

interface UnicornStudioBackgroundProps {
  projectId: string
  className?: string
}

export function UnicornStudioBackground({ projectId, className = "" }: UnicornStudioBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scriptLoaded, setScriptLoaded] = useState(false)
  const [scriptError, setScriptError] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return

    // Check if script is already loaded
    const existingScript = document.querySelector('script[src*="unicornstudio.js"]')
    if (existingScript) {
      setScriptLoaded(true)
      return
    }

    // Create and load the script
    const script = document.createElement("script")
    script.src = "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.29/dist/unicornStudio.umd.js"
    script.async = true
    
    script.onload = function() {
      console.log('UnicornStudio script loaded successfully')
      setScriptLoaded(true)
    }
    
    script.onerror = function() {
      console.error('Failed to load UnicornStudio script')
      setScriptError(true)
    }
    
    document.head.appendChild(script)

    // Timeout fallback
    const timeout = setTimeout(() => {
      if (!scriptLoaded) {
        console.log('UnicornStudio script loading timeout, using fallback')
        setScriptError(true)
      }
    }, 5000)

    return () => clearTimeout(timeout)
  }, [scriptLoaded])

  // If script failed to load, use fallback
  if (scriptError) {
    return <FallbackBackground className={className} />
  }

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 w-full h-full -z-10 ${className}`}
      data-us-project={projectId}
      style={{ width: '100vw', height: '100vh' }}
    />
  )
}


