/* eslint-disable no-console */
import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'

const login = async (req, res, next) => {
  const correctCondition = Joi.object({
    // email: Joi.string().email({ tlds: { allow: false } }).required(),
    username: Joi.string()
      .min(6)
      .max(30)
      .pattern(new RegExp('(?=.*[a-z])'))
      .pattern(new RegExp('(?=.*[A-Z])'))
      .pattern(new RegExp('(?=.*[0-9])'))
      .pattern(new RegExp('(?=.*[!@#$%^&*])'))
      .required(),
    password: Joi.string()
      .min(8)
      .max(50)
      .pattern(new RegExp('(?=.*[a-z])'))
      .pattern(new RegExp('(?=.*[A-Z])'))
      .pattern(new RegExp('(?=.*[0-9])'))
      .pattern(new RegExp('(?=.*[!@#$%^&*])'))
      .required()
  })
  try {
    await correctCondition.validateAsync(req.body, {
      abortEarly: false,
      allowUnknown: true
    })
    next()
  } catch (error) {
    next(
      new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message)
    )
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

const findOneByUsername = async (req, res, next) => {
  const correctCondition = Joi.object({
    username: Joi.string()
      .min(6)
      .max(30)
      .pattern(new RegExp('(?=.*[a-z])'))
      .pattern(new RegExp('(?=.*[A-Z])'))
      .pattern(new RegExp('(?=.*[0-9])'))
      .pattern(new RegExp('(?=.*[!@#$%^&*])'))
      .required()
  })
  try {
    await correctCondition.validateAsync(req.body, {
      abortEarly: false,
      allowUnknown: true
    })
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}

// const update = async (req, res, next) => {
//   const correctCondition = Joi.object({
//     _id: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
//     otp: Joi.string(),
//     isVerified: Joi.boolean(),
//     // otpExpired: Joi.date().timestamp('javascript'),
//     displayName: Joi.string(),
//     fullName: Joi.string(),
//     password: Joi.string()
//       .min(8)
//       .max(50)
//       .pattern(new RegExp('(?=.*[a-z])'))
//       .pattern(new RegExp('(?=.*[A-Z])'))
//       .pattern(new RegExp('(?=.*[0-9])'))
//       .pattern(new RegExp('(?=.*[!@#$%^&*])')),
//     headerImage: Joi.string().uri(),
//     avatar: Joi.string().uri()
//   })
//   try {
//     const updateData = {
//       ...req.body,
//       ...req.params,
//       password: req.body.newPassword
//     }
//     delete updateData.currentPassword
//     delete updateData.newPassword
//     await correctCondition.validateAsync({
//       ...req.params,
//       ...req.body
//     }, {
//       abortEarly: false,
//       allowUnknown: true
//     })
//     next()
//   } catch (error) {
//     console.log('Validation failed:', error)
//     next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
//   }
// }

export const usersValidation = {
  login,
  findOneById,
  findOneByUsername
  // update
}
