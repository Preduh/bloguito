import { Request, Response } from 'express'
import { TravelerPrismaReposistory } from './repositories/TravelerPrismaRepository'
import { CreateTravelerService } from './traveler.create.service'

export class TravelerController {
  async create (request: Request, response: Response): Promise<Response<any, Record<string, any>>> {
    const { body } = request

    const travelerPrismaReposistory = new TravelerPrismaReposistory()
    const createTravelerService = new CreateTravelerService(travelerPrismaReposistory)

    const result = await createTravelerService.execute({ body })

    if (result.body instanceof Error) {
      return response.status(result.statusCode).json({ error: result.body.message })
    }

    return response.status(result.statusCode).json(result.body)
  }
}
