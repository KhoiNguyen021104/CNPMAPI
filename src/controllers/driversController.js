import { StatusCodes } from 'http-status-codes'
import { driversService } from '~/services/driversService'


const create = async (req, res, next) => {
  try {
    const resCreated = await driversService.create(req.body)
    res.status(StatusCodes.CREATED).json(resCreated)
  } catch (error) {
    next(error)
  }
}

const getAll = async (req, res, next) => {
  try {
    const response = await driversService.getAll()
    res.status(StatusCodes.OK).json(response)
  } catch (error) {
    next(error)
  }
}

const findOneById = async (req, res, next) => {
  try {
    const vehicle = await driversService.findOneById(req.params._id)
    if (!vehicle) res.status(StatusCodes.NOT_FOUND).json({ message: 'Driver not found' })
    else res.status(StatusCodes.OK).json(vehicle)
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    const resUpdated = await driversService.update(req.params._id, req.body)
    if (!resUpdated) res.status(StatusCodes.NOT_FOUND).json({ message: 'Driver not found' })
    else res.status(StatusCodes.OK).json(resUpdated)
  } catch (error) { next(error) }
}

const deleteDriver = async (req, res, next) => {
  try {
    await driversService.deleteDriver(req.params._id)
    res.status(StatusCodes.NO_CONTENT).send()
  } catch (error) {
    next(error)
  }
}


export const driversController = {
  create,
  getAll,
  findOneById,
  update,
  deleteDriver
}