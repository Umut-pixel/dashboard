"use client"

import { useState, useEffect } from 'react'
import { signIn, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { FullPageLoading } from '@/components/loading-spinner'
import { UnicornStudioBasic } from '@/components/unicorn-studio-basic'
import { LoginAnimations, FloatingParticles } from '@/components/login-animations'
import { AuthLoading } from '@/components/auth-loading'
import { gsap } from 'gsap'

export default function SignInPage() {
  const { data: session, status } = useSession()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [_error, setError] = useState('')
  const [isTransitioning, setIsTransitioning] = useState(false)
  const router = useRouter()

  // Kullanıcı zaten giriş yapmışsa dashboard'a yönlendir
  useEffect(() => {
    if (status === 'authenticated' && session) {
      router.push('/dashboard')
    }
  }, [session, status, router])

  // Loading durumunda loading göster
  if (status === 'loading') {
    return <FullPageLoading />
  }

  // Kullanıcı zaten giriş yapmışsa boş div döndür (yönlendirme yapılacak)
  if (status === 'authenticated') {
    return <div></div>
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('Geçersiz email veya şifre')
      } else {
        router.push('/dashboard')
      }
    } catch (error) {
      setError('Bir hata oluştu')
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/dashboard' })
  }

  const handleSmoothNavigation = (href: string) => {
    setIsTransitioning(true)
    // Fade out current page
    gsap.to('.auth-container', {
      opacity: 0,
      y: -20,
      duration: 0.3,
      ease: "power2.inOut",
      onComplete: () => {
        window.location.href = href
      }
    })
  }

  return (
    <>
      <AuthLoading isVisible={isTransitioning} />
      <div className="min-h-screen bg-black relative overflow-hidden auth-container">
        {/* Unicorn Studio Background */}
        <UnicornStudioBasic projectId="rhNsOLgJq9oj8TbHwU4o" />
        
        {/* Floating Particles */}
        <FloatingParticles />
        
        {/* Content */}
        <LoginAnimations>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-lg w-full space-y-8 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center z-50">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white">
            Hesabınıza giriş yapın
          </h2>
          <p className="mt-2 text-sm text-gray-300">
            Veya{' '}
            <button 
              onClick={() => handleSmoothNavigation('/auth/signup')}
              className="font-medium text-blue-400 hover:text-blue-300 cursor-pointer"
            >
              yeni hesap oluşturun
            </button>
          </p>
        </div>

        <Card className="bg-black border-white/20" data-card>
          <CardHeader>
            <CardTitle className="text-white">Giriş Yap</CardTitle>
            <CardDescription className="text-gray-300">
              Email ve şifrenizle giriş yapın
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="ornek@email.com"
                  className="bg-white/20 border-white/30 text-white placeholder:text-gray-400"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">Şifre</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="bg-white/20 border-white/30 text-white placeholder:text-gray-400"
                />
              </div>

              {error && (
                <div className="text-red-500 text-sm">{error}</div>
              )}

              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isLoading}>
                {isLoading ? 'Giriş yapılıyor...' : 'Giriş Yap'}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full bg-white/20" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-black/50 px-2 text-gray-300">
                  Veya
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              onClick={handleGoogleSignIn}
              className="w-full bg-gray-600 hover:bg-gray-700 border-gray-500 text-white"
              disabled={isLoading}
            >
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Google ile giriş yap
            </Button>
          </CardContent>
        </Card>
        </div>
      </LoginAnimations>
      </div>
    </>
  )
}
