"use client"

import { useEffect, useState } from 'react'
import { gsap } from 'gsap'

interface AuthLoadingProps {
  isVisible: boolean
}

export function AuthLoading({ isVisible }: AuthLoadingProps) {
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (isVisible && !isAnimating) {
      setIsAnimating(true)
      gsap.fromTo('.loading-dot', 
        { scale: 0, opacity: 0 },
        { 
          scale: 1, 
          opacity: 1, 
          duration: 0.3, 
          stagger: 0.1,
          ease: "back.out(1.7)",
          repeat: -1,
          yoyo: true
        }
      )
    } else if (!isVisible && isAnimating) {
      setIsAnimating(false)
      gsap.killTweensOf('.loading-dot')
    }
  }, [isVisible, isAnimating])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="flex space-x-2">
        <div className="loading-dot w-3 h-3 bg-blue-500 rounded-full"></div>
        <div className="loading-dot w-3 h-3 bg-blue-500 rounded-full"></div>
        <div className="loading-dot w-3 h-3 bg-blue-500 rounded-full"></div>
      </div>
    </div>
  )
}
