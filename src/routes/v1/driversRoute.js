import express from 'express'
import { driversController } from '~/controllers/driversController'
import { driversValidation } from '~/validations/driversValidation'

const Router = express.Router()

Router.route('/')
  .get(driversController.getAll)
  .post(driversValidation.create, driversController.create)

Router.route('/:_id')
  .get(driversValidation.findOneById, driversController.findOneById)
  .put(driversValidation.update, driversController.update)
  .delete(driversValidation.deleteDriver, driversController.deleteDriver)

export const driversRoute = Router
