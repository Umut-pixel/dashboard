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
import { 
  IconTrendingUp, 
  IconUsers, 
  IconCurrencyDollar,
  IconShoppingCart,
  IconTarget,
  IconArrowUpRight
} from "@tabler/icons-react"
import dynamic from "next/dynamic"

// Dynamically import Recharts components to avoid SSR issues
const LineChart = dynamic(() => import("recharts").then((mod) => ({ default: mod.LineChart })), { ssr: false }) as React.ComponentType<any>
const Line = dynamic(() => import("recharts").then((mod) => ({ default: mod.Line })), { ssr: false }) as React.ComponentType<any>
const XAxis = dynamic(() => import("recharts").then((mod) => ({ default: mod.XAxis })), { ssr: false }) as React.ComponentType<any>
const YAxis = dynamic(() => import("recharts").then((mod) => ({ default: mod.YAxis })), { ssr: false }) as React.ComponentType<any>
const CartesianGrid = dynamic(() => import("recharts").then((mod) => ({ default: mod.CartesianGrid })), { ssr: false }) as React.ComponentType<any>
const Tooltip = dynamic(() => import("recharts").then((mod) => ({ default: mod.Tooltip })), { ssr: false }) as React.ComponentType<any>
const ResponsiveContainer = dynamic(() => import("recharts").then((mod) => ({ default: mod.ResponsiveContainer })), { ssr: false }) as React.ComponentType<any>
const BarChart = dynamic(() => import("recharts").then((mod) => ({ default: mod.BarChart })), { ssr: false }) as React.ComponentType<any>
// @ts-ignore - Recharts type compatibility issue
const Bar = dynamic(() => import("recharts").then((mod) => ({ default: mod.Bar })), { ssr: false }) as React.ComponentType<any>
const PieChart = dynamic(() => import("recharts").then((mod) => ({ default: mod.PieChart })), { ssr: false }) as React.ComponentType<any>
// @ts-ignore - Recharts type compatibility issue
const Pie = dynamic(() => import("recharts").then((mod) => ({ default: mod.Pie })), { ssr: false }) as React.ComponentType<any>
const Cell = dynamic(() => import("recharts").then((mod) => ({ default: mod.Cell })), { ssr: false }) as React.ComponentType<any>

const revenueData = [
  { month: "Jan", revenue: 12000, orders: 45 },
  { month: "Feb", revenue: 15000, orders: 52 },
  { month: "Mar", revenue: 18000, orders: 61 },
  { month: "Apr", revenue: 22000, orders: 73 },
  { month: "May", revenue: 25000, orders: 84 },
  { month: "Jun", revenue: 28000, orders: 92 },
  { month: "Jul", revenue: 32000, orders: 108 },
]

const customerData = [
  { month: "Jan", new: 120, returning: 85 },
  { month: "Feb", new: 145, returning: 92 },
  { month: "Mar", new: 168, returning: 105 },
  { month: "Apr", new: 192, returning: 118 },
  { month: "May", new: 215, returning: 132 },
  { month: "Jun", new: 238, returning: 145 },
  { month: "Jul", new: 265, returning: 158 },
]

const salesByCategory = [
  { name: "Elektronik", value: 35, color: "#8884d8" },
  { name: "Giyim", value: 25, color: "#82ca9d" },
  { name: "Kitaplar", value: 20, color: "#ffc658" },
  { name: "Ev & Bahçe", value: 15, color: "#ff7300" },
  { name: "Spor", value: 5, color: "#00C49F" },
]

const topProducts = [
  { name: "Kablosuz Kulaklık", sales: 1250, revenue: 18750 },
  { name: "Akıllı Saat", sales: 980, revenue: 14700 },
  { name: "Dizüstü Standı", sales: 756, revenue: 7560 },
  { name: "Telefon Kılıfı", sales: 654, revenue: 3270 },
  { name: "USB Kablosu", sales: 543, revenue: 1086 },
]

export default function BusinessPage() {
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
                                 <h1 className="text-3xl font-bold tracking-tight">İşletme Analitikleri</h1>
                 <p className="text-muted-foreground">
                   İşletme performansınızı ve büyüme metriklerinizi takip edin
                 </p>
              </div>

              <Tabs defaultValue="overview" className="px-4 lg:px-6">
                                 <TabsList className="grid w-full grid-cols-4">
                   <TabsTrigger value="overview">Genel Bakış</TabsTrigger>
                   <TabsTrigger value="revenue">Ön İzleme</TabsTrigger>
                   <TabsTrigger value="customers">Müşteriler</TabsTrigger>
                   <TabsTrigger value="products">Ürünler</TabsTrigger>
                 </TabsList>

                <TabsContent value="overview" className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">SEO Analizi</CardTitle>
                        <IconCurrencyDollar className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">32,000 İzlenme</div>
                                                 <p className="text-xs text-muted-foreground">
                           <IconTrendingUp className="inline h-3 w-3 text-green-500" /> +12.5% geçen aydan
                         </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Toplam Tıklanma</CardTitle>
                        <IconShoppingCart className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">1,084</div>
                                                 <p className="text-xs text-muted-foreground">
                           <IconTrendingUp className="inline h-3 w-3 text-green-500" /> +8.2% geçen aydan
                         </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Aktif Müşteriler</CardTitle>
                        <IconUsers className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">2,847</div>
                                                 <p className="text-xs text-muted-foreground">
                           <IconTrendingUp className="inline h-3 w-3 text-green-500" /> +15.3% geçen aydan
                         </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Dönüşüm Oranı</CardTitle>
                        <IconTarget className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">3.2%</div>
                                                 <p className="text-xs text-muted-foreground">
                           <IconTrendingUp className="inline h-3 w-3 text-green-500" /> +0.8% geçen aydan
                         </p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                         <CardTitle>SEO Trendleri</CardTitle>
                           <CardDescription>Aylık SEO Ziyaretçi oranı büyümesi</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                          <LineChart data={revenueData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="revenue" stroke="#8884d8" strokeWidth={2} />
                            <Line type="monotone" dataKey="orders" stroke="#82ca9d" strokeWidth={2} />
                          </LineChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                                                 <CardTitle>Kategoriye Göre İzlenimler</CardTitle>
                         <CardDescription>Site kategorileri arasında gelir dağılımı</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ResponsiveContainer width="100%" height={300}>
                          <PieChart>
                            <Pie
                              data={salesByCategory}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              label={({ name, percent }: { name: string; percent: number }) => `${name} ${(percent * 100).toFixed(0)}%`}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                            >
                              {salesByCategory.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                              ))}
                            </Pie>
                            <Tooltip />
                          </PieChart>
                        </ResponsiveContainer>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="revenue" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Revenue Analysis</CardTitle>
                      <CardDescription>Detailed revenue breakdown and trends</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={revenueData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="revenue" fill="#8884d8" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                      <CardHeader>
                        <CardTitle>Average Order Value</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">$29.52</div>
                        <p className="text-sm text-muted-foreground">
                          <IconArrowUpRight className="inline h-4 w-4 text-green-500" /> +4.2% vs last month
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Revenue Growth</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">+12.5%</div>
                        <p className="text-sm text-muted-foreground">
                          <IconArrowUpRight className="inline h-4 w-4 text-green-500" /> Month over month
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Projected Revenue</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">$38,400</div>
                        <p className="text-sm text-muted-foreground">
                          <IconArrowUpRight className="inline h-4 w-4 text-green-500" /> Next month estimate
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="customers" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Customer Growth</CardTitle>
                      <CardDescription>New vs returning customer trends</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={400}>
                        <BarChart data={customerData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="new" fill="#8884d8" />
                          <Bar dataKey="returning" fill="#82ca9d" />
                        </BarChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Customer Metrics</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span>Customer Lifetime Value</span>
                          <Badge variant="secondary">$156.80</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Customer Acquisition Cost</span>
                          <Badge variant="secondary">$24.50</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Retention Rate</span>
                          <Badge variant="secondary">78.5%</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Churn Rate</span>
                          <Badge variant="secondary">2.1%</Badge>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Customer Segments</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span>New Customers</span>
                          <Badge variant="default">265</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Returning Customers</span>
                          <Badge variant="secondary">158</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>VIP Customers</span>
                          <Badge variant="outline">42</Badge>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>At Risk</span>
                          <Badge variant="destructive">18</Badge>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="products" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Top Performing Products</CardTitle>
                      <CardDescription>Best selling products by revenue</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {topProducts.map((product, index) => (
                          <div key={product.name} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center gap-4">
                              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                                <span className="text-sm font-medium">{index + 1}</span>
                              </div>
                              <div>
                                <h4 className="font-medium">{product.name}</h4>
                                <p className="text-sm text-muted-foreground">{product.sales} units sold</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">${product.revenue.toLocaleString()}</div>
                              <p className="text-sm text-muted-foreground">
                                ${(product.revenue / product.sales).toFixed(2)} avg
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
