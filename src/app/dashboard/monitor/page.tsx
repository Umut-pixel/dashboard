"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  IconWorld, 
  IconActivity, 
  IconClock, 
  IconCheck, 
  IconX, 
  IconAlertTriangle,
  IconPlus,
  IconRefresh,
  IconKey,
  IconSettings
} from "@tabler/icons-react"
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { FullPageLoading } from "@/components/loading-spinner"

interface WebsiteStatus {
  url: string
  status: 'online' | 'offline' | 'loading'
  responseTime: number
  lastChecked: string
  uptime: number
  sslStatus: 'valid' | 'invalid' | 'unknown'
  performance: {
    loadTime: number
    score: number
  }
}

interface APIKey {
  id: string
  name: string
  key: string
  status: 'active' | 'inactive'
  createdAt: string
  lastUsed: string
  websiteUrl?: string
}

export default function MonitorPage() {
  const { data: session, status } = useSession()
  const [websiteStatuses, setWebsiteStatuses] = useState<WebsiteStatus[]>([])
  const [apiKeys, setApiKeys] = useState<APIKey[]>([])
  const [newWebsiteUrl, setNewWebsiteUrl] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [selectedApiKey, setSelectedApiKey] = useState<string>('')

  // Load data from localStorage
  useEffect(() => {
    const savedWebsiteStatuses = localStorage.getItem('dashboard-website-statuses')
    const savedApiKeys = localStorage.getItem('dashboard-api-keys')
    
    if (savedWebsiteStatuses) {
      setWebsiteStatuses(JSON.parse(savedWebsiteStatuses))
    }
    
    if (savedApiKeys) {
      setApiKeys(JSON.parse(savedApiKeys))
    }
  }, [])

  // Save website statuses to localStorage
  useEffect(() => {
    localStorage.setItem('dashboard-website-statuses', JSON.stringify(websiteStatuses))
  }, [websiteStatuses])

  const checkWebsiteStatus = async (url: string) => {
    setIsLoading(true)
    
    try {
      const startTime = Date.now()
      const response = await fetch(url, { 
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
        uptime: 99.9,
        sslStatus: 'valid',
        performance: {
          loadTime: responseTime,
          score: responseTime < 1000 ? 90 : responseTime < 2000 ? 70 : 50
        }
      }
      
      setWebsiteStatuses(prev => {
        const existing = prev.find(s => s.url === url)
        if (existing) {
          return prev.map(s => s.url === url ? status : s)
        } else {
          return [...prev, status]
        }
      })
    } catch (error) {
      const status: WebsiteStatus = {
        url,
        status: 'offline',
        responseTime: 0,
        lastChecked: new Date().toISOString(),
        uptime: 0,
        sslStatus: 'unknown',
        performance: {
          loadTime: 0,
          score: 0
        }
      }
      
      setWebsiteStatuses(prev => {
        const existing = prev.find(s => s.url === url)
        if (existing) {
          return prev.map(s => s.url === url ? status : s)
        } else {
          return [...prev, status]
        }
      })
    } finally {
      setIsLoading(false)
    }
  }

  const addWebsite = () => {
    if (!newWebsiteUrl.trim()) return
    
    const url = newWebsiteUrl.startsWith('http') ? newWebsiteUrl : `https://${newWebsiteUrl}`
    checkWebsiteStatus(url)
    setNewWebsiteUrl('')
  }

  const removeWebsite = (url: string) => {
    setWebsiteStatuses(prev => prev.filter(status => status.url !== url))
  }

  const refreshAll = () => {
    websiteStatuses.forEach(status => checkWebsiteStatus(status.url))
  }

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
          <Button asChild>
            <a href="/auth/signin">Giriş Yap</a>
          </Button>
        </div>
      </div>
    )
  }

  const onlineCount = websiteStatuses.filter(s => s.status === 'online').length
  const totalCount = websiteStatuses.length
  const averageResponseTime = websiteStatuses.length > 0 
    ? Math.round(websiteStatuses.reduce((acc, s) => acc + s.responseTime, 0) / websiteStatuses.length)
    : 0

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
                    <h1 className="text-3xl font-bold tracking-tight">Website İzleme</h1>
                    <p className="text-muted-foreground">
                      Website'larınızın performansını ve durumunu takip edin
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline"
                      onClick={refreshAll}
                      disabled={isLoading}
                    >
                      <IconRefresh className="h-4 w-4 mr-2" />
                      {isLoading ? 'Kontrol Ediliyor...' : 'Tümünü Yenile'}
                    </Button>
                    <Button asChild>
                      <a href="/dashboard">
                        <IconSettings className="h-4 w-4 mr-2" />
                        API Key Yönetimi
                      </a>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Overview Stats */}
              <div className="px-4 lg:px-6">
                <div className="grid gap-4 md:grid-cols-4">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2">
                        <IconWorld className="h-4 w-4 text-blue-500" />
                        <span className="text-sm font-medium">Toplam Website</span>
                      </div>
                      <div className="mt-2">
                        <div className="text-2xl font-bold">{totalCount}</div>
                        <div className="text-xs text-muted-foreground">
                          İzlenen website sayısı
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2">
                        <IconCheck className="h-4 w-4 text-green-500" />
                        <span className="text-sm font-medium">Çevrimiçi</span>
                      </div>
                      <div className="mt-2">
                        <div className="text-2xl font-bold">{onlineCount}</div>
                        <div className="text-xs text-muted-foreground">
                          Aktif website'lar
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2">
                        <IconActivity className="h-4 w-4 text-purple-500" />
                        <span className="text-sm font-medium">Ortalama Yanıt</span>
                      </div>
                      <div className="mt-2">
                        <div className="text-2xl font-bold">{averageResponseTime}ms</div>
                        <div className="text-xs text-muted-foreground">
                          Ortalama yanıt süresi
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2">
                        <IconKey className="h-4 w-4 text-orange-500" />
                        <span className="text-sm font-medium">Aktif API Key</span>
                      </div>
                      <div className="mt-2">
                        <div className="text-2xl font-bold">{apiKeys.filter(k => k.status === 'active').length}</div>
                        <div className="text-xs text-muted-foreground">
                          Kullanılan API key'ler
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Add Website */}
              <div className="px-4 lg:px-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Website Ekle</CardTitle>
                    <CardDescription>
                      İzlemek istediğiniz website'ı ekleyin
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-4">
                      <div className="flex-1">
                        <Label htmlFor="website-url">Website URL</Label>
                        <Input
                          id="website-url"
                          value={newWebsiteUrl}
                          onChange={(e) => setNewWebsiteUrl(e.target.value)}
                          placeholder="https://example.com"
                        />
                      </div>
                      <div className="flex items-end">
                        <Button onClick={addWebsite} disabled={!newWebsiteUrl.trim() || isLoading}>
                          <IconPlus className="h-4 w-4 mr-2" />
                          Website Ekle
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Website Status List */}
              <div className="px-4 lg:px-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Website Durumları</CardTitle>
                    <CardDescription>
                      Tüm izlenen website'ların anlık durumu
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {websiteStatuses.length > 0 ? (
                      <div className="space-y-4">
                        {websiteStatuses.map((status) => (
                          <div key={status.url} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center gap-4">
                              <div className={`w-3 h-3 rounded-full ${
                                status.status === 'online' ? 'bg-green-500' : 'bg-red-500'
                              }`}></div>
                              <div>
                                <div className="font-medium">{status.url}</div>
                                <div className="text-sm text-muted-foreground">
                                  Son kontrol: {new Date(status.lastChecked).toLocaleString('tr-TR')}
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="text-right">
                                <Badge variant={status.status === 'online' ? 'default' : 'destructive'}>
                                  {status.status === 'online' ? 'Çevrimiçi' : 'Çevrimdışı'}
                                </Badge>
                                <div className="text-xs text-muted-foreground mt-1">
                                  {status.responseTime}ms
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-sm font-medium">
                                  {status.performance.score}/100
                                </div>
                                <div className="text-xs text-muted-foreground">
                                  Performans
                                </div>
                              </div>
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => checkWebsiteStatus(status.url)}
                                  disabled={isLoading}
                                >
                                  <IconRefresh className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => removeWebsite(status.url)}
                                  className="text-red-500"
                                >
                                  <IconX className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <IconWorld className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Henüz website eklenmedi</h3>
                        <p className="text-muted-foreground mb-4">
                          İzlemek istediğiniz website'ı ekleyerek başlayın
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* API Keys */}
              {apiKeys.length > 0 && (
                <div className="px-4 lg:px-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Aktif API Key'ler</CardTitle>
                      <CardDescription>
                        Website izleme için kullanılan API key'ler
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {apiKeys.filter(key => key.status === 'active').map((apiKey) => (
                          <div key={apiKey.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div>
                              <div className="font-medium">{apiKey.name}</div>
                              <div className="text-sm text-muted-foreground font-mono">
                                {apiKey.key.substring(0, 20)}...
                              </div>
                              {apiKey.websiteUrl && (
                                <div className="text-xs text-muted-foreground">
                                  Website: {apiKey.websiteUrl}
                                </div>
                              )}
                            </div>
                            <Badge variant="default">Aktif</Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
