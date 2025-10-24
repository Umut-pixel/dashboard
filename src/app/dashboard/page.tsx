"use client"

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
  IconWorld, 
  IconTrendingUp,
  IconAlertTriangle,
  IconEye,
  IconClock as _IconClock,
  IconEdit,
  IconPalette,
  IconPlus,
  IconKey,
  IconCheck,
  IconX,
  IconBell,
  IconTrash,
  IconRefresh
} from "@tabler/icons-react"
import Link from "next/link"
import { useTheme } from "@/context/theme-context"
import { useSession } from "next-auth/react"
import { FullPageLoading } from "@/components/loading-spinner"
import { useState, useEffect } from "react"



// API Key Management System
interface APIKey {
  id: string
  name: string
  key: string
  status: 'active' | 'inactive'
  createdAt: string
  lastUsed: string
  websiteUrl?: string
}

interface WebsiteStatus {
  url: string
  status: 'online' | 'offline' | 'loading'
  responseTime: number
  lastChecked: string
  uptime: number
}

interface Notification {
  id: string
  type: 'success' | 'warning' | 'error' | 'info'
  title: string
  message: string
  timestamp: string
  read: boolean
}

export default function Page() {
  const { data: session, status } = useSession()
  const { state: themeState } = useTheme()
  
  // API Key Management State
  const [apiKeys, setApiKeys] = useState<APIKey[]>([])
  const [websiteStatuses, setWebsiteStatuses] = useState<WebsiteStatus[]>([])
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [newApiKeyName, setNewApiKeyName] = useState('')
  const [showApiKeyForm, setShowApiKeyForm] = useState(false)
  const [isLoadingStatus, setIsLoadingStatus] = useState(false)

  // Load API keys from localStorage on component mount
  useEffect(() => {
    const savedApiKeys = localStorage.getItem('dashboard-api-keys')
    const savedWebsiteStatuses = localStorage.getItem('dashboard-website-statuses')
    const savedNotifications = localStorage.getItem('dashboard-notifications')
    
    if (savedApiKeys) {
      setApiKeys(JSON.parse(savedApiKeys))
    }
    
    if (savedWebsiteStatuses) {
      setWebsiteStatuses(JSON.parse(savedWebsiteStatuses))
    }
    
    if (savedNotifications) {
      setNotifications(JSON.parse(savedNotifications))
    } else {
      // Initialize with default notifications
      const defaultNotifications: Notification[] = [
        {
          id: '1',
          type: 'success',
          title: 'Tema Başarıyla Yayınlandı',
          message: 'Theme-3 başarıyla canlıya alındı ve API key otomatik olarak oluşturuldu.',
          timestamp: new Date().toISOString(),
          read: false
        },
        {
          id: '2',
          type: 'info',
          title: 'Sistem Güncellemesi',
          message: 'Website izleme sistemi aktif hale getirildi.',
          timestamp: new Date(Date.now() - 3600000).toISOString(),
          read: false
        },
        {
          id: '3',
          type: 'warning',
          title: 'Performans Uyarısı',
          message: 'Website yükleme süresi 3 saniyeyi aştı.',
          timestamp: new Date(Date.now() - 7200000).toISOString(),
          read: true
        }
      ]
      setNotifications(defaultNotifications)
      localStorage.setItem('dashboard-notifications', JSON.stringify(defaultNotifications))
    }
  }, [])

  // Save API keys to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('dashboard-api-keys', JSON.stringify(apiKeys))
  }, [apiKeys])

  // Save website statuses to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('dashboard-website-statuses', JSON.stringify(websiteStatuses))
  }, [websiteStatuses])

  // Save notifications to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('dashboard-notifications', JSON.stringify(notifications))
  }, [notifications])

  // Generate API key
  const generateApiKey = () => {
    if (!newApiKeyName.trim()) return
    
    const newApiKey: APIKey = {
      id: Date.now().toString(),
      name: newApiKeyName,
      key: `api_${Math.random().toString(36).substr(2, 9)}_${Date.now()}`,
      status: 'active',
      createdAt: new Date().toISOString(),
      lastUsed: new Date().toISOString(),
    }
    
    setApiKeys(prev => [...prev, newApiKey])
    setNewApiKeyName('')
    setShowApiKeyForm(false)
    
    // Add notification
    addNotification('success', 'API Key Oluşturuldu', `${newApiKeyName} için yeni API key başarıyla oluşturuldu.`)
  }

  // Delete API key
  const deleteApiKey = (id: string) => {
    setApiKeys(prev => prev.filter(key => key.id !== id))
    addNotification('info', 'API Key Silindi', 'API key başarıyla silindi.')
  }

  // Add notification
  const addNotification = (type: Notification['type'], title: string, message: string) => {
    const newNotification: Notification = {
      id: Date.now().toString(),
      type,
      title,
      message,
      timestamp: new Date().toISOString(),
      read: false
    }
    setNotifications(prev => [newNotification, ...prev])
  }

  // Mark notification as read
  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    )
  }

  // Delete notification
  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }

  // Check website status
  const checkWebsiteStatus = async (url: string) => {
    setIsLoadingStatus(true)
    
    try {
      const startTime = Date.now()
      const _response = await fetch(url, { 
        method: 'HEAD',
        mode: 'no-cors'
      })
      const endTime = Date.now()
      const responseTime = endTime - startTime
      
      const status: WebsiteStatus = {
        url,
        status: 'online',
        responseTime,
        lastChecked: new Date().toISOString(),
        uptime: 99.9
      }
      
      setWebsiteStatuses(prev => {
        const existing = prev.find(s => s.url === url)
        if (existing) {
          return prev.map(s => s.url === url ? status : s)
        } else {
          return [...prev, status]
        }
      })
      
      addNotification('success', 'Website Durumu Güncellendi', `${url} başarıyla kontrol edildi.`)
    } catch (_error) {
      const status: WebsiteStatus = {
        url,
        status: 'offline',
        responseTime: 0,
        lastChecked: new Date().toISOString(),
        uptime: 0
      }
      
      setWebsiteStatuses(prev => {
        const existing = prev.find(s => s.url === url)
        if (existing) {
          return prev.map(s => s.url === url ? status : s)
        } else {
          return [...prev, status]
        }
      })
      
      addNotification('error', 'Website Erişim Hatası', `${url} erişilemiyor.`)
    } finally {
      setIsLoadingStatus(false)
    }
  }

  // Auto-generate API key when theme is published
  useEffect(() => {
    if (themeState.themes.length > 0) {
      const publishedThemes = themeState.themes.filter(theme => theme.isPublished === true)
      publishedThemes.forEach(theme => {
        const existingKey = apiKeys.find(key => key.websiteUrl === theme.publishedUrl)
        if (!existingKey && theme.publishedUrl) {
          const newApiKey: APIKey = {
            id: Date.now().toString(),
            name: `${theme.name} - Otomatik`,
            key: `api_${Math.random().toString(36).substr(2, 9)}_${Date.now()}`,
            status: 'active',
            createdAt: new Date().toISOString(),
            lastUsed: new Date().toISOString(),
            websiteUrl: theme.publishedUrl
          }
          setApiKeys(prev => [...prev, newApiKey])
          addNotification('success', 'Otomatik API Key Oluşturuldu', `${theme.name} teması için API key otomatik olarak oluşturuldu.`)
        }
      })
    }
  }, [themeState.themes, apiKeys])

  const quickStats = [
    {
      title: "Website Durumu",
      value: websiteStatuses.length > 0 ? 
        (websiteStatuses.some(s => s.status === 'online') ? "Çevrimiçi" : "Çevrimdışı") : "Kontrol Edilmedi",
      change: "+0%",
      trend: "up",
      icon: IconWorld,
      color: "text-green-500",
      link: "/dashboard/monitor"
    },
    {
              title: "Aktif API Key&apos;ler",
      value: apiKeys.filter(key => key.status === 'active').length.toString(),
      change: `+${apiKeys.length}`,
      trend: "up",
      icon: IconKey,
      color: "text-blue-500",
      link: "#"
    },
    {
      title: "Aylık Ziyaretçi",
      value: "10.2K",
      change: "+15.2%",
      trend: "up",
      icon: IconEye,
      color: "text-purple-500",
      link: "/dashboard/analytics"
    },
         {
       title: "Tasarım Projeleri",
       value: themeState.themes.length.toString(),
       change: `+${themeState.themes.filter(t => t.isPublished === true).length}`,
       trend: "up",
       icon: IconPalette,
       color: "text-orange-500",
       link: "/dashboard/themes"
     }
  ]

  const systemStatus = [
    {
      name: "Website Performansı",
      status: websiteStatuses.length > 0 ? 
        (websiteStatuses.some(s => s.status === 'online') ? "Mükemmel" : "Kritik") : "Kontrol Edilmedi",
      response: websiteStatuses.length > 0 ? 
        `${Math.round(websiteStatuses.reduce((acc, s) => acc + s.responseTime, 0) / websiteStatuses.length)}ms` : "N/A"
    },
    {
      name: "API Key Durumu",
      status: apiKeys.length > 0 ? "Aktif" : "Pasif",
      response: `${apiKeys.filter(key => key.status === 'active').length}/${apiKeys.length}`
    },
    {
      name: "Sistem Durumu",
      status: "Çevrimiçi",
      response: "120ms"
    }
  ]

  // Loading durumunda loading göster
  if (status === 'loading') {
    return <FullPageLoading />
  }

  // Kullanıcı giriş yapmamışsa boş div döndür (middleware yönlendirecek)
  if (status === 'unauthenticated') {
    return <div></div>
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
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-3xl font-bold tracking-tight">Gösterge Paneli</h1>
                    <p className="text-muted-foreground">
                      Website performansınızı ve sistem durumunuzu takip edin
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      onClick={() => setShowApiKeyForm(!showApiKeyForm)}
                    >
                      <IconKey className="h-4 w-4 mr-2" />
                      API Key Yönetimi
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => {
                        websiteStatuses.forEach(status => checkWebsiteStatus(status.url))
                      }}
                      disabled={isLoadingStatus}
                    >
                      <IconRefresh className="h-4 w-4 mr-2" />
                      {isLoadingStatus ? 'Kontrol Ediliyor...' : 'Durum Kontrolü'}
                    </Button>
                  </div>
                </div>
              </div>

              {/* API Key Management */}
              {showApiKeyForm && (
                <div className="px-4 lg:px-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>API Key Yönetimi</CardTitle>
                      <CardDescription>
                        Website izleme için API key&apos;ler oluşturun ve yönetin
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex gap-4 mb-4">
                        <div className="flex-1">
                          <Label htmlFor="api-key-name">API Key Adı</Label>
                          <Input
                            id="api-key-name"
                            value={newApiKeyName}
                            onChange={(e) => setNewApiKeyName(e.target.value)}
                            placeholder="Örn: Ana Website"
                          />
                        </div>
                        <div className="flex items-end">
                          <Button onClick={generateApiKey} disabled={!newApiKeyName.trim()}>
                            <IconPlus className="h-4 w-4 mr-2" />
                            API Key Oluştur
                          </Button>
                        </div>
                      </div>
                      
                      {apiKeys.length > 0 && (
                        <div className="space-y-2">
                          <h4 className="font-medium">Mevcut API Key&apos;ler</h4>
                          {apiKeys.map((apiKey) => (
                            <div key={apiKey.id} className="flex items-center justify-between p-3 border rounded-lg">
                              <div>
                                <div className="font-medium">{apiKey.name}</div>
                                <div className="text-sm text-muted-foreground font-mono">
                                  {apiKey.key.substring(0, 20)}...
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  Oluşturulma: {new Date(apiKey.createdAt).toLocaleDateString('tr-TR')}
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Badge variant={apiKey.status === 'active' ? 'default' : 'secondary'}>
                                  {apiKey.status === 'active' ? 'Aktif' : 'Pasif'}
                                </Badge>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => deleteApiKey(apiKey.id)}
                                >
                                  <IconTrash className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Quick Stats */}
              <div className="px-4 lg:px-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {quickStats.map((stat) => (
                    <Card key={stat.title}>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2">
                          <stat.icon className={`h-4 w-4 ${stat.color}`} />
                          <span className="text-sm font-medium">{stat.title}</span>
                        </div>
                        <div className="mt-2">
                          <div className="text-2xl font-bold">{stat.value}</div>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <IconTrendingUp className="h-3 w-3" />
                            {stat.change}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Main Content Grid */}
              <div className="px-4 lg:px-6">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {/* Recent Notifications */}
                  <Card className="lg:col-span-1">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <IconBell className="h-5 w-5" />
                        Son Bildirimler
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {notifications.slice(0, 5).map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                              notification.read ? 'bg-muted/50' : 'bg-background'
                            }`}
                            onClick={() => markNotificationAsRead(notification.id)}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex items-start gap-2 flex-1">
                                <div className={`mt-1 ${
                                  notification.type === 'success' ? 'text-green-500' :
                                  notification.type === 'warning' ? 'text-yellow-500' :
                                  notification.type === 'error' ? 'text-red-500' :
                                  'text-blue-500'
                                }`}>
                                  {notification.type === 'success' ? <IconCheck className="h-4 w-4" /> :
                                   notification.type === 'warning' ? <IconAlertTriangle className="h-4 w-4" /> :
                                   notification.type === 'error' ? <IconX className="h-4 w-4" /> :
                                   <IconBell className="h-4 w-4" />}
                                </div>
                                <div className="flex-1">
                                  <div className="font-medium text-sm">{notification.title}</div>
                                  <div className="text-xs text-muted-foreground">{notification.message}</div>
                                  <div className="text-xs text-muted-foreground mt-1">
                                    {new Date(notification.timestamp).toLocaleString('tr-TR')}
                                  </div>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  deleteNotification(notification.id)
                                }}
                              >
                                <IconTrash className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Website Performance */}
                  <Card className="lg:col-span-1">
                    <CardHeader>
                      <CardTitle>Website Performansı</CardTitle>
                      <CardDescription>
                        API key ile izlenen website&apos;ların performans durumu
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {websiteStatuses.length > 0 ? (
                        <div className="space-y-3">
                          {websiteStatuses.map((status) => (
                            <div key={status.url} className="flex items-center justify-between p-3 border rounded-lg">
                              <div>
                                <div className="font-medium text-sm">{status.url}</div>
                                <div className="text-xs text-muted-foreground">
                                  Son kontrol: {new Date(status.lastChecked).toLocaleString('tr-TR')}
                                </div>
                              </div>
                              <div className="text-right">
                                <Badge variant={status.status === 'online' ? 'default' : 'destructive'}>
                                  {status.status === 'online' ? 'Çevrimiçi' : 'Çevrimdışı'}
                                </Badge>
                                <div className="text-xs text-muted-foreground mt-1">
                                  {status.responseTime}ms
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <IconWorld className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground">
                            Henüz website durumu kontrol edilmedi
                          </p>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="mt-2"
                            onClick={() => {
                              const url = prompt('Website URL&apos;sini girin:')
                              if (url) checkWebsiteStatus(url)
                            }}
                          >
                            Website Ekle
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {/* System Status */}
                  <Card className="lg:col-span-1">
                    <CardHeader>
                      <CardTitle>Sistem Durumu</CardTitle>
                      <CardDescription>
                        Genel sistem performansı ve durumu
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {systemStatus.map((item) => (
                          <div key={item.name} className="flex items-center justify-between">
                            <span className="text-sm font-medium">{item.name}</span>
                            <div className="text-right">
                              <Badge variant={item.status === 'Mükemmel' || item.status === 'Aktif' || item.status === 'Çevrimiçi' ? 'default' : 'destructive'}>
                                {item.status}
                              </Badge>
                              <div className="text-xs text-muted-foreground mt-1">
                                {item.response}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Theme Management */}
              {session?.user && (
                <div className="px-4 lg:px-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold">Tema Yönetimi</h2>
                    <Link href="/dashboard/themes">
                      <Button variant="outline" size="sm">
                        <IconPlus className="h-4 w-4 mr-2" />
                        Yeni Tema Oluştur
                      </Button>
                    </Link>
                  </div>
                  
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
                  ) : themeState.themes.length > 0 ? (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {themeState.themes.slice(0, 3).map((theme) => (
                        <Card key={theme._id} className="hover:shadow-md transition-shadow">
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-2">
                                <IconPalette className="h-5 w-5 text-primary" />
                                <h3 className="font-semibold">{theme.name}</h3>
                              </div>
                              <Badge variant={theme.isPublished ? 'default' : 'secondary'}>
                                {theme.isPublished ? 'Yayında' : 'Taslak'}
                              </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-4">
                              {theme.settings?.hero?.description || 'Tema açıklaması bulunmuyor'}
                            </p>
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                              <span>Oluşturulma: {new Date(theme.createdAt).toLocaleDateString('tr-TR')}</span>
                              <Link href={`/dashboard/themes/${theme._id}/edit`}>
                                <Button variant="outline" size="sm">
                                  <IconEdit className="h-4 w-4 mr-1" />
                                  Düzenle
                                </Button>
                              </Link>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <Card>
                      <CardContent className="p-8 text-center">
                        <IconPalette className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Henüz tema oluşturulmadı</h3>
                        <p className="text-muted-foreground mb-4">
                          İlk temanızı oluşturarak başlayın
                        </p>
                        <Link href="/dashboard/themes">
                          <Button>
                            <IconPlus className="h-4 w-4 mr-2" />
                            İlk Temayı Oluştur
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
