/* eslint-disable no-unused-vars */
import { StatusCodes } from 'http-status-codes'
import { env } from '~/config/environment'

export const errorHandlingMiddleware = (err, req, res, next) => {
  
  if (!err.statusCode) err.statusCode = StatusCodes.INTERNAL_SERVER_ERROR
  
  console.log('🚀 ~ errorHandlingMiddleware ~ err:', err)
  const responseError = {
    statusCode: err.statusCode,
    // Nếu lỗi mà không có message thì lấy ReasonPhrases
    message: err.message || StatusCodes[err.statusCode], 
    stack: err.stack
  }

  // Chỉ khi môi trường là DEV thì mới trả về Stack Trace để debug dễ dàng hơn, 
  // còn không thì xóa đi.
  if (env.BUILD_MODE !== 'dev') delete responseError.stack

  // Đoạn này có thể mở rộng nhiều về sau như ghi Error Log vào file,
  // bắn thông báo lỗi vào group Slack, Telegram, Email...vv
  // Hoặc có thể viết riêng Code ra một file Middleware khác tùy dự án.

  res.status(responseError.statusCode).json(responseError)
}