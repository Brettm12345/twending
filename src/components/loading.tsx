import React, { FC } from 'react'
import Loader from 'react-loader-spinner'

import theme from 'data/theme'

const Loading: FC = () => (
  <Loader color={theme.colors.primary} type="Rings" />
)

export default Loading
