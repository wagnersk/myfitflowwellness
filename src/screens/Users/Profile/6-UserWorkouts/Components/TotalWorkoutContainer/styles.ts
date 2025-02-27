import styled, { css } from 'styled-components/native'
import { RFValue } from '@utils/RFValue'
import Animated from 'react-native-reanimated'

export const ContainerWrapper = styled.View`
  width: 100%;
  gap: 16px;
`
export const MonthYearACTMessage = styled.View`
  justify-content: center;
  align-items: center;
  gap: 4px;
`
export const CardsWrapper = styled.View`
  width: 100%;
  gap: 12px;
`
export const CardTittle = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BODY};
  font-size: ${RFValue(16)}px;
`
export const CardDate = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BODY};
  font-size: ${RFValue(14)}px;
`
