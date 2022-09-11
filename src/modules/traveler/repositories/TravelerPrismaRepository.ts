import { prismaClient } from '../../../database/client'
import { HttpRequest } from '../../protocol/http'
import { ITravelerRepositiry, TravelerSave } from './ITravelerRepository'

export class TravelerPrismaReposistory implements ITravelerRepositiry {
  async save ({ body }: HttpRequest): Promise<TravelerSave> {
    const traveler = await prismaClient.traveler.create({
      data: {
        username: body.username,
        email: body.email,
        password: body.password
      }
    })

    return traveler
  }

  async findByUsername (username: string): Promise<TravelerSave | null> {
    const traveler = await prismaClient.traveler.findFirst({
      where: { username }
    })

    return traveler
  }

  async findByEmail (email: string): Promise<TravelerSave | null> {
    const traveler = await prismaClient.traveler.findFirst({
      where: { email }
    })

    return traveler
  }
}
