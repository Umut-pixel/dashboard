"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { IconCode } from "@tabler/icons-react"

export default function CodeUploadPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Kod Yükleme & Düzenleme</h1>
          <p className="text-muted-foreground">
            Website kodlarınızı yükleyin ve anında düzenleyin
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <IconCode className="h-5 w-5" />
            Kod Yükleme Sistemi
          </CardTitle>
          <CardDescription>
            Bu alan kod yükleme ve düzenleme için hazırlanmıştır
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12 text-muted-foreground">
            <IconCode className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <p className="text-lg font-medium mb-2">Kod Yükleme Sistemi</p>
            <p>Bu alan kod yükleme ve düzenleme için ayrılmıştır</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
