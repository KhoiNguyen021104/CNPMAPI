/* eslint-disable no-useless-catch */
/* eslint-disable no-console */

import { routesModel } from '~/models/routesModel'

const create = async (vehicle) => {
  try {
    const resCreated = await routesModel.create(vehicle)
    return resCreated
  } catch (error) {
    throw error
  }
}

const getAll = async () => {
  try {
    const response = await routesModel.getAll()
    return response
  } catch (error) {
    throw error
  }
}

const findOneById = async (_id) => {
  try {
    const res = await routesModel.findOneById(_id)
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
    const res = await routesModel.update(_id, updateData)
    return res
  } catch (error) {
    throw error
  }
}

const deleteRoute = async (_id) => {
  try {
    const res = await routesModel.deleteRoute(_id)
    return res
  } catch (error) {
    throw error
  }
}

export const routesService = {
  create,
  getAll,
  findOneById,
  update,
  deleteRoute
}
