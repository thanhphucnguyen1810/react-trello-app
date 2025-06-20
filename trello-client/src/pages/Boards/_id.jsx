// Board details
import { useEffect, useState } from 'react'
import Container from '@mui/material/Container'

import AppBar from '~/components/AppBar/AppBar'
import BoardBar from './BoardBar/BoardBar'
import BoardContent from './BoardContent/BoardContent'

// import { mockData } from '~/apis/mock-data'
import { fetchBoardDetailsAPI } from '~/apis'

function Board() {

  const [board, setBoard] = useState(null)

  useEffect(() => {
    // sử dụng react-router-dom để lấy boardId từ URL về
    const boardId = '6854e421a2068d3685f1d76a'

    // call API
    fetchBoardDetailsAPI(boardId)
      .then((board) => {
        setBoard(board)
      })
  }, [])

  return (
    <Container disableGutters maxWidth={false} sx={{ height: '100vh' }}>
      <AppBar />
      <BoardBar board={board} />
      <BoardContent board={board} />
    </Container>
  )
}

export default Board

// boardId: 68494eab43a408588d524905
// columnId: 68494f78c18121aa246f7f2f
// cardId: 6849505bc18121aa246f7f32