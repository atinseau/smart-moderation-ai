import { AsyncMessage, Publisher } from "rabbitmq-client";
import { QueueService } from "../../../services/queue.service";
import { ContentFetching, ContentFetchingStatus, prisma } from "@smart-moderation-ai/db";



export abstract class ContentFetchingService {

  private static publisher: Publisher

  private static readonly QUEUE_NAME = 'contentFetchingQueue'

  static {
    QueueService.connect().then(() => {
      this.publisher = QueueService.createPublisher()
      QueueService.createConsumer(this.QUEUE_NAME, this.fetchContent.bind(this))
    })
  }

  static async fetchContent(message: AsyncMessage) {
    console.log(message)
  }

  static async initContentFetching(contentFetching: ContentFetching) {
    await prisma.contentFetching.update({
      where: {
        id: contentFetching.id
      },
      data: {
        status: ContentFetchingStatus.IN_PROGRESS
      }
    })
    this.publisher.send('contentFetchingQueue', contentFetching)
  }

}
