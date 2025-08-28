"use client"

import { useState, useRef, useEffect } from 'react'
import { Edit3, Check, X } from 'lucide-react'

interface EditableTextProps {
  initialText: string
  element?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'
  className?: string
  onTextChange?: (newText: string) => void
  isEditing?: boolean
  onEditStart?: () => void
  onEditEnd?: () => void
}

export function EditableText({
  initialText,
  element = 'p',
  className = '',
  onTextChange,
  isEditing = false,
  onEditStart,
  onEditEnd
}: EditableTextProps) {
  const [text, setText] = useState(initialText)
  const [isEditingLocal, setIsEditingLocal] = useState(false)
  const [tempText, setTempText] = useState(initialText)
  const inputRef = useRef<HTMLInputElement>(null)
  const textRef = useRef<HTMLElement>(null)

  const isActuallyEditing = isEditing || isEditingLocal

  useEffect(() => {
    setText(initialText)
    setTempText(initialText)
  }, [initialText])

  useEffect(() => {
    if (isActuallyEditing && inputRef.current) {
      inputRef.current.focus()
      inputRef.current.select()
    }
  }, [isActuallyEditing])

  const handleClick = () => {
    if (!isEditing) {
      setIsEditingLocal(true)
      setTempText(text)
      onEditStart?.()
    }
  }

  const handleSave = () => {
    const newText = tempText.trim()
    if (newText !== text) {
      setText(newText)
      onTextChange?.(newText)
    }
    setIsEditingLocal(false)
    onEditEnd?.()
  }

  const handleCancel = () => {
    setTempText(text)
    setIsEditingLocal(false)
    onEditEnd?.()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleSave()
    } else if (e.key === 'Escape') {
      e.preventDefault()
      handleCancel()
    }
  }

  const Element = element as keyof React.JSX.IntrinsicElements

  if (isActuallyEditing) {
    return (
      <div className="flex items-center gap-2">
        <input
          ref={inputRef}
          type="text"
          value={tempText}
          onChange={(e) => setTempText(e.target.value)}
          onKeyDown={handleKeyDown}
          className={`${className} bg-white border-2 border-blue-500 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
          style={{
            fontSize: element.startsWith('h') ? 
              element === 'h1' ? '2.25rem' :
              element === 'h2' ? '1.875rem' :
              element === 'h3' ? '1.5rem' :
              element === 'h4' ? '1.25rem' :
              element === 'h5' ? '1.125rem' :
              '1rem' : 'inherit'
          }}
        />
        <div className="flex gap-1">
          <button
            onClick={handleSave}
            className="p-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            title="Kaydet"
          >
            <Check className="w-3 h-3" />
          </button>
          <button
            onClick={handleCancel}
            className="p-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            title="İptal"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="group relative">
      <Element
        ref={textRef}
        className={`${className} cursor-pointer hover:bg-blue-50 hover:bg-opacity-50 rounded px-1 py-0.5 transition-colors`}
        onClick={handleClick}
      >
        {text}
      </Element>
      <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Edit3 className="w-3 h-3 text-blue-500" />
      </div>
    </div>
  )
}
