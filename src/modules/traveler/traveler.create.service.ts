import { MissingParamError } from '../errors/missing-param-error'
import { HttpRequest, HttpResponse } from '../protocol/http'
import { ITravelerRepositiry, TravelerSave } from './repositories/ITravelerRepository'

export class CreateTravelerService {
  constructor (private readonly travelerRepository: ITravelerRepositiry) {}

  async execute (data: HttpRequest): Promise<HttpResponse> {
    const requiredFields = ['username', 'email', 'password', 'confirmPassword']

    for (const field of requiredFields) {
      if (data.body[field] === undefined) {
        return {
          statusCode: 400,
          body: new MissingParamError(field)
        }
      }
    }

    let traveler: TravelerSave | null

    traveler = await this.travelerRepository.findByUsername(data.body.username)

    if (traveler !== null) {
      return {
        statusCode: 400,
        body: new Error('This username already exists')
      }
    }

    traveler = await this.travelerRepository.findByEmail(data.body.email)

    if (traveler !== null) {
      return {
        statusCode: 400,
        body: new Error('This email already exists')
      }
    }

    if (data.body.password !== data.body.confirmPassword) {
      return {
        statusCode: 400,
        body: new Error('The password and confirmation password must be the same')
      }
    }

    const travelerCreated = await this.travelerRepository.save(data)

    return {
      statusCode: 201,
      body: travelerCreated
    }
  }
}
