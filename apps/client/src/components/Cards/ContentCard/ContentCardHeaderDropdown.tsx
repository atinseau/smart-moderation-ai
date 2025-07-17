'use client';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ContentCardActionButton } from "./ContentCardActionButton";
import { MoreHorizontal, Trash } from "lucide-react";
import { useCallback, useState, useTransition } from "react";
import { Spinner } from "@/components/Spinner";
import { cn } from "@/lib/utils";

type ContentCardHeaderDropdownProps = {
  onDelete?: () => void | Promise<void>;
}

export function ContentCardHeaderDropdown(props: ContentCardHeaderDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)

  const [isPending, startTransition] = useTransition()

  const handleTransition = useCallback((fn?: Function) => {
    return startTransition(async () => {
      return fn?.();
    })
  }, [])

  return <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
    <DropdownMenuTrigger asChild>
      <ContentCardActionButton
        icon={isPending ? Spinner : MoreHorizontal}
        className={cn(
          isOpen ? "opacity-100" : null,
          isPending ? "pointer-events-none" : null
        )}
      />
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem variant="destructive" onClick={(e) => {
        e.stopPropagation()
        handleTransition(props.onDelete)
      }}>
        <Trash />
        Supprimer
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
}
