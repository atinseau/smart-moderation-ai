import { EventEmitter } from 'node:events'

export class EmitterService {
  static emitter: EventEmitter = new EventEmitter()

  static emit(event: string, data: unknown) {
    try {
      this.emitter.emit(event, data)
    } catch (error) {
      console.error('Error emitting event:', error)
      throw error
    }
  }

  static on<T = any>(event: string, listener: (data: T) => void) {
    try {
      this.emitter.on(event, listener)
    } catch (error) {
      console.error('Error adding event listener:', error)
      throw error
    }
  }

  static once<T = any>(event: string, listener: (data: T) => void) {
    try {
      this.emitter.once(event, listener)
    } catch (error) {
      console.error('Error adding one-time event listener:', error)
      throw error
    }
  }

  static off(event: string) {
    try {
      this.emitter.removeAllListeners(event)
    } catch (error) {
      console.error('Error removing event listener:', error)
      throw error
    }
  }
}
