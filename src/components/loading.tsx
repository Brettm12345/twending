import { FC } from 'react'
import Loader from 'react-loader-spinner'
import theme from 'theme'

const Loading: FC = () => <Loader type="Rings" color={theme.colors.primary} />;

export default Loading;
