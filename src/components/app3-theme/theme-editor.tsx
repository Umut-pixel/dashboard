"use client"

import { useState, useMemo, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/app3-theme/ui/card"
import { Button } from "@/components/app3-theme/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/app3-theme/ui/tabs"
import { Input } from "@/components/app3-theme/ui/input"
import { Textarea } from "@/components/app3-theme/ui/textarea"
import { useTheme } from './theme-context'
import { CSSEditor } from './css-editor'
import { AnimationEditor } from './animation-editor'
import { Save, RotateCcw, Download, Upload, Settings, Type, Image as ImageIcon, Palette, Play } from 'lucide-react'

export function ThemeEditor() {
  const { themeData, updateThemeData, saveThemeData, resetThemeData } = useTheme()
  const [activeTab, setActiveTab] = useState('hero')

  // Memoized handlers
  const handleTextChange = useCallback((path: string, value: string) => {
    updateThemeData(path, value)
  }, [updateThemeData])

  const handleArrayChange = useCallback((path: string, index: number, value: string) => {
    const keys = path.split('.')
    const currentArray = keys.reduce((obj: any, key) => obj?.[key], themeData) as any[]
    if (Array.isArray(currentArray)) {
      const newArray = [...currentArray]
      newArray[index] = value
      updateThemeData(path, newArray)
    }
  }, [themeData, updateThemeData])

  const handleSave = useCallback(() => {
    saveThemeData()
    // Başarı mesajı göster
    alert('Tema verileri kaydedildi!')
  }, [saveThemeData])

  const handleReset = useCallback(() => {
    if (confirm('Tüm değişiklikler sıfırlanacak. Emin misiniz?')) {
      resetThemeData()
    }
  }, [resetThemeData])

  const handleExport = useCallback(() => {
    const dataStr = JSON.stringify(themeData, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'theme3-data.json'
    link.click()
    URL.revokeObjectURL(url)
  }, [themeData])

  const handleImport = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target?.result as string)
          // Tema verilerini güncelle
          Object.keys(importedData).forEach(key => {
            updateThemeData(key, importedData[key])
          })
          alert('Tema verileri içe aktarıldı!')
        } catch (error) {
          alert('Dosya okunamadı!')
        }
      }
      reader.readAsText(file)
    }
  }, [updateThemeData])

  // Memoized tab list
  const tabList = useMemo(() => [
    { value: 'hero', label: 'Hero', icon: Type },
    { value: 'services', label: 'Hizmetler', icon: Settings },
    { value: 'contact', label: 'İletişim', icon: Type },
    { value: 'footer', label: 'Footer', icon: ImageIcon },
    { value: 'styles', label: 'CSS Stilleri', icon: Palette },
    { value: 'animations', label: 'Animasyonlar', icon: Play }
  ], [])

  // Memoized action buttons
  const actionButtons = useMemo(() => [
    {
      onClick: handleSave,
      variant: 'default' as const,
      className: 'bg-green-500 hover:bg-green-600',
      icon: Save,
      label: 'Kaydet'
    },
    {
      onClick: handleReset,
      variant: 'outline' as const,
      icon: RotateCcw,
      label: 'Sıfırla'
    },
    {
      onClick: handleExport,
      variant: 'outline' as const,
      icon: Download,
      label: 'Dışa Aktar'
    }
  ], [handleSave, handleReset, handleExport])

  return (
    <div className="w-full max-w-4xl mx-auto p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Settings className="w-6 h-6 text-blue-500" />
          <h2 className="text-2xl font-bold">Tema-3 Editörü</h2>
        </div>
        
        <div className="flex gap-2">
          {actionButtons.map((button, index) => (
            <Button
              key={index}
              onClick={button.onClick}
              variant={button.variant}
              className={button.className}
            >
              <button.icon className="h-4 w-4 mr-2" />
              {button.label}
            </Button>
          ))}
          <div className="relative">
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
              id="import-file"
            />
            <label htmlFor="import-file">
              <Button variant="outline" asChild>
                <span>
                  <Upload className="h-4 w-4 mr-2" />
                  İçe Aktar
                </span>
              </Button>
            </label>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6">
          {tabList.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value} className="flex items-center gap-2">
              <tab.icon className="h-4 w-4" />
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="hero" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Hero Bölümü</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Ana Başlık</label>
                <Input
                  value={themeData.hero.title}
                  onChange={(e) => handleTextChange('hero.title', e.target.value)}
                  placeholder="Ana başlık"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Alt Başlık</label>
                <Input
                  value={themeData.hero.subtitle}
                  onChange={(e) => handleTextChange('hero.subtitle', e.target.value)}
                  placeholder="Alt başlık"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Açıklama</label>
                <Textarea
                  value={themeData.hero.description}
                  onChange={(e) => handleTextChange('hero.description', e.target.value)}
                  placeholder="Açıklama metni"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">1. Buton Metni</label>
                  <Input
                    value={themeData.hero.button1Text}
                    onChange={(e) => handleTextChange('hero.button1Text', e.target.value)}
                    placeholder="1. buton metni"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">2. Buton Metni</label>
                  <Input
                    value={themeData.hero.button2Text}
                    onChange={(e) => handleTextChange('hero.button2Text', e.target.value)}
                    placeholder="2. buton metni"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Arka Plan Resmi URL</label>
                <Input
                  value={themeData.hero.backgroundImage}
                  onChange={(e) => handleTextChange('hero.backgroundImage', e.target.value)}
                  placeholder="Resim URL'si"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Hizmetler Bölümü</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Başlık</label>
                <Input
                  value={themeData.services.title}
                  onChange={(e) => handleTextChange('services.title', e.target.value)}
                  placeholder="Hizmetler başlığı"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Alt Başlık</label>
                <Textarea
                  value={themeData.services.subtitle}
                  onChange={(e) => handleTextChange('services.subtitle', e.target.value)}
                  placeholder="Hizmetler açıklaması"
                  rows={2}
                />
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium">Hizmet Öğeleri</h4>
                {themeData.services.items.map((item, index) => (
                  <Card key={index} className="p-4">
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium mb-1">Hizmet {index + 1} - Başlık</label>
                        <Input
                          value={item.title}
                          onChange={(e) => updateThemeData(`services.items.${index}.title`, e.target.value)}
                          placeholder="Hizmet başlığı"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Açıklama</label>
                        <Textarea
                          value={item.description}
                          onChange={(e) => updateThemeData(`services.items.${index}.description`, e.target.value)}
                          placeholder="Hizmet açıklaması"
                          rows={2}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">Özellikler (virgülle ayırın)</label>
                        <Input
                          value={item.features.join(', ')}
                          onChange={(e) => updateThemeData(`services.items.${index}.features`, e.target.value.split(', ').filter(f => f.trim()))}
                          placeholder="Özellik 1, Özellik 2, Özellik 3"
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>İletişim Bölümü</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Başlık</label>
                <Input
                  value={themeData.contact.title}
                  onChange={(e) => handleTextChange('contact.title', e.target.value)}
                  placeholder="İletişim başlığı"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Alt Başlık</label>
                <Textarea
                  value={themeData.contact.subtitle}
                  onChange={(e) => handleTextChange('contact.subtitle', e.target.value)}
                  placeholder="İletişim açıklaması"
                  rows={2}
                />
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">E-posta</label>
                  <Input
                    value={themeData.contact.email}
                    onChange={(e) => handleTextChange('contact.email', e.target.value)}
                    placeholder="E-posta adresi"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Telefon</label>
                  <Input
                    value={themeData.contact.phone}
                    onChange={(e) => handleTextChange('contact.phone', e.target.value)}
                    placeholder="Telefon numarası"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Adres</label>
                  <Input
                    value={themeData.contact.address}
                    onChange={(e) => handleTextChange('contact.address', e.target.value)}
                    placeholder="Adres"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="footer" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Footer Bölümü</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Logo URL</label>
                <Input
                  value={themeData.footer.logo}
                  onChange={(e) => handleTextChange('footer.logo', e.target.value)}
                  placeholder="Logo URL'si"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Açıklama</label>
                <Textarea
                  value={themeData.footer.description}
                  onChange={(e) => handleTextChange('footer.description', e.target.value)}
                  placeholder="Footer açıklaması"
                  rows={2}
                />
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">E-posta</label>
                  <Input
                    value={themeData.footer.email}
                    onChange={(e) => handleTextChange('footer.email', e.target.value)}
                    placeholder="E-posta adresi"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Telefon</label>
                  <Input
                    value={themeData.footer.phone}
                    onChange={(e) => handleTextChange('footer.phone', e.target.value)}
                    placeholder="Telefon numarası"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Adres</label>
                  <Input
                    value={themeData.footer.address}
                    onChange={(e) => handleTextChange('footer.address', e.target.value)}
                    placeholder="Adres"
                  />
                </div>
              </div>
                      </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="styles" className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <CSSEditor
            componentName="Hero Bölümü"
            styles={themeData?.styles?.hero || {}}
            onStyleChange={(property, value) => updateThemeData(`styles.hero.${property}`, value)}
          />
          <CSSEditor
            componentName="Hizmetler Bölümü"
            styles={themeData?.styles?.services || {}}
            onStyleChange={(property, value) => updateThemeData(`styles.services.${property}`, value)}
          />
          <CSSEditor
            componentName="İletişim Bölümü"
            styles={themeData?.styles?.contact || {}}
            onStyleChange={(property, value) => updateThemeData(`styles.contact.${property}`, value)}
          />
          <CSSEditor
            componentName="Footer Bölümü"
            styles={themeData?.styles?.footer || {}}
            onStyleChange={(property, value) => updateThemeData(`styles.footer.${property}`, value)}
          />
          <CSSEditor
            componentName="Navigasyon"
            styles={themeData?.styles?.navigation || {}}
            onStyleChange={(property, value) => updateThemeData(`styles.navigation.${property}`, value)}
          />
          <CSSEditor
            componentName="Butonlar"
            styles={themeData?.styles?.buttons || {}}
            onStyleChange={(property, value) => updateThemeData(`styles.buttons.${property}`, value)}
          />
          <CSSEditor
            componentName="Kartlar"
            styles={themeData?.styles?.cards || {}}
            onStyleChange={(property, value) => updateThemeData(`styles.cards.${property}`, value)}
          />
          <CSSEditor
            componentName="Metin"
            styles={themeData?.styles?.text || {}}
            onStyleChange={(property, value) => updateThemeData(`styles.text.${property}`, value)}
          />
        </div>
      </TabsContent>

      <TabsContent value="animations" className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <AnimationEditor
            componentName="Hero Bölümü"
            animation={themeData?.animations?.hero || {
              enabled: false,
              type: 'fadeIn',
              duration: 1,
              delay: 0,
              ease: 'power2.out',
              direction: 'normal',
              repeat: 0
            }}
            onAnimationChange={(property, value) => updateThemeData(`animations.hero.${property}`, value)}
          />
          <AnimationEditor
            componentName="Hizmetler Bölümü"
            animation={themeData?.animations?.services || {
              enabled: false,
              type: 'fadeIn',
              duration: 1,
              delay: 0,
              ease: 'power2.out',
              direction: 'normal',
              repeat: 0
            }}
            onAnimationChange={(property, value) => updateThemeData(`animations.services.${property}`, value)}
          />
          <AnimationEditor
            componentName="İletişim Bölümü"
            animation={themeData?.animations?.contact || {
              enabled: false,
              type: 'fadeIn',
              duration: 1,
              delay: 0,
              ease: 'power2.out',
              direction: 'normal',
              repeat: 0
            }}
            onAnimationChange={(property, value) => updateThemeData(`animations.contact.${property}`, value)}
          />
          <AnimationEditor
            componentName="Footer Bölümü"
            animation={themeData?.animations?.footer || {
              enabled: false,
              type: 'fadeIn',
              duration: 1,
              delay: 0,
              ease: 'power2.out',
              direction: 'normal',
              repeat: 0
            }}
            onAnimationChange={(property, value) => updateThemeData(`animations.footer.${property}`, value)}
          />
          <AnimationEditor
            componentName="Navigasyon"
            animation={themeData?.animations?.navigation || {
              enabled: false,
              type: 'fadeIn',
              duration: 1,
              delay: 0,
              ease: 'power2.out',
              direction: 'normal',
              repeat: 0
            }}
            onAnimationChange={(property, value) => updateThemeData(`animations.navigation.${property}`, value)}
          />
          <AnimationEditor
            componentName="Butonlar"
            animation={themeData?.animations?.buttons || {
              enabled: false,
              type: 'fadeIn',
              duration: 1,
              delay: 0,
              ease: 'power2.out',
              direction: 'normal',
              repeat: 0
            }}
            onAnimationChange={(property, value) => updateThemeData(`animations.buttons.${property}`, value)}
          />
          <AnimationEditor
            componentName="Kartlar"
            animation={themeData?.animations?.cards || {
              enabled: false,
              type: 'fadeIn',
              duration: 1,
              delay: 0,
              ease: 'power2.out',
              direction: 'normal',
              repeat: 0
            }}
            onAnimationChange={(property, value) => updateThemeData(`animations.cards.${property}`, value)}
          />
        </div>
      </TabsContent>
    </Tabs>
  </div>
)
}
