import express from 'express'
import { vehiclesController } from '~/controllers/vehiclesController'
import { vehiclesValidation } from '~/validations/vehiclesValidation'

const Router = express.Router()

Router.route('/')
  .get(vehiclesController.getAll)
  .post(vehiclesValidation.create, vehiclesController.create)

Router.route('/:_id')
  .get(vehiclesValidation.findOneById, vehiclesController.findOneById)
  .put(vehiclesValidation.update, vehiclesController.update)
  .delete(vehiclesValidation.deleteVehicle, vehiclesController.deleteVehicle)

export const vehiclesRoute = Router
