import {
  Blocks,
  RssIcon,
  Scale,
} from "lucide-react"

import { api } from "@/lib/instances/api"
import { StatisticList } from "@/components/StatisticList/StatisticList"
import { ContentPageHeader } from "./_components/ContentPageHeader"
import { ContentPageSearch } from "./_components/ContentPageSearch"
import { Contents } from "./_components/Contents"

export default async function ContentsPage() {

  const { data } = await api.contents.get()

  const detectedPlatforms = (data?.contents || []).reduce((acc, content) => {
    if (acc.includes(content.platform)) {
      return acc
    }
    acc.push(content.platform)
    return acc
  }, [] as string[])

  return (
    <div className="flex-1 space-y-6 p-6">
      {/* Header avec titre et actions */}
      <ContentPageHeader tasks={data?.tasks || []} />

      {/* Barre de recherche et filtres */}
      <ContentPageSearch />

      {/* Statistiques rapides */}
      <StatisticList
        statistics={[
          {
            title: "Contenu modéré",
            className: "bg-purple-100",
            value: 5,
            icon: <Scale className="size-4 text-purple-600" />
          },
          {
            title: "Total contents",
            className: "bg-blue-100",
            value: data?.contents?.length || 0,
            icon: <RssIcon className="size-4 text-blue-600" />,
          },
          {
            title: "Connected platforms",
            className: "bg-red-100",
            icon: <Blocks className="size-4 text-red-600" />,
            value: detectedPlatforms.length
          }
        ]}
      />

      <Contents defaultData={data?.contents || []} />
    </div>
  )
}
