import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'

const BOOKINGS_COLLECTION_NAME = 'bookings'
const BOOKINGS_COLLECTION_SCHEMA = Joi.object({
  scheduleId: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
  pickUpLocation: Joi.string().min(1).required(),
  dropOffLocation: Joi.string().min(1).required(),
  customerName: Joi.string().min(1).required(),
  customerPhone: Joi.string().length(10).required(),
  bookingDate: Joi.string().required(),
  price: Joi.number().min(1).default(100000),
  status: Joi.number().valid('booked', 'boarding', 'cancelled', 'complete').default('booked'),
  createdAt: Joi.date().timestamp('javascript').default(Date.now),
  updatedAt: Joi.date().timestamp('javascript').default(null)
})

const INVALID_GET_FIELDS = ['createdAt', 'updatedAt']
const INVALID_UPDATE_FIELDS = ['_id', 'createdAt']

const create = async (booking) => {
  try {
    const validateData = await BOOKINGS_COLLECTION_SCHEMA.validateAsync(booking, {
      abortEarly: false
    })
    validateData.scheduleId = new ObjectId(validateData.scheduleId)
    return await GET_DB().collection(BOOKINGS_COLLECTION_NAME).insertOne(validateData)
  } catch (error) {
    throw new Error(error)
  }
}

const getAll = async () => {
  try {
    return await GET_DB().collection(BOOKINGS_COLLECTION_NAME).find().toArray()
  } catch (error) {
    throw new Error(error)
  }
}

const findOneById = async (_id) => {
  try {
    const res = await GET_DB()
      .collection(BOOKINGS_COLLECTION_NAME)
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
      .collection(BOOKINGS_COLLECTION_NAME)
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


const deleteBooking = async (_id) => {
  try {
    return await GET_DB()
      .collection(BOOKINGS_COLLECTION_NAME)
      .findOneAndDelete({
        _id: new ObjectId(_id)
      })
  } catch (error) {
    throw new Error(error)
  }
}

export const bookingsModel = {
  BOOKINGS_COLLECTION_NAME,
  BOOKINGS_COLLECTION_SCHEMA,
  create,
  getAll,
  findOneById,
  update,
  deleteBooking
}
