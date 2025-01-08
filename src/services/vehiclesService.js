/* eslint-disable no-useless-catch */
/* eslint-disable no-console */

import { vehiclesModel } from '~/models/vehiclesModel'

const create = async (vehicle) => {
  try {
    const isExist = await vehiclesModel.findOneByDriverId(vehicle.driverId)
    if (isExist) {
      return { message: 'Driver have already vehicle' }
    }
    const resCreated = await vehiclesModel.create(vehicle)
    return resCreated
  } catch (error) {
    throw error
  }
}

const getAll = async () => {
  try {
    const response = await vehiclesModel.getAll()
    return response
  } catch (error) {
    throw error
  }
}

const findOneById = async (_id) => {
  try {
    const res = await vehiclesModel.findOneById(_id)
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
    const res = await vehiclesModel.update(_id, updateData)
    return res
  } catch (error) {
    throw error
  }
}

const deleteVehicle = async (_id) => {
  try {
    const res = await vehiclesModel.deleteVehicle(_id)
    return res
  } catch (error) {
    throw error
  }
}

export const vehiclesService = {
  create,
  getAll,
  findOneById,
  update,
  deleteVehicle
}
