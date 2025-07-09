import { Button } from "@/components/ui/button"
import {
  RssIcon,
} from "lucide-react"

import { ContentCard } from "@/components/Cards/ContentCard/ContentCard"
import { api } from "@/lib/instances/api"
import { StatisticList } from "@/components/StatisticList/StatisticList"
import { ContentPageHeader } from "./_components/ContentPageHeader"
import { ContentPageFilters } from "./_components/ContentPageFilters"

export default async function ContentsPage() {

  const { data } = await api.contents.get()

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header avec titre et actions */}
      <ContentPageHeader tasks={data?.tasks || []} />

      {/* Barre de recherche et filtres */}
      <ContentPageFilters />

      {/* Statistiques rapides */}
      <StatisticList
        statistics={[
          {
            title: "Total contents",
            className: "bg-blue-100",
            value: 10,
            icon: <RssIcon className="size-4 text-blue-600" />,
          },
          {
            title: "Total contents",
            className: "bg-blue-100",
            value: 10,
            icon: <RssIcon className="size-4 text-blue-600" />,
          },
          {
            title: "Total contents",
            className: "bg-blue-100",
            value: 10,
            icon: <RssIcon className="size-4 text-blue-600" />,
          },
          {
            title: "Total contents",
            className: "bg-blue-100",
            value: 10,
            icon: <RssIcon className="size-4 text-blue-600" />,
          },
          {
            title: "Total contents",
            className: "bg-blue-100",
            value: 10,
            icon: <RssIcon className="size-4 text-blue-600" />,
          },
          {
            title: "Total contents",
            className: "bg-blue-100",
            value: 10,
            icon: <RssIcon className="size-4 text-blue-600" />,
          }
        ]}
      />

      {/* Grille de contenus */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data?.contents.map((content) => <ContentCard
          key={content.id}
          content={content}
        />)}
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
