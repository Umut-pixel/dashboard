import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { Session } from "next-auth";
import { authOptions } from "@/lib/auth";
import { dbConnect } from "@/lib/mongoose";
import { Theme } from "@/models/Theme";
// Kullanıcının temalarını getir
export async function GET() {
  try {
    const session = await getServerSession(authOptions) as Session | null;
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Yetkilendirme gerekli" },
        { status: 401 }
      );
    }

    await dbConnect();
    
    const themes = await Theme.find({ userId: session.user.id })
      .sort({ updatedAt: -1 });

    return NextResponse.json({ themes });

  } catch (error) {
    console.error("Get themes error:", error);
    return NextResponse.json(
      { error: "Sunucu hatası" },
      { status: 500 }
    );
  }
}

// Yeni tema oluştur
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions) as Session | null;
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Yetkilendirme gerekli" },
        { status: 401 }
      );
    }

    const { themeId, name } = await req.json();

    if (!themeId || !name) {
      return NextResponse.json(
        { error: "Tema ID ve isim gereklidir" },
        { status: 400 }
      );
    }

    await dbConnect();

    // Kullanıcının bu temaya sahip olup olmadığını kontrol et
    const existingTheme = await Theme.findOne({
      userId: session.user.id,
      themeId: themeId,
    });

    if (existingTheme) {
      return NextResponse.json(
        { error: "Bu tema zaten mevcut" },
        { status: 400 }
      );
    }

    // Varsayılan tema ayarları
    const defaultSettings = {
      hero: {
        title: "Modern Web Sitesi",
        subtitle: "Profesyonel Çözümler",
        description: "İşinizi büyütmek için modern web teknolojileri",
        button1Text: "Başla",
        button2Text: "Daha Fazla",
        backgroundImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2072&q=80",
      },
      services: {
        title: "Hizmetlerimiz",
        subtitle: "Size özel çözümler",
        items: [
          {
            title: "Web Tasarım",
            description: "Modern ve responsive web siteleri",
            features: ["Responsive Tasarım", "SEO Optimizasyonu", "Hızlı Yükleme"],
          },
          {
            title: "Mobil Uygulama",
            description: "iOS ve Android uygulamaları",
            features: ["Native Performans", "Kullanıcı Dostu", "Güvenli"],
          },
          {
            title: "Dijital Pazarlama",
            description: "Sosyal medya ve SEO hizmetleri",
            features: ["Sosyal Medya", "Google Ads", "İçerik Pazarlama"],
          },
        ],
      },
      contact: {
        title: "İletişim",
        subtitle: "Bizimle iletişime geçin",
        email: "info@example.com",
        phone: "+90 555 123 4567",
        address: "İstanbul, Türkiye",
      },
      footer: {
        logo: "/aygit-logo-beyaz.png",
        description: "Modern web çözümleri ile işinizi büyütün",
        email: "info@example.com",
        phone: "+90 555 123 4567",
        address: "İstanbul, Türkiye",
      },
    };

    const theme = await Theme.create({
      userId: session.user.id,
      themeId,
      name,
      settings: defaultSettings,
      isActive: true, // İlk tema aktif olsun
    });

    return NextResponse.json(
      { message: "Tema başarıyla oluşturuldu", theme },
      { status: 201 }
    );

  } catch (error) {
    console.error("Create theme error:", error);
    return NextResponse.json(
      { error: "Sunucu hatası" },
      { status: 500 }
    );
  }
}
