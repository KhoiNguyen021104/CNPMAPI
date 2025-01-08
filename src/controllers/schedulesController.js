import { StatusCodes } from 'http-status-codes'
import { schedulesService } from '~/services/schedulesService'


const create = async (req, res, next) => {
  try {
    const resCreated = await schedulesService.create(req.body)
    res.status(StatusCodes.CREATED).json(resCreated)
  } catch (error) {
    next(error)
  }
}

const getAll = async (req, res, next) => {
  try {
    const response = await schedulesService.getAll()
    res.status(StatusCodes.OK).json(response)
  } catch (error) {
    next(error)
  }
}

const findOneById = async (req, res, next) => {
  try {
    const vehicle = await schedulesService.findOneById(req.params._id)
    if (!vehicle) res.status(StatusCodes.NOT_FOUND).json({ message: 'Schedule not found' })
    else res.status(StatusCodes.OK).json(vehicle)
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    const resUpdated = await schedulesService.update(req.params._id, req.body)
    if (!resUpdated) res.status(StatusCodes.NOT_FOUND).json({ message: 'Schedule not found' })
    else res.status(StatusCodes.OK).json(resUpdated)
  } catch (error) { next(error) }
}

const deleteSchedule = async (req, res, next) => {
  try {
    await schedulesService.deleteSchedule(req.params._id)
    res.status(StatusCodes.NO_CONTENT).send()
  } catch (error) {
    next(error)
  }
}


export const schedulesController = {
  create,
  getAll,
  findOneById,
  update,
  deleteSchedule
}