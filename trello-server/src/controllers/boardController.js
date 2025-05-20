import { StatusCodes } from 'http-status-codes'
import { boardService } from '~/services/boardService'

const createNew = async (req, res, next) => {
  try {

    // Điều hướng dữ liệu sang tầng Service
    const createdBoard = await boardService.createNew(req.body)

    // Có kết quả thì trả về
    res.status(StatusCodes.CREATED).json(createdBoard)
  } catch (error) { next(error) } // Sẽ được đưa vào middleware xử lý lỗi tập trung ở server.js
}

export const boardController = {
  createNew
}
