import { columnModel } from '~/models/columnModel'
import { boardModel } from '~/models/boardModel'

const createNew = async (reqBody) => {
  try {
    // Xử lý logic dữ liệu tùy đặc thù dự án
    const newColumn = {
      ...reqBody
    }
    const createdColumn= await columnModel.createNew(newColumn)
    const getNewColumn = await columnModel.findOneById(createdColumn.insertedId)

    if (getNewColumn) {
      // Xử lý cấu trúc data trước khi trả dữ liệu về
      getNewColumn.cards = []

      // Cập nhật  lại mảng columnOrderIds trong collection boards
      await boardModel.pushColumnOrderIds(getNewColumn)

    }

    return getNewColumn
  } catch (error) {
    throw error
  }
}

const update = async (columnId, reqBody) => {
  try {
    const updateData = {
      ...reqBody,
      updatedAt: Date.now()
    }
    const updatedColumn = await columnModel.update(columnId, updateData)

    // Trong services luôn phải có return
    return updatedColumn

  } catch (error) { throw error }
}

export const columnService = {
  createNew,
  update
}
