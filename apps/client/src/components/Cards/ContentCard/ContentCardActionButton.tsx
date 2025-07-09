import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { createElement } from "react";

type ContentCardActionButtonProps = {
  icon: React.FunctionComponent<{ className?: string }>
  className?: string
  onClick?: () => void
}

export function ContentCardActionButton(props: ContentCardActionButtonProps) {
  return <Button onClick={props.onClick} variant="ghost" size="sm" className={cn("cursor-pointer opacity-0 group-hover:opacity-100 h-6 px-2", props.className)}>
    {createElement(props.icon, { className: "h-3 w-3" })}
  </Button>
}
