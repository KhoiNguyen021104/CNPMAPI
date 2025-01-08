import { StatusCodes } from 'http-status-codes'
import { bookingsService } from '~/services/bookingsServsice'


const create = async (req, res, next) => {
  try {
    const resCreated = await bookingsService.create(req.body)
    res.status(StatusCodes.CREATED).json(resCreated)
  } catch (error) {
    next(error)
  }
}

const getAll = async (req, res, next) => {
  try {
    const response = await bookingsService.getAll()
    res.status(StatusCodes.OK).json(response)
  } catch (error) {
    next(error)
  }
}

const findOneById = async (req, res, next) => {
  try {
    const vehicle = await bookingsService.findOneById(req.params._id)
    if (!vehicle) res.status(StatusCodes.NOT_FOUND).json({ message: 'Booking not found' })
    else res.status(StatusCodes.OK).json(vehicle)
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    const resUpdated = await bookingsService.update(req.params._id, req.body)
    if (!resUpdated) res.status(StatusCodes.NOT_FOUND).json({ message: 'Booking not found' })
    else res.status(StatusCodes.OK).json(resUpdated)
  } catch (error) { next(error) }
}

const deleteBooking = async (req, res, next) => {
  try {
    await bookingsService.deleteBooking(req.params._id)
    res.status(StatusCodes.NO_CONTENT).send()
  } catch (error) {
    next(error)
  }
}


export const bookingsController = {
  create,
  getAll,
  findOneById,
  update,
  deleteBooking
}