import { auth } from "@/auth"
import { FacebookAuthButton } from "@/components/FacebookAuthButton/FacebookAuthButton"

export default async function Home() {
  const session = await auth()

  return <div>
    <pre>{JSON.stringify(session, null, 2)}</pre>
    <FacebookAuthButton />
  </div>
}
