"use client"

import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/app3-theme/ui/button";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { name: "Hikayemiz", href: "#story" },
    { name: "Hakkımızda", href: "#about" },
    { name: "Hizmetlerimiz", href: "#services" },
    { name: "İletişim", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0 animate-scale-in">
            <Image
              src="/aygit-logo-beyaz.png"
              alt="Aygıt Logo"
              width={200}
              height={70}
              className="h-18 w-auto hover-lift"
              priority
            />
          </div>

          {/* masa üstü menüsü */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 hover-lift focus-ring"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="focus-ring md:hidden"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobil Menü */}
        {isMenuOpen && (
          <div className="md:hidden animate-slide-up">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white/95 backdrop-blur-md border-t border-gray-200">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-blue-500 block px-3 py-2 rounded-md text-base font-medium transition-all duration-200 hover-lift focus-ring"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
