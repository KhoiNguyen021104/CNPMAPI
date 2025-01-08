/* eslint-disable no-console */
import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'


const create = async (req, res, next) => {
  const correctCondition = Joi.object({
    scheduleId: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    pickUpLocation: Joi.string().min(1).required(),
    dropOffLocation: Joi.string().min(1).required(),
    customerName: Joi.string().min(1).required(),
    customerPhone: Joi.string().length(10).required(),
    bookingDate: Joi.string().required(),
    price: Joi.number().min(1).default(100000),
    status: Joi.number().valid('booked', 'boarding', 'cancelled', 'complete').default('booked')
  })
  try {
    await correctCondition.validateAsync(req.body, {
      abortEarly: false,
      allowUnknown: true
    })
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, new Error(error).message))
  }
}

const findOneById = async (req, res, next) => {
  const correctCondition = Joi.object({
    _id: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
  })
  try {
    await correctCondition.validateAsync(req.params, {
      abortEarly: false,
      allowUnknown: true
    })
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}


const update = async (req, res, next) => {
  const correctCondition = Joi.object({
    scheduleId: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    pickUpLocation: Joi.string().min(1),
    dropOffLocation: Joi.string().min(1),
    customerName: Joi.string().min(1),
    customerPhone: Joi.string().length(10),
    bookingDate: Joi.string(),
    price: Joi.number().min(1),
    status: Joi.number().valid('booked', 'boarding', 'cancelled', 'complete')
  })
  try {
    const updateData = {
      ...req.body,
      ...req.params
    }
    await correctCondition.validateAsync(updateData, {
      abortEarly: false,
      allowUnknown: true
    })
    next()
  } catch (error) {
    // console.log('Validation failed:', error)
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}

const deleteBooking = async (req, res, next) => {
  const correctCondition = Joi.object({
    _id: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
  })
  try {
    await correctCondition.validateAsync(req.params, {
      abortEarly: false,
      allowUnknown: true
    })
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}

export const bookingsValidation = {
  create,
  findOneById,
  update,
  deleteBooking
}
