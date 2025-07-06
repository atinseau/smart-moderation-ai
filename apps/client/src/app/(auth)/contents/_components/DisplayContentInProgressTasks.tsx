'use client';

import { Spinner } from "@/components/Spinner";
import { useSocket } from "@/hooks/use-socket";
import { api } from "@/lib/instances/api";
import { Task } from "@smart-moderation-ai/db"
import { useEffect, useState } from "react";

type DisplayContentInProgressTasksProps = {
  tasks: Task[]
}

export function DisplayContentInProgressTasks({ tasks }: DisplayContentInProgressTasksProps) {

  const { isOpen, emit, once } = useSocket()
  const [isLoading, setIsLoading] = useState(tasks.length > 0)

  useEffect(() => {
    if (!isOpen) {
      return
    }
  }, [isOpen])

  if (isLoading) {
    return <Spinner className="text-muted-foreground mt-2" label="Content is being processed..." />
  }

  return false
}
