import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'

const SCHEDULES_COLLECTION_NAME = 'schedules'
const SCHEDULES_COLLECTION_SCHEMA = Joi.object({
  routeId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  departureTime: Joi.string().required(),
  details: Joi.array().items(
    Joi.object({
      vehicleId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
      driverId: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
      capacity: Joi.number().required(),
      availableSeat: Joi.number().required()
    })
  ).default([]),
  status: Joi.string().valid('scheduled', 'ongoing', 'cancelled', 'completed').default('scheduled'),
  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null)
})

const INVALID_GET_FIELDS = ['createdAt', 'updatedAt']
const INVALID_UPDATE_FIELDS = ['_id', 'createdAt']

const create = async (schedule) => {
  try {
    const validateData = await SCHEDULES_COLLECTION_SCHEMA.validateAsync(schedule, {
      abortEarly: false
    })
    validateData.routeId = new ObjectId(validateData.routeId)
    validateData?.details.forEach(detail => {
      detail.vehicleId = new ObjectId(detail.vehicleId)
      detail.driverId = new ObjectId(detail.driverId)
    })
    return await GET_DB().collection(SCHEDULES_COLLECTION_NAME).insertOne(validateData)
  } catch (error) {
    throw new Error(error)
  }
}

const getAll = async () => {
  try {
    return await GET_DB().collection(SCHEDULES_COLLECTION_NAME).find().toArray()
  } catch (error) {
    throw new Error(error)
  }
}

const findOneById = async (_id) => {
  try {
    const res = await GET_DB()
      .collection(SCHEDULES_COLLECTION_NAME)
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

const findOneByRouteAndDepartureTime = async (data) => {
  try {
    const res = await GET_DB()
      .collection(SCHEDULES_COLLECTION_NAME)
      .findOne({
        routeId: new ObjectId(data.routeId),
        departureTime: data.departureTime
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
      .collection(SCHEDULES_COLLECTION_NAME)
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


const deleteSchedule = async (_id) => {
  try {
    return await GET_DB()
      .collection(SCHEDULES_COLLECTION_NAME)
      .findOneAndDelete({
        _id: new ObjectId(_id)
      })
  } catch (error) {
    throw new Error(error)
  }
}

const pushItemIntoDetails = async (item) => {
  try {
    return await GET_DB().collection(SCHEDULES_COLLECTION_NAME).findOneAndUpdate(
      {
        routeId: new ObjectId(item.routeId),
        departureTime: item.departureTime
      },
      {
        $push: { details: {
          vehicleId: new ObjectId(item.vehicleId),
          driverId: new ObjectId(item.driverId),
          availableSeat: item.availableSeat
        } }
      }
    )
  } catch (error) {
    throw new Error(error)
  }
}

export const schedulesModel = {
  SCHEDULES_COLLECTION_NAME,
  SCHEDULES_COLLECTION_SCHEMA,
  create,
  getAll,
  findOneById,
  update,
  deleteSchedule,
  findOneByRouteAndDepartureTime,
  pushItemIntoDetails
}
