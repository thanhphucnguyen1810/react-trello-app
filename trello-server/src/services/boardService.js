/* eslint-disable no-useless-catch */
import { slugify } from '~/utils/formatters'
import { boardModel } from '~/models/boardModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'
import { cloneDeep } from 'lodash'

const createNew = async (reqBody) => {
  try {
    // Xử lý logic dữ liệu tùy đặc thù dự án
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title)
    }

    // Gọi tới tầng model để xử lý lưu bản ghi newBoard vào trong database
    const createdBoard = await boardModel.createNew(newBoard)
    // console.log('createdBoard', createdBoard)
    // Lấy bản ghi board sau khi gọi (tùy mục đích dự án mà có cần bước này hay không)
    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId)
    // console.log('getNewBoard', getNewBoard)

    // Làm thêm các xử lý logic khác với các Collection khác tùy đặc thù dự án...
    // Bắn email, notification về cho admin khi có một cái board mới được tạo.

    // Trong services luôn phải có return
    return getNewBoard
  } catch (error) {
    throw error
  }
}

const getDetails = async (boardId) => {
  try {

    // Gọi tới tầng model để xử lý lưu bản ghi newBoard vào trong database
    const board = await boardModel.getDetails(boardId)

    if (!board) {
      throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found')
    }

    /*B1:  Deep Clone board ra một cái mới để xử lý, ko ảnh hưởng tới board ban đầu,
       tùy mục đích về sau mà có cần clone deep hay không.
    */
    const resBoard = cloneDeep(board)

    //B2:  Đưa card về đúng column của nó
    resBoard.columns.forEach(column => {
      column.cards = resBoard.cards.filter(card => card.columnId.equals(column._id))
      // column.cards = resBoard.cards.filter(card => card.columnId.toString() === column._id.toString())
    })

    //B3:  Xóa mảng cards khỏi board ban đầu
    delete resBoard.cards

    // Trong services luôn phải có return
    return resBoard

  } catch (error) { throw error }
}

const update = async (boardId, reqBody) => {
  try {
    const updateData = {
      ...reqBody,
      updatedAt: Date.now()
    }
    const updatedBoard = await boardModel.update(boardId, updateData)

    // Trong services luôn phải có return
    return updatedBoard

  } catch (error) { throw error }
}


export const boardService = {
  createNew,
  getDetails,
  update
}
