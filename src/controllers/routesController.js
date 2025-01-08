import { StatusCodes } from 'http-status-codes'
import { routesService } from '~/services/routesService'


const create = async (req, res, next) => {
  try {
    const resCreated = await routesService.create(req.body)
    res.status(StatusCodes.CREATED).json(resCreated)
  } catch (error) {
    next(error)
  }
}

const getAll = async (req, res, next) => {
  try {
    const response = await routesService.getAll()
    res.status(StatusCodes.OK).json(response)
  } catch (error) {
    next(error)
  }
}

const findOneById = async (req, res, next) => {
  try {
    const vehicle = await routesService.findOneById(req.params._id)
    if (!vehicle) res.status(StatusCodes.NOT_FOUND).json({ message: 'Vehicle not found' })
    else res.status(StatusCodes.OK).json(vehicle)
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    const resUpdated = await routesService.update(req.params._id, req.body)
    if (!resUpdated) res.status(StatusCodes.NOT_FOUND).json({ message: 'Vehicle not found' })
    else res.status(StatusCodes.OK).json(resUpdated)
  } catch (error) { next(error) }
}

const deleteRoute = async (req, res, next) => {
  try {
    await routesService.deleteRoute(req.params._id)
    res.status(StatusCodes.NO_CONTENT).send()
  } catch (error) {
    next(error)
  }
}


export const routesController = {
  create,
  getAll,
  findOneById,
  update,
  deleteRoute
}