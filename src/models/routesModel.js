import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'

const ROUTES_COLLECTION_NAME = 'routes'
const ROUTES_COLLECTION_SCHEMA = Joi.object({
  // name: Joi.string().min(1).required(),
  startPoint: Joi.string().min(1).required(),
  endPoint: Joi.string().min(1).required(),
  distance: Joi.number().required(),
  // estimateTime: Joi.date().timestamp('javascript').default(null),
  estimateTime: Joi.number().min(0).required(),
  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null)
})

const INVALID_GET_FIELDS = ['createdAt', 'updatedAt']
const INVALID_UPDATE_FIELDS = ['_id', 'createdAt']

const create = async (vehicle) => {
  try {
    const validateData = await ROUTES_COLLECTION_SCHEMA.validateAsync(vehicle, {
      abortEarly: false
    })
    return await GET_DB().collection(ROUTES_COLLECTION_NAME).insertOne(validateData)
  } catch (error) {
    throw new Error(error)
  }
}

const getAll = async () => {
  try {
    return await GET_DB().collection(ROUTES_COLLECTION_NAME).find().toArray()
  } catch (error) {
    throw new Error(error)
  }
}

const findOneById = async (_id) => {
  try {
    const res = await GET_DB()
      .collection(ROUTES_COLLECTION_NAME)
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
      .collection(ROUTES_COLLECTION_NAME)
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


const deleteRoute = async (_id) => {
  try {
    return await GET_DB()
      .collection(ROUTES_COLLECTION_NAME)
      .findOneAndDelete({
        _id: new ObjectId(_id)
      })
  } catch (error) {
    throw new Error(error)
  }
}

export const routesModel = {
  ROUTES_COLLECTION_NAME,
  ROUTES_COLLECTION_SCHEMA,
  create,
  getAll,
  findOneById,
  update,
  deleteRoute
}
