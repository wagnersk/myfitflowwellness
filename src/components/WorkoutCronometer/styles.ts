import styled from 'styled-components/native'
import { RFValue } from '@utils/RFValue'
import { TouchableOpacity } from 'react-native'
import { ReactNode } from 'react'

type TouchableOpacityProps = {
  children: ReactNode
}

export const WorkoutCronometerWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 32px;
`

export const WorkoutCronometerButtonStart = styled(
  TouchableOpacity,
)<TouchableOpacityProps>`
  height: 48px;
  width: 96px;
  justify-content: center;
  align-items: center;
`

export const WorkoutCronometerTimer = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BODY};
  font-size: ${RFValue(34)}px;
  margin-left: -16px;
`

export const WorkoutCronometerText = styled.Text`
  color: ${({ theme }) => theme.COLORS.BLUE_STROKE};
  font-family: ${({ theme }) => theme.FONTS.BUTTON};
  font-size: ${RFValue(14)}px;
`
