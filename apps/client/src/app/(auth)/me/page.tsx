import { auth } from "@/auth"
import { FacebookAuthButton } from "@/components/FacebookAuthButton/FacebookAuthButton"
import { api } from "@/lib/instances/api"

export default async function Home() {
  const session = await auth()

  const { data: availablePlatforms } = await api.get('/platform/available')
  const { data: connectedPlatforms } = await api.get('/platform/connected')

  return <div>
    <pre>{JSON.stringify(session, null, 2)}</pre>
    <p>Available platforms:</p>
    <pre>{JSON.stringify(availablePlatforms, null, 2)}</pre>
    <p>Connected platforms:</p>
    <pre>{JSON.stringify(connectedPlatforms, null, 2)}</pre>

    <FacebookAuthButton />
  </div>
}
