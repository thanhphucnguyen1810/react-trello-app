import { Button } from '@mui/material'
import Typography from '@mui/material/Typography'

function App() {

  return (
    <>
      <h1>Hello World</h1>
      <Typography variant='body2' color="text.secondary">
        This is a sample text
      </Typography>

      <Button variant="contained">Hello World</Button>
      <Button variant="outlined">Hello World</Button>
      <Button variant="text">Hello World</Button>
    </>
  )
}

export default App
