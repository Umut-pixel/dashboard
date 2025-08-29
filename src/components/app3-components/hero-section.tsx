"use client"

import React, { useState, useRef, useEffect } from "react"
import ContentEditable from "react-contenteditable"
import { Button } from "@/components/ui/button"
import { 
  IconArrowRight,
  IconPlayerPlay
} from "@tabler/icons-react"

interface HeroSectionProps {
  title?: string
  description?: string
  button1Text?: string
  button2Text?: string
  backgroundImage?: string
  isEditing?: boolean
  onTitleChange?: (title: string) => void
  onDescriptionChange?: (description: string) => void
  onButton1TextChange?: (text: string) => void
  onButton2TextChange?: (text: string) => void
}

export function HeroSection({ 
  title = "Geleceği Şekillendiren Teknoloji",
  description = "Aygıt olarak, yenilikçi çözümlerle işinizi büyütmenize yardımcı oluyoruz.",
  button1Text = "Hizmetlerimizi Keşfedin",
  button2Text = "Bizimle İletişime Geçin",
  backgroundImage = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
  isEditing = false,
  onTitleChange,
  onDescriptionChange,
  onButton1TextChange,
  onButton2TextChange
}: HeroSectionProps) {
  const [localTitle, setLocalTitle] = useState(title)
  const [localDescription, setLocalDescription] = useState(description)
  const [localButton1Text, setLocalButton1Text] = useState(button1Text)
  const [localButton2Text, setLocalButton2Text] = useState(button2Text)

  // Update local state when props change
  useEffect(() => {
    setLocalTitle(title)
  }, [title])

  useEffect(() => {
    setLocalDescription(description)
  }, [description])

  useEffect(() => {
    setLocalButton1Text(button1Text)
  }, [button1Text])

  useEffect(() => {
    setLocalButton2Text(button2Text)
  }, [button2Text])

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

  const handleButton1TextChange = (e: any) => {
    const newText = e.target.value
    setLocalButton1Text(newText)
    onButton1TextChange?.(newText)
  }

  const handleButton2TextChange = (e: any) => {
    const newText = e.target.value
    setLocalButton2Text(newText)
    onButton2TextChange?.(newText)
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {isEditing ? (
          <ContentEditable
            html={localTitle}
            onChange={handleTitleChange}
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded px-2 py-1 cursor-text"
            tagName="h1"
            onBlur={() => onTitleChange?.(localTitle)}
            onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                e.currentTarget.blur()
              }
            }}
          />
        ) : (
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            {localTitle}
          </h1>
        )}
        
        {isEditing ? (
          <ContentEditable
            html={localDescription}
            onChange={handleDescriptionChange}
            className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded px-2 py-1 cursor-text"
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
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-3xl mx-auto leading-relaxed">
            {localDescription}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            size="lg" 
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-lg transition-colors"
          >
            {isEditing ? (
              <ContentEditable
                html={localButton1Text}
                onChange={handleButton1TextChange}
                className="outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded px-1 cursor-text"
                tagName="span"
                onBlur={() => onButton1TextChange?.(localButton1Text)}
                onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    e.currentTarget.blur()
                  }
                }}
              />
            ) : (
              localButton1Text
            )}
            <IconArrowRight className="ml-2 h-5 w-5" />
          </Button>
          
          <Button 
            variant="outline" 
            size="lg"
            className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-3 text-lg font-semibold rounded-lg transition-colors"
          >
            <IconPlayerPlay className="mr-2 h-5 w-5" />
            {isEditing ? (
              <ContentEditable
                html={localButton2Text}
                onChange={handleButton2TextChange}
                className="outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded px-1 cursor-text"
                tagName="span"
                onBlur={() => onButton2TextChange?.(localButton2Text)}
                onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => {
                  if (e.key === 'Enter') {
                    e.preventDefault()
                    e.currentTarget.blur()
                  }
                }}
              />
            ) : (
              localButton2Text
            )}
          </Button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">500+</div>
            <div className="text-gray-300">Mutlu Müşteri</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">1000+</div>
            <div className="text-gray-300">Tamamlanan Proje</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold mb-2">24/7</div>
            <div className="text-gray-300">Destek</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </div>
  )
}
