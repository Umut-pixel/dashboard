"use client"

import { Button } from "@/components/app3-theme/ui/button";
import { Input } from "@/components/app3-theme/ui/input";
import { Textarea } from "@/components/app3-theme/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/app3-theme/ui/card";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { EditableText } from "./editable-text";
import { useTheme } from "./theme-context";

export function ContactSection() {
  const { themeData, updateThemeData } = useTheme();

  const handleTextChange = (path: string, newText: string) => {
    updateThemeData(path, newText);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <EditableText
            initialText={themeData.contact.title}
            element="h2"
            className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
            onTextChange={(newText) => handleTextChange('contact.title', newText)}
          />
          <EditableText
            initialText={themeData.contact.subtitle}
            element="p"
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            onTextChange={(newText) => handleTextChange('contact.subtitle', newText)}
          />
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Contact Form */}
          <div className="space-y-6">
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">Mesaj Gönderin</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ad</label>
                    <Input placeholder="Adınız" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Soyad</label>
                    <Input placeholder="Soyadınız" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">E-posta</label>
                  <Input type="email" placeholder="ornek@email.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Telefon</label>
                  <Input placeholder="+90 (5XX) XXX XX XX" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mesaj</label>
                  <Textarea 
                    placeholder="Mesajınızı buraya yazın..." 
                    rows={4}
                  />
                </div>
                <Button className="w-full bg-blue-500 hover:bg-blue-600 text-white">
                  <Send className="mr-2 h-4 w-4" />
                  Mesaj Gönder
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-gray-900">İletişim Bilgileri</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">E-posta</h3>
                    <EditableText
                      initialText={themeData.contact.email}
                      element="p"
                      className="text-gray-600"
                      onTextChange={(newText) => handleTextChange('contact.email', newText)}
                    />
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Telefon</h3>
                    <EditableText
                      initialText={themeData.contact.phone}
                      element="p"
                      className="text-gray-600"
                      onTextChange={(newText) => handleTextChange('contact.phone', newText)}
                    />
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Adres</h3>
                    <EditableText
                      initialText={themeData.contact.address}
                      element="p"
                      className="text-gray-600"
                      onTextChange={(newText) => handleTextChange('contact.address', newText)}
                    />
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Çalışma Saatleri</h3>
                    <p className="text-gray-600">Pazartesi - Cuma: 09:00 - 18:00</p>
                    <p className="text-gray-600">Cumartesi: 09:00 - 14:00</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Map Placeholder */}
            <Card className="p-6">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-gray-900">Konum</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="w-full h-64 bg-gray-200 rounded-lg flex items-center justify-center">
                  <p className="text-gray-500">Harita burada görüntülenecek</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
