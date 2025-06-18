import { StatusCodes } from 'http-status-codes'
import { cardService } from '~/services/cardService'

const createNew = async (req, res, next) => {
  try {
    // Điều hướng dữ liệu sang tầng Service
    const createdCard = await cardService.createNew(req.body)

    // Có kết quả thì trả về
    res.status(StatusCodes.CREATED).json(createdCard)
  } catch (error) { next(error) } // Sẽ được đưa vào middleware xử lý lỗi tập trung ở server.js
}

export const cardController = {
  createNew
}
