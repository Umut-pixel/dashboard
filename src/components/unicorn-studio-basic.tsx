"use client"

import { useEffect, useRef } from 'react'

interface UnicornStudioBasicProps {
  projectId: string
  className?: string
}

export function UnicornStudioBasic({ projectId, className = "" }: UnicornStudioBasicProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return

    console.log('UnicornStudioBasic: Setting up div for projectId:', projectId)

    // Set the data attribute
    containerRef.current.setAttribute('data-us-project', projectId)
    
    // Force re-initialization when component mounts
    const timer = setTimeout(() => {
      try {
        if ((window as any).UnicornStudio && typeof (window as any).UnicornStudio.init === 'function') {
          console.log('Re-initializing UnicornStudio from basic component')
          ;(window as any).UnicornStudio.init()
        }
      } catch (error) {
        console.error('Error in UnicornStudio initialization:', error)
      }
    }, 2000)

    return () => clearTimeout(timer)
  }, [projectId])

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 w-full h-full ${className}`}
      style={{ 
        width: '100vw', 
        height: '100vh',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 0,
        background: 'transparent',
        filter: 'blur(3px) brightness(0.8)',
        transform: 'scale(1.05)',
        transition: 'all 1s ease-in-out',
        animation: 'slowFloat 8s ease-in-out infinite'
      }}
    />
  )
}


