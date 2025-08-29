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
import { Input } from "@/components/ui/input"
import { 
  IconAlertTriangle, 
  IconCircleCheck, 
  IconInfoCircle,
  IconUser,
  IconCode,
  IconWorld,
  IconDatabase,
  IconShield
} from "@tabler/icons-react"

const activities = [
  {
    id: 1,
    type: "success",
    title: "Component Updated",
    description: "Hero section component was successfully updated",
    user: "John Doe",
    time: "2 minutes ago",
    icon: IconCode
  },
  {
    id: 2,
    type: "info",
    title: "Website Backup",
    description: "Automatic backup completed successfully",
    user: "System",
    time: "15 minutes ago",
    icon: IconDatabase
  },
  {
    id: 3,
    type: "warning",
    title: "Performance Alert",
    description: "Page load time exceeded 3 seconds",
    user: "Monitoring System",
    time: "1 hour ago",
    icon: IconAlertTriangle
  },
  {
    id: 4,
    type: "success",
    title: "SEO Score Improved",
    description: "Website SEO score increased from 75 to 78",
    user: "Analytics System",
    time: "2 hours ago",
    icon: IconWorld
  },
  {
    id: 5,
    type: "info",
    title: "New User Registration",
    description: "New user account created: jane.smith@example.com",
    user: "Registration System",
    time: "3 hours ago",
    icon: IconUser
  },
  {
    id: 6,
    type: "success",
    title: "Deployment Successful",
    description: "Latest changes deployed to production",
    user: "CI/CD System",
    time: "4 hours ago",
    icon: IconCircleCheck
  },
  {
    id: 7,
    type: "warning",
    title: "Database Connection",
    description: "Temporary database connection issue resolved",
    user: "System Admin",
    time: "6 hours ago",
    icon: IconDatabase
  },
  {
    id: 8,
    type: "info",
    title: "Security Scan",
    description: "Weekly security vulnerability scan completed",
    user: "Security System",
    time: "1 day ago",
    icon: IconShield
  }
]

const systemLogs = [
  {
    id: 1,
    level: "INFO",
    message: "Server started successfully on port 3000",
    timestamp: "2024-01-15 10:30:00",
    service: "Web Server"
  },
  {
    id: 2,
    level: "WARN",
    message: "High memory usage detected: 85%",
    timestamp: "2024-01-15 10:25:00",
    service: "System Monitor"
  },
  {
    id: 3,
    level: "ERROR",
    message: "Database connection timeout",
    timestamp: "2024-01-15 10:20:00",
    service: "Database"
  },
  {
    id: 4,
    level: "INFO",
    message: "User authentication successful",
    timestamp: "2024-01-15 10:15:00",
    service: "Auth Service"
  },
  {
    id: 5,
    level: "DEBUG",
    message: "API request processed: GET /api/users",
    timestamp: "2024-01-15 10:10:00",
    service: "API Gateway"
  }
]

const userActions = [
  {
    id: 1,
    action: "Login",
    user: "john.doe@example.com",
    ip: "192.168.1.100",
    location: "New York, US",
    timestamp: "2 minutes ago"
  },
  {
    id: 2,
    action: "Component Edit",
    user: "jane.smith@example.com",
    ip: "192.168.1.101",
    location: "London, UK",
    timestamp: "15 minutes ago"
  },
  {
    id: 3,
    action: "Settings Update",
    user: "admin@example.com",
    ip: "192.168.1.102",
    location: "San Francisco, US",
    timestamp: "1 hour ago"
  },
  {
    id: 4,
    action: "File Upload",
    user: "developer@example.com",
    ip: "192.168.1.103",
    location: "Berlin, DE",
    timestamp: "2 hours ago"
  }
]

export default function ActivityPage() {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "success":
        return <IconCircleCheck className="h-5 w-5 text-green-500" />
      case "warning":
        return <IconAlertTriangle className="h-5 w-5 text-yellow-500" />
      case "error":
        return <IconAlertTriangle className="h-5 w-5 text-red-500" />
      default:
        return <IconInfoCircle className="h-5 w-5 text-blue-500" />
    }
  }

  const getLogLevelColor = (level: string) => {
    switch (level) {
      case "ERROR":
        return "text-red-500"
      case "WARN":
        return "text-yellow-500"
      case "INFO":
        return "text-blue-500"
      case "DEBUG":
        return "text-gray-500"
      default:
        return "text-gray-500"
    }
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
                <h1 className="text-3xl font-bold tracking-tight">Activity</h1>
                <p className="text-muted-foreground">
                  Monitor system activities, logs, and user actions
                </p>
              </div>

              <Tabs defaultValue="activities" className="px-4 lg:px-6">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="activities">Activities</TabsTrigger>
                  <TabsTrigger value="logs">System Logs</TabsTrigger>
                  <TabsTrigger value="users">User Actions</TabsTrigger>
                </TabsList>

                <TabsContent value="activities" className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <Input placeholder="Search activities..." />
                    </div>
                    <Button variant="outline">Export</Button>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Activities</CardTitle>
                      <CardDescription>Latest system and user activities</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {activities.map((activity) => (
                          <div key={activity.id} className="flex items-start gap-4 p-4 border rounded-lg">
                            <div className="flex-shrink-0">
                              {getActivityIcon(activity.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <h4 className="font-medium">{activity.title}</h4>
                                <span className="text-sm text-muted-foreground">{activity.time}</span>
                              </div>
                              <p className="text-sm text-muted-foreground mt-1">{activity.description}</p>
                              <div className="flex items-center gap-2 mt-2">
                                <IconUser className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">{activity.user}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="logs" className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <Input placeholder="Search logs..." />
                    </div>
                    <Button variant="outline">Download Logs</Button>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>System Logs</CardTitle>
                      <CardDescription>Real-time system logs and events</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {systemLogs.map((log) => (
                          <div key={log.id} className="flex items-start gap-4 p-3 border rounded-lg font-mono text-sm">
                            <div className="flex-shrink-0">
                              <span className={`font-bold ${getLogLevelColor(log.level)}`}>
                                {log.level}
                              </span>
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between">
                                <span className="text-muted-foreground">{log.timestamp}</span>
                                <Badge variant="outline" className="text-xs">
                                  {log.service}
                                </Badge>
                              </div>
                              <p className="mt-1">{log.message}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="users" className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <Input placeholder="Search user actions..." />
                    </div>
                    <Button variant="outline">Export Report</Button>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle>User Actions</CardTitle>
                      <CardDescription>Track user activities and sessions</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {userActions.map((action) => (
                          <div key={action.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center gap-4">
                              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                <IconUser className="h-5 w-5 text-primary" />
                              </div>
                              <div>
                                <h4 className="font-medium">{action.action}</h4>
                                <p className="text-sm text-muted-foreground">{action.user}</p>
                                <div className="flex items-center gap-4 mt-1">
                                  <span className="text-xs text-muted-foreground">IP: {action.ip}</span>
                                  <span className="text-xs text-muted-foreground">{action.location}</span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-sm text-muted-foreground">{action.timestamp}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <div className="grid gap-4 md:grid-cols-3">
                    <Card>
                      <CardHeader>
                        <CardTitle>Active Sessions</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">24</div>
                        <p className="text-sm text-muted-foreground">
                          Currently active user sessions
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Failed Logins</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">3</div>
                        <p className="text-sm text-muted-foreground">
                          Failed login attempts today
                        </p>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Security Events</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-3xl font-bold">0</div>
                        <p className="text-sm text-muted-foreground">
                          Security alerts in last 24h
                        </p>
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
