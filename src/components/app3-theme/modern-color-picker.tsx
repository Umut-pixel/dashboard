"use client"

import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/app3-theme/ui/button"
import { Input } from "@/components/app3-theme/ui/input"
import { Label } from "@/components/app3-theme/ui/label"
import { 
  IconPalette, 
  IconDroplet, 
  IconRefresh,
  IconCheck,
  IconX
} from "@tabler/icons-react"

interface ModernColorPickerProps {
  value: string
  onChange: (color: string) => void
  label?: string
  placeholder?: string
  className?: string
}

const presetColors = [
  '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7',
  '#DDA0DD', '#98D8C8', '#F7DC6F', '#BB8FCE', '#85C1E9',
  '#F8C471', '#82E0AA', '#F1948A', '#85C1E9', '#D7BDE2',
  '#FAD7A0', '#ABEBC6', '#F9E79F', '#D5A6BD', '#A9CCE3'
]

export function ModernColorPicker({ 
  value, 
  onChange, 
  label, 
  placeholder = "#000000",
  className = "" 
}: ModernColorPickerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [inputValue, setInputValue] = useState(value)
  const [isValidColor, setIsValidColor] = useState(true)
  const pickerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setInputValue(value)
  }, [value])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const validateColor = (color: string): boolean => {
    const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/
    const rgbRegex = /^rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\)$/
    const rgbaRegex = /^rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[\d.]+\s*\)$/
    const namedColors = [
      'transparent', 'inherit', 'initial', 'unset', 'currentColor',
      'red', 'green', 'blue', 'yellow', 'orange', 'purple', 'pink',
      'black', 'white', 'gray', 'grey', 'brown', 'cyan', 'magenta'
    ]
    
    return hexRegex.test(color) || rgbRegex.test(color) || rgbaRegex.test(color) || namedColors.includes(color.toLowerCase())
  }

  const handleInputChange = (newValue: string) => {
    setInputValue(newValue)
    const isValid = validateColor(newValue)
    setIsValidColor(isValid)
    
    if (isValid) {
      onChange(newValue)
    }
  }

  const handleColorSelect = (color: string) => {
    setInputValue(color)
    setIsValidColor(true)
    onChange(color)
    setIsOpen(false)
  }

  const handleRandomColor = () => {
    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')
    handleColorSelect(randomColor)
  }

  const handleReset = () => {
    handleColorSelect('#000000')
  }

  const getContrastColor = (hexColor: string): string => {
    // Remove # if present
    const hex = hexColor.replace('#', '')
    
    // Convert to RGB
    const r = parseInt(hex.substr(0, 2), 16)
    const g = parseInt(hex.substr(2, 2), 16)
    const b = parseInt(hex.substr(4, 2), 16)
    
    // Calculate luminance
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
    
    return luminance > 0.5 ? '#000000' : '#FFFFFF'
  }

  return (
    <div className={`relative ${className}`} ref={pickerRef}>
      {label && (
        <Label className="block text-sm font-medium mb-2 text-foreground">
          {label}
        </Label>
      )}
      
      <div className="flex gap-2">
        {/* Color Preview Button */}
        <Button
          type="button"
          variant="outline"
          className="w-12 h-10 p-0 border-2 hover:border-primary transition-all duration-200 relative overflow-hidden group"
          style={{
            backgroundColor: isValidColor ? inputValue : '#ff0000',
            borderColor: isOpen ? 'hsl(var(--primary))' : 'hsl(var(--border))'
          }}
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
          <IconPalette 
            className="h-4 w-4 transition-transform duration-200 group-hover:scale-110"
            style={{ color: isValidColor ? getContrastColor(inputValue) : '#ffffff' }}
          />
        </Button>

        {/* Color Input */}
        <div className="flex-1 relative">
          <Input
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={placeholder}
            className={`transition-all duration-200 ${
              !isValidColor ? 'border-red-500 focus:border-red-500' : ''
            }`}
          />
          {!isValidColor && (
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <IconX className="h-4 w-4 text-red-500" />
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-1">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleRandomColor}
            className="px-2 hover:bg-primary hover:text-primary-foreground transition-all duration-200"
            title="Rastgele Renk"
          >
            <IconDroplet className="h-4 w-4" />
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleReset}
            className="px-2 hover:bg-destructive hover:text-destructive-foreground transition-all duration-200"
            title="Sıfırla"
          >
            <IconRefresh className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Color Picker Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-card border rounded-lg shadow-lg z-50 animate-in slide-in-from-top-2 duration-200">
          <div className="p-4">
            {/* Preset Colors */}
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-3 text-foreground">Önceden Tanımlı Renkler</h4>
              <div className="grid grid-cols-10 gap-2">
                {presetColors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className="w-6 h-6 rounded border-2 border-border hover:border-primary transition-all duration-200 hover:scale-110 relative group"
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorSelect(color)}
                    title={color}
                  >
                    {value === color && (
                      <IconCheck 
                        className="absolute inset-0 m-auto h-3 w-3 text-white drop-shadow-sm" 
                      />
                    )}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 rounded transition-opacity duration-200" />
                  </button>
                ))}
              </div>
            </div>

            {/* Custom Color Input */}
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-3 text-foreground">Özel Renk</h4>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={inputValue}
                  onChange={(e) => handleColorSelect(e.target.value)}
                  className="w-12 h-10 p-1 border-2 border-border hover:border-primary transition-all duration-200 cursor-pointer"
                />
                <Input
                  value={inputValue}
                  onChange={(e) => handleInputChange(e.target.value)}
                  placeholder="Hex, RGB, veya renk adı"
                  className="flex-1"
                />
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleRandomColor}
                className="flex-1"
              >
                <IconDroplet className="h-4 w-4 mr-2" />
                Rastgele
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleReset}
                className="flex-1"
              >
                <IconRefresh className="h-4 w-4 mr-2" />
                Sıfırla
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
