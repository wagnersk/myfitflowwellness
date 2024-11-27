import styled from 'styled-components/native'
import { RFValue } from '@utils/RFValue'

export const Container = styled.View`
  align-items: center;
  justify-content: center;
`

export const PhotoBorderWrapper = styled.View`
  width: 184px;
  height: 184px;
  border-radius: 92px;
  border: 2px ${({ theme }) => theme.COLORS.BLUE_STROKE};
  align-items: center;
  justify-content: center;
`

export const PhotoImage = styled.Image`
  width: 180px;
  height: 180px;
  border-radius: 90px;
  overflow: hidden;
`

export const PhotoNotFound = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(14)}px;
  opacity: 0.5;
  margin-bottom: 4px;
`
