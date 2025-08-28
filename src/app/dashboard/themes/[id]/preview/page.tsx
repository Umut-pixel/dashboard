"use client"

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useParams } from 'next/navigation'
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { FullPageLoading } from "@/components/loading-spinner"
import { ArrowLeft, ExternalLink, Edit } from "lucide-react"
import Link from "next/link"

interface ThemeSettings {
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
}

interface Theme {
  _id: string
  userId: string
  themeId: string
  name: string
  isActive: boolean
  settings: ThemeSettings
  lastEdited: string
  version: number
}

export default function ThemePreviewPage() {
  const { data: session, status } = useSession()
  const params = useParams()
  const [theme, setTheme] = useState<Theme | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  // Tema bilgilerini yükle
  const loadTheme = async () => {
    if (!session?.user?.id || !params.id) return

    setIsLoading(true)
    setError('')
    try {
      const response = await fetch(`/api/themes/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        setTheme(data.theme)
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Tema bulunamadı')
      }
    } catch (error) {
      console.error('Load theme error:', error)
      setError('Bir hata oluştu')
    } finally {
      setIsLoading(false)
    }
  }

  // Session değiştiğinde tema yükle
  useEffect(() => {
    if (session?.user?.id && params.id) {
      loadTheme()
    }
  }, [session?.user?.id, params.id])

  // Loading durumunda loading göster
  if (status === 'loading') {
    return <FullPageLoading />
  }

  // Kullanıcı giriş yapmamışsa boş div döndür (middleware yönlendirecek)
  if (status === 'unauthenticated') {
    return <div></div>
  }

  // Tema yükleniyor
  if (isLoading) {
    return <FullPageLoading />
  }

  // Tema bulunamadı
  if (!theme) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Tema bulunamadı</h2>
          <Link href="/dashboard/themes">
            <Button>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Temalara Dön
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <div className="px-4 lg:px-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Link href="/dashboard/themes">
                        <Button variant="ghost" size="sm">
                          <ArrowLeft className="h-4 w-4 mr-2" />
                          Geri
                        </Button>
                      </Link>
                      <h1 className="text-3xl font-bold tracking-tight">{theme.name} - Önizleme</h1>
                      {theme.isActive && (
                        <Badge variant="secondary">Aktif</Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground">
                      Tema önizlemesi - v{theme.version}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/dashboard/themes/${theme._id}/edit`}>
                      <Button variant="outline">
                        <Edit className="h-4 w-4 mr-2" />
                        Düzenle
                      </Button>
                    </Link>
                    <Link href="/dashboard/themes/app3/myy-app" target="_blank">
                      <Button>
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Canlı Görüntüle
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              {error && (
                <div className="px-4 lg:px-6">
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded flex items-center justify-between">
                    <span>{error}</span>
                    <button 
                      onClick={() => setError('')}
                      className="text-red-500 hover:text-red-700"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              )}

              <div className="px-4 lg:px-6">
                <div className="grid gap-6 md:grid-cols-2">
                  {/* Hero Section Preview */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Hero Bölümü</CardTitle>
                      <CardDescription>
                        Ana sayfa başlık ve açıklama
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <h1 className="text-2xl font-bold">{theme.settings.hero.title}</h1>
                        <h2 className="text-xl text-muted-foreground">{theme.settings.hero.subtitle}</h2>
                        <p className="text-sm">{theme.settings.hero.description}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm">{theme.settings.hero.button1Text}</Button>
                        <Button size="sm" variant="outline">{theme.settings.hero.button2Text}</Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Services Section Preview */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Hizmetler Bölümü</CardTitle>
                      <CardDescription>
                        Hizmetler ve özellikler
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <h2 className="text-xl font-bold">{theme.settings.services.title}</h2>
                        <p className="text-sm text-muted-foreground">{theme.settings.services.subtitle}</p>
                      </div>
                      <div className="space-y-3">
                        {theme.settings.services.items.map((item, index) => (
                          <div key={index} className="border rounded p-3">
                            <h3 className="font-semibold">{item.title}</h3>
                            <p className="text-sm text-muted-foreground">{item.description}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Contact Section Preview */}
                  <Card>
                    <CardHeader>
                      <CardTitle>İletişim Bölümü</CardTitle>
                      <CardDescription>
                        İletişim bilgileri
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <h2 className="text-xl font-bold">{theme.settings.contact.title}</h2>
                        <p className="text-sm text-muted-foreground">{theme.settings.contact.subtitle}</p>
                      </div>
                      <div className="space-y-2 text-sm">
                        <p>📧 {theme.settings.contact.email}</p>
                        <p>📱 {theme.settings.contact.phone}</p>
                        <p>📍 {theme.settings.contact.address}</p>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Footer Section Preview */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Footer Bölümü</CardTitle>
                      <CardDescription>
                        Alt bilgi ve iletişim
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <p className="text-sm">{theme.settings.footer.description}</p>
                      </div>
                      <div className="space-y-2 text-sm">
                        <p>📧 {theme.settings.footer.email}</p>
                        <p>📱 {theme.settings.footer.phone}</p>
                        <p>📍 {theme.settings.footer.address}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Theme Info */}
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Tema Bilgileri</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-3">
                      <div>
                        <p className="text-sm font-medium">Tema ID</p>
                        <p className="text-sm text-muted-foreground">{theme.themeId}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Versiyon</p>
                        <p className="text-sm text-muted-foreground">v{theme.version}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Son Düzenleme</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(theme.lastEdited).toLocaleDateString('tr-TR')}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
