"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { IconArrowLeft, IconPlus, IconEye, IconEdit, IconExternalLink, IconSettings } from "@tabler/icons-react"
import Link from "next/link"

interface Theme2Project {
  id: string
  name: string
  description: string
  status: 'draft' | 'published' | 'archived'
  lastModified: string
  category: string
  previewUrl?: string
  publishedUrl?: string
}

export default function Theme2Page() {
  const [projects, setProjects] = useState<Theme2Project[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading projects
    const timer = setTimeout(() => {
      setProjects([
        {
          id: '1',
          name: 'Modern Portfolio',
          description: 'Professional portfolio template with modern design',
          status: 'published',
          lastModified: '2024-01-15',
          category: 'Portfolio',
          previewUrl: '/dashboard/themes/theme-2/modern-portfolio',
          publishedUrl: 'https://modern-portfolio.example.com'
        },
        {
          id: '2',
          name: 'E-commerce Store',
          description: 'Complete e-commerce solution with shopping cart',
          status: 'draft',
          lastModified: '2024-01-10',
          category: 'E-commerce',
          previewUrl: '/dashboard/themes/theme-2/ecommerce-store'
        },
        {
          id: '3',
          name: 'Blog Platform',
          description: 'Clean and responsive blog template',
          status: 'published',
          lastModified: '2024-01-08',
          category: 'Blog',
          previewUrl: '/dashboard/themes/theme-2/blog-platform',
          publishedUrl: 'https://blog-platform.example.com'
        }
      ])
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800'
      case 'draft':
        return 'bg-yellow-100 text-yellow-800'
      case 'archived':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'published':
        return 'Yayında'
      case 'draft':
        return 'Taslak'
      case 'archived':
        return 'Arşivlenmiş'
      default:
        return status
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Tema-2 projeleri yükleniyor...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/dashboard/themes">
                <Button variant="outline" size="sm">
                  <IconArrowLeft className="h-4 w-4 mr-2" />
                  Temalara Dön
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-bold">Tema-2 Projeleri</h1>
                <p className="text-muted-foreground">Modern ve profesyonel tema koleksiyonu</p>
              </div>
            </div>
            <Button>
              <IconPlus className="h-4 w-4 mr-2" />
              Yeni Proje Oluştur
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-xl">{project.name}</CardTitle>
                    <Badge className={`mt-2 ${getStatusColor(project.status)}`}>
                      {getStatusText(project.status)}
                    </Badge>
                  </div>
                  <Button variant="ghost" size="icon">
                    <IconSettings className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{project.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Kategori:</span>
                    <span className="font-medium">{project.category}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Son Güncelleme:</span>
                    <span className="font-medium">{project.lastModified}</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  {project.previewUrl && (
                    <Link href={project.previewUrl}>
                      <Button variant="outline" size="sm" className="flex-1">
                        <IconEye className="h-4 w-4 mr-2" />
                        Önizle
                      </Button>
                    </Link>
                  )}
                  <Button variant="outline" size="sm">
                    <IconEdit className="h-4 w-4 mr-2" />
                    Düzenle
                  </Button>
                  {project.publishedUrl && (
                    <Button variant="outline" size="sm">
                      <IconExternalLink className="h-4 w-4 mr-2" />
                      Görüntüle
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {projects.length === 0 && (
          <div className="text-center py-12">
            <div className="mx-auto w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-4">
              <IconPlus className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Henüz proje yok</h3>
            <p className="text-muted-foreground mb-4">
              İlk Tema-2 projenizi oluşturarak başlayın
            </p>
            <Button>
              <IconPlus className="h-4 w-4 mr-2" />
              İlk Projeyi Oluştur
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
