'use client';

import Link from "next/link";
import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import { usePathname } from "next/navigation";

export type AppSidebarMenuButtonProps = {
  title: string,
  url: string,
  icon: React.ReactNode,
}

export function AppSidebarMenuButton(props: AppSidebarMenuButtonProps) {
  const pathname = usePathname()

  return <SidebarMenuItem key={props.title}>
    <SidebarMenuButton asChild isActive={pathname === props.url}>
      <Link href={props.url}>
        {props.icon}
        <span>{props.title}</span>
      </Link>
    </SidebarMenuButton>
  </SidebarMenuItem>
}
