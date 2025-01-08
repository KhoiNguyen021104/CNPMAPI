import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'

const DRIVERS_COLLECTION_NAME = 'drivers'
const DRIVERS_COLLECTION_SCHEMA = Joi.object({
  fullname: Joi.string().min(1).required(),
  licenseNumber: Joi.string().length(12).required(),
  phone: Joi.string().required(),
  address: Joi.string().min(1).required(),
  status: Joi.number().valid(0, 1).default(0),
  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null)
})

const INVALID_GET_FIELDS = ['createdAt', 'updatedAt']
const INVALID_UPDATE_FIELDS = ['_id', 'createdAt']

const create = async (driver) => {
  try {
    const validateDriver = await DRIVERS_COLLECTION_SCHEMA.validateAsync(driver, {
      abortEarly: false,
      stripUnknown: true
    })
    return await GET_DB().collection(DRIVERS_COLLECTION_NAME).insertOne(validateDriver)
  } catch (error) {
    throw new Error(error)
  }
}

const getAll = async () => {
  try {
    return await GET_DB().collection(DRIVERS_COLLECTION_NAME).find().toArray()
  } catch (error) {
    throw new Error(error)
  }
}

const findOneById = async (_id) => {
  try {
    const res = await GET_DB()
      .collection(DRIVERS_COLLECTION_NAME)
      .findOne({
        _id: new ObjectId(_id)
      })
    if (!res) return res
    Object.keys(res).forEach((key) => {
      if (INVALID_GET_FIELDS.includes(key)) {
        delete res[key]
      }
    })
    return res
  } catch (error) {
    throw new Error(error)
  }
}

const update = async (_id, updateData) => {
  try {
    Object.keys(updateData).forEach((key) => {
      if (INVALID_UPDATE_FIELDS.includes(key)) {
        delete updateData[key]
      }
    })
    const result = await GET_DB()
      .collection(DRIVERS_COLLECTION_NAME)
      .findOneAndUpdate(
        {
          _id: new ObjectId(_id)
        },
        {
          $set: updateData
        },
        { returnDocument: 'after' }
      )
    return result
  } catch (error) {
    throw new Error(error)
  }
}


const deleteDriver = async (_id) => {
  try {
    return await GET_DB()
      .collection(DRIVERS_COLLECTION_NAME)
      .findOneAndDelete({
        _id: new ObjectId(_id)
      })
  } catch (error) {
    throw new Error(error)
  }
}

export const driversModel = {
  DRIVERS_COLLECTION_NAME,
  DRIVERS_COLLECTION_SCHEMA,
  create,
  getAll,
  findOneById,
  update,
  deleteDriver
}
