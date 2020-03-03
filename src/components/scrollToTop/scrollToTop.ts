import njsx from 'njsx'
import { ArrowUp } from 'react-feather'
import { Button } from './scrollToTop.styles'

const UpArrow = njsx(ArrowUp)

const ScrollToTop = () =>
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

export default ScrollToTop
