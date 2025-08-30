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
import { 
  Save, 
  RotateCcw, 
  Download, 
  Upload, 
  Settings, 
  Type, 
  Image as ImageIcon, 
  Palette, 
  Play,
  Sparkles,
  Wand2,
  Zap,
  Eye,
  Code,
  Layers,
  MessageSquare,
  FileText
} from 'lucide-react'
import { Label } from '@/components/app3-theme/ui/label'

export function ThemeEditor() {
  const { themeData, updateThemeData, saveThemeData, resetThemeData } = useTheme()
  const [activeTab, setActiveTab] = useState('hero')

  // Memoized handlers
  const handleTextChange = useCallback((path: string, value: string) => {
    updateThemeData(path, value)
  }, [updateThemeData])

  const _handleArrayChange = useCallback((path: string, index: number, value: string) => {
    const keys = path.split('.')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const currentArray = keys.reduce((obj: any, key) => obj?.[key], themeData) as string[]
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
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const importedData: any = JSON.parse(e.target?.result as string)
          // Tema verilerini güncelle
          Object.keys(importedData).forEach(key => {
            updateThemeData(key, importedData[key])
          })
          alert('Tema verileri içe aktarıldı!')
        } catch (_error) {
          alert('Dosya okunamadı!')
        }
      }
      reader.readAsText(file)
    }
  }, [updateThemeData])

  // Memoized tab list with enhanced icons and descriptions
  const tabList = useMemo(() => [
    { 
      value: 'hero', 
      label: 'Hero', 
      icon: Eye,
      description: 'Ana başlık ve görsel alanı'
    },
    { 
      value: 'services', 
      label: 'Hizmetler', 
      icon: Settings,
      description: 'Hizmet kartları ve özellikler'
    },
    { 
      value: 'contact', 
      label: 'İletişim', 
      icon: MessageSquare,
      description: 'İletişim bilgileri ve form'
    },
    { 
      value: 'footer', 
      label: 'Footer', 
      icon: Layers,
      description: 'Alt bilgi ve sosyal medya'
    },
    { 
      value: 'styles', 
      label: 'CSS Stilleri', 
      icon: Palette,
      description: 'Gelişmiş stil düzenleme'
    },
    { 
      value: 'animations', 
      label: 'Animasyonlar', 
      icon: Play,
      description: 'GSAP animasyon ayarları'
    }
  ], [])

  // Memoized action buttons
  const actionButtons = useMemo(() => [
    {
      onClick: handleSave,
      variant: 'default' as const,
      className: 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300',
      icon: Save,
      label: 'Kaydet'
    },
    {
      onClick: handleReset,
      variant: 'outline' as const,
      className: 'hover:bg-destructive hover:text-destructive-foreground border-destructive/20 hover:border-destructive transition-all duration-300',
      icon: RotateCcw,
      label: 'Sıfırla'
    },
    {
      onClick: handleExport,
      variant: 'outline' as const,
      className: 'hover:bg-primary hover:text-primary-foreground border-primary/20 hover:border-primary transition-all duration-300',
      icon: Download,
      label: 'Dışa Aktar'
    }
  ], [handleSave, handleReset, handleExport])

  return (
    <div className="space-y-6">
      {/* Header with enhanced styling */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg border border-primary/20">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Wand2 className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Tema-3 Editörü
            </h2>
            <p className="text-sm text-muted-foreground">
              Gerçek zamanlı tema düzenleme ve önizleme
            </p>
          </div>
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
              <Button 
                variant="outline" 
                className="hover:bg-secondary hover:text-secondary-foreground border-secondary/20 hover:border-secondary transition-all duration-300"
              >
                <Upload className="h-4 w-4 mr-2" />
                İçe Aktar
              </Button>
            </label>
          </div>
        </div>
      </div>

      {/* Enhanced Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-6 bg-muted/50 backdrop-blur-sm p-1 rounded-lg">
          {tabList.map((tab) => (
            <TabsTrigger 
              key={tab.value} 
              value={tab.value} 
              className="flex flex-col items-center gap-1 p-3 data-[state=active]:bg-background data-[state=active]:shadow-md data-[state=active]:text-primary transition-all duration-300 rounded-md"
            >
              <tab.icon className="h-4 w-4" />
              <span className="text-xs font-medium">{tab.label}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Hero Section */}
        <TabsContent value="hero" className="space-y-4 mt-6">
          <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg font-semibold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Eye className="w-5 h-5 text-primary" />
                </div>
                Hero Bölümü
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-sm font-medium">
                    <Type className="w-4 h-4" />
                    Ana Başlık
                  </Label>
                  <Input
                    value={themeData.hero.title}
                    onChange={(e) => handleTextChange('hero.title', e.target.value)}
                    placeholder="Ana başlık"
                    className="bg-background/50 backdrop-blur-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-sm font-medium">
                    <FileText className="w-4 h-4" />
                    Alt Başlık
                  </Label>
                  <Input
                    value={themeData.hero.subtitle}
                    onChange={(e) => handleTextChange('hero.subtitle', e.target.value)}
                    placeholder="Alt başlık"
                    className="bg-background/50 backdrop-blur-sm"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-medium">
                  <MessageSquare className="w-4 h-4" />
                  Açıklama
                </Label>
                <Textarea
                  value={themeData.hero.description}
                  onChange={(e) => handleTextChange('hero.description', e.target.value)}
                  placeholder="Açıklama metni"
                  rows={3}
                  className="bg-background/50 backdrop-blur-sm"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-sm font-medium">
                    <Zap className="w-4 h-4" />
                    1. Buton Metni
                  </Label>
                  <Input
                    value={themeData.hero.button1Text}
                    onChange={(e) => handleTextChange('hero.button1Text', e.target.value)}
                    placeholder="1. buton metni"
                    className="bg-background/50 backdrop-blur-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-sm font-medium">
                    <Zap className="w-4 h-4" />
                    2. Buton Metni
                  </Label>
                  <Input
                    value={themeData.hero.button2Text}
                    onChange={(e) => handleTextChange('hero.button2Text', e.target.value)}
                    placeholder="2. buton metni"
                    className="bg-background/50 backdrop-blur-sm"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-medium">
                  <ImageIcon className="w-4 h-4" />
                  Arka Plan Resmi URL
                </Label>
                <Input
                  value={themeData.hero.backgroundImage}
                  onChange={(e) => handleTextChange('hero.backgroundImage', e.target.value)}
                  placeholder="Resim URL'si"
                  className="bg-background/50 backdrop-blur-sm"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Services Section */}
        <TabsContent value="services" className="space-y-4 mt-6">
          <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg font-semibold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Settings className="w-5 h-5 text-primary" />
                </div>
                Hizmetler Bölümü
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-medium">
                  <Type className="w-4 h-4" />
                  Başlık
                </Label>
                <Input
                  value={themeData.services.title}
                  onChange={(e) => handleTextChange('services.title', e.target.value)}
                  placeholder="Hizmetler başlığı"
                  className="bg-background/50 backdrop-blur-sm"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-medium">
                  <FileText className="w-4 h-4" />
                  Alt Başlık
                </Label>
                <Textarea
                  value={themeData.services.subtitle}
                  onChange={(e) => handleTextChange('services.subtitle', e.target.value)}
                  placeholder="Hizmetler açıklaması"
                  rows={2}
                  className="bg-background/50 backdrop-blur-sm"
                />
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  Hizmet Öğeleri
                </h4>
                {themeData.services.items.map((item, index) => (
                  <Card key={index} className="p-4 bg-background/30 backdrop-blur-sm border border-border/50">
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <Label className="flex items-center gap-2 text-sm font-medium">
                          <Settings className="w-4 h-4" />
                          Hizmet {index + 1} - Başlık
                        </Label>
                        <Input
                          value={item.title}
                          onChange={(e) => updateThemeData(`services.items.${index}.title`, e.target.value)}
                          placeholder="Hizmet başlığı"
                          className="bg-background/50 backdrop-blur-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="flex items-center gap-2 text-sm font-medium">
                          <MessageSquare className="w-4 h-4" />
                          Açıklama
                        </Label>
                        <Textarea
                          value={item.description}
                          onChange={(e) => updateThemeData(`services.items.${index}.description`, e.target.value)}
                          placeholder="Hizmet açıklaması"
                          rows={2}
                          className="bg-background/50 backdrop-blur-sm"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="flex items-center gap-2 text-sm font-medium">
                          <Code className="w-4 h-4" />
                          Özellikler (virgülle ayırın)
                        </Label>
                        <Input
                          value={item.features.join(', ')}
                          onChange={(e) => updateThemeData(`services.items.${index}.features`, e.target.value.split(', ').filter(f => f.trim()))}
                          placeholder="Özellik 1, Özellik 2, Özellik 3"
                          className="bg-background/50 backdrop-blur-sm"
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Contact Section */}
        <TabsContent value="contact" className="space-y-4 mt-6">
          <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg font-semibold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                <div className="p-2 rounded-lg bg-primary/10">
                  <MessageSquare className="w-5 h-5 text-primary" />
                </div>
                İletişim Bölümü
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-medium">
                  <Type className="w-4 h-4" />
                  Başlık
                </Label>
                <Input
                  value={themeData.contact.title}
                  onChange={(e) => handleTextChange('contact.title', e.target.value)}
                  placeholder="İletişim başlığı"
                  className="bg-background/50 backdrop-blur-sm"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-medium">
                  <FileText className="w-4 h-4" />
                  Alt Başlık
                </Label>
                <Textarea
                  value={themeData.contact.subtitle}
                  onChange={(e) => handleTextChange('contact.subtitle', e.target.value)}
                  placeholder="İletişim açıklaması"
                  rows={2}
                  className="bg-background/50 backdrop-blur-sm"
                />
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-sm font-medium">
                    <MessageSquare className="w-4 h-4" />
                    E-posta
                  </Label>
                  <Input
                    value={themeData.contact.email}
                    onChange={(e) => handleTextChange('contact.email', e.target.value)}
                    placeholder="E-posta adresi"
                    className="bg-background/50 backdrop-blur-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-sm font-medium">
                    <MessageSquare className="w-4 h-4" />
                    Telefon
                  </Label>
                  <Input
                    value={themeData.contact.phone}
                    onChange={(e) => handleTextChange('contact.phone', e.target.value)}
                    placeholder="Telefon numarası"
                    className="bg-background/50 backdrop-blur-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-sm font-medium">
                    <MessageSquare className="w-4 h-4" />
                    Adres
                  </Label>
                  <Input
                    value={themeData.contact.address}
                    onChange={(e) => handleTextChange('contact.address', e.target.value)}
                    placeholder="Adres"
                    className="bg-background/50 backdrop-blur-sm"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Footer Section */}
        <TabsContent value="footer" className="space-y-4 mt-6">
          <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg font-semibold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Layers className="w-5 h-5 text-primary" />
                </div>
                Footer Bölümü
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-medium">
                  <ImageIcon className="w-4 h-4" />
                  Logo URL
                </Label>
                <Input
                  value={themeData.footer.logo}
                  onChange={(e) => handleTextChange('footer.logo', e.target.value)}
                  placeholder="Logo URL'si"
                  className="bg-background/50 backdrop-blur-sm"
                />
              </div>
              
              <div className="space-y-2">
                <Label className="flex items-center gap-2 text-sm font-medium">
                  <FileText className="w-4 h-4" />
                  Açıklama
                </Label>
                <Textarea
                  value={themeData.footer.description}
                  onChange={(e) => handleTextChange('footer.description', e.target.value)}
                  placeholder="Footer açıklaması"
                  rows={2}
                  className="bg-background/50 backdrop-blur-sm"
                />
              </div>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-sm font-medium">
                    <MessageSquare className="w-4 h-4" />
                    E-posta
                  </Label>
                  <Input
                    value={themeData.footer.email}
                    onChange={(e) => handleTextChange('footer.email', e.target.value)}
                    placeholder="E-posta adresi"
                    className="bg-background/50 backdrop-blur-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-sm font-medium">
                    <MessageSquare className="w-4 h-4" />
                    Telefon
                  </Label>
                  <Input
                    value={themeData.footer.phone}
                    onChange={(e) => handleTextChange('footer.phone', e.target.value)}
                    placeholder="Telefon numarası"
                    className="bg-background/50 backdrop-blur-sm"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2 text-sm font-medium">
                    <MessageSquare className="w-4 h-4" />
                    Adres
                  </Label>
                  <Input
                    value={themeData.footer.address}
                    onChange={(e) => handleTextChange('footer.address', e.target.value)}
                    placeholder="Adres"
                    className="bg-background/50 backdrop-blur-sm"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* CSS Styles */}
        <TabsContent value="styles" className="space-y-6 mt-6">
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

        {/* Animations */}
        <TabsContent value="animations" className="space-y-6 mt-6">
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
