import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";


export function ContentPageSearch() {

  return <div className="flex items-center space-x-4">
    <div className="relative flex-1 max-w-sm">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
      <Input placeholder="Rechercher dans les contenus..." className="pl-10" />
    </div>
    {/* <Select defaultValue="all">
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Plateforme" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">Toutes les plateformes</SelectItem>
        <SelectItem value="instagram">Instagram</SelectItem>
        <SelectItem value="twitter">Twitter</SelectItem>
        <SelectItem value="facebook">Facebook</SelectItem>
        <SelectItem value="youtube">YouTube</SelectItem>
        <SelectItem value="linkedin">LinkedIn</SelectItem>
      </SelectContent>
    </Select>
    <Select defaultValue="recent">
      <SelectTrigger className="w-[150px]">
        <SelectValue placeholder="Trier par" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="recent">Plus récent</SelectItem>
        <SelectItem value="oldest">Plus ancien</SelectItem>
        <SelectItem value="platform">Plateforme</SelectItem>
      </SelectContent>
    </Select> */}
  </div>
}
