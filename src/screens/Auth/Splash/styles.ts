import styled from 'styled-components/native'
import { LinearGradient } from 'expo-linear-gradient'

import MyFitName from '@assets/MyFitFlowName.svg'
import MyFitSlogan from '@assets/MyFitFlowSlogan.svg'

export const LinearGradientContainer = styled(LinearGradient).attrs(
  ({ theme }) => ({
    colors: theme.COLORS.GRADIENT_SPLASH_BG,
    start: { x: 0.5, y: 0.4 },
    end: { x: 0.5, y: 1 },
  }),
)`
  flex: 1;
  justify-content: center;
  align-items: center;
`

export const MyFitFlowLetterComponent = styled(MyFitName)`
  width: 250px;
  height: 222px;
`

export const MyFitFlowLogoComponent = styled(MyFitSlogan)`
  width: 250px;
  height: 227px;
`
