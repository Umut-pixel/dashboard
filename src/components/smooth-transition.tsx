"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { gsap } from 'gsap'

interface SmoothTransitionProps {
  children: React.ReactNode
}

export function SmoothTransition({ children }: SmoothTransitionProps) {
  const [isTransitioning, setIsTransitioning] = useState(false)
  const router = useRouter()

  useEffect(() => {
    // Override router.push to add smooth transitions
    const originalPush = router.push
    router.push = (href: string, options?: any) => {
      setIsTransitioning(true)
      
      // Fade out animation
      gsap.to('body', {
        opacity: 0,
        duration: 0.3,
        ease: "power2.inOut",
        onComplete: () => {
          // Navigate
          originalPush.call(router, href, options)
          
          // Fade in after navigation
          setTimeout(() => {
            gsap.to('body', {
              opacity: 1,
              duration: 0.3,
              ease: "power2.inOut",
              onComplete: () => {
                setIsTransitioning(false)
              }
            })
          }, 100)
        }
      })
    }

    return () => {
      router.push = originalPush
    }
  }, [router])

  return (
    <div className={`transition-opacity duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
      {children}
    </div>
  )
}
