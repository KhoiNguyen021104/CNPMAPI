/* eslint-disable no-console */
import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'


const create = async (req, res, next) => {
  const correctCondition = Joi.object({
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
    status: Joi.string().valid('scheduled', 'ongoing', 'cancelled', 'completed').default('scheduled')
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
    routeId: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    departureTime: Joi.string(),
    details: Joi.array().items(
      Joi.object({
        vehicleId: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
        driverId: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
        capacity: Joi.number(),
        availableSeat: Joi.number()
      })
    ),
    status: Joi.string().valid('scheduled', 'ongoing', 'cancelled', 'completed')
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

const deleteSchedule = async (req, res, next) => {
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

// const pushTransportInfo = async (req, res, next) => {
//   try {
//     const correctCondition = Joi.object({
//       transportInfo: Joi.array().items(
//         Joi.object({
//           vehicleId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
//           driverId: Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
//           availableSeat: Joi.number().required(),
//           status: Joi.string().valid(0, 1)
//         })
//       )
//     })
//     await correctCondition.validateAsync(req.body, {
//       abortEarly: false,
//       allowUnknown: true
//     })
//     next()
//   } catch (error) {
//     next(new ApiError(StatusCodes.INTERNAL_SERVER_ERROR, new Error(error).message))
//   }
// }

export const schedulesValidation = {
  create,
  findOneById,
  update,
  deleteSchedule
}
