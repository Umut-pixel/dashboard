"use client"

import { useSession } from "next-auth/react"
import { FullPageLoading } from "@/components/loading-spinner"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function AIBuilderPage() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <FullPageLoading />
  }

  if (status === 'unauthenticated') {
    return <div></div>
  }

  if (!session?.user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Giriş yapmanız gerekiyor</h2>
          <Link href="/auth/signin">
            <Button>Giriş Yap</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Dashboard&apos;a Dön
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-semibold text-gray-900">AI Website Builder</h1>
              <p className="text-sm text-gray-600">Yapay zeka ile web sitenizi oluşturun</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-8 max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">AI Website Builder</h2>
          <p className="text-gray-600">Bu özellik yakında aktif olacak.</p>
        </div>
      </div>
    </div>
  )
}
