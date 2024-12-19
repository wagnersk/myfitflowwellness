import styled from 'styled-components/native'
import MyFitFlowNameAndSlogan from '@assets/MyFitFlowNameAndSlogan.svg'

import { LinearGradient } from 'expo-linear-gradient'
import { RFValue } from '@utils/RFValue'

import { Platform, TouchableOpacity } from 'react-native'

export const Header = styled.View`
  height: 270px;
  align-items: center;
  justify-content: center;
  margin-top: ${Platform.OS === 'ios' ? 24 : 24}px;
`

export const MyFitFlowLogoComponent = styled(MyFitFlowNameAndSlogan)``

export const BodyTop = styled.View`
  margin-top: 24px;
  justify-content: space-around;
  width: 100%;
`

export const ForgotPasswordWrapper = styled.View`
  align-items: flex-end;
  top: 8px;
  margin-bottom: 80px;
`
export const ButtonWithIcon = styled.View`
  gap: 24px;
`

export const ForgotPasswordText = styled.Text`
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  color: ${({ theme }) => theme.COLORS.TEXT_LIGHT};
  font-size: ${RFValue(14)}px;
`

export const ForgotPasswordButtonWrapper = styled(TouchableOpacity)`
  height: 48px;
  justify-content: center;
`

export const Footer = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 12px 0;
`

export const IconContainer = styled.View`
  padding-bottom: 2px;
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

export const LinearGradientContainer = styled(LinearGradient).attrs(
  ({ theme }) => ({
    colors: theme.COLORS.GRADIENT_SPLASH_BG,
    start: { x: 0.5, y: 0.4 },
    end: { x: 0.5, y: 1 },
  }),
)`
  flex: 1;

  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
`
