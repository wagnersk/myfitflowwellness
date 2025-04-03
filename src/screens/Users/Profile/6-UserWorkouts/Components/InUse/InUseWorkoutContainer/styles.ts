import styled from 'styled-components/native'
import { RFValue } from '@utils/RFValue'

export const ContainerWrapper = styled.View`
  width: 100%;
  gap: 16px;
`

export const CardsWrapper = styled.View`
  width: 100%;
  gap: 12px;
`
export const CardContainer = styled.View`
  gap: 8px;
  border-radius: 12px;
`

export const CardTittle = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BODY};
  font-size: ${RFValue(14)}px;
`
