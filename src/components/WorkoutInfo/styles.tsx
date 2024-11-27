import { RFValue } from '@utils/RFValue'
import styled from 'styled-components/native'

export const Container = styled.View`
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  padding: 2px;
  border-radius: 8px;
`

export const Title = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(14)}px;
  opacity: 0.7;
`

export const Description = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(14)}px;
`
