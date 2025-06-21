// Board details
import { useEffect, useState } from 'react'
import Container from '@mui/material/Container'

import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'

// import { mockData } from '~/apis/mock-data'
import { fetchBoardDetailsAPI, createNewColumnAPI, createNewCardAPI } from '~/apis'
import { generatePlaceholderCardId } from '~/utils/formatters'
import { isEmpty } from 'lodash'

function Board() {

  const [board, setBoard] = useState(null)

  useEffect(() => {
    // sử dụng react-router-dom để lấy boardId từ URL về
    const boardId = '6854e421a2068d3685f1d76a'

    // call API
    fetchBoardDetailsAPI(boardId)
      .then((board) => {
        // khi f5 trang, cần xử lý vấn đề kéo thả vào một column rỗng
        board.columns.forEach(column => {
          if (isEmpty(column.cards)) {
            column.cards = [generatePlaceholderCardId(column)]
            column.cardOrderIds = [generatePlaceholderCardId(column)._id]
          }
        })
        setBoard(board)
      })
  }, [])

  // func có nhiệm vụ gọi API tạo mới column và làm lại dữ liệu state board
  const createNewColumn = async (newColumnData) => {
    const createdColumn = await createNewColumnAPI({
      ...newColumnData,
      boardId: board._id
    })

    // Khi tạo column mới thì nó sẽ chưa có card, cần xử lý vấn đề kéo thả vào một column rỗng
    createdColumn.cards = [generatePlaceholderCardId(createdColumn)]
    createdColumn.cardOrderIds = [generatePlaceholderCardId(createdColumn)._id]


    // cập nhật lại state board
    /*
      Phía Front-End ta phải tự làm đúng lại state data board thay vì gọi lại fetchBoardDetailsAPI
      Lưu ý: cách làm này phục thuộc vào tùy lựa chọn và đặc thù dự án, có nới back-end sẽ hỗ trợ trả về luôn
      toàn bộ Board dù đây có là API tạo column hay card đi nữa.
    */
    const newBoard = { ...board }
    newBoard.columns.push(createdColumn)
    newBoard.columnOrderIds.push(createdColumn._id)
    setBoard(newBoard)
  }

  // func có nhiệm vụ gọi API tạo mới card và làm lại dữ liệu state board
  const createNewCard = async (newCardData) => {
    const createdCard = await createNewCardAPI({
      ...newCardData,
      boardId: board._id
    })

    // cập nhật lại state board
    const newBoard = { ...board }
    const columnToUpdate = newBoard.columns.find(column => column._id === createdCard.columnId)
    if (columnToUpdate) {
      columnToUpdate.cards.push(createdCard)
      columnToUpdate.cardOrderIds.push(createdCard._id)
    }
    setBoard(newBoard)
  }

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent
        board={board}
        createNewColumn={createNewColumn}
        createNewCard={createNewCard}
      />
    </Container>
  )
}

export default Board

// boardId: 68494eab43a408588d524905
// columnId: 68494f78c18121aa246f7f2f
// cardId: 6849505bc18121aa246f7f32