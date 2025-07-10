import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { createElement } from "react";

type ContentCardActionButtonProps = {
  icon: React.FunctionComponent<{ className?: string }>
  className?: string
  onClick?: () => void
  ref?: React.Ref<HTMLButtonElement>
}

export function ContentCardActionButton({ icon, className, onClick, ref, ...props }: ContentCardActionButtonProps) {
  return <Button
    onClick={onClick}
    ref={ref}
    variant="ghost"
    size="sm"
    className={cn("cursor-pointer opacity-0 group-hover:opacity-100 h-6 px-2", className)}
    {...props}
  >
    {createElement(icon, { className: "h-3 w-3" })}
  </Button>
}
