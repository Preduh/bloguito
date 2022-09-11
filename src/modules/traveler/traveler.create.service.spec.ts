import { beforeAll, describe, expect, it } from 'vitest'
import { MissingParamError } from '../errors/missing-param-error'
import { HttpRequest } from '../protocol/http'
import { TravelerInMemoryRepository } from './repositories/TravelerInMemoryRepository'
import { CreateTravelerService } from './traveler.create.service'

let travelerInMemoryRepository: TravelerInMemoryRepository
let createTravelerService: CreateTravelerService

const makeSut = (): CreateTravelerService => {
  travelerInMemoryRepository = new TravelerInMemoryRepository()
  createTravelerService = new CreateTravelerService(travelerInMemoryRepository)

  return createTravelerService
}

describe('Create traveler', () => {
  beforeAll(() => {
    travelerInMemoryRepository = new TravelerInMemoryRepository()
    createTravelerService = new CreateTravelerService(travelerInMemoryRepository)
  })

  it('Should be able to create a new traveler', async () => {
    const traveler: HttpRequest = {
      body: {
        username: 'any_username',
        email: 'any_email',
        password: 'any_password',
        confirmPassword: 'any_password'
      }
    }

    const result = await createTravelerService.execute(traveler)

    expect(result.statusCode).toBe(201)
    expect(result.body).toHaveProperty('id')
  })

  it('Should not be able to create a new traveler if username already exists', async () => {
    const traveler: HttpRequest = {
      body: {
        username: 'any_username',
        email: 'any_email',
        password: 'any_password',
        confirmPassword: 'any_password'
      }
    }

    const result = await createTravelerService.execute(traveler)

    expect(result.statusCode).toBe(400)
    expect(result.body).toEqual(new Error('This username already exists'))
  })

  it('Should not be able to create a new traveler if email already exists', async () => {
    const traveler: HttpRequest = {
      body: {
        username: 'another_username',
        email: 'any_email',
        password: 'any_password',
        confirmPassword: 'any_password'
      }
    }

    const result = await createTravelerService.execute(traveler)

    expect(result.statusCode).toBe(400)
    expect(result.body).toEqual(new Error('This email already exists'))
  })

  it('Should not able to create a new traveler if the confirmation password is different from the password', async () => {
    travelerInMemoryRepository = new TravelerInMemoryRepository()
    createTravelerService = new CreateTravelerService(travelerInMemoryRepository)

    const traveler: HttpRequest = {
      body: {
        username: 'any_username',
        email: 'any_email',
        password: 'any_password',
        confirmPassword: 'another_password'
      }
    }

    const result = await createTravelerService.execute(traveler)

    expect(result.statusCode).toBe(400)
    expect(result.body).toEqual(new Error('The password and confirmation password must be the same'))
  })

  it('Should return 400 if no username is provided', async () => {
    const createTravelerService = makeSut()

    const traveler: HttpRequest = {
      body: {
        email: 'any_email',
        password: 'any_password',
        confirmPassword: 'any_password'
      }
    }

    const result = await createTravelerService.execute(traveler)

    expect(result.statusCode).toBe(400)
    expect(result.body).toEqual(new MissingParamError('username'))
  })

  it('Should return 400 if no email is provided', async () => {
    const createTravelerService = makeSut()

    const traveler: HttpRequest = {
      body: {
        username: 'any_username',
        password: 'any_password',
        confirmPassword: 'any_password'
      }
    }

    const result = await createTravelerService.execute(traveler)

    expect(result.statusCode).toBe(400)
    expect(result.body).toEqual(new MissingParamError('email'))
  })

  it('Should return 400 if no password is provided', async () => {
    const createTravelerService = makeSut()

    const traveler: HttpRequest = {
      body: {
        username: 'any_username',
        email: 'any_email',
        confirmPassword: 'any_password'
      }
    }

    const result = await createTravelerService.execute(traveler)

    expect(result.statusCode).toBe(400)
    expect(result.body).toEqual(new MissingParamError('password'))
  })

  it('Should return 400 if no confirm password is provided', async () => {
    const createTravelerService = makeSut()

    const traveler: HttpRequest = {
      body: {
        username: 'any_username',
        email: 'any_email',
        password: 'any_password'
      }
    }

    const result = await createTravelerService.execute(traveler)

    expect(result.statusCode).toBe(400)
    expect(result.body).toEqual(new MissingParamError('confirmPassword'))
  })
})
