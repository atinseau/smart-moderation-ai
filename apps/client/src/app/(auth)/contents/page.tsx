import { api } from "@/lib/instances/api"

export default async function ContentsPage() {

  const { data } = await api.contents.get()

  console.log(data)

  return <p>salut</p>

}
