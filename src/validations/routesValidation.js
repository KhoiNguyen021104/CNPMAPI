/* eslint-disable no-console */
import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'


const create = async (req, res, next) => {
  const correctCondition = Joi.object({
    // name: Joi.string().min(1).required(),
    startPoint: Joi.string().min(1).required(),
    endPoint: Joi.string().min(1).required(),
    distance: Joi.number().required(),
    // estimateTime: Joi.date().timestamp('javascript').default(null),
    estimateTime: Joi.number().min(0).required()
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
    // name: Joi.string().min(1),
    startPoint: Joi.string().min(1),
    endPoint: Joi.string().min(1),
    distance: Joi.number(),
    estimateTime: Joi.date().timestamp('javascript').default(null)
  })
  try {
    const updateData = {
      ...req.body,
      ...req.params
    }
    await correctCondition.validateAsync({ updateData }, {
      abortEarly: false,
      allowUnknown: true
    })
    next()
  } catch (error) {
    // console.log('Validation failed:', error)
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}

const deleteRoute = async (req, res, next) => {
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

export const routesValidation = {
  create,
  findOneById,
  update,
  deleteRoute
}
