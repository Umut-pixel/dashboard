import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { Session } from "next-auth";
import { authOptions } from "@/lib/auth";
import { dbConnect } from "@/lib/mongoose";
import { Theme } from "@/models/Theme";

// Tema bilgilerini getir
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions) as Session | null;
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Yetkilendirme gerekli" },
        { status: 401 }
      );
    }

    const { id } = await params;

    await dbConnect();

    const theme = await Theme.findOne({
      _id: id,
      userId: session.user.id,
    });

    if (!theme) {
      return NextResponse.json(
        { error: "Tema bulunamadı" },
        { status: 404 }
      );
    }

    return NextResponse.json({ theme });

  } catch (error) {
    console.error("Get theme error:", error);
    return NextResponse.json(
      { error: "Sunucu hatası" },
      { status: 500 }
    );
  }
}

// Tema güncelle
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions) as Session | null;
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Yetkilendirme gerekli" },
        { status: 401 }
      );
    }

    const { settings, name, isActive } = await req.json();
    const { id } = await params;

    await dbConnect();

    const theme = await Theme.findOne({
      _id: id,
      userId: session.user.id,
    });

    if (!theme) {
      return NextResponse.json(
        { error: "Tema bulunamadı" },
        { status: 404 }
      );
    }

    // Güncelleme
    const updateData: {
      lastEdited: Date;
      version: number;
      settings?: typeof settings;
      name?: string;
      isActive?: boolean;
    } = {
      lastEdited: new Date(),
      version: theme.version + 1,
    };

    if (settings) {
      updateData.settings = settings;
    }

    if (name !== undefined) {
      updateData.name = name;
    }

    if (isActive !== undefined) {
      // Eğer bu tema aktif yapılıyorsa, diğer temaları pasif yap
      if (isActive) {
        await Theme.updateMany(
          { userId: session.user.id },
          { isActive: false }
        );
      }
      updateData.isActive = isActive;
    }

    const updatedTheme = await Theme.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    return NextResponse.json({
      message: "Tema başarıyla güncellendi",
      theme: updatedTheme,
    });

  } catch (error) {
    console.error("Update theme error:", error);
    return NextResponse.json(
      { error: "Sunucu hatası" },
      { status: 500 }
    );
  }
}

// Tema sil
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions) as Session | null;
    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Yetkilendirme gerekli" },
        { status: 401 }
      );
    }

    await dbConnect();
    const { id } = await params;

    const theme = await Theme.findOne({
      _id: id,
      userId: session.user.id,
    });

    if (!theme) {
      return NextResponse.json(
        { error: "Tema bulunamadı" },
        { status: 404 }
      );
    }

    await Theme.findByIdAndDelete(id);

    return NextResponse.json({
      message: "Tema başarıyla silindi",
    });

  } catch (error) {
    console.error("Delete theme error:", error);
    return NextResponse.json(
      { error: "Sunucu hatası" },
      { status: 500 }
    );
  }
}
