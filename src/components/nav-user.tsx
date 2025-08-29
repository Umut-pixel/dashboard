"use client"

import { useEffect, useState } from 'react'
import { useSession, signOut } from 'next-auth/react'
import {
  IconDotsVertical,
  IconLogout,
  IconUserCircle,
  IconPhone,
  IconBuilding,
  IconMapPin,
  IconBriefcase,
  IconSettings,
  IconHelp,
} from "@tabler/icons-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

interface UserProfile {
  _id: string
  name: string
  email: string
  image: string
  phone: string
  position: string
  company: string
  location: string
}

export function NavUser() {
  const { data: session } = useSession()
  const { isMobile } = useSidebar()
  const [profile, setProfile] = useState<UserProfile | null>(null)

  // Profil bilgilerini yükle
  useEffect(() => {
    if (session?.user?.id) {
      fetch('/api/user/profile')
        .then(res => res.json())
        .then(data => {
          if (data.user) {
            setProfile(data.user)
          }
        })
        .catch(err => console.error('Profil yüklenemedi:', err))
    }
  }, [session?.user?.id])

  // Session'dan gelen bilgileri kullan
  const user = {
    name: profile?.name || session?.user?.name || 'Kullanıcı',
    email: profile?.email || session?.user?.email || 'email@example.com',
    avatar: profile?.image || session?.user?.image || '',
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-8 w-8 rounded-lg grayscale">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="rounded-lg">UE</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.name}</span>
                <span className="text-muted-foreground truncate text-xs">
                  {user.email}
                </span>
              </div>
              <IconDotsVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="rounded-lg">
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">{user.name}</span>
                  <span className="text-muted-foreground truncate text-xs">
                    {user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            
            {/* Profil Bilgileri */}
            {profile && (
              <DropdownMenuGroup>
                {profile.phone && (
                  <DropdownMenuItem 
                    className="text-xs"
                    onClick={() => {
                      // Copy phone to clipboard
                      navigator.clipboard.writeText(profile.phone)
                      alert('Telefon numarası kopyalandı!')
                    }}
                  >
                    <IconPhone className="h-3 w-3 mr-2" />
                    {profile.phone}
                  </DropdownMenuItem>
                )}
                {profile.position && (
                  <DropdownMenuItem 
                    className="text-xs"
                    onClick={() => {
                      // Copy position to clipboard
                      navigator.clipboard.writeText(profile.position)
                      alert('Pozisyon kopyalandı!')
                    }}
                  >
                    <IconBriefcase className="h-3 w-3 mr-2" />
                    {profile.position}
                  </DropdownMenuItem>
                )}
                {profile.company && (
                  <DropdownMenuItem 
                    className="text-xs"
                    onClick={() => {
                      // Copy company to clipboard
                      navigator.clipboard.writeText(profile.company)
                      alert('Şirket adı kopyalandı!')
                    }}
                  >
                    <IconBuilding className="h-3 w-3 mr-2" />
                    {profile.company}
                  </DropdownMenuItem>
                )}
                {profile.location && (
                  <DropdownMenuItem 
                    className="text-xs"
                    onClick={() => {
                      // Copy location to clipboard
                      navigator.clipboard.writeText(profile.location)
                      alert('Konum kopyalandı!')
                    }}
                  >
                    <IconMapPin className="h-3 w-3 mr-2" />
                    {profile.location}
                  </DropdownMenuItem>
                )}
              </DropdownMenuGroup>
            )}
            
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <a href="/dashboard/profile">
                  <IconUserCircle />
                  Profil Yönetimi
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="/dashboard/settings">
                  <IconSettings />
                  Ayarlar
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href="/dashboard/help">
                  <IconHelp />
                  Yardım
                </a>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut({ callbackUrl: '/auth/signin' })}>
              <IconLogout />
              Çıkış Yap
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
