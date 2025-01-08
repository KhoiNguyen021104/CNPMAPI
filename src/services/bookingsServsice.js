/* eslint-disable no-useless-catch */
/* eslint-disable no-console */

import { bookingsModel } from '~/models/bookingsModel '

const create = async (booking) => {
  try {
    const resCreated = await bookingsModel.create(booking)
    return resCreated
  } catch (error) {
    throw error
  }
}

const getAll = async () => {
  try {
    const response = await bookingsModel.getAll()
    return response
  } catch (error) {
    throw error
  }
}

const findOneById = async (_id) => {
  try {
    const res = await bookingsModel.findOneById(_id)
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
    const res = await bookingsModel.update(_id, updateData)
    return res
  } catch (error) {
    throw error
  }
}

const deleteBooking = async (_id) => {
  try {
    const res = await bookingsModel.deleteBooking(_id)
    return res
  } catch (error) {
    throw error
  }
}

export const bookingsService = {
  create,
  getAll,
  findOneById,
  update,
  deleteBooking
}
