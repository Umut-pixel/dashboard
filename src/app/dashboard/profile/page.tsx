"use client"

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FullPageLoading } from "@/components/loading-spinner"
import { TURKEY_CITIES, POSITIONS } from "@/lib/constants"
import { Save, User, Phone, Building, MapPin, Briefcase } from "lucide-react"

interface UserProfile {
  _id: string
  name: string
  email: string
  image: string
  phone: string
  position: string
  company: string
  location: string
  createdAt: string
  updatedAt: string
}

export default function ProfilePage() {
  const { data: session, status } = useSession()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    position: '',
    company: '',
    location: ''
  })

  // Profil bilgilerini yükle
  const loadProfile = async () => {
    if (!session?.user?.id) return

    setIsLoading(true)
    try {
      const response = await fetch('/api/user/profile')
      if (response.ok) {
        const data = await response.json()
        setProfile(data.user)
        setFormData({
          name: data.user.name || '',
          phone: data.user.phone || '',
          position: data.user.position || '',
          company: data.user.company || '',
          location: data.user.location || ''
        })
      } else {
        setError('Profil bilgileri yüklenemedi')
      }
    } catch (error) {
      setError('Bir hata oluştu')
    } finally {
      setIsLoading(false)
    }
  }

  // Profil güncelle
  const handleSave = async () => {
    if (!session?.user?.id) return

    setIsSaving(true)
    setError('')
    setSuccess('')

    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        const data = await response.json()
        setProfile(data.user)
        setSuccess('Profil başarıyla güncellendi!')
        setTimeout(() => setSuccess(''), 3000)
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Profil güncellenemedi')
      }
    } catch (error) {
      setError('Bir hata oluştu')
    } finally {
      setIsSaving(false)
    }
  }

  // Session değiştiğinde profil yükle
  useEffect(() => {
    if (session?.user?.id) {
      loadProfile()
    }
  }, [session?.user?.id])

  // Loading durumunda loading göster
  if (status === 'loading' || isLoading) {
    return <FullPageLoading />
  }

  // Kullanıcı giriş yapmamışsa boş div döndür (middleware yönlendirecek)
  if (status === 'unauthenticated') {
    return <div></div>
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
                <h1 className="text-3xl font-bold tracking-tight">Profil Yönetimi</h1>
                <p className="text-muted-foreground">
                  Kişisel bilgilerinizi güncelleyin ve yönetin
                </p>
              </div>

              <div className="px-4 lg:px-6">
                <div className="grid gap-6 md:grid-cols-2">
                  {/* Profil Bilgileri */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <User className="h-5 w-5" />
                        Profil Bilgileri
                      </CardTitle>
                      <CardDescription>
                        Kişisel bilgilerinizi güncelleyin
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Ad Soyad *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Ad Soyad"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="email">E-posta</Label>
                        <Input
                          id="email"
                          value={profile?.email || ''}
                          disabled
                          className="bg-gray-50"
                        />
                        <p className="text-xs text-muted-foreground">
                          E-posta adresi değiştirilemez
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="phone">Telefon</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+90 555 123 4567"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="position">Pozisyon</Label>
                        <Select
                          value={formData.position}
                          onValueChange={(value) => setFormData({ ...formData, position: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Pozisyon seçin" />
                          </SelectTrigger>
                          <SelectContent>
                            {POSITIONS.map((position) => (
                              <SelectItem key={position} value={position}>
                                {position}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="company">Şirket</Label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          placeholder="Şirket adı"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="location">Konum</Label>
                        <Select
                          value={formData.location}
                          onValueChange={(value) => setFormData({ ...formData, location: value })}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Şehir seçin" />
                          </SelectTrigger>
                          <SelectContent>
                            {TURKEY_CITIES.map((city) => (
                              <SelectItem key={city} value={city}>
                                {city}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {error && (
                        <div className="text-red-500 text-sm">{error}</div>
                      )}

                      {success && (
                        <div className="text-green-500 text-sm">{success}</div>
                      )}

                      <Button 
                        onClick={handleSave} 
                        disabled={isSaving}
                        className="w-full"
                      >
                        <Save className="h-4 w-4 mr-2" />
                        {isSaving ? 'Kaydediliyor...' : 'Değişiklikleri Kaydet'}
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Profil Önizleme */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Profil Önizleme</CardTitle>
                      <CardDescription>
                        Güncel profil bilgileriniz
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage src={profile?.image || ''} alt={profile?.name || ''} />
                          <AvatarFallback className="text-lg">
                            {profile?.name?.charAt(0).toUpperCase() || 'U'}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="text-lg font-semibold">{profile?.name || 'Ad Soyad'}</h3>
                          <p className="text-sm text-muted-foreground">{profile?.email || 'email@example.com'}</p>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {formData.phone && (
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="h-4 w-4 text-muted-foreground" />
                            <span>{formData.phone}</span>
                          </div>
                        )}

                        {formData.position && (
                          <div className="flex items-center gap-2 text-sm">
                            <Briefcase className="h-4 w-4 text-muted-foreground" />
                            <span>{formData.position}</span>
                          </div>
                        )}

                        {formData.company && (
                          <div className="flex items-center gap-2 text-sm">
                            <Building className="h-4 w-4 text-muted-foreground" />
                            <span>{formData.company}</span>
                          </div>
                        )}

                        {formData.location && (
                          <div className="flex items-center gap-2 text-sm">
                            <MapPin className="h-4 w-4 text-muted-foreground" />
                            <span>{formData.location}</span>
                          </div>
                        )}
                      </div>

                      <div className="pt-4 border-t">
                        <p className="text-xs text-muted-foreground">
                          Üye olma tarihi: {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString('tr-TR') : '-'}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Son güncelleme: {profile?.updatedAt ? new Date(profile.updatedAt).toLocaleDateString('tr-TR') : '-'}
                        </p>
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
