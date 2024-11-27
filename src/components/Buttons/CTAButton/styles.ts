import styled, { css } from 'styled-components/native'
import { TouchableHighlight } from 'react-native'
import { RFValue } from '@utils/RFValue'
import { LinearGradient } from 'expo-linear-gradient'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
  loading?: boolean
}

export const Container = styled(TouchableHighlight)<Props>`
  background-color: transparent;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  border-color: ${({ theme }) => theme.COLORS.NEUTRA_LETTER_AND_STROKE};
  height: 48px;
  width: 100%;

  ${({ loading }) =>
    loading &&
    css`
      opacity: 0.5;
    `}
`

export const Title = styled.Text`
  color: ${({ theme }) => theme.COLORS.NEUTRA_LETTER_AND_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(16)}px;
`

export const LinearGradientButton = styled(LinearGradient)`
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  flex-direction: row;
`
