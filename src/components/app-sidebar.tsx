"use client"

import * as React from "react"
import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
  IconWorld,
  IconCode,
  IconBuilding,
  IconActivity,
  IconLayout,
  IconEdit,
  IconPalette,
  IconUser,
} from "@tabler/icons-react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Umut Erol",
    email: "umut@aygitteknoloji.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Gösterge Paneli",
      url: "/dashboard",
      icon: IconDashboard,
    },
    {
      title: "Kod Yükleme",
      url: "/dashboard/code-upload",
      icon: IconCode,
    },
    {
      title: "Website İzleme",
      url: "/dashboard/monitor",
      icon: IconWorld,
    },
    {
      title: "Bileşenler",
      url: "/dashboard/components",
      icon: IconCode,
    },
    {
      title: "Analitik",
      url: "/dashboard/analytics",
      icon: IconChartBar,
    },
    {
      title: "Kullanıcı Yönetimi",
      url: "/dashboard/users",
      icon: IconUsers,
    },
    {
      title: "Aktivite",
      url: "/dashboard/activity",
      icon: IconActivity,
    },
  ],
  navClouds: [
    {
      title: "Website Araçları",
      icon: IconLayout,
      isActive: true,
      url: "#",
      items: [
        {
          title: "Performans",
          url: "/dashboard/monitor/performance",
        },
        {
          title: "Çalışma Süresi",
          url: "/dashboard/monitor/uptime",
        },
        {
          title: "SEO",
          url: "/dashboard/monitor/seo",
        },
      ],
    },
    {
      title: "Tasarım Araçları",
      icon: IconPalette,
      url: "#",
      items: [
        {
          title: "Website Editörü",
          url: "/dashboard/editor",
        },
        {
          title: "UI Bileşenleri",
          url: "/dashboard/components/ui",
        },
        {
          title: "Şablonlar",
          url: "/dashboard/components/templates",
        },
        {
          title: "Tema Ayarları",
          url: "/dashboard/design",
        },
      ],
    },
    {
      title: "Kullanıcı Yönetimi",
      icon: IconUsers,
      url: "#",
      items: [
        {
          title: "Kullanıcı Listesi",
          url: "/dashboard/users",
        },
        {
          title: "Roller ve İzinler",
          url: "/dashboard/users/roles",
        },
        {
          title: "Profil Yönetimi",
          url: "/dashboard/profile",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Profil",
      url: "/dashboard/profile",
      icon: IconUser,
    },
    {
      title: "Ayarlar",
      url: "/dashboard/settings",
      icon: IconSettings,
    },
    {
      title: "Yardım Al",
      url: "/dashboard/help",
      icon: IconHelp,
    },
    {
      title: "Ara",
      url: "/dashboard/search",
      icon: IconSearch,
    },
  ],
  documents: [
    {
      name: "Veri Kütüphanesi",
      url: "/dashboard/data",
      icon: IconDatabase,
    },
    {
      name: "Raporlar",
      url: "/dashboard/reports",
      icon: IconReport,
    },
    {
      name: "Kelime Asistanı",
      url: "/dashboard/assistant",
      icon: IconFileWord,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/dashboard">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Web Yönetim Paneli</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
