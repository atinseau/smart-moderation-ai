import { ConsumerProps } from "rabbitmq-client";
import { QueueService } from "../../../services/queue.service";
import { StartHydrationBody } from "../types/start-hydration-body.type";
import { StartWorkerMessageData } from "../types/start-worker-message-data.type";
import { FetchContentService } from "../services/fetch-content.service";

function handleHydration() {
  const consumerProps: ConsumerProps = {
    qos: {
      prefetchCount: 2
    },
    queueBindings: [
      {
        exchange: 'fetch-content',
        routingKey: 'start-hydration'
      }
    ],
    exchanges: [
      {
        exchange: 'fetch-content',
        type: 'direct'
      }
    ]
  }

  QueueService.createConsumer(consumerProps, async (message) => {
    try {
      const body = message.body as StartHydrationBody
      if (!('userId' in body) || !('platform' in body) || !('taskId' in body)) {
        throw new Error("Invalid message body: " + JSON.stringify(body));
      }
      await FetchContentService.fetchContent(body.taskId, body.userId, body.platform)
    } catch (error) {
      console.error("Error processing message in fetch content worker:", error);

      // re throw for aknowledgment
      throw error
    }
  })
}


// INITIALIZE WORKER

// Tell the main thread that the worker is ready
postMessage({
  type: 'ready',
  message: 'Fetch content worker is ready'
})

// Wait for the main thread to send a message to start the worker
self.onmessage = async (event: MessageEvent<StartWorkerMessageData>) => {
  if (event.data.type === "start") {
    handleHydration()
    return
  }
  throw new Error("Unexpected message from main thread: " + JSON.stringify(event.data));
}
