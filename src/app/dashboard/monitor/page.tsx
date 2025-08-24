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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  IconActivity, 
  IconClock, 
  IconGauge, 
  IconWorld, 
  IconAlertTriangle,
  IconCircleCheck,
  IconTrendingUp,
  IconTrendingDown
} from "@tabler/icons-react"
import dynamic from "next/dynamic"

// Dynamically import Recharts components to avoid SSR issues
const LineChart = dynamic(() => import("recharts").then((mod) => ({ default: mod.LineChart })), { ssr: false })
const Line = dynamic(() => import("recharts").then((mod) => ({ default: mod.Line })), { ssr: false })
const XAxis = dynamic(() => import("recharts").then((mod) => ({ default: mod.XAxis })), { ssr: false })
const YAxis = dynamic(() => import("recharts").then((mod) => ({ default: mod.YAxis })), { ssr: false })
const CartesianGrid = dynamic(() => import("recharts").then((mod) => ({ default: mod.CartesianGrid })), { ssr: false })
const Tooltip = dynamic(() => import("recharts").then((mod) => ({ default: mod.Tooltip })), { ssr: false })
const ResponsiveContainer = dynamic(() => import("recharts").then((mod) => ({ default: mod.ResponsiveContainer })), { ssr: false })
const AreaChart = dynamic(() => import("recharts").then((mod) => ({ default: mod.AreaChart })), { ssr: false })
const Area = dynamic(() => import("recharts").then((mod) => ({ default: mod.Area })), { ssr: false })

const performanceData = [
  { time: "00:00", loadTime: 1.2, uptime: 100 },
  { time: "04:00", loadTime: 1.1, uptime: 100 },
  { time: "08:00", loadTime: 1.5, uptime: 99.8 },
  { time: "12:00", loadTime: 2.1, uptime: 99.9 },
  { time: "16:00", loadTime: 1.8, uptime: 100 },
  { time: "20:00", loadTime: 1.3, uptime: 100 },
  { time: "24:00", loadTime: 1.1, uptime: 100 },
]

const seoData = [
  { metric: "Sayfa Hızı", score: 85, status: "good" },
  { metric: "Mobil Uyumlu", score: 95, status: "excellent" },
  { metric: "SEO Puanı", score: 78, status: "good" },
  { metric: "Erişilebilirlik", score: 92, status: "excellent" },
]

const uptimeData = [
  { date: "Mon", uptime: 100 },
  { date: "Tue", uptime: 99.9 },
  { date: "Wed", uptime: 100 },
  { date: "Thu", uptime: 99.8 },
  { date: "Fri", uptime: 100 },
  { date: "Sat", uptime: 100 },
  { date: "Sun", uptime: 99.9 },
]

export default function MonitorPage() {
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
                                 <h1 className="text-3xl font-bold tracking-tight">Website İzleme</h1>
                 <p className="text-muted-foreground">
                   Website performansınızı, çalışma süresini ve SEO metriklerini izleyin
                 </p>
              </div>

              <Tabs defaultValue="overview" className="px-4 lg:px-6">
                                 <TabsList className="grid w-full grid-cols-4">
                   <TabsTrigger value="overview">Genel Bakış</TabsTrigger>
                   <TabsTrigger value="performance">Performans</TabsTrigger>
                   <TabsTrigger value="uptime">Çalışma Süresi</TabsTrigger>
                   <TabsTrigger value="seo">SEO</TabsTrigger>
                 </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Ortalama Yükleme Süresi</CardTitle>
                        <IconGauge className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">1.4s</div>
                                                 <p className="text-xs text-muted-foreground">
                           <IconTrendingDown className="inline h-3 w-3 text-green-500" /> -12% geçen haftadan
                         </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Çalışma Süresi</CardTitle>
                        <IconClock className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">99.9%</div>
                                                 <p className="text-xs text-muted-foreground">
                           <IconCircleCheck className="inline h-3 w-3 text-green-500" /> Tüm sistemler çalışıyor
                         </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">SEO Puanı</CardTitle>
                        <IconWorld className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">78/100</div>
                                                 <p className="text-xs text-muted-foreground">
                           <IconTrendingUp className="inline h-3 w-3 text-green-500" /> +5 puan bu ay
                         </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Aktif Uyarılar</CardTitle>
                        <IconAlertTriangle className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">0</div>
                                                 <p className="text-xs text-muted-foreground">
                           Kritik sorun tespit edilmedi
                         </p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                                                 <CardTitle>Performans Trendleri</CardTitle>
                         <CardDescription>Son 24 saatteki sayfa yükleme süreleri</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                          <LineChart data={performanceData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="time" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="loadTime" stroke="#8884d8" strokeWidth={2} />
                          </LineChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                                                 <CardTitle>Çalışma Süresi Geçmişi</CardTitle>
                         <CardDescription>Haftalık çalışma süresi yüzdesi</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                          <AreaChart data={uptimeData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="date" />
                            <YAxis />
                            <Tooltip />
                            <Area type="monotone" dataKey="uptime" stroke="#82ca9d" fill="#82ca9d" fillOpacity={0.3} />
                          </AreaChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="performance" className="space-y-4">
                  <Card>
                    <CardHeader>
                                             <CardTitle>Performans Metrikleri</CardTitle>
                       <CardDescription>Detaylı performans analizi</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                                                 <div className="flex items-center justify-between">
                           <span>İlk İçerik Boyama</span>
                           <Badge variant="secondary">1.2s</Badge>
                         </div>
                         <div className="flex items-center justify-between">
                           <span>En Büyük İçerik Boyama</span>
                           <Badge variant="secondary">2.1s</Badge>
                         </div>
                         <div className="flex items-center justify-between">
                           <span>Kümülatif Düzen Kayması</span>
                           <Badge variant="secondary">0.05</Badge>
                         </div>
                         <div className="flex items-center justify-between">
                           <span>İlk Giriş Gecikmesi</span>
                           <Badge variant="secondary">0.8s</Badge>
                         </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="uptime" className="space-y-4">
                  <Card>
                    <CardHeader>
                                             <CardTitle>Çalışma Süresi İzleme</CardTitle>
                       <CardDescription>Gerçek zamanlı çalışma süresi durumu</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                                                 <div className="flex items-center justify-between">
                           <span>Mevcut Durum</span>
                           <Badge variant="default" className="bg-green-500">Çevrimiçi</Badge>
                         </div>
                         <div className="flex items-center justify-between">
                           <span>Son Kesinti</span>
                           <span>2 hafta önce (5 dakika)</span>
                         </div>
                         <div className="flex items-center justify-between">
                           <span>Aylık Çalışma Süresi</span>
                           <span>99.9%</span>
                         </div>
                         <div className="flex items-center justify-between">
                           <span>Yanıt Süresi</span>
                           <span>45ms</span>
                         </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="seo" className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                                         {seoData.map((item) => (
                       <Card key={item.metric}>
                         <CardHeader>
                           <CardTitle className="text-lg">{item.metric}</CardTitle>
                         </CardHeader>
                         <CardContent>
                           <div className="flex items-center justify-between">
                             <span className="text-2xl font-bold">{item.score}</span>
                             <Badge 
                               variant={item.status === "excellent" ? "default" : "secondary"}
                               className={item.status === "excellent" ? "bg-green-500" : ""}
                             >
                               {item.status === "excellent" ? "mükemmel" : item.status === "good" ? "iyi" : item.status}
                             </Badge>
                           </div>
                         </CardContent>
                       </Card>
                     ))}
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
