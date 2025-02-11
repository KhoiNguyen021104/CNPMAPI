import express from 'express'
import { usersController } from '~/controllers/usersController'
import { authMiddleware } from '~/middlewares/authMiddleware'
import { usersValidation } from '~/validations/usersValidation'

const Router = express.Router()

Router.route('/login').post(usersValidation.login, usersController.login)
Router.route('/register').post(usersValidation.register, usersController.register)

Router.route('/logout')
  .delete(usersController.logout)

Router.route('/refresh_token')
  .put(usersController.refreshToken)

Router.route('/access')
  .get(authMiddleware.isAuthorized, usersController.access)

// Router.route('/getUser/:_id')
//   .get(usersValidation.findOneById, usersController.findOneById)

// Router.route('/getUser')
//   .post(usersValidation.findOneByEmail, usersController.findOneByEmail)

// Router.route('/:_id')
//   .put(usersValidation.update, usersController.update)
export const usersRoute = Router
