/* eslint-disable no-useless-catch */
/* eslint-disable no-console */

import { usersModel } from '~/models/usersModel'


const login = async (reqBody) => {
  try {
    const resLogin = await usersModel.login(reqBody)
    return resLogin
  } catch (error) {
    throw error
  }
}
const register = async (reqBody) => {
  try {
    const resRegister = await usersModel.register(reqBody)
    return resRegister
  } catch (error) {
    throw error
  }
}

// const findOneById = async (_id) => {
//   try {
//     const res = await usersModel.findOneById(_id)
//     return res
//   } catch (error) {
//     throw error
//   }
// }

// const findOneByEmail = async (reqBody) => {
//   try {
//     const res = await usersModel.findOneByEmail(reqBody.email)
//     return res
//   } catch (error) {
//     throw error
//   }
// }

// const update = async (_id, reqBody) => {
//   try {
//     const updateData = {
//       ...reqBody,
//       updatedAt: Date.now()
//     }
//     const updatedUser = await usersModel.update(_id, updateData)
//     return updatedUser
//   } catch (error) {
//     throw error
//   }
// }

export const usersService = {
  login,
  register
  // findOneById,
  // findOneByEmail,
  // update
}
