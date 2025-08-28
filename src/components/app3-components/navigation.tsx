"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { 
  IconMenu2,
  IconX,
  IconBrandLinkedin,
  IconBrandTwitter,
  IconBrandFacebook
} from "@tabler/icons-react"

interface NavigationProps {
  logoText?: string
  menuItems?: Array<{ name: string; href: string }>
}

export function Navigation({ 
  logoText = "Aygıt", 
  menuItems = [
    { name: "Hikayemiz", href: "#story" },
    { name: "Hakkımızda", href: "#about" },
    { name: "Hizmetlerimiz", href: "#services" },
    { name: "İletişim", href: "#contact" },
  ]
}: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-gray-900">{logoText}</h1>
            </div>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Social Links */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <IconBrandLinkedin className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <IconBrandTwitter className="h-5 w-5" />
            </a>
            <a href="#" className="text-gray-400 hover:text-gray-500">
              <IconBrandFacebook className="h-5 w-5" />
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <IconX className="h-6 w-6" />
              ) : (
                <IconMenu2 className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-700 hover:text-gray-900 block px-3 py-2 rounded-md text-base font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="flex space-x-4 pt-4">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <IconBrandLinkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <IconBrandTwitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <IconBrandFacebook className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
