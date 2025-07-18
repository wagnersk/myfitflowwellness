// styles.ts
import { RFValue } from '@utils/RFValue'
import { TouchableOpacity } from 'react-native'
import styled from 'styled-components/native'

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger'
}

export const Container = styled.View`
  flex: 1;
`

export const Header = styled.View`
  align-items: center;
  justify-content: center;
  width: 100%;
`

export const SettingsWrapper = styled.View`
  position: absolute;
  left: 24px;
`

export const UserName = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(22)}px;
`

export const Body = styled.View`
  padding: 24px;
  flex: 1;
`

export const Card = styled.View`
  background-color: ${({ theme }) => theme.COLORS.NEUTRA_LETTER_AND_STROKE};
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
  border: 1px solid ${({ theme }) => theme.COLORS.BLUE_STROKE};
`

export const CardHeader = styled.View`
  margin-bottom: 8px;
`

export const CardTitle = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(18)}px;
`

export const CardStatus = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BODY};
  font-size: ${RFValue(16)}px;
  margin-top: 4px;
`

export const CardButtons = styled.View`
  flex-direction: row;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 20px;
`

export const Button = styled(TouchableOpacity).attrs({
  activeOpacity: 0.7,
})<ButtonProps>`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  padding: 10px 14px;
  border-radius: 6px;

  background-color: ${({ theme, variant }) => {
    if (variant === 'danger') return 'transparent'
    if (variant === 'secondary') return 'transparent'
    return theme.COLORS.BLUE_STROKE
  }};

  border: 1px solid
    ${({ theme, variant }) => {
      if (variant === 'danger') return theme.COLORS.AUX_GOOGLE_RED
      if (variant === 'secondary') return theme.COLORS.BLUE_STROKE
      return 'transparent'
    }};
`

export const ButtonText = styled.Text<ButtonProps>`
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(16)}px;
  color: ${({ theme, variant }) => {
    if (variant === 'danger') return theme.COLORS.AUX_GOOGLE_RED
    if (variant === 'secondary') return theme.COLORS.BLUE_STROKE
    return theme.COLORS.NEUTRA_LETTER_AND_STROKE
  }};
`

export const ButtonsWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  gap: 16px;
  flex: 1;
`
export const BodyImageWrapper = styled.View`
  flex: 1;
`

export const ImageBackgroundContainer = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.2);
`
