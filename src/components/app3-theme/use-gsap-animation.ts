"use client"

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface AnimationSettings {
  enabled: boolean
  type: 'fadeIn' | 'slideIn' | 'bounce' | 'scale' | 'rotate' | 'custom'
  duration: number
  delay: number
  ease: string
  direction: 'normal' | 'reverse' | 'alternate'
  repeat: number
  customCode?: string
}

export function useGSAPAnimation(animation: AnimationSettings, trigger: 'onMount' | 'onScroll' | 'onClick' = 'onMount') {
  const elementRef = useRef<HTMLElement>(null)
  const animationRef = useRef<gsap.core.Timeline | null>(null)

  const createAnimation = () => {
    if (!elementRef.current || !animation.enabled) return

    // Clear any existing animation
    if (animationRef.current) {
      animationRef.current.kill()
    }

    const element = elementRef.current
    const timeline = gsap.timeline()

    // Set initial state based on animation type
    switch (animation.type) {
      case 'fadeIn':
        gsap.set(element, { opacity: 0 })
        break
      case 'slideIn':
        gsap.set(element, { x: -100, opacity: 0 })
        break
      case 'bounce':
        gsap.set(element, { y: -50, opacity: 0 })
        break
      case 'scale':
        gsap.set(element, { scale: 0, opacity: 0 })
        break
      case 'rotate':
        gsap.set(element, { rotation: 360, opacity: 0 })
        break
      case 'custom':
        // For custom animations, we'll evaluate the custom code
        if (animation.customCode) {
          try {
            // Create a safe evaluation context
            const safeEval = new Function('element', 'gsap', 'timeline', animation.customCode)
            safeEval(element, gsap, timeline)
            animationRef.current = timeline
            return
          } catch (error) {
            console.error('Custom animation error:', error)
            // Fallback to fadeIn
            gsap.set(element, { opacity: 0 })
          }
        }
        break
    }

    // Create the animation
    const animationConfig = {
      opacity: 1,
      duration: animation.duration,
      delay: animation.delay,
      ease: animation.ease,
      repeat: animation.repeat,
      yoyo: animation.direction === 'alternate'
    }

    switch (animation.type) {
      case 'fadeIn':
        timeline.to(element, { ...animationConfig })
        break
      case 'slideIn':
        timeline.to(element, { ...animationConfig, x: 0 })
        break
      case 'bounce':
        timeline.to(element, { ...animationConfig, y: 0 })
        break
      case 'scale':
        timeline.to(element, { ...animationConfig, scale: 1 })
        break
      case 'rotate':
        timeline.to(element, { ...animationConfig, rotation: 0 })
        break
    }

    animationRef.current = timeline
  }

  const playAnimation = () => {
    if (animationRef.current) {
      animationRef.current.restart()
    } else {
      createAnimation()
    }
  }

  const reverseAnimation = () => {
    if (animationRef.current) {
      animationRef.current.reverse()
    }
  }

  useEffect(() => {
    if (trigger === 'onMount') {
      createAnimation()
    }

    return () => {
      if (animationRef.current) {
        animationRef.current.kill()
      }
    }
  }, [animation, trigger])

  useEffect(() => {
    if (trigger === 'onScroll') {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              createAnimation()
              observer.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.1 }
      )

      if (elementRef.current) {
        observer.observe(elementRef.current)
      }

      return () => {
        if (elementRef.current) {
          observer.unobserve(elementRef.current)
        }
      }
    }
  }, [animation, trigger])

  return {
    ref: elementRef,
    playAnimation,
    reverseAnimation
  }
}
