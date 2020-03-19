import { create } from '@storybook/theming/create'

export default create({
  base: 'dark',

  colorPrimary: '#5881EA',
  colorSecondary: '#363C57',

  // UI
  appBg: '#24283A',
  appContentBg: '#1B1E2C',
  appBorderColor: '#161a2a',
  appBorderRadius: 4,

  // Typography
  fontBase: 'sans-serif',
  fontCode: 'monospace',

  // Text colors
  textColor: '#CED0D8',
  textInverseColor: 'rgba(255,255,255,0.9)',

  // Toolbar default and active colors
  barTextColor: '#CED0D8',
  barSelectedColor: '#fff',
  barBg: '#1B1E2C',

  // Form colors
  inputBg: '#1B1E2C',
  inputBorder: '#161a2a',
  inputTextColor: 'white',
  inputBorderRadius: 4,
})
