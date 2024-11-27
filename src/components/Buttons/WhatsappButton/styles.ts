import styled, { css } from 'styled-components/native'
import { RFValue } from '@utils/RFValue'
import { ReactNode } from 'react'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

interface Props {
  children: ReactNode
  loading?: boolean
}

export const Container = styled(TouchableWithoutFeedback)<Props>`
  height: 100%;
  width: 100%;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  flex-direction: row;

  background-color: ${({ theme }) => theme.COLORS.AUX_GOOGLE_GREEN};

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
  padding-right: 8px;
`
