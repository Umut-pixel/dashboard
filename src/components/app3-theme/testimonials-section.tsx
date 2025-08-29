import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/app3-theme/ui/card";
import { Badge } from "@/components/app3-theme/ui/badge";
import { Star, Quote } from "lucide-react";
{/* YORUM KISMI */}
export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Ahmet Yılmaz",
      role: "CEO, TechStart",
      company: "TechStart",
      rating: 5,
      content: "Aygıt ile çalışmak gerçekten harika bir deneyimdi. Projemizi zamanında ve bütçe dahilinde tamamladılar. Kesinlikle tavsiye ederim!",
      avatar: "/avatars/ahmet.jpg"
    },
    {
      name: "Zeynep Kaya",
      role: "CTO, DigitalFlow",
      company: "DigitalFlow",
      rating: 5,
      content: "Uzman ekibiniz ve profesyonel yaklaşımınız sayesinde projemiz çok başarılı oldu. Tekrar çalışmak için sabırsızlanıyoruz.",
      avatar: "/avatars/zeynep.jpg"
    },
    {
      name: "Mehmet Demir",
      role: "Founder, InnovateLab",
      company: "InnovateLab",
      rating: 5,
      content: "Aygıt'ın yenilikçi çözümleri ve teknik uzmanlığı sayesinde işimizi büyüttük. Mükemmel bir iş ortağı.",
      avatar: "/avatars/mehmet.jpg"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Müşteri Yorumları
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Müşterilerimiz Ne Diyor?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Başarılı projelerimiz ve mutlu müşterilerimizle gurur duyuyoruz. 
            İşte bazı müşterilerimizin deneyimleri.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="card-enhanced hover-lift animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardHeader>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Quote className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                      <CardDescription>{testimonial.role}</CardDescription>
                    </div>
                  </div>
                  <Badge variant="outline">{testimonial.company}</Badge>
                </div>
                <div className="flex items-center space-x-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground italic">
                  &quot;{testimonial.content}&quot;
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">98%</div>
            <div className="text-muted-foreground">Müşteri Memnuniyeti</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">4.9/5</div>
            <div className="text-muted-foreground">Ortalama Puan</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">500+</div>
            <div className="text-muted-foreground">Mutlu Müşteri</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-2">24/7</div>
            <div className="text-muted-foreground">Destek</div>
          </div>
        </div>
      </div>
    </section>
  );
}
