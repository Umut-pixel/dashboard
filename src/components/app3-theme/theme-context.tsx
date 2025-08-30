"use client"

import { createContext, useContext, useState, useEffect, ReactNode, useMemo, useCallback } from 'react'

interface CSSStyles {
  color?: string
  backgroundColor?: string
  fontSize?: string
  fontWeight?: string
  fontFamily?: string
  padding?: string
  margin?: string
  borderRadius?: string
  border?: string
  boxShadow?: string
  textAlign?: string
  lineHeight?: string
  letterSpacing?: string
  textTransform?: string
  opacity?: string
  transform?: string
  transition?: string
}

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

interface ComponentStyles {
  hero: CSSStyles
  services: CSSStyles
  contact: CSSStyles
  footer: CSSStyles
  navigation: CSSStyles
  buttons: CSSStyles
  cards: CSSStyles
  text: CSSStyles
}

interface ComponentAnimations {
  hero: AnimationSettings
  services: AnimationSettings
  contact: AnimationSettings
  footer: AnimationSettings
  navigation: AnimationSettings
  buttons: AnimationSettings
  cards: AnimationSettings
}

interface ThemeData {
  hero: {
    title: string
    subtitle: string
    description: string
    button1Text: string
    button2Text: string
    backgroundImage: string
  }
  services: {
    title: string
    subtitle: string
    items: Array<{
      title: string
      description: string
      features: string[]
    }>
  }
  contact: {
    title: string
    subtitle: string
    email: string
    phone: string
    address: string
  }
  footer: {
    logo: string
    description: string
    email: string
    phone: string
    address: string
  }
  styles: ComponentStyles
  animations: ComponentAnimations
}

interface ThemeContextType {
  themeData: ThemeData
  updateThemeData: (path: string, value: string | number | boolean | string[]) => void
  saveThemeData: () => void
  loadThemeData: () => void
  resetThemeData: () => void
}

const defaultAnimationSettings: AnimationSettings = {
  enabled: false,
  type: 'fadeIn',
  duration: 1,
  delay: 0,
  ease: 'power2.out',
  direction: 'normal',
  repeat: 0,
  customCode: ''
}

const defaultCSSStyles: CSSStyles = {
  color: '',
  backgroundColor: '',
  fontSize: '',
  fontWeight: '',
  fontFamily: '',
  padding: '',
  margin: '',
  borderRadius: '',
  border: '',
  boxShadow: '',
  textAlign: '',
  lineHeight: '',
  letterSpacing: '',
  textTransform: '',
  opacity: '',
  transform: '',
  transition: ''
}

const defaultThemeData: ThemeData = {
  hero: {
    title: "Geleceği Şekillendiren Teknoloji",
    subtitle: "Yenilikçi Teknoloji Çözümleri",
    description: "Aygıt olarak, yenilikçi çözümlerle işinizi büyütmenize yardımcı oluyoruz. Modern teknolojiler ve uzman ekibimizle yanınızdayız.",
    button1Text: "Hizmetlerimizi Keşfedin",
    button2Text: "Bizimle İletişime Geçin",
    backgroundImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80"
  },
  services: {
    title: "Hizmetlerimiz",
    subtitle: "Modern teknolojiler ve uzman ekibimizle işinizi dijital dünyada büyütmenize yardımcı oluyoruz.",
    items: [
      {
        title: "Web Geliştirme",
        description: "Modern ve responsive web siteleri geliştiriyoruz. React, Next.js ve diğer güncel teknolojileri kullanarak performanslı çözümler sunuyoruz.",
        features: ["React & Next.js", "TypeScript", "Responsive Design", "SEO Optimizasyonu"]
      },
      {
        title: "UI/UX Tasarım",
        description: "Kullanıcı deneyimini ön planda tutan modern tasarımlar oluşturuyoruz. Figma ve Adobe Creative Suite ile profesyonel çözümler.",
        features: ["Figma Tasarım", "Prototyping", "User Research", "Design Systems"]
      },
      {
        title: "Mobil Uygulama",
        description: "iOS ve Android için native ve cross-platform mobil uygulamalar geliştiriyoruz. React Native ve Flutter teknolojilerini kullanıyoruz.",
        features: ["React Native", "Flutter", "Native iOS/Android", "App Store Optimization"]
      },
      {
        title: "Performans Optimizasyonu",
        description: "Web sitelerinizi ve uygulamalarınızı hızlandırıyoruz. Core Web Vitals ve diğer performans metriklerini iyileştiriyoruz.",
        features: ["Core Web Vitals", "Lighthouse Score", "CDN Optimizasyonu", "Caching"]
      },
      {
        title: "Güvenlik",
        description: "Web uygulamalarınızı güvenli hale getiriyoruz. SSL sertifikaları, güvenlik testleri ve güvenlik açıklarını kapatıyoruz.",
        features: ["SSL Sertifikaları", "Güvenlik Testleri", "Vulnerability Assessment", "Security Headers"]
      },
      {
        title: "Dijital Pazarlama",
        description: "SEO, SEM ve sosyal medya pazarlaması ile online varlığınızı güçlendiriyoruz. Veri odaklı stratejiler geliştiriyoruz.",
        features: ["SEO Optimizasyonu", "Google Ads", "Social Media Marketing", "Analytics"]
      }
    ]
  },
  contact: {
    title: "İletişime Geçin",
    subtitle: "Projeleriniz hakkında konuşmak için bizimle iletişime geçin. Uzman ekibimiz size en uygun çözümleri sunacaktır.",
    email: "info@aygit.com",
    phone: "+90 (212) 123 45 67",
    address: "İstanbul, Türkiye"
  },
  footer: {
    logo: "/aygit-logo-beyaz.png",
    description: "Modern teknolojiler ve yenilikçi çözümlerle işinizi dijital dünyada büyütmenize yardımcı oluyoruz.",
    email: "info@aygit.com",
    phone: "+90 (212) 123 45 67",
    address: "İstanbul, Türkiye"
  },
  styles: {
    hero: { ...defaultCSSStyles },
    services: { ...defaultCSSStyles },
    contact: { ...defaultCSSStyles },
    footer: { ...defaultCSSStyles },
    navigation: { ...defaultCSSStyles },
    buttons: { ...defaultCSSStyles },
    cards: { ...defaultCSSStyles },
    text: { ...defaultCSSStyles }
  },
  animations: {
    hero: { ...defaultAnimationSettings },
    services: { ...defaultAnimationSettings },
    contact: { ...defaultAnimationSettings },
    footer: { ...defaultAnimationSettings },
    navigation: { ...defaultAnimationSettings },
    buttons: { ...defaultAnimationSettings },
    cards: { ...defaultAnimationSettings }
  }
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeData, setThemeData] = useState<ThemeData>(defaultThemeData)

  const updateThemeData = useCallback((path: string, value: string | number | boolean | string[]) => {
    setThemeData(prevData => {
      const newData = { ...prevData }
      const keys = path.split('.')
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let current: Record<string, any> = newData
      
      // Güvenli nested object erişimi
      for (let i = 0; i < keys.length - 1; i++) {
        const key = keys[i]
        if (!current[key] || typeof current[key] !== 'object') {
          // Eğer key yoksa veya object değilse, yeni bir object oluştur
          current[key] = {}
        }
        current = current[key]
      }
      
      // Son key için değeri ata
      const lastKey = keys[keys.length - 1]
      if (current && typeof current === 'object') {
        current[lastKey] = value
      }
      
      return newData
    })
  }, [])

  const saveThemeData = useCallback(() => {
    try {
      localStorage.setItem('theme3-data', JSON.stringify(themeData))
      console.log('Tema verileri kaydedildi:', themeData)
    } catch (error) {
      console.error('Tema verileri kaydedilemedi:', error)
    }
  }, [themeData])

  const loadThemeData = useCallback(() => {
    try {
      const saved = localStorage.getItem('theme3-data')
      if (saved) {
        const parsed = JSON.parse(saved)
        setThemeData(parsed)
        console.log('Tema verileri yüklendi:', parsed)
      }
    } catch (error) {
      console.error('Tema verileri yüklenemedi:', error)
    }
  }, [])

  const resetThemeData = useCallback(() => {
    setThemeData(defaultThemeData)
    localStorage.removeItem('theme3-data')
    console.log('Tema verileri sıfırlandı')
  }, [])

  useEffect(() => {
    loadThemeData()
  }, [loadThemeData])

  // Memoized context value
  const contextValue = useMemo(() => ({
    themeData,
    updateThemeData,
    saveThemeData,
    loadThemeData,
    resetThemeData
  }), [themeData, updateThemeData, saveThemeData, loadThemeData, resetThemeData])

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}
