import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/app3-theme/ui/card";
import { Badge } from "@/components/app3-theme/ui/badge";
import { Button } from "@/components/app3-theme/ui/button";
import { Check, Star } from "lucide-react";

export function PricingSection() {
  const plans = [
    {
      name: "Başlangıç",
      description: "Küçük işletmeler için temel çözümler",
      price: "₺5,000",
      period: "başlangıç",
      features: [
        "Responsive Web Sitesi",
        "SEO Optimizasyonu",
        "5 Sayfa İçerik",
        "E-posta Desteği",
        "1 Ay Ücretsiz Bakım"
      ],
      popular: false
    },
    {
      name: "Profesyonel",
      description: "Büyüyen işletmeler için kapsamlı çözümler",
      price: "₺15,000",
      period: "başlangıç",
      features: [
        "Tüm Başlangıç Özellikleri",
        "E-ticaret Entegrasyonu",
        "Admin Paneli",
        "Veritabanı Yönetimi",
        "3 Ay Ücretsiz Bakım",
        "7/24 Teknik Destek",
        "Analytics Entegrasyonu"
      ],
      popular: true
    },
    {
      name: "Kurumsal",
      description: "Büyük şirketler için özel çözümler",
      price: "Özel",
      period: "fiyatlandırma",
      features: [
        "Tüm Profesyonel Özellikler",
        "Özel Geliştirme",
        "API Entegrasyonu",
        "Yüksek Performans",
        "Güvenlik Denetimi",
        "1 Yıl Ücretsiz Bakım",
        "Öncelikli Destek",
        "Özel Eğitim"
      ],
      popular: false
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Fiyatlandırma
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Uygun Fiyatlı Çözümler
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            İhtiyaçlarınıza uygun paketlerimizle bütçenize uygun 
            kaliteli çözümler sunuyoruz.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`card-enhanced hover-lift animate-fade-in relative ${
                plan.popular ? 'ring-2 ring-primary scale-105' : ''
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-primary-foreground px-4 py-1">
                    <Star className="w-3 h-3 mr-1" />
                    En Popüler
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-6">
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription className="text-base">
                  {plan.description}
                </CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-foreground">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground ml-2">
                    /{plan.period}
                  </span>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <Check className="w-4 h-4 text-primary flex-shrink-0" />
                      <span className="text-sm text-muted-foreground">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={`w-full mt-6 ${
                    plan.popular 
                      ? 'btn-primary' 
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  {plan.name === "Kurumsal" ? "İletişime Geçin" : "Paketi Seçin"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <Card className="p-8 bg-background border-primary/20">
            <CardContent className="p-0">
              <h3 className="text-xl font-semibold text-foreground mb-4">
                Özel Projeler İçin
              </h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                Standart paketlerimiz size uygun değilse, ihtiyaçlarınıza özel 
                çözümler geliştirebiliriz. Bizimle iletişime geçin.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="outline" className="focus-ring">
                  Özel Teklif Alın
                </Button>
                <Button className="btn-primary">
                  Ücretsiz Danışmanlık
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
