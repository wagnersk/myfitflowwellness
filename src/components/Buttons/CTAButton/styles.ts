import styled, { css } from 'styled-components/native'
import { TouchableOpacity } from 'react-native'
import { RFValue } from '@utils/RFValue'
import { LinearGradient } from 'expo-linear-gradient'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  loading?: boolean
  workoutAlreadySelected?: boolean
  changeColor?: boolean
}

export const Container = styled.View`
  width: 100%;
`
export const CTAButtonPressable = styled(TouchableOpacity)<Props>`
  background-color: transparent;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  height: 48px;
  width: 100%;
`

export const Title = styled.Text`
  color: ${({ theme }) => theme.COLORS.NEUTRA_LETTER_AND_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(16)}px;
`
export const LinearGradientButton = styled(LinearGradient).attrs<Props>(
  ({ theme, changeColor }) => ({
    colors: changeColor
      ? [theme.COLORS.GRADIENT_CARD[0], theme.COLORS.GRADIENT_CARD[1]]
      : [theme.COLORS.GRADIENT_BUTTON[0], theme.COLORS.GRADIENT_BUTTON[1]],
    start: { x: 0, y: 1 },
    end: { x: 1, y: 0 },
  }),
)`
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  flex-direction: row;
`
