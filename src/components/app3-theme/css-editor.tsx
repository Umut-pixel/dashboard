"use client"

import { useState, useCallback, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/app3-theme/ui/card"
import { Input } from "@/components/app3-theme/ui/input"
import { Label } from "@/components/app3-theme/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/app3-theme/ui/select"
import { Slider } from "@/components/app3-theme/ui/slider"
import { Switch } from "@/components/app3-theme/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/app3-theme/ui/tabs"
import { ModernColorPicker } from './modern-color-picker'
import { Palette, Type, Layout, Zap, Sparkles, Eye, Code } from 'lucide-react'

interface CSSEditorProps {
  componentName: string
  styles: any
  onStyleChange: (property: string, value: string) => void
}

const fontFamilies = [
  'Arial, sans-serif',
  'Helvetica, sans-serif',
  'Times New Roman, serif',
  'Georgia, serif',
  'Verdana, sans-serif',
  'Tahoma, sans-serif',
  'Trebuchet MS, sans-serif',
  'Impact, sans-serif',
  'Comic Sans MS, cursive',
  'Courier New, monospace',
  'Lucida Console, monospace',
  'Palatino, serif',
  'Garamond, serif',
  'Bookman, serif',
  'Avant Garde, sans-serif',
  'Arial Black, sans-serif'
]

const fontWeights = [
  'normal',
  'bold',
  'bolder',
  'lighter',
  '100',
  '200',
  '300',
  '400',
  '500',
  '600',
  '700',
  '800',
  '900'
]

const textAligns = [
  'left',
  'center',
  'right',
  'justify'
]

const textTransforms = [
  'none',
  'capitalize',
  'uppercase',
  'lowercase'
]

const easeFunctions = [
  'linear',
  'ease',
  'ease-in',
  'ease-out',
  'ease-in-out',
  'power1.in',
  'power1.out',
  'power1.inOut',
  'power2.in',
  'power2.out',
  'power2.inOut',
  'power3.in',
  'power3.out',
  'power3.inOut',
  'back.in',
  'back.out',
  'back.inOut',
  'elastic.in',
  'elastic.out',
  'elastic.inOut',
  'bounce.in',
  'bounce.out',
  'bounce.inOut'
]

export function CSSEditor({ componentName, styles, onStyleChange }: CSSEditorProps) {
  const [activeTab, setActiveTab] = useState('colors')
  const [colorValues, setColorValues] = useState({
    color: styles.color || '#000000',
    backgroundColor: styles.backgroundColor || '#ffffff'
  })

  // Update color values when styles change
  useEffect(() => {
    setColorValues({
      color: styles.color || '#000000',
      backgroundColor: styles.backgroundColor || '#ffffff'
    })
  }, [styles.color, styles.backgroundColor])

  const handleInputChange = useCallback((property: string, value: string) => {
    onStyleChange(property, value)
    // Update local color state for color inputs
    if (property === 'color' || property === 'backgroundColor') {
      setColorValues(prev => ({
        ...prev,
        [property]: value
      }))
    }
  }, [onStyleChange])

  const handleColorChange = useCallback((property: string, value: string) => {
    onStyleChange(property, value)
    setColorValues(prev => ({
      ...prev,
      [property]: value
    }))
  }, [onStyleChange])

  const handleSliderChange = useCallback((property: string, value: number[]) => {
    onStyleChange(property, `${value[0]}px`)
  }, [onStyleChange])

  const handleOpacityChange = useCallback((value: number[]) => {
    onStyleChange('opacity', (value[0] / 100).toString())
  }, [onStyleChange])

  // Helper function to validate hex color
  const isValidHexColor = (color: string) => {
    return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(color)
  }

  // Helper function to get default color
  const getDefaultColor = (property: string) => {
    return property === 'color' ? '#000000' : '#ffffff'
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          <div className="p-2 rounded-lg bg-primary/10">
            <Palette className="w-5 h-5 text-primary" />
          </div>
          {componentName} CSS Stilleri
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-muted/50 backdrop-blur-sm">
            <TabsTrigger 
              value="colors" 
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200"
            >
              <Palette className="w-4 h-4" />
              <span className="hidden sm:inline">CSS</span>
            </TabsTrigger>
            <TabsTrigger 
              value="effects" 
              className="flex items-center gap-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all duration-200"
            >
              <Zap className="w-4 h-4" />
              <span className="hidden sm:inline">Animasyonlar</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="colors" className="space-y-4 mt-4">
            <div className="space-y-4">
              <ModernColorPicker
                value={styles.color || ''}
                onChange={(value) => handleColorChange('color', value)}
                label="Metin Rengi"
                placeholder="#000000"
              />
              
              <ModernColorPicker
                value={styles.backgroundColor || ''}
                onChange={(value) => handleColorChange('backgroundColor', value)}
                label="Arka Plan Rengi"
                placeholder="transparent"
              />
            </div>
            
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-sm font-medium">
                <Eye className="w-4 h-4" />
                Şeffaflık
              </Label>
              <div className="flex items-center gap-4">
                <Slider
                  value={[parseFloat(styles.opacity || '1') * 100]}
                  onValueChange={handleOpacityChange}
                  max={100}
                  min={0}
                  step={1}
                  className="flex-1"
                />
                <span className="text-sm text-muted-foreground min-w-[3rem] font-mono">
                  {Math.round((parseFloat(styles.opacity || '1') * 100))}%
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fontSize" className="flex items-center gap-2">
                  <Type className="w-4 h-4" />
                  Font Boyutu
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="fontSize"
                    type="text"
                    value={styles.fontSize || ''}
                    onChange={(e) => handleInputChange('fontSize', e.target.value)}
                    placeholder="16px"
                    className="flex-1 bg-background/50 backdrop-blur-sm"
                  />
                  <div className="w-20">
                    <Slider
                      value={[parseInt(styles.fontSize || '16')]}
                      onValueChange={(value) => handleInputChange('fontSize', `${value[0]}px`)}
                      max={72}
                      min={8}
                      step={1}
                    />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="fontWeight">Font Kalınlığı</Label>
                <Select value={styles.fontWeight || 'normal'} onValueChange={(value) => handleInputChange('fontWeight', value)}>
                  <SelectTrigger className="bg-background/50 backdrop-blur-sm">
                    <SelectValue placeholder="Font kalınlığı" />
                  </SelectTrigger>
                  <SelectContent>
                    {fontWeights.map((weight) => (
                      <SelectItem key={weight} value={weight}>
                        {weight}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="padding">İç Boşluk</Label>
                <Input
                  id="padding"
                  type="text"
                  value={styles.padding || ''}
                  onChange={(e) => handleInputChange('padding', e.target.value)}
                  placeholder="16px"
                  className="bg-background/50 backdrop-blur-sm"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="margin">Dış Boşluk</Label>
                <Input
                  id="margin"
                  type="text"
                  value={styles.margin || ''}
                  onChange={(e) => handleInputChange('margin', e.target.value)}
                  placeholder="0px"
                  className="bg-background/50 backdrop-blur-sm"
                />
              </div>
            </div>

            <div className="space-y-3">
              <Label htmlFor="borderRadius" className="flex items-center gap-2">
                <Layout className="w-4 h-4" />
                Köşe Yuvarlaklığı
              </Label>
              <div className="flex gap-2">
                <Input
                  id="borderRadius"
                  type="text"
                  value={styles.borderRadius || ''}
                  onChange={(e) => handleInputChange('borderRadius', e.target.value)}
                  placeholder="4px"
                  className="flex-1 bg-background/50 backdrop-blur-sm"
                />
                <div className="w-20">
                  <Slider
                    value={[parseInt(styles.borderRadius || '0')]}
                    onValueChange={(value) => handleInputChange('borderRadius', `${value[0]}px`)}
                    max={50}
                    min={0}
                    step={1}
                  />
                </div>
              </div>
            </div>
          </TabsContent>



          <TabsContent value="effects" className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="animation" className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Animasyon Adı
              </Label>
              <Input
                id="animation"
                type="text"
                value={styles.animation || ''}
                onChange={(e) => handleInputChange('animation', e.target.value)}
                placeholder="fadeIn, slideUp, bounce"
                className="bg-background/50 backdrop-blur-sm"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="animationDuration" className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Animasyon Süresi
              </Label>
              <Input
                id="animationDuration"
                type="text"
                value={styles.animationDuration || ''}
                onChange={(e) => handleInputChange('animationDuration', e.target.value)}
                placeholder="0.3s, 1s, 500ms"
                className="bg-background/50 backdrop-blur-sm"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="animationTiming" className="flex items-center gap-2">
                <Code className="w-4 h-4" />
                Animasyon Easing
              </Label>
              <Select value={styles.animationTimingFunction || 'ease'} onValueChange={(value) => handleInputChange('animationTimingFunction', value)}>
                <SelectTrigger className="bg-background/50 backdrop-blur-sm">
                  <SelectValue placeholder="Easing fonksiyonu" />
                </SelectTrigger>
                <SelectContent>
                  {easeFunctions.map((ease) => (
                    <SelectItem key={ease} value={ease}>
                      {ease}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="animationDelay" className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Animasyon Gecikmesi
              </Label>
              <Input
                id="animationDelay"
                type="text"
                value={styles.animationDelay || ''}
                onChange={(e) => handleInputChange('animationDelay', e.target.value)}
                placeholder="0s, 0.5s, 1s"
                className="bg-background/50 backdrop-blur-sm"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="animationIteration" className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Animasyon Tekrarı
              </Label>
              <Input
                id="animationIteration"
                type="text"
                value={styles.animationIterationCount || ''}
                onChange={(e) => handleInputChange('animationIterationCount', e.target.value)}
                placeholder="1, infinite, 3"
                className="bg-background/50 backdrop-blur-sm"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="transition" className="flex items-center gap-2">
                <Code className="w-4 h-4" />
                CSS Geçiş
              </Label>
              <Input
                id="transition"
                type="text"
                value={styles.transition || ''}
                onChange={(e) => handleInputChange('transition', e.target.value)}
                placeholder="all 0.3s ease"
                className="bg-background/50 backdrop-blur-sm"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="transform" className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                CSS Dönüşüm
              </Label>
              <Input
                id="transform"
                type="text"
                value={styles.transform || ''}
                onChange={(e) => handleInputChange('transform', e.target.value)}
                placeholder="scale(1.1) rotate(5deg)"
                className="bg-background/50 backdrop-blur-sm"
              />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
