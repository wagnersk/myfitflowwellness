import styled, { css } from 'styled-components/native'
import { ReactNode } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { RFValue } from '@utils/RFValue'
interface Props {
  children: ReactNode
  loading?: boolean
}

export const ButtonContainer = styled.View<{ type: 'positive' | 'neutral' }>`
  width: 100%;
  height: 100%;
  padding: 8px;
  border-radius: 12px;
  background-color: ${({ theme, type }) =>
    type === 'positive'
      ? theme.COLORS.AUX_GOOGLE_GREEN
      : theme.COLORS.NEUTRA_LETTER_AND_STROKE};
`
export const CardsWrapper = styled.View`
  width: 100%;
  gap: 12px;
`

/*   width: 100%;
  border: 2px ${({ theme }) => theme.COLORS.BLUE_STROKE}; */
export const ButtonWrapper = styled(TouchableOpacity)<Props>`
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  border: solid 1px ${({ theme }) => theme.COLORS.BLUE_STROKE};
  ${({ loading }) =>
    loading &&
    css`
      opacity: 0.5;
    `}

  height:120px;
`
export const CardTitle = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.SUBTITLE};
  font-size: ${RFValue(18)}px;
`
export const CardSubTittle = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BODY};
  font-size: ${RFValue(12)}px;
`
