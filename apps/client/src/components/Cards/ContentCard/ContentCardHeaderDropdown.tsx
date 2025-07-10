'use client';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ContentCardActionButton } from "./ContentCardActionButton";
import { MoreHorizontal, Trash } from "lucide-react";
import { useState } from "react";

type ContentCardHeaderDropdownProps = {
  onDelete?: () => void;
}

export function ContentCardHeaderDropdown(props: ContentCardHeaderDropdownProps) {
  const [isOpen, setIsOpen] = useState(false)

  return <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
    <DropdownMenuTrigger asChild>
      <ContentCardActionButton
        icon={MoreHorizontal}
        className={isOpen ? "opacity-100" : ""}
      />
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem variant="destructive" onClick={props.onDelete}>
        <Trash />
        Supprimer
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
}
