import { AsyncMessage, Consumer, Publisher } from "rabbitmq-client";
import { QueueService } from "../../../services/queue.service";
import { ContentFetching, ContentFetchingStatus, prisma } from "@smart-moderation-ai/db";



export abstract class ContentFetchingService {

  private static publisher: Publisher
  private static consumer: Consumer

  private static readonly QUEUE_NAME = 'contentFetchingQueue'

  static {
    QueueService.connect().then(() => {
      this.publisher = QueueService.createPublisher()
      this.consumer = QueueService.createConsumer({

      }, this.handle.bind(this))
    })
  }

  static async handle(message: AsyncMessage) {


  }

  static async initContentFetching(contentFetching: ContentFetching) {
    // await prisma.contentFetching.update({
    //   where: {
    //     id: contentFetching.id
    //   },
    //   data: {
    //     status: ContentFetchingStatus.IN_PROGRESS
    //   }
    // })
    this.publisher.send({
      exchange: this.QUEUE_NAME,
      routingKey: 'fetchContent',
    }, contentFetching)
  }

}
