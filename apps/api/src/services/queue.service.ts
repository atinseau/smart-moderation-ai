import { AsyncMessage, Connection, ConsumerProps } from "rabbitmq-client"

export abstract class QueueService {

  static connection: Connection

  static async connect() {
    if (this.connection) {
      return this.connection
    }

    this.connection = new Connection({
      username: Bun.env.RABBITMQ_DEFAULT_USER,
      password: Bun.env.RABBITMQ_DEFAULT_PASS,
      hostname: 'localhost'
    })

    return new Promise((resolve, reject) => {
      this.connection.once('error', reject)
      this.connection.once('connection', () => {
        resolve(this.connection)
      })
    })
  }

  static createConsumer(props: ConsumerProps, cb: (message: AsyncMessage) => void) {
    return this.connection.createConsumer(props, cb)
  }

  static createPublisher() {
    return this.connection.createPublisher()
  }

}
