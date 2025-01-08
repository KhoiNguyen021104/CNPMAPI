/* eslint-disable no-console */
import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'


const create = async (req, res, next) => {
  const correctCondition = Joi.object({
    fullname: Joi.string().min(1).required(),
    licenseNumber: Joi.string().length(12).required(),
    phone: Joi.string().required(),
    address: Joi.string().min(1).required(),
    status: Joi.number().valid(0, 1).default(0)
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
    fullname: Joi.string().min(1),
    brand: Joi.string(),
    licenseNumber: Joi.string().min(1),
    phone: Joi.string(),
    address: Joi.string().min(1),
    status: Joi.number().valid(0, 1)
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

const deleteDriver = async (req, res, next) => {
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

export const driversValidation = {
  create,
  findOneById,
  update,
  deleteDriver
}
