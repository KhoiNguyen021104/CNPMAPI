import express from 'express'
import { bookingsController } from '~/controllers/bookingsController'
import { bookingsValidation } from '~/validations/bookingsValidation'

const Router = express.Router()

Router.route('/')
  .get(bookingsController.getAll)
  .post(bookingsValidation.create, bookingsController.create)

Router.route('/:_id')
  .get(bookingsValidation.findOneById, bookingsController.findOneById)
  .put(bookingsValidation.update, bookingsController.update)
  .delete(bookingsValidation.deleteBooking, bookingsController.deleteBooking)

export const bookingsRoute = Router
