"use client"

import React, { useState } from "react"
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  IconUserPlus,
  IconSearch,
  IconFilter,
  IconEdit,
  IconTrash,
  IconShield,
  IconCheck
} from "@tabler/icons-react"

// Mock user data
const mockUsers = [
  {
    id: 1,
    name: "Umut Erol",
    email: "umut@aygitteknoloji.com",
    role: "Admin",
    status: "active",
    company: "Aygıt Teknoloji",
    lastLogin: "2024-01-15",
    avatar: "/avatars/shadcn.jpg",
    permissions: ["Dashboard", "Website Editor", "User Management", "Analytics", "Settings"]
  },
  {
    id: 2,
    name: "Ayşe Yılmaz",
    email: "ayse@aygitteknoloji.com",
    role: "Editor",
    status: "active",
    company: "Aygıt Teknoloji",
    lastLogin: "2024-01-14",
    avatar: "",
    permissions: ["Dashboard", "Website Editor", "Analytics"]
  },
  {
    id: 3,
    name: "Mehmet Demir",
    email: "mehmet@aygitteknoloji.com",
    role: "Viewer",
    status: "inactive",
    company: "Aygıt Teknoloji",
    lastLogin: "2024-01-10",
    avatar: "",
    permissions: ["Dashboard", "Analytics"]
  },
  {
    id: 4,
    name: "Fatma Kaya",
    email: "fatma@aygitteknoloji.com",
    role: "Editor",
    status: "active",
    company: "Aygıt Teknoloji",
    lastLogin: "2024-01-13",
    avatar: "",
    permissions: ["Dashboard", "Website Editor", "Analytics"]
  }
]

const roles = [
  { name: "Admin", color: "bg-red-500", permissions: ["Dashboard", "Website Editor", "User Management", "Analytics", "Settings"] },
  { name: "Editor", color: "bg-blue-500", permissions: ["Dashboard", "Website Editor", "Analytics"] },
  { name: "Viewer", color: "bg-green-500", permissions: ["Dashboard", "Analytics"] }
]

export default function UsersPage() {
  const [users, _setUsers] = useState(mockUsers)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRole, setSelectedRole] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = selectedRole === "all" || user.role === selectedRole
    const matchesStatus = selectedStatus === "all" || user.status === selectedStatus
    
    return matchesSearch && matchesRole && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    if (status === "active") {
      return <Badge className="bg-green-500">Aktif</Badge>
    } else {
      return <Badge variant="secondary">Pasif</Badge>
    }
  }

  const getRoleBadge = (role: string) => {
    const roleData = roles.find(r => r.name === role)
    return (
      <Badge className={roleData?.color || "bg-gray-500"}>
        {role}
      </Badge>
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
                    <h1 className="text-3xl font-bold tracking-tight">Kullanıcı Yönetimi</h1>
                    <p className="text-muted-foreground">
                      Kullanıcıları yönetin, roller ve izinleri düzenleyin
                    </p>
                  </div>
                  <Button asChild>
                    <a href="/dashboard/users/new">
                      <IconUserPlus className="h-4 w-4 mr-2" />
                      Yeni Kullanıcı Ekle
                    </a>
                  </Button>
                </div>
              </div>

              <div className="px-4 lg:px-6">
                <Tabs defaultValue="users" className="w-full">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="users">Kullanıcı Listesi</TabsTrigger>
                    <TabsTrigger value="roles">Roller ve İzinler</TabsTrigger>
                    <TabsTrigger value="activity">Kullanıcı Aktivitesi</TabsTrigger>
                  </TabsList>

                  <TabsContent value="users" className="space-y-4">
                    {/* Filtreler */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Filtreler</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-4 md:grid-cols-4">
                          <div className="space-y-2">
                            <Label>Ara</Label>
                            <div className="relative">
                              <IconSearch className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input
                                placeholder="Kullanıcı ara..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-9"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label>Rol</Label>
                            <select
                              value={selectedRole}
                              onChange={(e) => setSelectedRole(e.target.value)}
                              className="w-full p-2 border rounded-md"
                            >
                              <option value="all">Tüm Roller</option>
                              {roles.map(role => (
                                <option key={role.name} value={role.name}>{role.name}</option>
                              ))}
                            </select>
                          </div>
                          <div className="space-y-2">
                            <Label>Durum</Label>
                            <select
                              value={selectedStatus}
                              onChange={(e) => setSelectedStatus(e.target.value)}
                              className="w-full p-2 border rounded-md"
                            >
                              <option value="all">Tüm Durumlar</option>
                              <option value="active">Aktif</option>
                              <option value="inactive">Pasif</option>
                            </select>
                          </div>
                          <div className="space-y-2">
                            <Label>&nbsp;</Label>
                            <Button 
                              variant="outline" 
                              className="w-full"
                              type="submit"
                            >
                              <IconFilter className="h-4 w-4 mr-2" />
                              Filtrele
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Kullanıcı Listesi */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Kullanıcı Listesi ({filteredUsers.length})</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {filteredUsers.map((user) => (
                            <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                              <div className="flex items-center gap-4">
                                <Avatar>
                                  <AvatarImage src={user.avatar} alt={user.name} />
                                  <AvatarFallback>
                                    {user.name.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <h4 className="font-medium">{user.name}</h4>
                                  <p className="text-sm text-muted-foreground">{user.email}</p>
                                  <div className="flex items-center gap-2 mt-1">
                                    {getRoleBadge(user.role)}
                                    {getStatusBadge(user.status)}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  asChild
                                >
                                  <a href={`/dashboard/users/${user.id}/edit`}>
                                    <IconEdit className="h-4 w-4" />
                                  </a>
                                </Button>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="text-red-500"
                                  type="button"
                                >
                                  <IconTrash className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="roles" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Roller ve İzinler</CardTitle>
                        <CardDescription>
                          Sistem rollerini ve izinlerini yönetin
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          {roles.map((role) => (
                            <div key={role.name} className="border rounded-lg p-4">
                              <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                  <IconShield className="h-5 w-5 text-primary" />
                                  <h3 className="font-medium">{role.name}</h3>
                                  <Badge className={role.color}>
                                    {role.permissions.length} İzin
                                  </Badge>
                                </div>
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  asChild
                                >
                                  <a href={`/dashboard/users/roles/${role.name}/edit`}>
                                    <IconEdit className="h-4 w-4 mr-2" />
                                    Düzenle
                                  </a>
                                </Button>
                              </div>
                              <div className="grid gap-2 md:grid-cols-3">
                                {role.permissions.map((permission, index) => (
                                  <div key={index} className="flex items-center gap-2 text-sm">
                                    <IconCheck className="h-4 w-4 text-green-500" />
                                    {permission}
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="activity" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Kullanıcı Aktivitesi</CardTitle>
                        <CardDescription>
                          Son kullanıcı aktivitelerini görüntüleyin
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {users.map((user) => (
                            <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                              <div className="flex items-center gap-4">
                                <Avatar>
                                  <AvatarImage src={user.avatar} alt={user.name} />
                                  <AvatarFallback>
                                    {user.name.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                                <div>
                                  <h4 className="font-medium">{user.name}</h4>
                                  <p className="text-sm text-muted-foreground">
                                    Son giriş: {user.lastLogin}
                                  </p>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="flex items-center gap-2">
                                  {getStatusBadge(user.status)}
                                  <span className="text-sm text-muted-foreground">
                                    {user.status === "active" ? "Çevrimiçi" : "Çevrimdışı"}
                                  </span>
                                </div>
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
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
