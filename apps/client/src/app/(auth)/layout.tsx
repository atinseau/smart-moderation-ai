import { auth } from "@/auth";
import { AppSidebar } from "@/components/AppSidebar/AppSidebar";
import { Quota } from "@/components/Quota";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { redirect } from "next/navigation";

export default async function AuthLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const session = await auth()
  if (!session) {
    redirect("/")
  }

  return <SidebarProvider>
    <AppSidebar />
    <SidebarInset className="overflow-x-hidden">
      <header className="flex h-16 border-b items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 !h-4" />
        </div>
        <Quota />
      </header>
      <div className="flex flex-1 flex-col gap-4 p-4">
        {children}
      </div>
    </SidebarInset>
  </SidebarProvider>
}
