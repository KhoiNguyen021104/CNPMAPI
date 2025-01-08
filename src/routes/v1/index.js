import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { usersRoute } from './usersRoute'
import { vehiclesRoute } from './vehiclesRoute'
import { driversRoute } from './driversRoute'
import { routesRoadRoute } from './routesRoadRoute'
import { schedulesRoute } from './schedulesRoute'
import { bookingsRoute } from './bookingsRoute'

const Router = express.Router()

Router.get('/status', (req, res) => {
  res.status(StatusCodes.OK).json({ message: 'APIs v1 are ready to use' })
})

Router.use('/users', usersRoute)
Router.use('/vehicles', vehiclesRoute)
Router.use('/drivers', driversRoute)
Router.use('/routes', routesRoadRoute)
Router.use('/schedules', schedulesRoute)
Router.use('/bookings', bookingsRoute)

export const APIs_V1 = Router
