"use client"

import React, { useState, useEffect } from "react"
import ContentEditable from "react-contenteditable"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { 
  IconCode,
  IconPalette,
  IconDeviceMobile,
  IconSearch,
  IconRocket,
  IconShield
} from "@tabler/icons-react"

interface ServicesSectionProps {
  title?: string
  description?: string
  services?: Array<{
    icon: any
    title: string
    description: string
    features: string[]
  }>
  isEditing?: boolean
  onTitleChange?: (title: string) => void
  onDescriptionChange?: (description: string) => void
}

export function ServicesSection({ 
  title = "Hizmetlerimiz",
  description = "Dijital dönüşümünüz için ihtiyacınız olan tüm hizmetleri sunuyoruz. Modern teknolojiler ve yaratıcı çözümlerle işinizi büyütün.",
  services = [
    {
      icon: IconCode,
      title: "Web Geliştirme",
      description: "Modern ve responsive website'ler geliştiriyoruz. React, Next.js ve en güncel teknolojileri kullanıyoruz.",
      features: ["React & Next.js", "TypeScript", "Responsive Design", "SEO Optimizasyonu"]
    },
    {
      icon: IconPalette,
      title: "UI/UX Tasarım",
      description: "Kullanıcı deneyimini ön planda tutan, modern ve estetik tasarımlar oluşturuyoruz.",
      features: ["Wireframing", "Prototyping", "User Research", "Design Systems"]
    },
    {
      icon: IconDeviceMobile,
      title: "Mobil Uygulama",
      description: "iOS ve Android platformları için native ve cross-platform mobil uygulamalar geliştiriyoruz.",
      features: ["React Native", "Flutter", "Native iOS/Android", "App Store Optimization"]
    },
    {
      icon: IconSearch,
      title: "SEO & Pazarlama",
      description: "Arama motoru optimizasyonu ve dijital pazarlama stratejileri ile görünürlüğünüzü artırıyoruz.",
      features: ["SEO Analizi", "Content Marketing", "Social Media", "Analytics"]
    },
    {
      icon: IconRocket,
      title: "Performans Optimizasyonu",
      description: "Website'lerinizi hızlandırıyor ve kullanıcı deneyimini iyileştiriyoruz.",
      features: ["Speed Optimization", "Caching", "CDN", "Performance Monitoring"]
    },
    {
      icon: IconShield,
      title: "Güvenlik & Bakım",
      description: "Website'lerinizi güvende tutuyor ve düzenli bakım hizmetleri sunuyoruz.",
      features: ["Security Audits", "Regular Updates", "Backup Services", "24/7 Monitoring"]
    }
  ],
  isEditing = false,
  onTitleChange,
  onDescriptionChange
}: ServicesSectionProps) {
  const [localTitle, setLocalTitle] = useState(title)
  const [localDescription, setLocalDescription] = useState(description)

  // Update local state when props change
  useEffect(() => {
    setLocalTitle(title)
  }, [title])

  useEffect(() => {
    setLocalDescription(description)
  }, [description])

  const handleTitleChange = (e: any) => {
    const newTitle = e.target.value
    setLocalTitle(newTitle)
    onTitleChange?.(newTitle)
  }

  const handleDescriptionChange = (e: any) => {
    const newDescription = e.target.value
    setLocalDescription(newDescription)
    onDescriptionChange?.(newDescription)
  }

  return (
    <section className="py-20 bg-gray-50" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          {isEditing ? (
            <ContentEditable
              html={localTitle}
              onChange={handleTitleChange}
              className="text-4xl font-bold text-gray-900 mb-4 outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded px-2 py-1 cursor-text"
              tagName="h2"
              onBlur={() => onTitleChange?.(localTitle)}
              onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  e.currentTarget.blur()
                }
              }}
            />
          ) : (
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              {localTitle}
            </h2>
          )}
          
          {isEditing ? (
            <ContentEditable
              html={localDescription}
              onChange={handleDescriptionChange}
              className="text-xl text-gray-600 max-w-3xl mx-auto outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded px-2 py-1 cursor-text"
              tagName="p"
              onBlur={() => onDescriptionChange?.(localDescription)}
              onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => {
                if (e.key === 'Enter') {
                  e.preventDefault()
                  e.currentTarget.blur()
                }
              }}
            />
          ) : (
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {localDescription}
            </p>
          )}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300 border-0 bg-white">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <service.icon className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <CardDescription className="text-gray-600 mb-6 leading-relaxed">
                  {service.description}
                </CardDescription>
                
                {/* Features */}
                <div className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center justify-center text-sm text-gray-500">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                      {feature}
                    </div>
                  ))}
                </div>

                {/* CTA Button */}
                <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors">
                  Detayları Gör
                </button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Projenizi Hayata Geçirelim
            </h3>
            <p className="text-gray-600 mb-6">
              Hangi hizmete ihtiyacınız olduğunu biliyoruz. Hemen iletişime geçin ve 
              ücretsiz danışmanlık alın.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors">
                Ücretsiz Danışmanlık
              </button>
              <button className="border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-3 px-8 rounded-lg transition-colors">
                Portföyümüzü İnceleyin
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
