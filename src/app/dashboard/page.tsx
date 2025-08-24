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
  IconBuilding, 
  IconActivity,
  IconTrendingUp,
  IconTrendingDown,
  IconCircleCheck,
  IconAlertTriangle,
  IconUsers,
  IconEye,
  IconClock,
  IconEdit
} from "@tabler/icons-react"
import Link from "next/link"

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
    title: "Aktif Bileşenler",
    value: "24",
    change: "+3",
    trend: "up",
    icon: IconCode,
    color: "text-blue-500",
    link: "/dashboard/components"
  },
  {
    title: "Aylık Ziyaretçi",
    value: "10.2K",
    change: "+15.2%",
    trend: "up",
    icon: IconUsers,
    color: "text-purple-500",
    link: "/dashboard/analytics"
  },
  {
    title: "Gelir",
    value: "$32K",
    change: "+12.5%",
    trend: "up",
    icon: IconBuilding,
    color: "text-green-500",
    link: "/dashboard/business"
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
    title: "Yeni Analitik Verisi",
    description: "Haftalık rapor hazır",
    time: "6 saat önce"
  }
]

const quickActions = [
  {
    title: "Website İzle",
    description: "Performans ve çalışma süresini kontrol et",
    icon: IconWorld,
    link: "/dashboard/monitor",
    color: "bg-blue-500"
  },
  {
    title: "Website Editörü",
    description: "Sürükle & bırak website oluşturucu",
    icon: IconEdit,
    link: "/dashboard/editor",
    color: "bg-purple-500"
  },
  {
    title: "Bileşenleri Yönet",
    description: "Website bileşenlerini oluştur ve düzenle",
    icon: IconCode,
    link: "/dashboard/components",
    color: "bg-green-500"
  },
  {
    title: "Analitikleri Görüntüle",
    description: "Trafik ve kullanıcı davranışını analiz et",
    icon: IconChartBar,
    link: "/dashboard/analytics",
    color: "bg-indigo-500"
  },
  {
    title: "İşletme İçgörüleri",
    description: "Gelir ve işletme metriklerini takip et",
    icon: IconBuilding,
    link: "/dashboard/business",
    color: "bg-orange-500"
  }
]

export default function Page() {
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
                <h1 className="text-3xl font-bold tracking-tight">Gösterge Paneli</h1>
                <p className="text-muted-foreground">
                  Kapsamlı website yönetim gösterge panelinize hoş geldiniz
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
                  ))}
                </div>
              </div>

              {/* Charts and Data */}
              <div className="px-4 lg:px-6">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Performans Genel Bakış</CardTitle>
                      <CardDescription>Website performans metrikleri</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ChartAreaInteractive />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Son Uyarılar</CardTitle>
                      <CardDescription>En son sistem bildirimleri</CardDescription>
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
