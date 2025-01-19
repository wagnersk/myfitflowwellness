import styled from 'styled-components/native'
import MyFitFlowNameAndSlogan from '@assets/MyFitFlowNameAndSlogan.svg'
import Logo from '@assets/Logo.svg'

import { LinearGradient } from 'expo-linear-gradient'
import { RFValue } from '@utils/RFValue'

import { TouchableOpacity } from 'react-native'

export const Container = styled.View`
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
`
export const BodyWrapper = styled.View`
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
`

export const Header = styled.View`
  height: 200px;
  align-items: center;
  justify-content: center;
`
export const ToggleButtonWrapper = styled.View`
  display: flex;
  width: 100%;
  align-items: flex-end;
`
export const ToggleButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  padding: 8px 16px;
  border-radius: 20px;
  border: 1px solid #ccc;
  shadow-color: #000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.2;
  shadow-radius: 4px;
  elevation: 5;
`

export const ToggleButtonText = styled.Text`
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(24)}px;
`

export const MyFitFlowLogoComponent = styled(Logo)``

export const BodyTop = styled.View`
  margin-top: 24px;
  align-items: center;
  width: 100%;
  gap: 8px;
`

export const FormWrapper = styled.View``
export const ForgotPasswordWrapper = styled.View`
  justify-content: flex-end;
  align-items: center;
  flex-direction: row;
  width: 100%;
  margin-bottom: 40px;
`
export const ButtonWithIcon = styled.View`
  gap: 24px;
  width: 100%;
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
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;

  gap: 12px;
`

export const IconContainer = styled.View`
  padding-bottom: 2px;
`
export const FooterTopWrapper = styled.View`
  height: 48px;
  justify-content: center;
  flex-direction: row;
  align-items: center;

  padding: 0 16px;

  border-radius: 999px;
  border: 1px solid #ccc;
`

export const CreateAccountButton = styled(TouchableOpacity)`
  height: 48px;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  padding-left: 48px;
`
export const CreateGuestAccountButton = styled(TouchableOpacity)`
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
  height: 100%;
  width: 100%;

  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
`
