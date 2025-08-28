"use client"

import { SessionProvider } from "next-auth/react"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeProvider as SaaSThemeProvider } from "@/contexts/theme-context"
import { PerformanceMonitor } from "@/components/performance-monitor"

interface ProvidersProps {
  children: React.ReactNode
}

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <SaaSThemeProvider>
          {children}
          <PerformanceMonitor />
        </SaaSThemeProvider>
      </ThemeProvider>
    </SessionProvider>
  )
}
