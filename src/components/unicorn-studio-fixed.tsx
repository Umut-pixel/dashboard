"use client"

import { useEffect, useRef } from 'react'

interface UnicornStudioFixedProps {
  projectId: string
  className?: string
}

export function UnicornStudioFixed({ projectId, className = "" }: UnicornStudioFixedProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined' || !containerRef.current) return

    console.log('UnicornStudio component mounted, projectId:', projectId)

    // Check if already initialized
    if (window.UnicornStudio?.isInitialized) {
      console.log('UnicornStudio already initialized')
      return
    }

    // Create the script element with the exact code you provided
    const script = document.createElement("script")
    script.type = "text/javascript"
    script.innerHTML = `
      console.log('UnicornStudio script starting...');
      !function(){
        if(!window.UnicornStudio){
          console.log('Initializing UnicornStudio...');
          window.UnicornStudio={isInitialized:!1};
          var i=document.createElement("script");
          i.src="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.29/dist/unicornStudio.umd.js",
          i.onload=function(){
            console.log('UnicornStudio script loaded, calling init...');
            window.UnicornStudio.isInitialized||(UnicornStudio.init(),window.UnicornStudio.isInitialized=!0)
          },
          i.onerror=function(){
            console.error('Failed to load UnicornStudio script');
          },
          (document.head || document.body).appendChild(i)
        }
      }();
    `
    
    document.head.appendChild(script)
    console.log('UnicornStudio initialization script added to head')

    // Also add the div element as provided
    const unicornDiv = document.createElement("div")
    unicornDiv.setAttribute("data-us-project", projectId)
    unicornDiv.style.width = "100vw"
    unicornDiv.style.height = "100vh"
    unicornDiv.style.position = "fixed"
    unicornDiv.style.top = "0"
    unicornDiv.style.left = "0"
    unicornDiv.style.zIndex = "-10"
    unicornDiv.style.background = "transparent"
    
    document.body.appendChild(unicornDiv)
    console.log('UnicornStudio div added to body with projectId:', projectId)

    // Cleanup function
    return () => {
      if (unicornDiv.parentNode) {
        unicornDiv.parentNode.removeChild(unicornDiv)
      }
    }
  }, [projectId])

  return (
    <div 
      ref={containerRef}
      className={`fixed inset-0 w-full h-full -z-10 ${className}`}
      data-us-project={projectId}
      style={{ width: '100vw', height: '100vh' }}
    />
  )
}


