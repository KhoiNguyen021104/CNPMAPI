import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'

const VEHICLES_COLLECTION_NAME = 'vehicles'
const VEHICLES_COLLECTION_SCHEMA = Joi.object({
  licensePlate: Joi.string().min(1).required(),
  brand: Joi.string().required(),
  capacity: Joi.number().required(),
  // model: Joi.string().required(),
  // owner: Joi.string().required(),
  driverId: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE).default(null),
  status: Joi.number().valid(0, 1).default(0),
  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null)
})

const INVALID_GET_FIELDS = ['createdAt', 'updatedAt']
const INVALID_UPDATE_FIELDS = ['_id', 'createdAt']

const create = async (vehicle) => {
  try {
    const validateData = await VEHICLES_COLLECTION_SCHEMA.validateAsync(vehicle, {
      abortEarly: false
    })
    validateData.driverId = new ObjectId(validateData.driverId)
    return await GET_DB().collection(VEHICLES_COLLECTION_NAME).insertOne(validateData)
  } catch (error) {
    throw new Error(error)
  }
}

const getAll = async () => {
  try {
    return await GET_DB().collection(VEHICLES_COLLECTION_NAME).find().toArray()
  } catch (error) {
    throw new Error(error)
  }
}

const findOneById = async (_id) => {
  try {
    const res = await GET_DB()
      .collection(VEHICLES_COLLECTION_NAME)
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

const findOneByDriverId = async (driverId) => {
  try {
    const res = await GET_DB()
      .collection(VEHICLES_COLLECTION_NAME)
      .findOne({
        driverId: new ObjectId(driverId)
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
      .collection(VEHICLES_COLLECTION_NAME)
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


const deleteVehicle = async (_id) => {
  try {
    return await GET_DB()
      .collection(VEHICLES_COLLECTION_NAME)
      .findOneAndDelete({
        _id: new ObjectId(_id)
      })
  } catch (error) {
    throw new Error(error)
  }
}

export const vehiclesModel = {
  VEHICLES_COLLECTION_NAME,
  VEHICLES_COLLECTION_SCHEMA,
  create,
  getAll,
  findOneById,
  findOneByDriverId,
  update,
  deleteVehicle
}
