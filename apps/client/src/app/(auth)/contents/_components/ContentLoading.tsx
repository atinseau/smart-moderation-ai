'use client';

import { Spinner } from "@/components/Spinner";
import { useSocket } from "@/hooks/use-socket";
import { Task } from "@smart-moderation-ai/db"
import { WebSocketEventEnum } from "@smart-moderation-ai/shared";
import { useEffect, useMemo, useState } from "react";

type ContentLoadingProps = {
  tasks: Task[]
}

export function ContentLoading({ tasks }: ContentLoadingProps) {
  const { isOpen, on } = useSocket()
  const [completedTaskIds, setCompletedTaskIds] = useState<string[]>([])

  const isLoading = useMemo(() => {
    return tasks.filter(task => completedTaskIds.includes(task.id) === false).length > 0
  }, [tasks, completedTaskIds])

  useEffect(() => {
    if (!isOpen) {
      return
    }

    on(WebSocketEventEnum.HYDRATION_TASK_COMPLETED, ({ taskId }) => {
      console.log("Task completed:", taskId)
      setCompletedTaskIds((prev) => [...prev, taskId])
    })
  }, [isOpen])

  if (isLoading) {
    return <Spinner className="text-muted-foreground mt-2" label="Content is being processed..." />
  }

  return false
}
