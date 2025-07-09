import { auth } from "@/auth";
import { AppSidebar } from "@/components/AppSidebar";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { getAccessToken } from "@/lib/functions/getAccessToken.server";
import { redirect } from "next/navigation";

export default async function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await auth()
  if (!session) {
    redirect("/")
  }

  return <SidebarProvider>
    <AppSidebar />
    <SidebarInset className="overflow-x-hidden">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 !h-4" />
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4">
        {children}
      </div>
    </SidebarInset>
  </SidebarProvider>
}
