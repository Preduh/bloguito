import { ITravelerRepositiry, TravelerSave } from './ITravelerRepository'
import { randomUUID } from 'crypto'
import { HttpRequest } from '../../protocol/http'

export class TravelerInMemoryRepository implements ITravelerRepositiry {
  private readonly travelers: TravelerSave[] = []

  async save (data: HttpRequest): Promise<TravelerSave> {
    const traveler: TravelerSave = {
      id: randomUUID(),
      ...data.body
    }

    this.travelers.push(traveler)

    return traveler
  }

  async findByUsername (username: string): Promise<TravelerSave | null> {
    const traveler = this.travelers.find(traveler => traveler.username === username)

    if (traveler === undefined) return null

    return traveler
  }

  async findByEmail (email: string): Promise<TravelerSave | null> {
    const traveler = this.travelers.find(traveler => traveler.email === email)

    if (traveler === undefined) return null

    return traveler
  }
}
