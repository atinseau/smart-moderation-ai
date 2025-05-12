import { auth } from "@/auth"
import { api } from "@/lib/instances/api"
// import { FacebookAuthButton } from "@/components/FacebookAuthButton/FacebookAuthButton"
// import { api } from "@/lib/instances/api"

export default async function Home() {
  const session = await auth()

  return <div>
    <p>{session?.user?.name}</p>
    {/* <p>Available platforms:</p>
    <pre>{JSON.stringify(availablePlatforms, null, 2)}</pre>
    <p>Connected platforms:</p>
    <pre>{JSON.stringify(connectedPlatforms, null, 2)}</pre> */}
    {/* <FacebookAuthButton /> */}
  </div>
}
