import { Task } from "@smart-moderation-ai/db"
import { ContentLoading } from "./ContentLoading"
import { Button } from "@/components/ui/button"
import { Filter, MoreVertical } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

type ContentPageHeaderProps = {
  tasks: Task[]
}

export function ContentPageHeader({ tasks }: ContentPageHeaderProps) {
  return <div className="flex items-center justify-between gap-4">
    <div>
      <h1 className="text-3xl font-bold tracking-tight">Contents</h1>
      <p className="text-muted-foreground">Gérez tous vos contenus de réseaux sociaux en un seul endroit</p>
      <ContentLoading tasks={tasks} />
    </div>
    <div className="hidden items-center space-x-2 sm:flex md:hidden lg:flex">
      <Button variant="outline" size="sm">
        <Filter className="h-4 w-4 mr-2" />
        Filtres
      </Button>
      <Button size="sm">Activer la modération intelligente</Button>
    </div>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" className="size-8 flex sm:hidden md:flex lg:hidden">
          <MoreVertical />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuItem>Subscription</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
}
