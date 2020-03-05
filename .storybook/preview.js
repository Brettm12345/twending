import '../src/styles/index.css'

import {
  addParameters,
} from '@storybook/react'
import { configure } from '@storybook/react'

addParameters({
  viewport: {
    viewports: {
      xs: {
        name: 'xs',
        styles: {
          width: '360px',
          height: '800px',
        },
        type: 'mobile'
      },
      sm: {
        name: 'sm',
        styles: {
          width: '600px',
          height: '800px',
        },
        type: 'tablet'
      },
      md: {
        name: 'md',
        styles: {
          width: '767px',
          height: '800px',
        },
        type: 'desktop'
      },
      lg: {
        name: 'lg',
        styles: {
          width: '1023px',
          height: '800px',
        },
        type: 'desktop'
      },
      xl: {
        name: 'xl',
        styles: {
          width: '1279px',
          height: '800px',
        },
        type: 'desktop'
      },
    },
  },
})

configure(
  require.context('../src/stories', true, /\.stories\.tsx?$/),
  module
)