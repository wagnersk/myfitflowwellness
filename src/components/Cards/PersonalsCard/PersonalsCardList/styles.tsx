import { RFValue } from '@utils/RFValue'
import styled from 'styled-components/native'

export const Container = styled.View`
  margin-top: 16px;
  margin-left: 32px;
  margin-right: 32px;
`

export const BoxButtonWrapper = styled.View``

export const BoxButtonTitle = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BODY};
  font-size: ${RFValue(14)}px;
`
