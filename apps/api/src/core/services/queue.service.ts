import { Connection } from "rabbitmq-client"

export abstract class QueueService {
  static connection: Connection

  static async connect() {
    if (this.connection) {
      return this.connection
    }

    this.connection = new Connection({
      username: Bun.env.RABBITMQ_DEFAULT_USER,
      password: Bun.env.RABBITMQ_DEFAULT_PASS,
    })

    return new Promise((resolve, reject) => {
      this.connection.once('error', reject)
      this.connection.once('connection', () => {
        resolve(this.connection)
      })
    })
  }

  static createConsumer = async (...args: Parameters<typeof Connection.prototype.createConsumer>) => {
    await this.connect()
    return this.connection.createConsumer(...args)
  }

  static createPublisher = async (...args: Parameters<typeof Connection.prototype.createPublisher>) => {
    await this.connect()
    return this.connection.createPublisher(...args)
  }
}
