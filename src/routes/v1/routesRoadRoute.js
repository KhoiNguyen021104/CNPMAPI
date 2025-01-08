import express from 'express'
import { routesController } from '~/controllers/routesController'
import { routesValidation } from '~/validations/routesValidation'

const Router = express.Router()

Router.route('/')
  .get(routesController.getAll)
  .post(routesValidation.create, routesController.create)

Router.route('/:_id')
  .get(routesValidation.findOneById, routesController.findOneById)
  .put(routesValidation.update, routesController.update)
  .delete(routesValidation.deleteRoute, routesController.deleteRoute)

export const routesRoadRoute = Router
