/* eslint-disable no-useless-catch */
/* eslint-disable no-console */

import { driversModel } from '~/models/driversModel'


const create = async (vehicle) => {
  try {
    const resCreated = await driversModel.create(vehicle)
    return resCreated
  } catch (error) {
    throw error
  }
}

const getAll = async () => {
  try {
    const response = await driversModel.getAll()
    return response
  } catch (error) {
    throw error
  }
}

const findOneById = async (_id) => {
  try {
    const res = await driversModel.findOneById(_id)
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
    const res = await driversModel.update(_id, updateData)
    return res
  } catch (error) {
    throw error
  }
}

const deleteDriver = async (_id) => {
  try {
    const res = await driversModel.deleteDriver(_id)
    return res
  } catch (error) {
    throw error
  }
}

export const driversService = {
  create,
  getAll,
  findOneById,
  update,
  deleteDriver
}
