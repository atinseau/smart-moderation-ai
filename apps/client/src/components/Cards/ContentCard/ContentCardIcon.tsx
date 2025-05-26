import { Content } from "@smart-moderation-ai/db"
import { Instagram } from "lucide-react"


type ContentCardIconProps = {
  content: Content
}

export function ContentCardIcon({ content }: ContentCardIconProps) {
  if (content.platform === "META" && (content.metadata as { type: string }).type === "instagram") {
    return <Instagram className="size-4" />
  }
  return null
}
