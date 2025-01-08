// /* eslint-disable no-console */
// import bcrypt from 'bcrypt'
// import { cloudinaryProvider } from '~/providers/cloudinary'

import { cloudinaryProvider } from "~/providers/cloudinary"

// // const bcrypt = require('bcrypt')
// const saltRounds = 10 // Số vòng salt

// // Hàm để mã hóa mật khẩu
// export async function hashPassword(password) {
//   try {
//     const hashedPassword = await bcrypt.hash(password, saltRounds)
//     return hashedPassword
//   } catch (err) {
//     console.error(err)
//   }
// }

// export async function comparePassword(password, hashedPassword) {
//   try {
//     const isMatch = await bcrypt.compare(password, hashedPassword)
//     return isMatch
//   } catch (err) {
//     console.error(err)
//   }
// }

export async function uploadImagesWithCloudinaryUrls(content, folder) {
  const base64Urls = content.match(/url\('data:image\/[^']+'\)/g)
  if (!base64Urls) return content

  const uploadPromises = base64Urls.map(async (url) => {
    const base64String = url.match(/'([^']+)'/)[1]
    const uploadedUrl = await cloudinaryProvider.uploadImgCloudinary(
      base64String,
      folder
    )
    return `url('${uploadedUrl}')`
  })

  const uploadedUrls = await Promise.all(uploadPromises)

  let newContent = content
  base64Urls.forEach((base64Url, index) => {
    newContent = newContent.replace(base64Url, uploadedUrls[index])
  })

  return newContent
}