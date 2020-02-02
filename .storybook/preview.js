import '../src/styles/global.scss'
import { addParameters } from '@storybook/react'
import { configure } from '@storybook/react'

configure(
  require.context('../src', true, /\.stories\.tsx?$/),
  module
)

addParameters({
  paddings: [
    { name: 'Small', value: '16px' },
    { name: 'Medium', value: '32px', default: true },
    { name: 'Large', value: '64px' },
  ],
  viewport: {
    viewports: {
      xs: {
        name: 'xs',
        styles: {
          width: '400px',
          height: '600px',
        },
      },
      sm: {
        name: 'sm',
        styles: {
          width: '640px',
          height: '800px'
        }
      },
      md: {
        name: 'sm',
        styles: {
          width: '768px',
          height: '500px'
        }
      },
      lg: {
        name: 'lg',
        styles: {
          width: '1024px',
          height: '768px'
        }
      },
      xl: {
        name: 'xl',
        styles: {
          width: '1280px',
          height: '1024px'
        }
      }
    },
  },
})
