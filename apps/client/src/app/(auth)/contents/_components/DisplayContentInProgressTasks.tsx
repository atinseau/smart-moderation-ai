'use client';

import { Spinner } from "@/components/Spinner";
import { getAccessToken } from "@/lib/functions/getAccessToken.client";
import { api } from "@/lib/instances/api";
import { Task } from "@smart-moderation-ai/db"
import { useEffect } from "react";

type DisplayContentInProgressTasksProps = {
  tasks: Task[]
}

export function DisplayContentInProgressTasks({ tasks }: DisplayContentInProgressTasksProps) {

  useEffect(() => {
    if (!tasks.length) {
      return
    }


    const subscription = api.ws.subscribe()

    // console.log(subscription)

    subscription.on('message', (message) => {
      console.log(message)
    })

    subscription.on('open', (message) => {
      subscription.send('coucou')
      console.log(message)
    })

    return () => {
      subscription.close()
    }
  }, [])

  if (!tasks.length) {
    return null
  }

  return <Spinner className="text-muted-foreground mt-2" label="Content is being processed..." />

}
