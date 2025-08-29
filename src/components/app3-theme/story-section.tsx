import { Card, CardContent } from "@/components/app3-theme/ui/card";
import { Users, Target, Award, Zap } from "lucide-react";

export function StorySection() {
  const stats = [
    {
      icon: Users,
      number: "500+",
      label: "Mutlu Müşteri",
    },
    {
      icon: Target,
      number: "1000+",
      label: "Tamamlanan Proje",
    },
    {
      icon: Award,
      number: "50+",
      label: "Ödül",
    },
    {
      icon: Zap,
      number: "24/7",
      label: "Destek",
    },
  ];

  return (
    <section id="story" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Hikayemiz
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            2023 yılında kurulan Aygıt Yazılım Teknolojileri, dijital dünyada yenilikçi çözümler sunma 
            vizyonuyla yola çıktı. Bugün, binlerce müşterimizin dijital dönüşümüne 
            öncülük ediyoruz.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-foreground">
              Neden Aygıt?
            </h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-primary rounded-full" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Yenilikçi Yaklaşım</h4>
                  <p className="text-muted-foreground">
                    En son teknolojileri kullanarak müşterilerimizin ihtiyaçlarına 
                    özel çözümler geliştiriyoruz.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-primary rounded-full" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Uzman Ekip</h4>
                  <p className="text-muted-foreground">
                    Alanında uzman mühendislerimizle her projede mükemmellik hedefliyoruz.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-primary rounded-full" />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">Müşteri Odaklı</h4>
                  <p className="text-muted-foreground">
                    Müşteri memnuniyeti bizim için her şeyden önce gelir.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <Card className="p-8 bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
              <CardContent className="p-0">
                <div className="text-center space-y-4">
                  <h4 className="text-xl font-semibold text-foreground">
                    Misyonumuz
                  </h4>
                  <p className="text-muted-foreground">
                    &quot;Misyonumuz, kullanıcıların iş süreçlerini 
                    sadeleştirmek, verimliliği artırmak ve rekabet avantajı sağlamaktır.&quot;
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>


        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div className="text-3xl font-bold text-foreground mb-2">
                {stat.number}
              </div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
