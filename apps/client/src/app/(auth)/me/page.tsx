import { auth } from "@/auth"
import { api } from "@/lib/instances/api"

export default async function Home() {
  const session = await auth()

  return <div>
    <p>{session?.user?.name}</p>
  </div>
}
