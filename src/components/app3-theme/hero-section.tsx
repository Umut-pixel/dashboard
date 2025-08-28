"use client"

import { Button } from "@/components/app3-theme/ui/button";
import { ChevronDown, Sparkles, Zap, Target } from "lucide-react";
import { useEffect, useMemo } from "react";
import { EditableText } from "./editable-text";
import { EditableImage } from "./editable-image";
import { useTheme } from "./theme-context";
import { useGSAPAnimation } from "./use-gsap-animation";
import { applyStyles } from "./apply-styles";
import Image from "next/image";

export function HeroSection() {
  const { themeData, updateThemeData } = useTheme();
  const { ref: heroRef } = useGSAPAnimation(themeData?.animations?.hero || {
    enabled: false,
    type: 'fadeIn',
    duration: 1,
    delay: 0,
    ease: 'power2.out',
    direction: 'normal',
    repeat: 0
  }, 'onMount');

  useEffect(() => {
    //  Unicorn Studio Yüklemek?
    
  }, []);

  const handleTextChange = (path: string, newText: string) => {
    updateThemeData(path, newText);
  };

  const handleImageChange = (newSrc: string) => {
    updateThemeData('hero.backgroundImage', newSrc);
  };

  // Memoized background image component
  const BackgroundImage = useMemo(() => (
    <div className="absolute inset-0 w-full h-full">
      <Image
        src={themeData.hero.backgroundImage}
        alt="Hero Background"
        fill
        className="object-cover"
        priority={true}
        quality={85}
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
      />
      {/* Animasyonlu gradyan arka plan */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 via-blue-300/10 to-blue-500/30 animate-pulse" />
      
      {/* Uçuşan şeyleri */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-bounce" style={{ animationDelay: '0s' }} />
      <div className="absolute top-40 right-32 w-24 h-24 bg-blue-300/20 rounded-full blur-lg animate-bounce" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-blue-500/5 rounded-full blur-2xl animate-bounce" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-20 right-20 w-28 h-28 bg-blue-300/15 rounded-full blur-lg animate-bounce" style={{ animationDelay: '0.5s' }} />
      
      {/* Gradyan Patterni */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }} />
      </div>
      
      {/* Uçuşan geometrik şeyler */}
      <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-blue-500 rounded-full animate-ping" />
      <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-blue-400 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-1/4 left-1/3 w-2 h-2 bg-blue-500 rounded-full animate-ping" style={{ animationDelay: '2s' }} />
    </div>
  ), [themeData.hero.backgroundImage]);

  // Apply CSS styles
  const heroStyles = applyStyles(themeData?.styles?.hero || {});

  return (
    <section 
      ref={heroRef}
      className="relative h-screen flex items-center overflow-hidden" 
      style={{
        '--theme-primary': 'rgb(30, 157, 241)',
        '--theme-accent': 'rgb(227, 236, 246)',
        '--theme-background': 'rgb(255, 255, 255)',
        '--theme-foreground': 'rgb(15, 20, 25)',
        '--theme-muted': 'rgb(229, 229, 230)',
        '--theme-border': 'rgb(225, 234, 239)',
        ...heroStyles
      } as React.CSSProperties}>
      {BackgroundImage}

      
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto animate-fade-in">
      
        <div className="inline-flex items-center space-x-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-6 animate-slide-up">
          <Sparkles className="w-4 h-4 text-blue-500" />
          <EditableText
            initialText={themeData.hero.subtitle}
            element="span"
            className="text-sm font-medium text-blue-500"
            onTextChange={(newText) => handleTextChange('hero.subtitle', newText)}
          />
        </div>
        
        <EditableText
          initialText={themeData.hero.title}
          element="h1"
          className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-slide-up"
          onTextChange={(newText) => handleTextChange('hero.title', newText)}
        />
        
        <EditableText
          initialText={themeData.hero.description}
          element="p"
          className="text-xl sm:text-2xl text-gray-600 mb-8 animate-slide-up"
          onTextChange={(newText) => handleTextChange('hero.description', newText)}
        />
        
        {/* veriler */}
        <div className="flex flex-wrap gap-8 mb-8 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-500">500+</div>
            <div className="text-sm text-gray-600">Mutlu Müşteri</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-500">1000+</div>
            <div className="text-sm text-gray-600">Tamamlanan Proje</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-500">24/7</div>
            <div className="text-sm text-gray-600">Teknik Destek</div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 items-start animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <Button size="lg" className="btn-primary text-lg px-8 py-3 hover-lift bg-blue-500 hover:bg-blue-600 text-white">
            <Zap className="mr-2 h-5 w-5" />
            <EditableText
              initialText={themeData.hero.button1Text}
              element="span"
              onTextChange={(newText) => handleTextChange('hero.button1Text', newText)}
            />
          </Button>
          <Button variant="outline" size="lg" className="text-lg px-8 py-3 hover-lift border-blue-500 text-blue-500 hover:bg-blue-50">
            <Target className="mr-2 h-5 w-5" />
            <EditableText
              initialText={themeData.hero.button2Text}
              element="span"
              onTextChange={(newText) => handleTextChange('hero.button2Text', newText)}
            />
          </Button>
        </div>
      </div>

      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="h-8 w-8 text-gray-400" />
      </div>
    </section>
  );
}
