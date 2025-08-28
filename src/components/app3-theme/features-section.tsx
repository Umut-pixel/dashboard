"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/app3-theme/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/app3-theme/ui/tabs";
import { Badge } from "@/components/app3-theme/ui/badge";
import { Progress } from "@/components/app3-theme/ui/progress";
import { 
  Zap, 
  Shield, 
  TrendingUp, 
  Users, 
  Clock, 
  Award,
  CheckCircle,
  ArrowRight
} from "lucide-react"; //lucide-react kütüphanesini import etmek?

export function FeaturesSection() {
  const features = {
    technology: {
      title: "Teknoloji",
      description: "En son teknolojileri kullanarak çözümler geliştiriyoruz",
      items: [
        { name: "React & Next.js", progress: 95 },
        { name: "Node.js & Python", progress: 90 },
        { name: "AWS & Azure", progress: 88 },
        { name: "Docker & Kubernetes", progress: 85 }
      ]
    },
    security: {
      title: "Güvenlik",
      description: "Verilerinizi korumak için en yüksek güvenlik standartlarını uyguluyoruz",
      items: [
        { name: "SSL Sertifikaları", progress: 100 },
        { name: "Penetrasyon Testi", progress: 95 },
        { name: "GDPR Uyumluluğu", progress: 100 },
        { name: "Güvenlik Denetimi", progress: 90 }
      ]
    },
    performance: {
      title: "Performans",
      description: "Hızlı ve optimize edilmiş çözümler sunuyoruz",
      items: [
        { name: "Sayfa Yükleme Hızı", progress: 98 },
        { name: "SEO Optimizasyonu", progress: 95 },
        { name: "Mobil Uyumluluk", progress: 100 },
        { name: "Veritabanı Optimizasyonu", progress: 92 }
      ]
    }
  };

  const benefits = [
    {
      icon: Zap,
      title: "Hızlı Teslimat",
      description: "Projelerinizi zamanında teslim ediyoruz"
    },
    {
      icon: Shield,
      title: "Güvenli Altyapı",
      description: "En yüksek güvenlik standartlarını uyguluyoruz"
    },
    {
      icon: TrendingUp,
      title: "Sürekli İyileştirme",
      description: "Teknolojileri sürekli güncel tutuyoruz"
    },
    {
      icon: Users,
      title: "Uzman Ekip",
      description: "Deneyimli geliştiricilerle çalışıyoruz"
    },
    {
      icon: Clock,
      title: "7/24 Destek",
      description: "Her zaman yanınızdayız"
    },
    {
      icon: Award,
      title: "Kalite Garantisi",
      description: "Mükemmellik için çalışıyoruz"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Özelliklerimiz
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Neden Aygıt'ı Seçmelisiniz?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Teknoloji, güvenlik ve performans odaklı çözümlerimizle 
            işinizi bir üst seviyeye taşıyoruz.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Tabs Section */}
          <div className="space-y-6">
            <Tabs defaultValue="technology" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="technology">Teknoloji</TabsTrigger>
                <TabsTrigger value="security">Güvenlik</TabsTrigger>
                <TabsTrigger value="performance">Performans</TabsTrigger>
              </TabsList>
              
              {Object.entries(features).map(([key, feature]) => (
                <TabsContent key={key} value={key} className="space-y-4">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      {feature.description}
                    </p>
                  </div>
                  
                  <div className="space-y-4">
                    {feature.items.map((item, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-foreground">
                            {item.name}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {item.progress}%
                          </span>
                        </div>
                        <Progress value={item.progress} className="h-2" />
                      </div>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>

          {/* Fayda kısmı */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="card-enhanced hover-lift animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <benefit.icon className="w-5 h-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{benefit.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Card className="p-8 gradient-primary text-white">
            <CardContent className="p-0">
              <div className="flex items-center justify-center mb-4">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">
                Projenizi Hayata Geçirelim
              </h3>
              <p className="text-white/90 mb-6 max-w-2xl mx-auto">
                Uzman ekibimizle birlikte projenizi planlayalım ve en uygun 
                teknoloji çözümlerini belirleyelim.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-3 bg-white text-primary rounded-lg font-medium hover:bg-white/90 transition-colors flex items-center justify-center">
                  Ücretsiz Danışmanlık
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
                <button className="px-8 py-3 border border-white/30 text-white rounded-lg font-medium hover:bg-white/10 transition-colors">
                  Portföyümüzü İnceleyin
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
