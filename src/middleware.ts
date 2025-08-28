import { withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server"

export default withAuth(
  function middleware(req) {
    // Auth gerektiren sayfalar
    const protectedPaths = [
      "/dashboard",
      "/dashboard/themes",
      "/dashboard/editor",
      "/dashboard/analytics",
      "/dashboard/users",
      "/dashboard/monitor",
      "/dashboard/activity",
      "/dashboard/business",
      "/dashboard/profile",
    ]

    const isProtectedPath = protectedPaths.some(path => 
      req.nextUrl.pathname.startsWith(path)
    )

    // Auth gerektirmeyen sayfalar
    const publicPaths = [
      "/auth/signin",
      "/auth/signup",
      "/api/auth",
    ]

    const isPublicPath = publicPaths.some(path => 
      req.nextUrl.pathname.startsWith(path)
    )

    // Kullanıcı giriş yapmış ve public path'e gitmeye çalışıyorsa dashboard'a yönlendir
    if (req.nextauth.token && isPublicPath) {
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }

    // Kullanıcı giriş yapmamış ve protected path'e gitmeye çalışıyorsa signin'e yönlendir
    if (!req.nextauth.token && isProtectedPath) {
      return NextResponse.redirect(new URL("/auth/signin", req.url))
    }

    return NextResponse.next()
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        // API routes için auth kontrolü yapma
        if (req.nextUrl.pathname.startsWith("/api/")) {
          return true
        }
        
        // Auth gerektiren sayfalar için token kontrolü
        const protectedPaths = [
          "/dashboard",
          "/dashboard/themes",
          "/dashboard/editor",
          "/dashboard/analytics",
          "/dashboard/users",
          "/dashboard/monitor",
          "/dashboard/activity",
          "/dashboard/business",
          "/dashboard/profile",
        ]

        const isProtectedPath = protectedPaths.some(path => 
          req.nextUrl.pathname.startsWith(path)
        )

        if (isProtectedPath) {
          return !!token
        }

        return true
      },
    },
  }
)

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
}
