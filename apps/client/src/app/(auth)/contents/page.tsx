import { api } from "@/lib/instances/api"

export default async function ContentsPage() {

  const { } = await api.contents.get()

  return <p>salut</p>

}
