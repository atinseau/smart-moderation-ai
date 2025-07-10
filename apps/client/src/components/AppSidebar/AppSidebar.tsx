import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import { GalleryVerticalEnd, Home, PlugZap, RssIcon } from "lucide-react"
import Link from "next/link"
import { AppSidebarMenuButton } from "./AppSidebarMenuButton"

// Menu items.
const items = [
  {
    title: "Home",
    url: "/me",
    icon: Home,
  },
  {
    title: "Contents",
    url: "/contents",
    icon: RssIcon,
  },
  {
    title: "Platforms",
    url: "/platforms",
    icon: PlugZap,
  },
]

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="pb-0">
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/">
              <SidebarMenuButton size="lg" className="cursor-pointer">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Smart moderation ai</span>
                </div>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item, index) => <AppSidebarMenuButton
                {...item}
                key={index}
                icon={<item.icon />}
              />)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
