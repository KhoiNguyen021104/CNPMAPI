/* eslint-disable no-useless-catch */
/* eslint-disable no-console */
import { driversModel } from '~/models/driversModel'
import { schedulesModel } from '~/models/schedulesModel'
import { vehiclesModel } from '~/models/vehiclesModel'

const create = async (schedule) => {
  try {
    const isExist = await schedulesModel.findOneByRouteAndDepartureTime({
      routeId: schedule.routeId,
      departureTime: schedule.departureTime
    })
    if (isExist) {
      return { message: 'Schedule already exists' }
    }
    await Promise.all(
      schedule?.details?.map(async (detail) => {
        console.log('🚀 ~ schedule?.details?.map ~ detail:', detail)
        vehiclesModel.update(detail.vehicleId, { status: 1 })
        driversModel.update(detail.driverId, { status: 1 })
      })
    )
    const resCreated = await schedulesModel.create(schedule)
    return resCreated
  } catch (error) {
    throw error
  }
}

const getAll = async () => {
  try {
    const response = await schedulesModel.getAll()
    return response
  } catch (error) {
    throw error
  }
}

const findOneById = async (_id) => {
  try {
    const res = await schedulesModel.findOneById(_id)
    return res
  } catch (error) {
    throw error
  }
}


const update = async (_id, reqBody) => {
  try {
    const updateData = {
      ...reqBody,
      updatedAt: Date.now()
    }
    const res = await schedulesModel.update(_id, updateData)
    return res
  } catch (error) {
    throw error
  }
}

const deleteSchedule = async (_id) => {
  try {
    const schedule = await schedulesModel.findOneById(_id)
    await Promise.all(
      schedule?.details?.map(async (detail) => {
        vehiclesModel.update(detail.vehicleId, { status: 0 })
        driversModel.update(detail.driverId, { status: 0 })
      })
    )
    const res = await schedulesModel.deleteSchedule(_id)
    return res
  } catch (error) {
    throw error
  }
}

export const schedulesService = {
  create,
  getAll,
  findOneById,
  update,
  deleteSchedule
}
