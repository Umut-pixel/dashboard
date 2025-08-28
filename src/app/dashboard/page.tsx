"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"
import { DataTable } from "@/components/data-table"
import { SectionCards } from "@/components/section-cards"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  IconWorld, 
  IconCode, 
  IconChartBar, 
  IconUsers, 
  IconActivity,
  IconTrendingUp,
  IconTrendingDown,
  IconCircleCheck,
  IconAlertTriangle,
  IconEye,
  IconClock,
  IconEdit,
  IconPalette,
  IconShield,
  IconPlus,
  IconSettings,
  IconEye as IconView
} from "@tabler/icons-react"
import Link from "next/link"
import { useTheme } from "@/contexts/theme-context"
import { useSession } from "next-auth/react"
import { FullPageLoading } from "@/components/loading-spinner"

import data from "./data.json"

const quickStats = [
  {
    title: "Website Durumu",
    value: "Çevrimiçi",
    change: "+0%",
    trend: "up",
    icon: IconWorld,
    color: "text-green-500",
    link: "/dashboard/monitor"
  },
  {
    title: "Aktif Kullanıcılar",
    value: "4",
    change: "+1",
    trend: "up",
    icon: IconUsers,
    color: "text-blue-500",
    link: "/dashboard/users"
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
    value: "12",
    change: "+3",
    trend: "up",
    icon: IconPalette,
    color: "text-orange-500",
    link: "/dashboard/editor"
  }
]

const recentAlerts = [
  {
    id: 1,
    type: "success",
    title: "Website Performansı",
    description: "Sayfa yükleme süresi %15 iyileşti",
    time: "2 saat önce"
  },
  {
    id: 2,
    type: "warning",
    title: "Bileşen Güncellemesi",
    description: "Navigasyon bileşeni inceleme gerektiriyor",
    time: "4 saat önce"
  },
  {
    id: 3,
    type: "info",
    title: "Yeni Kullanıcı",
    description: "Ayşe Yılmaz sisteme eklendi",
    time: "6 saat önce"
  }
]

const quickActions = [
  {
    title: "Website Tasarımı",
    description: "Canlı website editörü ile tasarım yapın",
    icon: IconEdit,
    link: "/dashboard/editor",
    color: "bg-purple-500"
  },
  {
    title: "Website İzleme",
    description: "Performans ve çalışma süresini kontrol et",
    icon: IconWorld,
    link: "/dashboard/monitor",
    color: "bg-blue-500"
  },
  {
    title: "Kullanıcı Yönetimi",
    description: "Kullanıcıları ve rollerini yönetin",
    icon: IconUsers,
    link: "/dashboard/users",
    color: "bg-green-500"
  },
  {
    title: "Analitikler",
    description: "Trafik ve kullanıcı davranışını analiz et",
    icon: IconChartBar,
    link: "/dashboard/analytics",
    color: "bg-indigo-500"
  },
  {
    title: "Tema Yönetimi",
    description: "Temalarınızı düzenleyin ve yönetin",
    icon: IconPalette,
    link: "/dashboard/themes",
    color: "bg-orange-500"
  },
  {
    title: "Tema-3'ü Görüntüle",
    description: "App3 temasını ayrı sekmede açın",
    icon: IconView,
    link: "/dashboard/themes/app3/myy-app",
    color: "bg-teal-500",
    external: true
  }
]

const systemStatus = [
  {
    name: "Website Sunucusu",
    status: "online",
    uptime: "99.9%",
    response: "45ms"
  },
  {
    name: "Veritabanı",
    status: "online",
    uptime: "99.8%",
    response: "12ms"
  },
  {
    name: "CDN",
    status: "online",
    uptime: "99.9%",
    response: "8ms"
  },
  {
    name: "E-posta Servisi",
    status: "online",
    uptime: "99.7%",
    response: "120ms"
  }
]

export default function Page() {
  const { data: session, status } = useSession()
  const { state: themeState } = useTheme()

  // Loading durumunda loading göster
  if (status === 'loading') {
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
                <h1 className="text-3xl font-bold tracking-tight">Web Yönetim Paneli</h1>
                {session?.user && (
                  <p className="text-muted-foreground mt-2">
                    Hoş geldiniz, {session.user.name}!
                  </p>
                )}
                <p className="text-muted-foreground">
                  Website yönetimi, kullanıcı kontrolü ve tasarım araçları
                </p>
              </div>

              {/* Quick Stats */}
              <div className="px-4 lg:px-6">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {quickStats.map((stat) => (
                    <Link key={stat.title} href={stat.link}>
                      <Card className="hover:shadow-md transition-shadow cursor-pointer">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                          <stat.icon className={`h-4 w-4 ${stat.color}`} />
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">{stat.value}</div>
                          <p className="text-xs text-muted-foreground">
                            {stat.trend === "up" ? (
                              <IconTrendingUp className="inline h-3 w-3 text-green-500" />
                            ) : (
                              <IconTrendingDown className="inline h-3 w-3 text-red-500" />
                            )}{" "}
                            {stat.change} geçen aydan
                          </p>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="px-4 lg:px-6">
                <h2 className="text-xl font-semibold mb-4">Hızlı İşlemler</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {quickActions.map((action) => (
                    action.external ? (
                      <a 
                        key={action.title} 
                        href={action.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="block"
                      >
                        <Card className="hover:shadow-md transition-shadow cursor-pointer">
                          <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                              <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${action.color}`}>
                                <action.icon className="h-6 w-6 text-white" />
                              </div>
                              <div>
                                <h3 className="font-semibold">{action.title}</h3>
                                <p className="text-sm text-muted-foreground">{action.description}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </a>
                    ) : (
                      <Link key={action.title} href={action.link}>
                        <Card className="hover:shadow-md transition-shadow cursor-pointer">
                          <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                              <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${action.color}`}>
                                <action.icon className="h-6 w-6 text-white" />
                              </div>
                              <div>
                                <h3 className="font-semibold">{action.title}</h3>
                                <p className="text-sm text-muted-foreground">{action.description}</p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    )
                  ))}
                </div>
              </div>

              {/* Theme-3 Management */}
              {session?.user && (
                <div className="px-4 lg:px-6">
                                       <div className="flex items-center justify-between mb-4">
                       <h2 className="text-xl font-semibold">Tema-3 Yönetimi</h2>
                       <Link href="/dashboard/themes">
                         <Button variant="outline" size="sm">
                           <IconPlus className="h-4 w-4 mr-2" />
                           Yeni Tema-3 Oluştur
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
                  ) : themeState.themes.filter(theme => theme.themeId === 'theme-3').length > 0 ? (
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {themeState.themes
                        .filter(theme => theme.themeId === 'theme-3')
                        .map((theme) => (
                        <Card key={theme._id} className="hover:shadow-md transition-shadow">
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                              <div className="flex items-center gap-2">
                                <IconPalette className="h-5 w-5 text-blue-500" />
                                <h3 className="font-semibold">{theme.name}</h3>
                              </div>
                              {theme.isActive && (
                                <Badge variant="secondary" className="text-xs">
                                  Aktif
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mb-4">
                              Son düzenleme: {new Date(theme.lastEdited).toLocaleDateString('tr-TR')}
                            </p>
                            <div className="flex gap-2">
                              <Link href={`/dashboard/themes/${theme._id}/edit`}>
                                <Button size="sm" variant="outline">
                                  <IconEdit className="h-4 w-4 mr-1" />
                                  Düzenle
                                </Button>
                              </Link>
                              <Link href={`/dashboard/themes/${theme._id}/preview`}>
                                <Button size="sm" variant="outline">
                                  <IconView className="h-4 w-4 mr-1" />
                                  Önizle
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
                        <IconPalette className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold mb-2">Henüz Tema-3 oluşturmadınız</h3>
                        <p className="text-muted-foreground mb-4">
                          Tema-3'ü oluşturarak başlayın
                        </p>
                        <Link href="/dashboard/themes">
                          <Button>
                            <IconPlus className="h-4 w-4 mr-2" />
                            Tema-3 Oluştur
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}

              {/* Charts and Data */}
              <div className="px-4 lg:px-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Website Performansı</CardTitle>
                      <CardDescription>Son 30 günlük performans metrikleri</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ChartAreaInteractive />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Sistem Durumu</CardTitle>
                      <CardDescription>Altyapı servislerinin durumu</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {systemStatus.map((service, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-3">
                              <div className={`w-3 h-3 rounded-full ${service.status === 'online' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                              <div>
                                <h4 className="font-medium">{service.name}</h4>
                                <p className="text-sm text-muted-foreground">
                                  Yanıt: {service.response} | Çalışma: {service.uptime}
                                </p>
                              </div>
                            </div>
                            <Badge variant={service.status === 'online' ? 'default' : 'destructive'}>
                              {service.status === 'online' ? 'Çevrimiçi' : 'Çevrimdışı'}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Recent Alerts */}
              <div className="px-4 lg:px-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Son Bildirimler</CardTitle>
                    <CardDescription>En son sistem bildirimleri ve aktiviteler</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentAlerts.map((alert) => (
                        <div key={alert.id} className="flex items-start gap-4 p-3 border rounded-lg">
                          <div className="flex-shrink-0">
                            {alert.type === "success" && <IconCircleCheck className="h-5 w-5 text-green-500" />}
                            {alert.type === "warning" && <IconAlertTriangle className="h-5 w-5 text-yellow-500" />}
                            {alert.type === "info" && <IconClock className="h-5 w-5 text-blue-500" />}
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="font-medium">{alert.title}</h4>
                            <p className="text-sm text-muted-foreground">{alert.description}</p>
                            <span className="text-xs text-muted-foreground">{alert.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Data Table */}
              <div className="px-4 lg:px-6">
                <DataTable data={data} />
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
