import { experimental_extendTheme as extendTheme } from '@mui/material/styles'
import { indigo, amber } from '@mui/material/colors'

// create a theme instance.
const theme = extendTheme({
  trello: {
    AppBarHeight: '58px',
    boardBarHeight: '60px'
  },
  colorSchemes: {
    light: {
      palette: {
        primary: indigo,
        secondary: amber
      }
    },
    dark: {
      palette: {
        primary: indigo,
        secondary: amber
      }
    }
  },
  components: {
    // Name of the component
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '*::-webkit-scrollbar': {
            width: '8px',
            height: '8px'
          },
          '*::-webkit-scrollbar-thumb': {
            BorderRadius: '8px',
            backgroundColor: '#bdc3c7'
          },
          '*::-webkit-scrollbar-thumb:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.4)'
          }
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          textTransform: 'none'
        }
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        root: ( { theme } ) => ({
          // color: theme.palette.primary.main,
          fontSize: '0.875rem'
        })
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ( { theme } ) => {
          return {
            // color: theme.palette.primary.main,
            fontSize: '0.875rem',
            // '.MuiOutlinedInput-notchedOutline': {
            //   borderColor: theme.palette.primary.light
            // },
            // '&:hover': {
            //   '.MuiOutlinedInput-notchedOutline': {
            //     borderColor: theme.palette.primary.main
            //   }
            // },
            '& fieldset': { borderWidth: '0.5px !important' },
            '&:hover fieldset': { borderWidth: '1px !important' },
            '&.Mui-focused fieldset': { borderWidth: '1px !important' }
          }
        }
      }
    }
  }
  // ...other properties
})

export default theme
