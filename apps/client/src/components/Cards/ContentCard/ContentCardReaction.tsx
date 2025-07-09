import { formatBigNumberToShortString } from "@/lib/functions/formatBigNumberToShortString"
import { cn } from "@/lib/utils"
import { createElement } from "react"

type ContentCardReactionProps = {
  icon: React.FunctionComponent<{ className: string }>
  iconClassName?: string
  label: string
}

export function ContentCardReaction(props: ContentCardReactionProps) {

  return <div className="flex items-center space-x-1">
    {createElement(props.icon, { className: cn("size-4", props.iconClassName) })}
    <span>{formatBigNumberToShortString(props.label)}</span>
  </div>

}
