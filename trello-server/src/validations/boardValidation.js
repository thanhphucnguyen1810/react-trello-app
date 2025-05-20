import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'

const createNew = async (req, res, next) => {
  /**
   * Note: mặc định chúng ta không cần phải custom message ở phí BE vì để cho FE tự validate và custom message phía BE cho đẹp
   * BE chỉ cần validate đảm bảo dữ liệu chuẩn xác, và trả về message mặc định từ thư viện là được.
   * Quan trọng: việc validate dữ liệu BẮT BUỘC phải có ở BE, vì đây là điểm cuối để lưu trữ dữ liệu vào database.
   * Và thông thường trong thực tế, điều tốt nhất cho hệ thống là hãy luôn validate dữ liệu của FE và BE.
   */

  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict().messages({
      'any.required': 'Title is required ntp',
      'string.empty': 'Title is not allowed to be empty ntp',
      'string.min': 'Title min 3 chars ntp',
      'string.max': 'Title max 50 chars ntp',
      'string.trim': 'Title must not have leading or trailing whitespace ntp'
    }),
    description: Joi.string().required().min(3).max(256).trim().strict()
  })

  try {
    // console.log('red.body: ', req.body)
    // set abortEarly: false: để TH có nhiều lỗi validation thì trả về tất cả lỗi (video52)
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    // Validate dữ liệu xong thì chuyển cho request đi tiếp sang Controller
    next()
  } catch (error) {
    const errorMessage = new Error(error).message
    const customError = new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errorMessage)
    next(customError)
  }
}

export const boardValidation = {
  createNew
}
