import Joi from 'joi'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'

const USERS_COLLECTION_NAME = 'users'
const USERS_COLLECTION_SCHEMA = Joi.object({
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
    .required(),
  updatedAt: Joi.date().timestamp('javascript').default(null)
})

// const INVALID_GET_FIELDS = ['createdAt', 'updatedAt']

// const INVALID_UPDATE_FIELDS = ['_id', 'createdAt', 'username']

const login = async (user) => {
  try {
    const result = await GET_DB().collection(USERS_COLLECTION_NAME).findOne({
      username: user.username
    })
    return result
  } catch (error) {
    throw new Error(error)
  }
}

// const findOneById = async (_id) => {
//   try {
//     const result = await GET_DB()
//       .collection(USERS_COLLECTION_NAME)
//       .findOne({
//         _id: new ObjectId(_id)
//       })
//     Object.keys(result).forEach((key) => {
//       if (INVALID_GET_FIELDS.includes(key)) {
//         delete result[key]
//       }
//     })
//     return result
//   } catch (error) {
//     throw new Error(error)
//   }
// }

// const findOneByEmail = async (username) => {
//   try {
//     const result = await GET_DB().collection(USERS_COLLECTION_NAME).findOne({
//       username
//     })
//     Object.keys(result).forEach((key) => {
//       if (INVALID_GET_FIELDS.includes(key)) {
//         delete result[key]
//       }
//     })
//     return result
//   } catch (error) {
//     throw new Error(error)
//   }
// }

// const update = async (_id, updateData) => {
//   try {
//     Object.keys(updateData).forEach((key) => {
//       if (INVALID_UPDATE_FIELDS.includes(key)) {
//         delete updateData[key]
//       }
//     })
//     if (updateData?.headerImage) {
//       const url = await cloudinaryProvider.uploadImgCloudinary(
//         updateData?.headerImage,
//         'Trello/Avatars/HeaderImage'
//       )
//       updateData.headerImage = url
//     }
//     if (updateData?.avatar) {
//       const url = await cloudinaryProvider.uploadImgCloudinary(
//         updateData?.avatar,
//         'Trello/Avatars/Photo'
//       )
//       updateData.avatar = url
//     }
//     const result = await GET_DB()
//       .collection(USERS_COLLECTION_NAME)
//       .findOneAndUpdate(
//         {
//           _id: new ObjectId(_id)
//         },
//         {
//           $set: updateData
//         },
//         { returnDocument: 'after' }
//       )
//     return result
//   } catch (error) {
//     throw new Error(error)
//   }
// }

export const usersModel = {
  USERS_COLLECTION_NAME,
  USERS_COLLECTION_SCHEMA,
  login
  // findOneById,
  // findOneByEmail,
  // update
}
