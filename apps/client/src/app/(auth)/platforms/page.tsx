import { MetaPlatformCard } from "@/components/Cards/MetaPlatformCard"
import { api } from "@/lib/instances/api"

export default async function PlatformsPage() {
  const { data: platforms } = await api.platforms.get()

  return <div>

    <h1 className="text-2xl font-bold mb-4">Platforms</h1>

    {(platforms || []).map((platform) => {
      if (platform.name === "META") {
        return <MetaPlatformCard key={platform.id} {...platform} />
      }
      return null
    })}
  </div>

}
