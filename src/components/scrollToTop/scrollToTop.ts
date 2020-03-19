import TippyJS from '@tippy.js/react'
import njsx from 'njsx'
import 'tippy.js/dist/tippy.css'
import { ArrowUp } from 'react-feather'
import { Button } from './scrollToTop.styles'

const UpArrow = njsx(ArrowUp)
const Tippy = njsx(TippyJS)

const ScrollToTop = (): typeof Tippy =>
  Tippy({
    content: 'Scroll to top',
    theme: 'material',
  })(
    Button({
      'aria-label': 'Scroll to top',
      onClick: () => {
        // eslint-disable-next-line no-unused-expressions
        window?.scrollTo({
          behavior: 'smooth',
          left: 0,
          top: 0,
        })
      },
    })(UpArrow)
  )

export default ScrollToTop
