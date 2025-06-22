// Component chính của trang Board chi tiết
// Chịu trách nhiệm: gọi API lấy dữ liệu board, hiển thị giao diện, xử lý tạo column/card mới.

import { useEffect, useState } from 'react'
// import { useParams } from 'react-router-dom'
import Container from '@mui/material/Container'

import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'

import { fetchBoardDetailsAPI, createNewColumnAPI, createNewCardAPI, updateBoardDetailsAPI } from '~/apis'
import { generatePlaceholderCardId } from '~/utils/formatters'
import { isEmpty } from 'lodash'

function Board() {
  // const { boardId } = useParams() // Lấy board từ URL

  const [board, setBoard] = useState(null) // Lưu toàn bộ thông tin board(columns, cards, order,...)

  useEffect(() => {
    const boardId = '6854e421a2068d3685f1d76a'
    const fetchBoard = async () => {
      try {
        const boardData = await fetchBoardDetailsAPI(boardId)

        // Nếu column không có card nào, thêm placeholder card để DnD-Kit hoạt động
        boardData.columns.forEach(column => {
          if (isEmpty(column.cards)) {
            const placeholder = generatePlaceholderCardId(column)
            column.cards = [placeholder]
            column.cardOrderIds = [placeholder._id]
          }
        })
        setBoard(boardData)
      } catch (err) {
        console.error('Failed to fetch board details: ', err)
        // TODO: có thể hiển thị UI fallback hoặc redirect về trang 404
      }
    }
    fetchBoard()
  }, [])

  // xử lý tạo mới column (sau khi user nhập form xong)
  const handleCreateColumn = async (newColumnData) => {
    try {
      const createdColumn = await createNewColumnAPI({
        ...newColumnData,
        boardId: board._id
      })

      // Xử lý column rỗng: thêm placeholder card để kéo thả không bị lỗi
      const placeholder = generatePlaceholderCardId(createdColumn)
      createdColumn.cards = [placeholder]
      createdColumn.cardOrderIds = [placeholder._id]

      // Cập nhật lại state board - clone state để tránh mutate trực tiếp
      setBoard(prev => ({
        ...prev,
        columns: [...prev.columns, createdColumn],
        columnOrderIds: [...prev.columnOrderIds, createdColumn._id]
      }))
    } catch (err) {
      console.error('Error creating new column: ', err)
      // TODO: thông báo lỗi cho user bằng toast/snackbar
    }
  }

  // Xử lý tạo mới card trong một column cụ thể
  const handleCreateCard = async (newCardData) => {
    try {
      const createdCard = await createNewCardAPI({
        ...newCardData,
        boardId: board._id
      })

      // Cập nhật lại card trong column tương ứng
      setBoard(prev => {
        const updatedColumns = prev.columns.map(column => {
          if (column._id !== createdCard.columnId) return column

          return {
            ...column,
            cards: [...column.cards, createdCard],
            cardOrderIds: [...column.cardOrderIds, createdCard._id]
          }
        })

        return {
          ...prev,
          columns: updatedColumns
        }
      })
    } catch (err) {
      console.error('Error creating new card:', err)
    }
  }

  // Xử lý khi kéo thả column xong
  const moveColumns = async (dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map(column => column._id)
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds
    setBoard(newBoard)

    // gọi API update board
    await updateBoardDetailsAPI(newBoard._id, { columnOrderIds: newBoard.columnOrderIds })
  }

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />

      {/* Thanh trên cùng: tên board, thành viên, menu,... */}
      <BoardBar board={board} />

      {/* Nội dung chính: danh sách columns và cards */}
      <BoardContent
        board={board}
        createNewColumn={handleCreateColumn}
        createNewCard={handleCreateCard}
        moveColumns={moveColumns}
      />
    </Container>
  )
}

export default Board
