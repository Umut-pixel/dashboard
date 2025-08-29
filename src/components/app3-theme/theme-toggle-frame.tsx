"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/app3-theme/ui/button";
import { Moon, Sun } from "lucide-react";

export function ThemeToggleFrame() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check if user has a saved preference for frame theme
    const savedFrameTheme = localStorage.getItem('app3-frame-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedFrameTheme === 'dark' || (!savedFrameTheme && prefersDark)) {
      setIsDark(true);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    // Save frame-specific theme preference
    localStorage.setItem('app3-frame-theme', newTheme ? 'dark' : 'light');
    
    // Only affect the frame content, not the entire page
    const frameContent = document.querySelector('.theme-app3');
    if (frameContent) {
      if (newTheme) {
        frameContent.classList.add('dark');
      } else {
        frameContent.classList.remove('dark');
      }
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="focus-ring"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <Sun className="h-5 w-5" />
      ) : (
        <Moon className="h-5 w-5" />
      )}
    </Button>
  );
}
