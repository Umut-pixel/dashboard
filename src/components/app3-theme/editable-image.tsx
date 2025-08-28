"use client"

import { useState, useRef } from 'react'
import Image from 'next/image'
import { Upload, Edit3, X, Check } from 'lucide-react'

interface EditableImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  onImageChange?: (newSrc: string) => void
  isEditing?: boolean
  onEditStart?: () => void
  onEditEnd?: () => void
}

export function EditableImage({
  src,
  alt,
  width = 200,
  height = 200,
  className = '',
  onImageChange,
  isEditing = false,
  onEditStart,
  onEditEnd
}: EditableImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src)
  const [isEditingLocal, setIsEditingLocal] = useState(false)
  const [tempSrc, setTempSrc] = useState(src)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const isActuallyEditing = isEditing || isEditingLocal

  const handleImageClick = () => {
    if (!isEditing) {
      setIsEditingLocal(true)
      setTempSrc(currentSrc)
      onEditStart?.()
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        const result = event.target?.result as string
        setTempSrc(result)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    if (tempSrc !== currentSrc) {
      setCurrentSrc(tempSrc)
      onImageChange?.(tempSrc)
    }
    setIsEditingLocal(false)
    onEditEnd?.()
  }

  const handleCancel = () => {
    setTempSrc(currentSrc)
    setIsEditingLocal(false)
    onEditEnd?.()
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  if (isActuallyEditing) {
    return (
      <div className="relative">
        <div className="border-2 border-blue-500 rounded-lg p-4 bg-gray-50">
          <div className="flex items-center justify-center mb-4">
            <Image
              src={tempSrc}
              alt={alt}
              width={width}
              height={height}
              className={`${className} rounded-lg`}
              priority={false}
              loading="lazy"
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <button
              onClick={handleUploadClick}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Upload className="w-4 h-4" />
              Resim Yükle
            </button>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                <Check className="w-4 h-4" />
                Kaydet
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                <X className="w-4 h-4" />
                İptal
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="group relative">
      <Image
        src={currentSrc}
        alt={alt}
        width={width}
        height={height}
        className={`${className} cursor-pointer hover:opacity-80 transition-opacity`}
        onClick={handleImageClick}
        priority={false}
        loading="lazy"
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
      />
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="bg-white rounded-full p-1 shadow-lg">
          <Edit3 className="w-4 h-4 text-blue-500" />
        </div>
      </div>
    </div>
  )
}
