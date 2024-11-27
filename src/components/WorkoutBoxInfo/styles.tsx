import { RFValue } from '@utils/RFValue'
import styled from 'styled-components/native'

export const Container = styled.View`
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 8px;
`
export const IconWrapper = styled.View``
export const DescriptionWrapper = styled.View`
  width: 120px;
  align-items: center;
  justify-content: center;
`
export const Description = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-size: ${RFValue(12)}px;
  font-size: 12px;
`
