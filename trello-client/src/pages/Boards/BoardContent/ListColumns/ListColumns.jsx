import { useState } from 'react'
import { toast } from 'react-toastify'
import Box from '@mui/material/Box'
import Column from './Column/Column'
import Button from '@mui/material/Button'
import AddBoxIcon from '@mui/icons-material/AddBox'

import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'
import { TextField } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'


function ListColumns({ columns, createNewColumn, createNewCard }) {
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false)
  const toggleOpenNewColumnForm = () => setOpenNewColumnForm(!openNewColumnForm)

  const [newColumnTitle, setNewColumnTitle] = useState('')
  const addNewColumn = async () => {
    if (!newColumnTitle) {
      toast.error('Please enter Column Title!')
      return
    }

    // Tạo dữ liệu column để gọi API
    const newColumnData = {
      title: newColumnTitle
    }

    /*
      - Gọi lên props function createNewColumn nằm ở component cha cao nhất (boards/_í.jsx)
      - Lưu ý: về sau sẽ đưa dữ liệu ra bên ngoài Redux Global Store. Lúc này, chúng ta có thể gọi luôn api ở đây là xong
              thay vì lần lượt gọi lên component cha bên trên
      => Redux :))
    */
    await createNewColumn(newColumnData)

    // Đóng trạng thái thêm Column mới và Clear Input
    toggleOpenNewColumnForm()
    setNewColumnTitle('')
  }

  /**
   * --> SortableContext yêu cầu items là một mảng dạng ['id-1', 'id-2', 'id-3', ...]
   * CHỨ KHÔNG PHẢI [{id: 'id-1'}, {id: 'id-2'}, {id: 'id-3'}, ...]
   * --> Nếu không đúng thì vẫn kéo thả được nhưng không có animation
   * https://github.com/clauderic/dnd-kit/issues/183#issuecoment-812569512
   */
  return (
    <SortableContext items={columns?.map(column => column._id)} strategy={horizontalListSortingStrategy}>
      <Box sx={{
        bgcolor: 'inherit',
        width: '100%',
        height: '100%',
        display: 'flex',
        overflowX: 'auto',
        overflowY: 'hidden',
        '&::-webkit-scrollbar-track': { m: 2 }
      }}>
        {columns?.map(column => <Column key={column._id} column={ column } createNewCard={createNewCard}/>)}

        {/* Box add new column CTA */}
        {!openNewColumnForm
          ? (
            <Box
              onClick={toggleOpenNewColumnForm}
              sx={{
                minWidth: '250px',
                maxWidth: '250px',
                mx: 2,
                borderRadius: '6px',
                height: 'fit-content',
                bgcolor: '#ffffff3d'
              }}>
              <Button
                startIcon={<AddBoxIcon />}
                sx={{
                  color: 'white',
                  width: '100%',
                  justifyContent: 'flex-start',
                  pl: 2.5,
                  py: 1
                }}
              >
            Add new column
              </Button>
            </Box>
          )
          : (
            <Box sx={{
              minWidth: '250px',
              maxWidth: '250px',
              mx: 2,
              p: 1,
              borderRadius: '6px',
              height: 'fit-content',
              bgcolor: 'ffffff3d',
              display: 'flex',
              flexDirection: 'column',
              gap: 1
            }}>
              <TextField
                label="Enter column title..."
                type="text"
                size='small'
                variant='outlined'
                autoFocus
                value={newColumnTitle}
                onChange={(e) => {
                  setNewColumnTitle(e.target.value)
                }}
                sx={{
                  '& label': { color: 'white' },
                  '& input': { color: 'white' },
                  '& label.Mui-focused': { color: 'white' },
                  '& .MuiOutlinedInput-root': {
                    '& fieldset': { borderColor: 'white' },
                    '&:hover fieldset': { borderColor: 'white' },
                    '&.Mui-focused fieldset': { borderColor: 'white' }
                  }
                }}
              />

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1
                }}
              >
                <Button
                  onClick={addNewColumn}
                  variant='contained'
                  color='success'
                  size='small'
                  sx={{
                    boxShadow: 'none',
                    border: '0.5px solid',
                    borderColor: (theme) => theme.palette.success.main,
                    '&:hover': { bgColor: (theme) => theme.palette.success.main }
                  }}
                >
                  Add Column
                </Button>
                <CloseIcon
                  fontSize='small'
                  sx={{
                    color: 'white',
                    cursor: 'pointer',
                    '&:hover': { bgColor: (theme) => theme.palette.success.light }
                  }}
                  onClick={toggleOpenNewColumnForm}
                />
              </Box>
            </Box>
          )
        }

      </Box>
    </SortableContext>
  )
}

export default ListColumns
