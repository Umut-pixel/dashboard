"use client"

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  IconTextResize, 
  IconPhoto, 
  IconSquare, 
  IconTrash, 
  IconDownload, 
  IconEye, 
  IconPlus,
} from "@tabler/icons-react"

// Types
interface ElementPosition {
  x: number;
  y: number;
}

interface ElementStyle {
  fontSize?: string;
  color?: string;
  fontFamily?: string;
  width?: string;
  height?: string;
  backgroundColor?: string;
  padding?: string;
  borderRadius?: string;
  border?: string;
  cursor?: string;
  fontWeight?: string;
}

interface EditorElement {
  id: string;
  type: 'text' | 'heading' | 'button' | 'image' | 'rectangle';
  content: string;
  style: ElementStyle;
  position: ElementPosition;
}

type TemplateKey = 'text' | 'heading' | 'button' | 'image' | 'rectangle';

const WebsiteEditor = () => {
  const [elements, setElements] = useState<EditorElement[]>([]);
  const [nextId, setNextId] = useState(1);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLDivElement>(null);

  // Element templates
  const elementTemplates: Record<TemplateKey, Omit<EditorElement, 'id' | 'position'>> = {
    text: {
      type: 'text',
      content: 'Bu metni düzenleyin',
      style: { fontSize: '16px', color: '#333', fontFamily: 'Arial', width: '200px', height: '40px' }
    },
    heading: {
      type: 'heading',
      content: 'Başlığınız',
      style: { fontSize: '32px', fontWeight: 'bold', color: '#1a1a1a', width: '300px', height: '50px' }
    },
    button: {
      type: 'button',
      content: 'Tıklayın',
      style: { 
        backgroundColor: '#3b82f6', 
        color: 'white', 
        padding: '12px 24px', 
        borderRadius: '8px',
        width: '120px',
        height: '48px',
        border: 'none',
        cursor: 'pointer'
      }
    },
    image: {
      type: 'image',
      content: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=300&h=200&fit=crop',
      style: { borderRadius: '8px', width: '300px', height: '200px' }
    },
    rectangle: {
      type: 'rectangle',
      content: '',
      style: { 
        backgroundColor: '#f3f4f6', 
        borderRadius: '8px', 
        width: '200px', 
        height: '150px',
        border: '2px solid #e5e7eb'
      }
    }
  };

  const addElement = (templateKey: TemplateKey) => {
    const template = elementTemplates[templateKey];
    const newElement: EditorElement = {
      ...template,
      id: nextId.toString(),
      position: { x: 50 + (nextId * 20), y: 50 + (nextId * 20) }
    };

    setElements([...elements, newElement]);
    setNextId(nextId + 1);
  };

  const deleteElement = (elementId: string) => {
    setElements(elements.filter(el => el.id !== elementId));
    setSelectedElement(null);
  };

  const updateElementContent = (elementId: string, newContent: string) => {
    setElements(elements.map(el => 
      el.id === elementId ? { ...el, content: newContent } : el
    ));
  };

  const updateElementStyle = (elementId: string, styleProperty: keyof ElementStyle, value: string) => {
    setElements(elements.map(el => 
      el.id === elementId 
        ? { ...el, style: { ...el.style, [styleProperty]: value } }
        : el
    ));
  };

  const updateElementPosition = (elementId: string, position: ElementPosition) => {
    setElements(elements.map(el => 
      el.id === elementId ? { ...el, position } : el
    ));
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>, element: EditorElement) => {
    const target = e.target as HTMLElement;
    if (target.classList.contains('resize-handle')) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    if (!canvasRef.current) return;
    const canvasRect = canvasRef.current.getBoundingClientRect();
    
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    setSelectedElement(element.id);
    
    const handleMouseMove = (moveEvent: MouseEvent) => {
      const newX = moveEvent.clientX - canvasRect.left - dragOffset.x;
      const newY = moveEvent.clientY - canvasRect.top - dragOffset.y;
      
      updateElementPosition(element.id, { 
        x: Math.max(0, newX), 
        y: Math.max(0, newY) 
      });
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const renderElement = (element: EditorElement) => {
    const isSelected = selectedElement === element.id;
    
    const elementStyle: React.CSSProperties = {
      position: 'absolute',
      left: element.position.x,
      top: element.position.y,
      ...element.style,
      cursor: 'move',
      userSelect: 'none'
    };

    const commonProps = {
      style: elementStyle,
      onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => handleMouseDown(e, element),
      className: `element ${isSelected ? 'selected' : ''}`,
      onClick: (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setSelectedElement(element.id);
      }
    };
    
    switch (element.type) {
      case 'text':
      case 'heading':
        return (
          <div key={element.id} {...commonProps}>
            {isSelected ? (
              <textarea
                value={element.content}
                onChange={(e) => updateElementContent(element.id, e.target.value)}
                style={{ 
                  ...element.style, 
                  resize: 'none', 
                  border: 'none', 
                  outline: 'none', 
                  background: 'transparent',
                  cursor: 'text',
                  width: '100%',
                  height: '100%'
                }}
                onClick={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
              />
            ) : (
              <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                {element.content}
              </div>
            )}
            {isSelected && <div className="selection-border" />}
          </div>
        );
      
      case 'button':
        return (
          <div key={element.id} {...commonProps}>
            {isSelected ? (
              <input
                value={element.content}
                onChange={(e) => updateElementContent(element.id, e.target.value)}
                style={{
                  ...element.style,
                  width: '100%',
                  height: '100%',
                  cursor: 'text'
                }}
                onClick={(e) => e.stopPropagation()}
                onMouseDown={(e) => e.stopPropagation()}
              />
            ) : (
              <button style={{ ...element.style, width: '100%', height: '100%' }}>
                {element.content}
              </button>
            )}
            {isSelected && <div className="selection-border" />}
          </div>
        );
      
      case 'image':
        return (
          <div key={element.id} {...commonProps}>
            <Image 
              src={element.content} 
              alt="Element"
              width={parseInt(element.style.width || '300')}
              height={parseInt(element.style.height || '200')}
              style={{ width: '100%', height: '100%', objectFit: 'cover', pointerEvents: 'none', ...element.style }}
              draggable={false}
              unoptimized
            />
            {isSelected && <div className="selection-border" />}
          </div>
        );
      
      case 'rectangle':
        return (
          <div key={element.id} {...commonProps}>
            <div style={{ width: '100%', height: '100%' }}></div>
            {isSelected && <div className="selection-border" />}
          </div>
        );
      
      default:
        return null;
    }
  };

  const selectedEl = elements.find(el => el.id === selectedElement);

  if (showPreview) {
    return (
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
                               <div className="bg-gray-900 text-white p-4 flex justify-between items-center">
                   <h1 className="text-xl font-semibold">Önizleme Modu</h1>
                   <Button 
                     onClick={() => setShowPreview(false)}
                     variant="default"
                   >
                     Editöre Geri Dön
                   </Button>
                 </div>
              <div className="p-8 relative min-h-screen bg-gray-50">
                {elements.map(element => {
                  const previewStyle: React.CSSProperties = {
                    position: 'absolute',
                    left: element.position.x,
                    top: element.position.y,
                    ...element.style,
                    cursor: 'default'
                  };

                  switch (element.type) {
                    case 'text':
                    case 'heading':
                      return (
                        <div key={element.id} style={previewStyle}>
                          {element.content}
                        </div>
                      );
                    case 'button':
                      return (
                        <button key={element.id} style={previewStyle}>
                          {element.content}
                        </button>
                      );
                    case 'image':
                      return (
                        <Image 
                          key={element.id}
                          src={element.content} 
                          alt="Element"
                          width={parseInt(element.style.width || '300')}
                          height={parseInt(element.style.height || '200')}
                          style={previewStyle}
                          unoptimized
                        />
                      );
                    case 'rectangle':
                      return (
                        <div key={element.id} style={previewStyle}></div>
                      );
                    default:
                      return null;
                  }
                })}
              </div>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <style>{`
              .element.selected {
                z-index: 1000;
              }
              .selection-border {
                position: absolute;
                top: -2px;
                left: -2px;
                right: -2px;
                bottom: -2px;
                border: 2px solid #3b82f6;
                border-radius: 4px;
                pointer-events: none;
              }
              .element:hover:not(.selected) {
                outline: 2px solid #93c5fd;
                outline-offset: -2px;
              }
            `}</style>

            <div className="h-full flex bg-gray-50">
              {/* Sidebar */}
              <div className="w-80 bg-white border-r border-gray-200 flex flex-col shadow-sm">
                {/* Header */}
                                 <div className="p-6 border-b border-gray-200">
                   <h1 className="text-2xl font-bold text-gray-900">Website Editörü</h1>
                   <p className="text-gray-500 text-sm mt-1">Oluşturmak için sürükle & bırak</p>
                 </div>

                {/* Tools */}
                                 <div className="p-6 border-b border-gray-200">
                   <h2 className="text-lg font-semibold text-gray-900 mb-4">Öğeler</h2>
                  <div className="grid grid-cols-2 gap-3">
                                         <Button
                       onClick={() => addElement('heading')}
                       variant="outline"
                       className="flex flex-col items-center p-4 h-auto hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 group"
                     >
                       <IconTextResize size={24} className="text-gray-700 mb-2 group-hover:text-blue-600" />
                                               <span className="text-sm text-gray-700 group-hover:text-blue-600">Başlık</span>
                     </Button>
                                         <Button
                       onClick={() => addElement('text')}
                       variant="outline"
                       className="flex flex-col items-center p-4 h-auto hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 group"
                     >
                       <IconTextResize size={20} className="text-gray-700 mb-2 group-hover:text-blue-600" />
                                               <span className="text-sm text-gray-700 group-hover:text-blue-600">Metin</span>
                     </Button>
                    <Button
                      onClick={() => addElement('button')}
                      variant="outline"
                      className="flex flex-col items-center p-4 h-auto hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 group"
                    >
                      <IconSquare size={24} className="text-gray-700 mb-2 group-hover:text-blue-600" />
                                             <span className="text-sm text-gray-700 group-hover:text-blue-600">Düğme</span>
                    </Button>
                    <Button
                      onClick={() => addElement('image')}
                      variant="outline"
                      className="flex flex-col items-center p-4 h-auto hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 group"
                    >
                      <IconPhoto size={24} className="text-gray-700 mb-2 group-hover:text-blue-600" />
                                             <span className="text-sm text-gray-700 group-hover:text-blue-600">Resim</span>
                    </Button>
                    <Button
                      onClick={() => addElement('rectangle')}
                      variant="outline"
                      className="flex flex-col items-center p-4 h-auto hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 group col-span-2"
                    >
                      <IconSquare size={24} className="text-gray-700 mb-2 group-hover:text-blue-600" />
                                             <span className="text-sm text-gray-700 group-hover:text-blue-600">Dikdörtgen</span>
                    </Button>
                  </div>
                </div>

                {/* Properties Panel */}
                {selectedEl && (
                  <div className="p-6 flex-1">
                                         <div className="flex justify-between items-center mb-4">
                       <h2 className="text-lg font-semibold text-gray-900">Özellikler</h2>
                      <Button
                        onClick={() => deleteElement(selectedEl.id)}
                        variant="ghost"
                        size="sm"
                        className="p-2 text-red-600 hover:bg-red-50"
                      >
                        <IconTrash size={18} />
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      {(selectedEl.type === 'text' || selectedEl.type === 'heading' || selectedEl.type === 'button') && (
                                                <div>
                          <Label className="block text-sm font-medium text-gray-700 mb-2">Yazı Boyutu</Label>
                          <input
                            type="range"
                            min="12"
                            max="48"
                            value={parseInt(selectedEl.style.fontSize || '16')}
                            onChange={(e) => updateElementStyle(selectedEl.id, 'fontSize', e.target.value + 'px')}
                            className="w-full accent-blue-600"
                          />
                          <span className="text-sm text-gray-500">{parseInt(selectedEl.style.fontSize || '16')}px</span>
                        </div>
                      )}
                      
                      {(selectedEl.type === 'text' || selectedEl.type === 'heading') && (
                                                <div>
                          <Label className="block text-sm font-medium text-gray-700 mb-2">Renk</Label>
                          <Input
                            type="color"
                            value={selectedEl.style.color || '#333'}
                            onChange={(e) => updateElementStyle(selectedEl.id, 'color', e.target.value)}
                            className="w-full h-10 rounded-lg border border-gray-300"
                          />
                        </div>
                      )}
                      
                      {(selectedEl.type === 'button' || selectedEl.type === 'rectangle') && (
                                                <div>
                          <Label className="block text-sm font-medium text-gray-700 mb-2">Arka Plan Rengi</Label>
                          <Input
                            type="color"
                            value={selectedEl.style.backgroundColor || '#f3f4f6'}
                            onChange={(e) => updateElementStyle(selectedEl.id, 'backgroundColor', e.target.value)}
                            className="w-full h-10 rounded-lg border border-gray-300"
                          />
                        </div>
                      )}
                      
                      {selectedEl.type === 'image' && (
                                                <div>
                          <Label className="block text-sm font-medium text-gray-700 mb-2">Resim URL</Label>
                          <Input
                            type="text"
                            value={selectedEl.content}
                            onChange={(e) => updateElementContent(selectedEl.id, e.target.value)}
                            placeholder="https://..."
                          />
                        </div>
                      )}
                      
                                            <div>
                        <Label className="block text-sm font-medium text-gray-700 mb-2">Genişlik</Label>
                        <Input
                          type="number"
                          value={parseInt(selectedEl.style.width || '200')}
                          onChange={(e) => updateElementStyle(selectedEl.id, 'width', e.target.value + 'px')}
                          min="50"
                          max="800"
                        />
                      </div>
                      
                                            <div>
                        <Label className="block text-sm font-medium text-gray-700 mb-2">Yükseklik</Label>
                        <Input
                          type="number"
                          value={parseInt(selectedEl.style.height || '150')}
                          onChange={(e) => updateElementStyle(selectedEl.id, 'height', e.target.value + 'px')}
                          min="30"
                          max="600"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Main Canvas */}
              <div className="flex-1 flex flex-col">
                {/* Toolbar */}
                <div className="bg-white border-b border-gray-200 p-4 flex justify-between items-center shadow-sm">
                  <div className="flex items-center space-x-4">
                                         <span className="text-gray-600 font-medium">Tuval</span>
                     <div className="text-sm text-gray-400">
                       {elements.length} öğe{elements.length !== 1 ? '' : ''}
                     </div>
                  </div>
                  <div className="flex space-x-3">
                    <Button
                      onClick={() => setShowPreview(true)}
                      variant="outline"
                      className="flex items-center"
                    >
                                             <IconEye size={18} className="mr-2" />
                       Önizleme
                    </Button>
                    <Button className="flex items-center">
                                             <IconDownload size={18} className="mr-2" />
                       Dışa Aktar
                    </Button>
                  </div>
                </div>

                {/* Canvas Area */}
                <div className="flex-1 overflow-auto bg-gray-100">
                  <div className="p-8">
                    <div 
                      ref={canvasRef}
                      className="relative min-h-screen bg-white rounded-lg shadow-sm border border-gray-200 mx-auto"
                      style={{ width: '1200px', minHeight: '800px' }}
                      onClick={() => setSelectedElement(null)}
                    >
                      {elements.length === 0 && (
                        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                                     <div className="text-center">
                             <IconPlus size={48} className="mx-auto mb-4 opacity-50" />
                             <p className="text-lg">Kenar çubuğundan öğe ekleyerek başlayın</p>
                             <p className="text-sm mt-2">Konumlandırmak için sürükleyip bırakın</p>
                           </div>
                        </div>
                      )}
                      {elements.map(element => renderElement(element))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default WebsiteEditor;
