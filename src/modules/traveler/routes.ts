import { Router } from 'express'
import { TravelerController } from './traveler.controller'

const travelerRoutes = Router()

const travelerController = new TravelerController()

travelerRoutes.post('/', (req, res) => {
  void travelerController.create(req, res)
})

export { travelerRoutes }
