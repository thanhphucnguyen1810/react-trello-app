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

const getDetails = async (req, res, next) => {
  try {
    // console.log('req.params: ', req.params)
    const boardId = req.params.id

    // Điều hướng dữ liệu sang tầng Service
    const board = await boardService.getDetails(boardId)

    // Có kết quả thì trả về
    res.status(StatusCodes.OK).json(board)
  } catch (error) { next(error) } // Sẽ được đưa vào middleware xử lý lỗi tập trung ở server.js
}

const update = async (req, res, next) => {
  try {
    const boardId = req.params.id

    // Điều hướng dữ liệu sang tầng Service
    const updatedBoard = await boardService.update(boardId, req.body)

    // Có kết quả thì trả về
    res.status(StatusCodes.OK).json(updatedBoard)
  } catch (error) { next(error) } // Sẽ được đưa vào middleware xử lý lỗi tập trung ở server.js
}

export const boardController = {
  createNew,
  getDetails,
  update
}
