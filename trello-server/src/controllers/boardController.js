import { StatusCodes } from 'http-status-codes'


const createNew = async (req, res, next) => {
  try {
    // console.log('red.body: ', req.body)
    // console.log('red.query: ', req.query)
    // console.log('red.params: ', req.params)
    // console.log('red.headers: ', req.headers)
    // console.log('req.cookies: ', req.cookies)
    // console.log('req.jwtDecoded: ', req.jwtDecoded)

    // Điều hướng dữ liệu sang tầng Service

    // Có kết quả thì trả về
    res.status(StatusCodes.CREATED).json({ message: 'POST from Controller: API create new board' })
  } catch (error) { next(error) } // Sẽ được đưa vào middleware xử lý lỗi tập trung ở server.js
}

export const boardController = {
  createNew
}
