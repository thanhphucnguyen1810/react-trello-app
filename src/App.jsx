import { Button } from '@mui/material'
import Typography from '@mui/material/Typography'
import { useColorScheme } from '@mui/material/styles'

function ModeToggle() {
  const { mode, setMode } = useColorScheme()
  return (
    <Button
      onClick={() => {
        setMode(mode === 'light' ? 'dark' : 'light')
        // localStorage.setItem('trello-dark-light-mode')
        // localStorage.getItem('trello-dark-light-mode')
      }}
    >
      {mode === 'light' ? 'Turn dark' : 'Turn light'}
    </Button>
  )
}


function App() {

  return (
    <>
      <ModeToggle />
      <hr />
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
