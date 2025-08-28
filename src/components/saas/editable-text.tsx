"use client"

import { useState, useRef, useEffect, useCallback } from 'react'
import { Edit3, Check, X, Save } from 'lucide-react'
import { useDebounce } from '@/hooks/use-debounce'

interface EditableTextProps {
  initialText: string
  element?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'
  className?: string
  onTextChange?: (newText: string) => void
  onSave?: (newText: string) => Promise<void>
  isEditing?: boolean
  onEditStart?: () => void
  onEditEnd?: () => void
  placeholder?: string
  autoSave?: boolean
  debounceMs?: number
}

export function EditableText({
  initialText,
  element = 'p',
  className = '',
  onTextChange,
  onSave,
  isEditing = false,
  onEditStart,
  onEditEnd,
  placeholder = 'Metin girin...',
  autoSave = true,
  debounceMs = 1000
}: EditableTextProps) {
  const [text, setText] = useState(initialText)
  const [isEditingLocal, setIsEditingLocal] = useState(false)
  const [tempText, setTempText] = useState(initialText)
  const [isSaving, setIsSaving] = useState(false)
  const [hasChanges, setHasChanges] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const textRef = useRef<HTMLElement>(null)

  const isActuallyEditing = isEditing || isEditingLocal
  const debouncedText = useDebounce(tempText, debounceMs)

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

  // Auto-save with debounce
  useEffect(() => {
    if (autoSave && hasChanges && debouncedText !== text && onSave) {
      handleAutoSave(debouncedText)
    }
  }, [debouncedText, autoSave, hasChanges, text, onSave])

  const handleAutoSave = useCallback(async (newText: string) => {
    if (!onSave) return

    try {
      setIsSaving(true)
      await onSave(newText)
      setText(newText)
      setHasChanges(false)
    } catch (error) {
      console.error('Auto-save error:', error)
      // Revert to original text on error
      setTempText(text)
    } finally {
      setIsSaving(false)
    }
  }, [onSave, text])

  const handleClick = () => {
    if (!isEditing) {
      setIsEditingLocal(true)
      setTempText(text)
      setHasChanges(false)
      onEditStart?.()
    }
  }

  const handleSave = async () => {
    const newText = tempText.trim()
    if (newText !== text) {
      if (onSave) {
        try {
          setIsSaving(true)
          await onSave(newText)
          setText(newText)
          setHasChanges(false)
        } catch (error) {
          console.error('Save error:', error)
          return
        } finally {
          setIsSaving(false)
        }
      } else {
        setText(newText)
        onTextChange?.(newText)
      }
    }
    setIsEditingLocal(false)
    onEditEnd?.()
  }

  const handleCancel = () => {
    setTempText(text)
    setHasChanges(false)
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value
    setTempText(newText)
    setHasChanges(newText !== text)
    onTextChange?.(newText)
  }

  const Element = element as keyof JSX.IntrinsicElements

  if (isActuallyEditing) {
    return (
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <input
            ref={inputRef}
            type="text"
            value={tempText}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className={`${className} bg-white border-2 border-blue-500 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500/20 w-full`}
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
          {isSaving && (
            <div className="absolute -top-1 -right-1">
              <div className="w-3 h-3 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
        <div className="flex gap-1">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="p-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors disabled:opacity-50"
            title="Kaydet"
          >
            <Check className="w-4 h-4" />
          </button>
          <button
            onClick={handleCancel}
            disabled={isSaving}
            className="p-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors disabled:opacity-50"
            title="İptal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="group relative">
      <Element
        ref={textRef}
        className={`${className} cursor-pointer hover:bg-blue-50 hover:bg-opacity-50 rounded px-2 py-1 transition-colors`}
        onClick={handleClick}
      >
        {text || placeholder}
      </Element>
      <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Edit3 className="w-4 h-4 text-blue-500" />
      </div>
    </div>
  )
}
