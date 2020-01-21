import { fontFamily } from './constants'

const blue = {
  100: '#EEF2FD',
  200: '#D5E0FA',
  300: '#BCCDF7',
  400: '#8AA7F0',
  500: '#5881EA',
  600: '#4F74D3',
  700: '#354D8C',
  800: '#283A69',
  900: '#1A2746',
}

const gray = {
  100: '#ECECEF',
  200: '#CED0D8',
  300: '#B1B4C0',
  400: '#777B90',
  500: '#3C4361',
  600: '#363C57',
  700: '#24283A',
  800: '#1B1E2C',
  900: '#12141D',
}

const theme = {
  colors: {
    black: '#000000',
    blue,
    border: '#161a2a',
    gray,
    primary: blue[500],
    white: '#ffffff',
  },
  fontFamily: {
    sans: [
      fontFamily,
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Helvetica Neue',
      'Arial',
      'Noto Sans',
      'sans-serif',
      'Apple Color Emoji',
      'Segoe UI Emoji',
      'Segoe UI Symbol',
      'Noto Color Emoji',
    ],
  },
  /* eslint-disable sort-keys-fix/sort-keys-fix */
  screens: {
    xs: '400px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  },
}

export default theme
