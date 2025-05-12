import { FacebookPlatformCard } from "@/components/Cards/FacebookPlatformCard"
import { api } from "@/lib/instances/api"

export default async function PlatformsPage() {
  const { data: availablePlatforms } = await api.platforms.get()

  // console.log(availablePlatforms)

  return <>
    {(availablePlatforms || []).map((platform) => {
      if (platform.name === "FACEBOOK") {
        return <FacebookPlatformCard key={platform.id} {...platform} />
      }
      return null
    })}
  </>

}
