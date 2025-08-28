"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/app3-theme/ui/card";
import { 
  Code, 
  Palette, 
  Smartphone, 
  Rocket, 
  Shield, 
  TrendingUp,
  ArrowRight
} from "lucide-react";
import { EditableText } from "./editable-text";
import { useTheme } from "./theme-context";
import { useGSAPAnimation } from "./use-gsap-animation";
import { applyStyles } from "./apply-styles";

export function ServicesSection() {
  const { themeData, updateThemeData } = useTheme();
  const { ref: servicesRef } = useGSAPAnimation(themeData?.animations?.services || {
    enabled: false,
    type: 'fadeIn',
    duration: 1,
    delay: 0,
    ease: 'power2.out',
    direction: 'normal',
    repeat: 0
  }, 'onScroll');

  const handleTextChange = (path: string, newText: string) => {
    updateThemeData(path, newText);
  };

  const handleServiceItemChange = (index: number, field: string, value: string) => {
    updateThemeData(`services.items.${index}.${field}`, value);
  };

  const handleFeaturesChange = (index: number, features: string[]) => {
    updateThemeData(`services.items.${index}.features`, features);
  };

  const icons = [Code, Palette, Smartphone, Rocket, Shield, TrendingUp];

  // Apply CSS styles
  const servicesStyles = applyStyles(themeData?.styles?.services || {});

  return (
    <section ref={servicesRef} className="py-20 bg-gray-50" style={servicesStyles}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <EditableText
            initialText={themeData.services.title}
            element="h2"
            className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4"
            onTextChange={(newText) => handleTextChange('services.title', newText)}
          />
          <EditableText
            initialText={themeData.services.subtitle}
            element="p"
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            onTextChange={(newText) => handleTextChange('services.subtitle', newText)}
          />
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {themeData.services.items.map((service, index) => {
            const IconComponent = icons[index] || Code;
            
            return (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <EditableText
                    initialText={service.title}
                    element="h3"
                    className="text-xl font-semibold text-gray-900"
                    onTextChange={(newText) => handleServiceItemChange(index, 'title', newText)}
                  />
                </CardHeader>
                <CardContent className="text-center">
                  <EditableText
                    initialText={service.description}
                    element="p"
                    className="text-gray-600 mb-6"
                    onTextChange={(newText) => handleServiceItemChange(index, 'description', newText)}
                  />
                  
                  <div className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center justify-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                        <EditableText
                          initialText={feature}
                          element="span"
                          className="text-sm text-gray-600"
                          onTextChange={(newText) => {
                            const newFeatures = [...service.features];
                            newFeatures[featureIndex] = newText;
                            handleFeaturesChange(index, newFeatures);
                          }}
                        />
                      </div>
                    ))}
                  </div>
                  
                  <button className="px-8 py-3 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors w-full flex items-center justify-center group">
                    Detayları Gör
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
