"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { 
  IconUsers, 
  IconEye, 
  IconClock, 
  IconDeviceMobile,
  IconDeviceDesktop,
  IconGlobe,
  IconTrendingUp,
  IconTrendingDown,
  IconActivity,
  IconRefresh,
  IconAlertCircle
} from "@tabler/icons-react"
import dynamic from "next/dynamic"
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"

// Dynamically import Recharts components to avoid SSR issues
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const LineChart = dynamic(() => import("recharts").then((mod) => ({ default: mod.LineChart })), { ssr: false }) as React.ComponentType<any>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Line = dynamic(() => import("recharts").then((mod) => ({ default: mod.Line })), { ssr: false }) as React.ComponentType<any>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const XAxis = dynamic(() => import("recharts").then((mod) => ({ default: mod.XAxis })), { ssr: false }) as React.ComponentType<any>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const YAxis = dynamic(() => import("recharts").then((mod) => ({ default: mod.YAxis })), { ssr: false }) as React.ComponentType<any>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const CartesianGrid = dynamic(() => import("recharts").then((mod) => ({ default: mod.CartesianGrid })), { ssr: false }) as React.ComponentType<any>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Tooltip = dynamic(() => import("recharts").then((mod) => ({ default: mod.Tooltip })), { ssr: false }) as React.ComponentType<any>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ResponsiveContainer = dynamic(() => import("recharts").then((mod) => ({ default: mod.ResponsiveContainer })), { ssr: false }) as React.ComponentType<any>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BarChart = dynamic(() => import("recharts").then((mod) => ({ default: mod.BarChart })), { ssr: false }) as React.ComponentType<any>
// @ts-expect-error - Recharts type compatibility issue
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Bar = dynamic(() => import("recharts").then((mod) => ({ default: mod.Bar })), { ssr: false }) as React.ComponentType<any>
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const AreaChart = dynamic(() => import("recharts").then((mod) => ({ default: mod.AreaChart })), { ssr: false }) as React.ComponentType<any>
// @ts-expect-error - Recharts type compatibility issue
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Area = dynamic(() => import("recharts").then((mod) => ({ default: mod.Area })), { ssr: false }) as React.ComponentType<any>

const trafficData = [
  { date: "Mon", visitors: 1200, pageviews: 3400, sessions: 980 },
  { date: "Tue", visitors: 1350, pageviews: 3800, sessions: 1100 },
  { date: "Wed", visitors: 1420, pageviews: 4100, sessions: 1150 },
  { date: "Thu", visitors: 1380, pageviews: 3900, sessions: 1080 },
  { date: "Fri", visitors: 1500, pageviews: 4300, sessions: 1250 },
  { date: "Sat", visitors: 1680, pageviews: 4800, sessions: 1400 },
  { date: "Sun", visitors: 1750, pageviews: 5200, sessions: 1500 },
]

const userBehaviorData = [
  { page: "Home", views: 5200, bounce: 35, time: 2.5 },
  { page: "Products", views: 3800, bounce: 28, time: 3.2 },
  { page: "About", views: 2100, bounce: 45, time: 1.8 },
  { page: "Contact", views: 1800, bounce: 52, time: 1.5 },
  { page: "Blog", views: 3200, bounce: 38, time: 4.1 },
]

const deviceData = [
  { device: "Desktop", users: 65, sessions: 4200 },
  { device: "Mobile", users: 30, sessions: 1950 },
  { device: "Tablet", users: 5, sessions: 325 },
]

const topSources = [
  { source: "Google", users: 45, sessions: 2900 },
  { source: "Direct", users: 25, sessions: 1625 },
  { source: "Facebook", users: 15, sessions: 975 },
  { source: "Twitter", users: 10, sessions: 650 },
  { source: "Other", users: 5, sessions: 325 },
]

interface AnalyticsData {
  totalUsers: number
  totalPageviews: number
  totalSessions: number
  avgSessionDuration: number
  bounceRate: number
  dailyData: Array<{
    date: string
    users: number
    pageviews: number
    sessions: number
  }>
}

export default function AnalyticsPage() {
  const { data: session } = useSession()
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [lastSync, setLastSync] = useState<Date | null>(null)

  const fetchAnalyticsData = async () => {
    if (!session?.user) return
    
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch('/api/analytics/daily')
      if (!response.ok) {
        throw new Error('Analytics verileri alınamadı')
      }
      
      const result = await response.json()
      if (result.error) {
        throw new Error(result.error)
      }
      
      // Transform the data for display
      const transformedData: AnalyticsData = {
        totalUsers: result.data?.reduce((sum: number, item: any) => sum + (item.users || 0), 0) || 0,
        totalPageviews: result.data?.reduce((sum: number, item: any) => sum + (item.pageviews || 0), 0) || 0,
        totalSessions: result.data?.reduce((sum: number, item: any) => sum + (item.sessions || 0), 0) || 0,
        avgSessionDuration: result.data?.reduce((sum: number, item: any) => sum + (item.avgSessionDuration || 0), 0) / (result.data?.length || 1) || 0,
        bounceRate: result.data?.reduce((sum: number, item: any) => sum + (item.bounceRate || 0), 0) / (result.data?.length || 1) || 0,
        dailyData: result.data?.map((item: any) => ({
          date: new Date(item.dateHour).toLocaleDateString('tr-TR', { month: 'short', day: 'numeric' }),
          users: item.users || 0,
          pageviews: item.pageviews || 0,
          sessions: item.sessions || 0
        })) || []
      }
      
      setAnalyticsData(transformedData)
      setLastSync(new Date())
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Bilinmeyen bir hata oluştu')
    } finally {
      setLoading(false)
    }
  }

  const triggerSync = async () => {
    if (!session?.user) return
    
    setLoading(true)
    setError(null)
    
    try {
      const response = await fetch('/api/analytics/sync', { method: 'POST' })
      if (!response.ok) {
        throw new Error('Senkronizasyon başlatılamadı')
      }
      
      const result = await response.json()
      if (result.error) {
        throw new Error(result.error)
      }
      
      // Refresh data after sync
      await fetchAnalyticsData()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Senkronizasyon hatası')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (session?.user) {
      fetchAnalyticsData()
    }
  }, [session?.user])

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = Math.floor(seconds % 60)
    return `${minutes}m ${remainingSeconds}s`
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
                    <h1 className="text-3xl font-bold tracking-tight">Analitik</h1>
                    <p className="text-muted-foreground">
                      Kapsamlı website analitikleri ve içgörüler
                    </p>
                    {lastSync && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Son güncelleme: {lastSync.toLocaleString('tr-TR')}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <Button 
                      onClick={triggerSync} 
                      disabled={loading}
                      variant="outline"
                      size="sm"
                    >
                      <IconRefresh className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                      {loading ? 'Senkronize ediliyor...' : 'GA4 Verilerini Çek'}
                    </Button>
                    <Select defaultValue="7d">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Dönem seçin" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1d">Son 24 saat</SelectItem>
                        <SelectItem value="7d">Son 7 gün</SelectItem>
                        <SelectItem value="30d">Son 30 gün</SelectItem>
                        <SelectItem value="90d">Son 90 gün</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {error && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
                    <IconAlertCircle className="h-5 w-5 text-red-500" />
                    <span className="text-red-700">{error}</span>
                    <Button 
                      onClick={() => setError(null)} 
                      variant="ghost" 
                      size="sm"
                      className="ml-auto"
                    >
                      Kapat
                    </Button>
                  </div>
                )}
              </div>

              <Tabs defaultValue="overview" className="px-4 lg:px-6">
                                 <TabsList className="grid w-full grid-cols-4">
                   <TabsTrigger value="overview">Genel Bakış</TabsTrigger>
                   <TabsTrigger value="traffic">Trafik</TabsTrigger>
                   <TabsTrigger value="behavior">Davranış</TabsTrigger>
                   <TabsTrigger value="sources">Kaynaklar</TabsTrigger>
                 </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Toplam Ziyaretçi</CardTitle>
                        <IconUsers className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {loading ? '...' : analyticsData?.totalUsers.toLocaleString('tr-TR') || '0'}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {analyticsData ? (
                            <IconTrendingUp className="inline h-3 w-3 text-green-500" />
                          ) : (
                            <IconAlertCircle className="inline h-3 w-3 text-yellow-500" />
                          )}
                          {analyticsData ? ' GA4 verileri' : ' Veri yok - senkronize edin'}
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Sayfa Görüntüleme</CardTitle>
                        <IconEye className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {loading ? '...' : analyticsData?.totalPageviews.toLocaleString('tr-TR') || '0'}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {analyticsData ? (
                            <IconTrendingUp className="inline h-3 w-3 text-green-500" />
                          ) : (
                            <IconAlertCircle className="inline h-3 w-3 text-yellow-500" />
                          )}
                          {analyticsData ? ' GA4 verileri' : ' Veri yok - senkronize edin'}
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Oturumlar</CardTitle>
                        <IconActivity className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {loading ? '...' : analyticsData?.totalSessions.toLocaleString('tr-TR') || '0'}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {analyticsData ? (
                            <IconTrendingUp className="inline h-3 w-3 text-green-500" />
                          ) : (
                            <IconAlertCircle className="inline h-3 w-3 text-yellow-500" />
                          )}
                          {analyticsData ? ' GA4 verileri' : ' Veri yok - senkronize edin'}
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Ort. Oturum Süresi</CardTitle>
                        <IconClock className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          {loading ? '...' : analyticsData ? formatDuration(analyticsData.avgSessionDuration) : '0s'}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {analyticsData ? (
                            <IconTrendingUp className="inline h-3 w-3 text-green-500" />
                          ) : (
                            <IconAlertCircle className="inline h-3 w-3 text-yellow-500" />
                          )}
                          {analyticsData ? ' GA4 verileri' : ' Veri yok - senkronize edin'}
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>GA4 Traffic Overview</CardTitle>
                        <CardDescription>
                          {analyticsData ? 'Gerçek GA4 verileri' : 'GA4 verilerini senkronize edin'}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        {analyticsData && analyticsData.dailyData.length > 0 ? (
                          <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={analyticsData.dailyData}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="date" />
                              <YAxis />
                              <Tooltip />
                              <Line type="monotone" dataKey="users" stroke="#8884d8" strokeWidth={2} name="Kullanıcılar" />
                              <Line type="monotone" dataKey="pageviews" stroke="#82ca9d" strokeWidth={2} name="Sayfa Görüntüleme" />
                              <Line type="monotone" dataKey="sessions" stroke="#ffc658" strokeWidth={2} name="Oturumlar" />
                            </LineChart>
                          </ResponsiveContainer>
                        ) : (
                          <div className="flex items-center justify-center h-[300px] text-muted-foreground">
                            <div className="text-center">
                              <IconAlertCircle className="h-12 w-12 mx-auto mb-4" />
                              <p>GA4 verileri bulunamadı</p>
                              <p className="text-sm">Yukarıdaki "GA4 Verilerini Çek" butonuna tıklayın</p>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Device Distribution</CardTitle>
                        <CardDescription>Traffic by device type</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {deviceData.map((device) => (
                            <div key={device.device} className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                {device.device === "Desktop" && <IconDeviceDesktop className="h-4 w-4" />}
                                {device.device === "Mobile" && <IconDeviceMobile className="h-4 w-4" />}
                                {device.device === "Tablet" && <IconDeviceMobile className="h-4 w-4" />}
                                <span>{device.device}</span>
                              </div>
                              <div className="text-right">
                                <div className="font-medium">{device.users}%</div>
                                <div className="text-sm text-muted-foreground">{device.sessions} sessions</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="traffic" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Traffic Analysis</CardTitle>
                      <CardDescription>Detailed traffic patterns and trends</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={400}>
                        <AreaChart data={trafficData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip />
                          <Area type="monotone" dataKey="visitors" stroke="#8884d8" fill="#8884d8" fillOpacity={0.3} />
                          <Area type="monotone" dataKey="pageviews" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
                        </AreaChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                      <CardHeader>
                        <CardTitle>Bounce Rate</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">42.3%</div>
                        <p className="text-sm text-muted-foreground">
                          <IconTrendingDown className="inline h-4 w-4 text-green-500" /> -2.1% vs last week
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Pages per Session</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">3.5</div>
                        <p className="text-sm text-muted-foreground">
                          <IconTrendingUp className="inline h-4 w-4 text-green-500" /> +0.3 vs last week
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>New vs Returning</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span>New Users</span>
                            <span className="font-medium">65%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Returning</span>
                            <span className="font-medium">35%</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="behavior" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>User Behavior</CardTitle>
                      <CardDescription>Page performance and user engagement</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {userBehaviorData.map((page) => (
                          <div key={page.page} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center gap-4">
                              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                <IconEye className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <h4 className="font-medium">{page.page}</h4>
                                <p className="text-sm text-muted-foreground">{page.views.toLocaleString()} views</p>
                              </div>
                            </div>
                            <div className="text-right space-y-1">
                              <div className="flex items-center gap-4">
                                <span className="text-sm">Bounce: {page.bounce}%</span>
                                <span className="text-sm">Time: {page.time}m</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Engagement Metrics</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span>Scroll Depth (25%)</span>
                          <Badge variant="secondary">78%</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Scroll Depth (50%)</span>
                          <Badge variant="secondary">45%</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Scroll Depth (75%)</span>
                          <Badge variant="secondary">23%</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Scroll Depth (100%)</span>
                          <Badge variant="secondary">12%</Badge>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Interaction Events</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span>Button Clicks</span>
                          <Badge variant="secondary">1,245</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Form Submissions</span>
                          <Badge variant="secondary">89</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Video Plays</span>
                          <Badge variant="secondary">567</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Downloads</span>
                          <Badge variant="secondary">234</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="sources" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Traffic Sources</CardTitle>
                      <CardDescription>Where your visitors come from</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={topSources}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="source" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="sessions" fill="#8884d8" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Top Referrers</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {topSources.map((source) => (
                          <div key={source.source} className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <IconGlobe className="h-4 w-4" />
                              <span>{source.source}</span>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">{source.sessions}</div>
                              <div className="text-sm text-muted-foreground">{source.users}%</div>
                            </div>
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Geographic Distribution</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span>United States</span>
                          <Badge variant="secondary">45%</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>United Kingdom</span>
                          <Badge variant="secondary">18%</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Canada</span>
                          <Badge variant="secondary">12%</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Germany</span>
                          <Badge variant="secondary">8%</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Other</span>
                          <Badge variant="secondary">17%</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
