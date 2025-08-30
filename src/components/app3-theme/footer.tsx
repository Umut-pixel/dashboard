"use client"

import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { EditableText } from "./editable-text";
import { EditableImage } from "./editable-image";
import { useTheme } from "./theme-context";

export function Footer() {
  const { themeData, updateThemeData } = useTheme();

  const handleTextChange = (path: string, newText: string) => {
    updateThemeData(path, newText);
  };

  const handleImageChange = (newSrc: string) => {
    updateThemeData('footer.logo', newSrc);
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <EditableImage
                src={themeData.footer.logo}
                alt="Aygıt Logo"
                width={120}
                height={40}
                onImageChange={handleImageChange}
              />
            </div>
            <EditableText
              initialText={themeData.footer.description}
              element="p"
              className="text-gray-400 text-sm leading-relaxed"
              onTextChange={(newText) => handleTextChange('footer.description', newText)}
            />
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Hızlı Linkler</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Ana Sayfa</a></li>
              <li><a href="#services" className="text-gray-400 hover:text-white transition-colors">Hizmetler</a></li>
              <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">Hakkımızda</a></li>
              <li><a href="#contact" className="text-gray-400 hover:text-white transition-colors">İletişim</a></li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Hizmetler</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Web Geliştirme</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Mobil Uygulama</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">UI/UX Tasarım</a></li>
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Dijital Pazarlama</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">İletişim</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-gray-400" />
                <EditableText
                  initialText={themeData.footer.email}
                  element="span"
                  className="text-gray-400 text-sm"
                  onTextChange={(newText) => handleTextChange('footer.email', newText)}
                />
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-400" />
                <EditableText
                  initialText={themeData.footer.phone}
                  element="span"
                  className="text-gray-400 text-sm"
                  onTextChange={(newText) => handleTextChange('footer.phone', newText)}
                />
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <EditableText
                  initialText={themeData.footer.address}
                  element="span"
                  className="text-gray-400 text-sm"
                  onTextChange={(newText) => handleTextChange('footer.address', newText)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Aygıt. Tüm hakları saklıdır.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Gizlilik Politikası</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Kullanım Şartları</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">Çerez Politikası</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
