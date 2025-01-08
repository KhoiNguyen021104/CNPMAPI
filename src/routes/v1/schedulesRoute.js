import express from 'express'
import { schedulesController } from '~/controllers/schedulesController'
import { schedulesValidation } from '~/validations/schedulesValidation'

const Router = express.Router()

Router.route('/')
  .get(schedulesController.getAll)
  .post(schedulesValidation.create, schedulesController.create)

Router.route('/:_id')
  .get(schedulesValidation.findOneById, schedulesController.findOneById)
  .put(schedulesValidation.update, schedulesController.update)
  .delete(schedulesValidation.deleteSchedule, schedulesController.deleteSchedule)

export const schedulesRoute = Router
