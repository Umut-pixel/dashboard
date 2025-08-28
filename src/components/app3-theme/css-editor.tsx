"use client"

import { useState, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/app3-theme/ui/card"
import { Input } from "@/components/app3-theme/ui/input"
import { Label } from "@/components/app3-theme/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/app3-theme/ui/select"
import { Slider } from "@/components/app3-theme/ui/slider"
import { Switch } from "@/components/app3-theme/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/app3-theme/ui/tabs"
import { Palette, Type, Layout, Zap } from 'lucide-react'

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

  const handleInputChange = useCallback((property: string, value: string) => {
    onStyleChange(property, value)
  }, [onStyleChange])

  const handleSliderChange = useCallback((property: string, value: number[]) => {
    onStyleChange(property, `${value[0]}px`)
  }, [onStyleChange])

  const handleOpacityChange = useCallback((value: number[]) => {
    onStyleChange('opacity', (value[0] / 100).toString())
  }, [onStyleChange])

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="w-5 h-5" />
          {componentName} CSS Stilleri
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="colors" className="flex items-center gap-2">
              <Palette className="w-4 h-4" />
              Renkler
            </TabsTrigger>
            <TabsTrigger value="typography" className="flex items-center gap-2">
              <Type className="w-4 h-4" />
              Tipografi
            </TabsTrigger>
            <TabsTrigger value="layout" className="flex items-center gap-2">
              <Layout className="w-4 h-4" />
              Düzen
            </TabsTrigger>
            <TabsTrigger value="effects" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Efektler
            </TabsTrigger>
          </TabsList>

          <TabsContent value="colors" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="color">Metin Rengi</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="color"
                    type="text"
                    value={styles.color || ''}
                    onChange={(e) => handleInputChange('color', e.target.value)}
                    placeholder="#000000"
                  />
                  <Input
                    type="color"
                    value={styles.color || '#000000'}
                    onChange={(e) => handleInputChange('color', e.target.value)}
                    className="w-12 h-10"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="backgroundColor">Arka Plan Rengi</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="backgroundColor"
                    type="text"
                    value={styles.backgroundColor || ''}
                    onChange={(e) => handleInputChange('backgroundColor', e.target.value)}
                    placeholder="transparent"
                  />
                  <Input
                    type="color"
                    value={styles.backgroundColor || '#ffffff'}
                    onChange={(e) => handleInputChange('backgroundColor', e.target.value)}
                    className="w-12 h-10"
                  />
                </div>
              </div>
            </div>
            <div>
              <Label>Şeffaflık</Label>
              <div className="flex items-center gap-4 mt-2">
                <Slider
                  value={[parseFloat(styles.opacity || '1') * 100]}
                  onValueChange={handleOpacityChange}
                  max={100}
                  min={0}
                  step={1}
                  className="flex-1"
                />
                <span className="text-sm text-muted-foreground min-w-[3rem]">
                  {Math.round((parseFloat(styles.opacity || '1') * 100))}%
                </span>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="typography" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="fontSize">Font Boyutu</Label>
                <div className="flex gap-2 mt-1">
                  <Input
                    id="fontSize"
                    type="text"
                    value={styles.fontSize || ''}
                    onChange={(e) => handleInputChange('fontSize', e.target.value)}
                    placeholder="16px"
                  />
                  <Slider
                    value={[parseInt(styles.fontSize || '16')]}
                    onValueChange={(value) => handleInputChange('fontSize', `${value[0]}px`)}
                    max={72}
                    min={8}
                    step={1}
                    className="flex-1"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="fontWeight">Font Kalınlığı</Label>
                <Select value={styles.fontWeight || 'normal'} onValueChange={(value) => handleInputChange('fontWeight', value)}>
                  <SelectTrigger>
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
            <div>
              <Label htmlFor="fontFamily">Font Ailesi</Label>
              <Select value={styles.fontFamily || 'Arial, sans-serif'} onValueChange={(value) => handleInputChange('fontFamily', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Font ailesi" />
                </SelectTrigger>
                <SelectContent>
                  {fontFamilies.map((font) => (
                    <SelectItem key={font} value={font}>
                      {font.split(',')[0]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="textAlign">Metin Hizalama</Label>
                <Select value={styles.textAlign || 'left'} onValueChange={(value) => handleInputChange('textAlign', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Metin hizalama" />
                  </SelectTrigger>
                  <SelectContent>
                    {textAligns.map((align) => (
                      <SelectItem key={align} value={align}>
                        {align}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="textTransform">Metin Dönüşümü</Label>
                <Select value={styles.textTransform || 'none'} onValueChange={(value) => handleInputChange('textTransform', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Metin dönüşümü" />
                  </SelectTrigger>
                  <SelectContent>
                    {textTransforms.map((transform) => (
                      <SelectItem key={transform} value={transform}>
                        {transform}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="lineHeight">Satır Yüksekliği</Label>
                <Input
                  id="lineHeight"
                  type="text"
                  value={styles.lineHeight || ''}
                  onChange={(e) => handleInputChange('lineHeight', e.target.value)}
                  placeholder="1.5"
                />
              </div>
              <div>
                <Label htmlFor="letterSpacing">Harf Aralığı</Label>
                <Input
                  id="letterSpacing"
                  type="text"
                  value={styles.letterSpacing || ''}
                  onChange={(e) => handleInputChange('letterSpacing', e.target.value)}
                  placeholder="0px"
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="layout" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="padding">İç Boşluk</Label>
                <Input
                  id="padding"
                  type="text"
                  value={styles.padding || ''}
                  onChange={(e) => handleInputChange('padding', e.target.value)}
                  placeholder="16px"
                />
              </div>
              <div>
                <Label htmlFor="margin">Dış Boşluk</Label>
                <Input
                  id="margin"
                  type="text"
                  value={styles.margin || ''}
                  onChange={(e) => handleInputChange('margin', e.target.value)}
                  placeholder="0px"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="borderRadius">Köşe Yuvarlaklığı</Label>
              <div className="flex gap-2 mt-1">
                <Input
                  id="borderRadius"
                  type="text"
                  value={styles.borderRadius || ''}
                  onChange={(e) => handleInputChange('borderRadius', e.target.value)}
                  placeholder="4px"
                />
                <Slider
                  value={[parseInt(styles.borderRadius || '0')]}
                  onValueChange={(value) => handleInputChange('borderRadius', `${value[0]}px`)}
                  max={50}
                  min={0}
                  step={1}
                  className="flex-1"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="border">Kenarlık</Label>
              <Input
                id="border"
                type="text"
                value={styles.border || ''}
                onChange={(e) => handleInputChange('border', e.target.value)}
                placeholder="1px solid #ccc"
              />
            </div>
          </TabsContent>

          <TabsContent value="effects" className="space-y-4">
            <div>
              <Label htmlFor="boxShadow">Gölge</Label>
              <Input
                id="boxShadow"
                type="text"
                value={styles.boxShadow || ''}
                onChange={(e) => handleInputChange('boxShadow', e.target.value)}
                placeholder="0 2px 4px rgba(0,0,0,0.1)"
              />
            </div>
            <div>
              <Label htmlFor="transform">Dönüşüm</Label>
              <Input
                id="transform"
                type="text"
                value={styles.transform || ''}
                onChange={(e) => handleInputChange('transform', e.target.value)}
                placeholder="scale(1.1) rotate(5deg)"
              />
            </div>
            <div>
              <Label htmlFor="transition">Geçiş</Label>
              <Input
                id="transition"
                type="text"
                value={styles.transition || ''}
                onChange={(e) => handleInputChange('transition', e.target.value)}
                placeholder="all 0.3s ease"
              />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
