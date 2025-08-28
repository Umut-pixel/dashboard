"use client"

import { useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/app3-theme/ui/card"
import { Input } from "@/components/app3-theme/ui/input"
import { Label } from "@/components/app3-theme/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/app3-theme/ui/select"
import { Slider } from "@/components/app3-theme/ui/slider"
import { Switch } from "@/components/app3-theme/ui/switch"
import { Textarea } from "@/components/app3-theme/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/app3-theme/ui/tabs"
import { Play, Settings, Code, Zap } from 'lucide-react'

interface AnimationEditorProps {
  componentName: string
  animation: any
  onAnimationChange: (property: string, value: any) => void
}

const animationTypes = [
  { value: 'fadeIn', label: 'Fade In', description: 'Yavaşça görünür hale gelir' },
  { value: 'slideIn', label: 'Slide In', description: 'Kayarak girer' },
  { value: 'bounce', label: 'Bounce', description: 'Zıplama efekti' },
  { value: 'scale', label: 'Scale', description: 'Boyut değişimi' },
  { value: 'rotate', label: 'Rotate', description: 'Döndürme efekti' },
  { value: 'custom', label: 'Custom', description: 'Özel animasyon kodu' }
]

const easeFunctions = [
  { value: 'linear', label: 'Linear' },
  { value: 'ease', label: 'Ease' },
  { value: 'ease-in', label: 'Ease In' },
  { value: 'ease-out', label: 'Ease Out' },
  { value: 'ease-in-out', label: 'Ease In Out' },
  { value: 'power1.in', label: 'Power1 In' },
  { value: 'power1.out', label: 'Power1 Out' },
  { value: 'power1.inOut', label: 'Power1 InOut' },
  { value: 'power2.in', label: 'Power2 In' },
  { value: 'power2.out', label: 'Power2 Out' },
  { value: 'power2.inOut', label: 'Power2 InOut' },
  { value: 'power3.in', label: 'Power3 In' },
  { value: 'power3.out', label: 'Power3 Out' },
  { value: 'power3.inOut', label: 'Power3 InOut' },
  { value: 'back.in', label: 'Back In' },
  { value: 'back.out', label: 'Back Out' },
  { value: 'back.inOut', label: 'Back InOut' },
  { value: 'elastic.in', label: 'Elastic In' },
  { value: 'elastic.out', label: 'Elastic Out' },
  { value: 'elastic.inOut', label: 'Elastic InOut' },
  { value: 'bounce.in', label: 'Bounce In' },
  { value: 'bounce.out', label: 'Bounce Out' },
  { value: 'bounce.inOut', label: 'Bounce InOut' }
]

const directions = [
  { value: 'normal', label: 'Normal' },
  { value: 'reverse', label: 'Reverse' },
  { value: 'alternate', label: 'Alternate' }
]

const customAnimationExamples = {
  fadeIn: `gsap.from(element, {
  opacity: 0,
  duration: 1,
  ease: "power2.out"
})`,
  slideIn: `gsap.from(element, {
  x: -100,
  opacity: 0,
  duration: 1,
  ease: "power2.out"
})`,
  bounce: `gsap.from(element, {
  y: -50,
  opacity: 0,
  duration: 1,
  ease: "bounce.out"
})`,
  scale: `gsap.from(element, {
  scale: 0,
  opacity: 0,
  duration: 0.8,
  ease: "back.out(1.7)"
})`,
  rotate: `gsap.from(element, {
  rotation: 360,
  opacity: 0,
  duration: 1,
  ease: "power2.out"
})`
}

export function AnimationEditor({ componentName, animation, onAnimationChange }: AnimationEditorProps) {
  const [activeTab, setActiveTab] = useState('settings')
  const [previewAnimation, setPreviewAnimation] = useState(false)

  const handleInputChange = useCallback((property: string, value: any) => {
    onAnimationChange(property, value)
  }, [onAnimationChange])

  const handleSliderChange = useCallback((property: string, value: number[]) => {
    onAnimationChange(property, value[0])
  }, [onAnimationChange])

  const handleAnimationTypeChange = useCallback((type: string) => {
    onAnimationChange('type', type)
    if (type === 'custom' && !animation.customCode) {
      onAnimationChange('customCode', customAnimationExamples.fadeIn)
    }
  }, [onAnimationChange, animation.customCode])

  const handlePreviewAnimation = useCallback(() => {
    setPreviewAnimation(true)
    setTimeout(() => setPreviewAnimation(false), 2000)
  }, [])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Play className="w-5 h-5" />
          {componentName} Animasyon Ayarları
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Switch
              checked={animation.enabled || false}
              onCheckedChange={(checked) => handleInputChange('enabled', checked)}
            />
            <Label>Animasyonu Etkinleştir</Label>
          </div>
          {animation.enabled && (
            <button
              onClick={handlePreviewAnimation}
              className="flex items-center gap-2 px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              <Play className="w-4 h-4" />
              Önizle
            </button>
          )}
        </div>

        {animation.enabled && (
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="settings" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Ayarlar
              </TabsTrigger>
              <TabsTrigger value="timing" className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Zamanlama
              </TabsTrigger>
              <TabsTrigger value="custom" className="flex items-center gap-2">
                <Code className="w-4 h-4" />
                Özel Kod
              </TabsTrigger>
            </TabsList>

            <TabsContent value="settings" className="space-y-4">
              <div>
                <Label htmlFor="animationType">Animasyon Tipi</Label>
                <Select value={animation.type || 'fadeIn'} onValueChange={handleAnimationTypeChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Animasyon tipi seçin" />
                  </SelectTrigger>
                  <SelectContent>
                    {animationTypes.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        <div>
                          <div className="font-medium">{type.label}</div>
                          <div className="text-xs text-muted-foreground">{type.description}</div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {animation.type === 'custom' && (
                <div>
                  <Label htmlFor="customCode">Özel Animasyon Kodu</Label>
                  <Textarea
                    id="customCode"
                    value={animation.customCode || ''}
                    onChange={(e) => handleInputChange('customCode', e.target.value)}
                    placeholder="GSAP animasyon kodunuzu buraya yazın..."
                    rows={6}
                    className="font-mono text-sm"
                  />
                  <div className="mt-2 text-xs text-muted-foreground">
                    <p>Örnek kodlar:</p>
                    <div className="mt-1 space-y-1">
                      {Object.entries(customAnimationExamples).map(([key, code]) => (
                        <button
                          key={key}
                          onClick={() => handleInputChange('customCode', code)}
                          className="block text-left text-blue-500 hover:text-blue-600"
                        >
                          {key} - {code.split('\n')[0].replace('gsap.from(element, {', '').replace('})', '')}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="timing" className="space-y-4">
              <div>
                <Label>Süre (saniye)</Label>
                <div className="flex items-center gap-4 mt-2">
                  <Slider
                    value={[animation.duration || 1]}
                    onValueChange={(value) => handleSliderChange('duration', value)}
                    max={5}
                    min={0.1}
                    step={0.1}
                    className="flex-1"
                  />
                  <span className="text-sm text-muted-foreground min-w-[3rem]">
                    {animation.duration || 1}s
                  </span>
                </div>
              </div>

              <div>
                <Label>Gecikme (saniye)</Label>
                <div className="flex items-center gap-4 mt-2">
                  <Slider
                    value={[animation.delay || 0]}
                    onValueChange={(value) => handleSliderChange('delay', value)}
                    max={3}
                    min={0}
                    step={0.1}
                    className="flex-1"
                  />
                  <span className="text-sm text-muted-foreground min-w-[3rem]">
                    {animation.delay || 0}s
                  </span>
                </div>
              </div>

              <div>
                <Label htmlFor="ease">Easing Fonksiyonu</Label>
                <Select value={animation.ease || 'power2.out'} onValueChange={(value) => handleInputChange('ease', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Easing fonksiyonu" />
                  </SelectTrigger>
                  <SelectContent>
                    {easeFunctions.map((ease) => (
                      <SelectItem key={ease.value} value={ease.value}>
                        {ease.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="direction">Yön</Label>
                <Select value={animation.direction || 'normal'} onValueChange={(value) => handleInputChange('direction', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Animasyon yönü" />
                  </SelectTrigger>
                  <SelectContent>
                    {directions.map((direction) => (
                      <SelectItem key={direction.value} value={direction.value}>
                        {direction.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Tekrar Sayısı</Label>
                <div className="flex items-center gap-4 mt-2">
                  <Slider
                    value={[animation.repeat || 0]}
                    onValueChange={(value) => handleSliderChange('repeat', value)}
                    max={10}
                    min={0}
                    step={1}
                    className="flex-1"
                  />
                  <span className="text-sm text-muted-foreground min-w-[3rem]">
                    {animation.repeat || 0}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  0 = tekrar yok, -1 = sonsuz tekrar
                </div>
              </div>
            </TabsContent>

            <TabsContent value="custom" className="space-y-4">
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">GSAP Animasyon Örnekleri</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <strong>Fade In:</strong>
                    <pre className="text-xs bg-background p-2 rounded mt-1 overflow-x-auto">
                      {customAnimationExamples.fadeIn}
                    </pre>
                  </div>
                  <div>
                    <strong>Slide In:</strong>
                    <pre className="text-xs bg-background p-2 rounded mt-1 overflow-x-auto">
                      {customAnimationExamples.slideIn}
                    </pre>
                  </div>
                  <div>
                    <strong>Bounce:</strong>
                    <pre className="text-xs bg-background p-2 rounded mt-1 overflow-x-auto">
                      {customAnimationExamples.bounce}
                    </pre>
                  </div>
                  <div>
                    <strong>Scale:</strong>
                    <pre className="text-xs bg-background p-2 rounded mt-1 overflow-x-auto">
                      {customAnimationExamples.scale}
                    </pre>
                  </div>
                  <div>
                    <strong>Rotate:</strong>
                    <pre className="text-xs bg-background p-2 rounded mt-1 overflow-x-auto">
                      {customAnimationExamples.rotate}
                    </pre>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        )}
      </CardContent>
    </Card>
  )
}
