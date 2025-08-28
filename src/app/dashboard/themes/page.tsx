"use client"

import { useState } from 'react'
import { useTheme } from '@/contexts/theme-context'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { FullPageLoading } from '@/components/loading-spinner'
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  IconPalette, 
  IconPlus, 
  IconEdit, 
  IconEye, 
  IconTrash, 
  IconSettings,
  IconCopy,
  IconDownload,
  IconUpload
} from "@tabler/icons-react"
import Link from "next/link"

const availableThemes = [
  { id: 'theme-3', name: 'Tema-3', description: 'Modern web sitesi teması' },
]

export default function ThemesPage() {
  const { data: session, status } = useSession()
  const { state: themeState, createTheme, deleteTheme, setActiveTheme } = useTheme()
  const router = useRouter()
  const [selectedTheme, setSelectedTheme] = useState('')
  const [themeName, setThemeName] = useState('')
  const [isCreating, setIsCreating] = useState(false)

  // Loading durumunda loading göster
  if (status === 'loading') {
    return <FullPageLoading />
  }

  // Kullanıcı giriş yapmamışsa boş div döndür (middleware yönlendirecek)
  if (status === 'unauthenticated') {
    return <div></div>
  }

  const handleCreateTheme = async () => {
    if (!themeName.trim()) return

    setIsCreating(true)
    try {
      // Otomatik olarak theme-3 seç
      const theme = await createTheme('theme-3', themeName.trim())
      if (theme) {
        setThemeName('')
        // Tema oluşturulduktan sonra direkt edit sayfasına yönlendir
        router.push(`/dashboard/themes/${theme._id}/edit`)
      }
    } finally {
      setIsCreating(false)
    }
  }

  const handleDeleteTheme = async (themeId: string) => {
    if (confirm('Bu temayı silmek istediğinizden emin misiniz?')) {
      await deleteTheme(themeId)
    }
  }

  const handleSetActive = async (themeId: string) => {
    await setActiveTheme(themeId)
  }

  if (!session?.user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Giriş yapmanız gerekiyor</h2>
          <Link href="/auth/signin">
            <Button>Giriş Yap</Button>
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
                <h1 className="text-3xl font-bold tracking-tight">Tema-3 Yönetimi</h1>
                <p className="text-muted-foreground">
                  Tema-3'ünüzü oluşturun, düzenleyin ve yönetin
                </p>
              </div>

              {/* Create New Theme */}
              <div className="px-4 lg:px-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Yeni Tema-3 Oluştur</CardTitle>
                    <CardDescription>
                      Tema-3'ün yeni bir versiyonunu oluşturun
                    </CardDescription>
                  </CardHeader>
                                    <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="theme-name">Tema-3 Adı</Label>
                      <Input
                        id="theme-name"
                        value={themeName}
                        onChange={(e) => setThemeName(e.target.value)}
                        placeholder="Örn: Şirketim Web Sitesi"
                      />
                    </div>
                    <Button
                      onClick={handleCreateTheme}
                      disabled={!themeName.trim() || isCreating}
                    >
                      <IconPlus className="h-4 w-4 mr-2" />
                      {isCreating ? 'Oluşturuluyor...' : 'Tema-3 Oluştur'}
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* My Themes */}
              <div className="px-4 lg:px-6">
                                     <h2 className="text-xl font-semibold mb-4">Tema-3'lerim</h2>
                
                {themeState.loading ? (
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3].map((i) => (
                      <Card key={i} className="animate-pulse">
                        <CardContent className="p-6">
                          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                                       ) : themeState.themes.filter(theme => theme.themeId === 'theme-3').length > 0 ? (
                                       <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                       {themeState.themes
                         .filter(theme => theme.themeId === 'theme-3')
                         .map((theme) => (
                                               <Card key={theme._id} className="hover:shadow-md transition-shadow">
                           <CardHeader>
                             <div className="flex items-center justify-between">
                               <div className="flex items-center gap-2">
                                 <IconPalette className="h-5 w-5 text-blue-500" />
                                 <CardTitle className="text-lg">{theme.name}</CardTitle>
                               </div>
                               <div className="flex gap-1">
                                 {theme.isActive && (
                                   <Badge variant="secondary" className="text-xs">
                                     Aktif
                                   </Badge>
                                 )}
                                 <Badge variant="outline" className="text-xs">
                                   v{theme.version}
                                 </Badge>
                               </div>
                             </div>
                             <CardDescription>
                               Tema-3 - Modern web sitesi teması
                             </CardDescription>
                           </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="text-sm text-muted-foreground">
                            <p>Son düzenleme: {new Date(theme.lastEdited).toLocaleDateString('tr-TR')}</p>
                            <p>Görüntülenme: {theme.views}</p>
                          </div>
                          
                          <div className="flex flex-wrap gap-2">
                            <Link href={`/dashboard/themes/${theme._id}/edit`}>
                              <Button size="sm" variant="outline">
                                <IconEdit className="h-4 w-4 mr-1" />
                                Düzenle
                              </Button>
                            </Link>
                            <Link href={`/dashboard/themes/${theme._id}/preview`}>
                              <Button size="sm" variant="outline">
                                <IconEye className="h-4 w-4 mr-1" />
                                Önizle
                              </Button>
                            </Link>
                            {!theme.isActive && (
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleSetActive(theme._id)}
                              >
                                <IconSettings className="h-4 w-4 mr-1" />
                                Aktif Yap
                              </Button>
                            )}
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleDeleteTheme(theme._id)}
                            >
                              <IconTrash className="h-4 w-4 mr-1" />
                              Sil
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                                         ) : (
                           <Card>
                             <CardContent className="p-8 text-center">
                               <IconPalette className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                               <h3 className="text-lg font-semibold mb-2">Henüz Tema-3 oluşturmadınız</h3>
                               <p className="text-muted-foreground mb-4">
                                 Yukarıdaki formu kullanarak ilk Tema-3'ünüzü oluşturun
                               </p>
                             </CardContent>
                           </Card>
                         )}
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
