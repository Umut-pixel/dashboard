"use client"

import { useState, useEffect, useCallback } from 'react'
import { useSession } from 'next-auth/react'
import { useParams, useRouter } from 'next/navigation'
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input as _Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea as _Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { FullPageLoading } from "@/components/loading-spinner"
import { EditableText } from "@/components/saas/editable-text"
import { ArrowLeft, Save as _Save, Eye, Settings } from "lucide-react"
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

export default function ThemeEditPage() {
  const { data: session, status } = useSession()
  const params = useParams()
  const _router = useRouter()
  const [theme, setTheme] = useState<Theme | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [_isSaving, _setIsSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Tema bilgilerini yükle
  const loadTheme = useCallback(async () => {
    if (!(session?.user as { id: string })?.id || !params.id) return

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
  }, [session?.user, params.id])

  // Tema ayarlarını güncelle
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateThemeSettings = async (path: string, value: any) => {
    if (!theme) return

    _setIsSaving(true)
    setError('')
    setSuccess('')

    try {
      // Nested object path'i parse et
      const pathArray = path.split('.')
      const newSettings = { ...theme.settings }
      let current = newSettings
      
      for (let i = 0; i < pathArray.length - 1; i++) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        current = current[pathArray[i] as keyof typeof current] as any
      }
      current[pathArray[pathArray.length - 1] as keyof typeof current] = value

      const response = await fetch(`/api/themes/${theme._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ settings: newSettings }),
      })

      if (response.ok) {
        const data = await response.json()
        setTheme(data.theme)
        setSuccess('Değişiklik kaydedildi!')
        setTimeout(() => setSuccess(''), 2000)
      } else {
        setError('Güncelleme başarısız')
      }
    } catch (_error) {
      setError('Bir hata oluştu')
    } finally {
      _setIsSaving(false)
    }
  }

  // Session değiştiğinde tema yükle
  useEffect(() => {
    if ((session?.user as { id: string })?.id && params.id) {
      loadTheme()
    }
  }, [session?.user, params.id, loadTheme])

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
                      <h1 className="text-3xl font-bold tracking-tight">{theme.name}</h1>
                      {theme.isActive && (
                        <Badge variant="secondary">Aktif</Badge>
                      )}
                    </div>
                    <p className="text-muted-foreground">
                      Tema içeriğini düzenleyin ve kaydedin
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Link href={`/dashboard/themes/${theme._id}/preview`}>
                      <Button variant="outline">
                        <Eye className="h-4 w-4 mr-2" />
                        Önizle
                      </Button>
                    </Link>
                    <Link href="/dashboard/themes/app3/myy-app" target="_blank">
                      <Button>
                        <Settings className="h-4 w-4 mr-2" />
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

              {success && (
                <div className="px-4 lg:px-6">
                  <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded">
                    {success}
                  </div>
                </div>
              )}

              <div className="px-4 lg:px-6">
                <div className="grid gap-6 md:grid-cols-2">
                  {/* Hero Section */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Hero Bölümü</CardTitle>
                      <CardDescription>
                        Ana başlık ve açıklama metinleri
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>Ana Başlık</Label>
                        <EditableText
                          initialText={theme.settings.hero.title}
                          element="h1"
                          onSave={(text) => updateThemeSettings('hero.title', text)}
                          className="text-2xl font-bold"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Alt Başlık</Label>
                        <EditableText
                          initialText={theme.settings.hero.subtitle}
                          element="h2"
                          onSave={(text) => updateThemeSettings('hero.subtitle', text)}
                          className="text-xl text-muted-foreground"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Açıklama</Label>
                        <EditableText
                          initialText={theme.settings.hero.description}
                          element="p"
                          onSave={(text) => updateThemeSettings('hero.description', text)}
                          className="text-sm"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>1. Buton Metni</Label>
                          <EditableText
                            initialText={theme.settings.hero.button1Text}
                            element="span"
                            onSave={(text) => updateThemeSettings('hero.button1Text', text)}
                            className="text-sm"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>2. Buton Metni</Label>
                          <EditableText
                            initialText={theme.settings.hero.button2Text}
                            element="span"
                            onSave={(text) => updateThemeSettings('hero.button2Text', text)}
                            className="text-sm"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Services Section */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Hizmetler Bölümü</CardTitle>
                      <CardDescription>
                        Hizmetler başlığı ve açıklaması
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>Hizmetler Başlığı</Label>
                        <EditableText
                          initialText={theme.settings.services.title}
                          element="h2"
                          onSave={(text) => updateThemeSettings('services.title', text)}
                          className="text-xl font-bold"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Hizmetler Alt Başlığı</Label>
                        <EditableText
                          initialText={theme.settings.services.subtitle}
                          element="p"
                          onSave={(text) => updateThemeSettings('services.subtitle', text)}
                          className="text-sm"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Hizmet Öğeleri</Label>
                        <div className="space-y-3">
                          {theme.settings.services.items.map((item, index) => (
                            <div key={index} className="border rounded p-3">
                              <div className="space-y-2">
                                <Label>Hizmet {index + 1} Başlığı</Label>
                                <EditableText
                                  initialText={item.title}
                                  element="h3"
                                  onSave={async (text) => {
                                    const newItems = [...theme.settings.services.items]
                                    newItems[index].title = text
                                    await updateThemeSettings('services.items', newItems)
                                  }}
                                  className="text-lg font-semibold"
                                />
                              </div>
                              <div className="space-y-2 mt-2">
                                <Label>Hizmet {index + 1} Açıklaması</Label>
                                <EditableText
                                  initialText={item.description}
                                  element="p"
                                  onSave={async (text) => {
                                    const newItems = [...theme.settings.services.items]
                                    newItems[index].description = text
                                    await updateThemeSettings('services.items', newItems)
                                  }}
                                  className="text-sm"
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Contact Section */}
                  <Card>
                    <CardHeader>
                      <CardTitle>İletişim Bölümü</CardTitle>
                      <CardDescription>
                        İletişim bilgileri ve form ayarları
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>İletişim Başlığı</Label>
                        <EditableText
                          initialText={theme.settings.contact.title}
                          element="h2"
                          onSave={(text) => updateThemeSettings('contact.title', text)}
                          className="text-xl font-bold"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>İletişim Alt Başlığı</Label>
                        <EditableText
                          initialText={theme.settings.contact.subtitle}
                          element="p"
                          onSave={(text) => updateThemeSettings('contact.subtitle', text)}
                          className="text-sm"
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                          <Label>E-posta</Label>
                          <EditableText
                            initialText={theme.settings.contact.email}
                            element="span"
                            onSave={(text) => updateThemeSettings('contact.email', text)}
                            className="text-sm"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Telefon</Label>
                          <EditableText
                            initialText={theme.settings.contact.phone}
                            element="span"
                            onSave={(text) => updateThemeSettings('contact.phone', text)}
                            className="text-sm"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Adres</Label>
                          <EditableText
                            initialText={theme.settings.contact.address}
                            element="span"
                            onSave={(text) => updateThemeSettings('contact.address', text)}
                            className="text-sm"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Footer Section */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Footer Bölümü</CardTitle>
                      <CardDescription>
                        Alt bilgi ve iletişim bilgileri
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>Footer Açıklaması</Label>
                        <EditableText
                          initialText={theme.settings.footer.description}
                          element="p"
                          onSave={(text) => updateThemeSettings('footer.description', text)}
                          className="text-sm"
                        />
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                        <div className="space-y-2">
                          <Label>Footer E-posta</Label>
                          <EditableText
                            initialText={theme.settings.footer.email}
                            element="span"
                            onSave={(text) => updateThemeSettings('footer.email', text)}
                            className="text-sm"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Footer Telefon</Label>
                          <EditableText
                            initialText={theme.settings.footer.phone}
                            element="span"
                            onSave={(text) => updateThemeSettings('footer.phone', text)}
                            className="text-sm"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Footer Adres</Label>
                          <EditableText
                            initialText={theme.settings.footer.address}
                            element="span"
                            onSave={(text) => updateThemeSettings('footer.address', text)}
                            className="text-sm"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
