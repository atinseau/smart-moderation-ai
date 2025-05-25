import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Search,
  Filter,
  Calendar,
  ExternalLink,
  MoreVertical,
  Instagram,
  Twitter,
  Facebook,
  Youtube,
  Linkedin,
} from "lucide-react"

import Image from "next/image"
import { StatisticCard } from "@/components/Cards/StatisticCard"
import { ContentCard } from "@/components/Cards/ContentCard"
import { api } from "@/lib/instances/api"

// Types basés sur votre modèle Prisma
type PlatformEnum = "INSTAGRAM" | "TWITTER" | "FACEBOOK" | "YOUTUBE" | "LINKEDIN" | "TIKTOK"

interface Content {
  id: string
  userId: string
  user: {
    id: string
    name: string
    image?: string
  }
  externalId: string
  externalCreatedAt: Date
  metadata: any
  imageUrl?: string
  title: string
  platform: PlatformEnum
  createdAt: Date
  updatedAt: Date
}

// function getPlatformIcon(platform: PlatformEnum) {
//   const iconProps = { className: "h-4 w-4" }

//   switch (platform) {
//     case "INSTAGRAM":
//       return <Instagram {...iconProps} />
//     case "TWITTER":
//       return <Twitter {...iconProps} />
//     case "FACEBOOK":
//       return <Facebook {...iconProps} />
//     case "YOUTUBE":
//       return <Youtube {...iconProps} />
//     case "LINKEDIN":
//       return <Linkedin {...iconProps} />
//     default:
//       return <ExternalLink {...iconProps} />
//   }
// }

// function getPlatformColor(platform: PlatformEnum) {
//   switch (platform) {
//     case "INSTAGRAM":
//       return "bg-gradient-to-r from-purple-500 to-pink-500"
//     case "TWITTER":
//       return "bg-blue-500"
//     case "FACEBOOK":
//       return "bg-blue-600"
//     case "YOUTUBE":
//       return "bg-red-500"
//     case "LINKEDIN":
//       return "bg-blue-700"
//     default:
//       return "bg-gray-500"
//   }
// }

export default async function ContentsPage() {

  const { data } = await api.contents.get()

  console.log(data)

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header avec titre et actions */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Contents</h1>
          <p className="text-muted-foreground">Gérez tous vos contenus de réseaux sociaux en un seul endroit</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filtres
          </Button>
          <Button size="sm">Nouveau contenu</Button>
        </div>
      </div>

      {/* Barre de recherche et filtres */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input placeholder="Rechercher dans les contenus..." className="pl-10" />
        </div>
        <Select defaultValue="all">
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
        </Select>
      </div>

      {/* Statistiques rapides */}
      <div className="grid gap-4 md:grid-cols-4">
        <StatisticCard />
        <StatisticCard />
        <StatisticCard />
        <StatisticCard />
      </div>

      {/* Grille de contenus */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ContentCard />
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center space-x-2 pt-4">
        <Button variant="outline" size="sm" disabled>
          Précédent
        </Button>
        <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
          1
        </Button>
        <Button variant="outline" size="sm">
          2
        </Button>
        <Button variant="outline" size="sm">
          3
        </Button>
        <Button variant="outline" size="sm">
          Suivant
        </Button>
      </div>
    </div>
  )
}
