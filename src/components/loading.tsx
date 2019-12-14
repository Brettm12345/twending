import React from 'react'
import Loader from 'react-loader-spinner'
import theme from 'theme'

const Loading: React.FC = () => (
  <Loader type="Rings" color={theme.colors.blue[500]} />
);

export default Loading;
