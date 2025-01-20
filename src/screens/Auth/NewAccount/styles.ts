import styled from 'styled-components/native'
import MyFitFlowNameAndSlogan from '@assets/MyFitFlowNameAndSlogan.svg'

import { LinearGradient } from 'expo-linear-gradient'
import { RFValue } from '@utils/RFValue'
import { TouchableOpacity } from 'react-native'

export const Container = styled.View`
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
`
export const Header = styled.View`
  height: 240px;
  align-items: center;
  justify-content: center;
`

export const MyFitFlowLogoComponent = styled(MyFitFlowNameAndSlogan)``

export const BodyTop = styled.View`
  justify-content: space-around;
  width: 100%;
`

export const Footer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

export const FooterWrapper = styled(TouchableOpacity)`
  height: 48px;
  justify-content: center;
  flex-direction: row;
  align-items: center;
`

export const FooterText = styled.Text`
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  color: ${({ theme }) => theme.COLORS.TEXT_LIGHT};
  font-size: ${RFValue(16)}px;
`
export const AuxText = styled.Text`
  font-family: ${({ theme }) => theme.FONTS.SUBTITLE};
  color: ${({ theme }) => theme.COLORS.NEUTRA_LETTER_AND_STROKE};

  font-size: ${RFValue(14)}px;
`
export const AuxTextWrapper = styled.View`
  padding-top: 8px;
  padding-bottom: 4px;
  padding-left: 12px;
`
export const IconContainer = styled.View`
  padding-bottom: 2px;
`

export const SpaceBetweenInput = styled.View`
  height: 16px;
`

export const SpaceBetweenFormAndButton = styled.View`
  height: 16px;
`

export const LinearGradientContainer = styled(LinearGradient).attrs(
  ({ theme }) => ({
    colors: [
      theme.COLORS.GRADIENT_SPLASH_BG[0],
      theme.COLORS.GRADIENT_SPLASH_BG[1],
    ],
    start: { x: 0.5, y: 0.4 },
    end: { x: 0.5, y: 1 },
  }),
)`
  flex: 1;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
`
